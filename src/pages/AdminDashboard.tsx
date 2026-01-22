import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  LogOut, 
  Users, 
  FileText, 
  TrendingUp, 
  Shield, 
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  LayoutDashboard,
  Crown,
  Pencil
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LandingPageStats = {
  id: string;
  slug: string;
  hero_title: string;
  is_published: boolean;
  created_at: string;
  user_email?: string;
};

type UserStats = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  landing_pages_count: number;
  is_admin: boolean;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading, userId } = useAdminCheck();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLandingPages: 0,
    publishedPages: 0,
    draftPages: 0
  });
  const [landingPages, setLandingPages] = useState<LandingPageStats[]>([]);
  const [users, setUsers] = useState<UserStats[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [adminLoading, isAdmin, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      // Load landing pages stats
      const { data: pagesData, error: pagesError } = await supabase
        .from("landing_pages")
        .select("id, slug, hero_title, is_published, created_at, user_id")
        .order("created_at", { ascending: false });

      if (pagesError) throw pagesError;

      // Load profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, created_at")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Load admin roles
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .eq("role", "admin");

      const adminUserIds = new Set(rolesData?.map(r => r.user_id) || []);

      // Map user emails to landing pages
      const userEmailMap = new Map(profilesData?.map(p => [p.id, p.email]) || []);
      
      const pagesWithEmails = (pagesData || []).map(page => ({
        ...page,
        user_email: userEmailMap.get(page.user_id) || "Desconhecido"
      }));

      // Count landing pages per user
      const userPagesCount = new Map<string, number>();
      (pagesData || []).forEach(page => {
        userPagesCount.set(page.user_id, (userPagesCount.get(page.user_id) || 0) + 1);
      });

      const usersWithStats: UserStats[] = (profilesData || []).map(profile => ({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        created_at: profile.created_at,
        landing_pages_count: userPagesCount.get(profile.id) || 0,
        is_admin: adminUserIds.has(profile.id)
      }));

      const publishedCount = pagesData?.filter(p => p.is_published).length || 0;

      setStats({
        totalUsers: profilesData?.length || 0,
        totalLandingPages: pagesData?.length || 0,
        publishedPages: publishedCount,
        draftPages: (pagesData?.length || 0) - publishedCount
      });

      setLandingPages(pagesWithEmails);
      setUsers(usersWithStats);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
    toast({
      title: "Dados atualizados",
      description: "O dashboard foi atualizado com sucesso."
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const togglePagePublish = async (pageId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("landing_pages")
        .update({ is_published: !currentStatus })
        .eq("id", pageId);

      if (error) throw error;

      toast({
        title: currentStatus ? "Página despublicada" : "Página publicada",
        description: "O status foi alterado com sucesso."
      });
      
      loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Erro ao alterar status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteLandingPage = async (pageId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta landing page?")) return;

    try {
      const { error } = await supabase
        .from("landing_pages")
        .delete()
        .eq("id", pageId);

      if (error) throw error;

      toast({
        title: "Página excluída",
        description: "A landing page foi removida com sucesso."
      });
      
      loadDashboardData();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (adminLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white/70">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Painel Admin</h1>
              <p className="text-sm text-white/60">Gerenciamento do sistema</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-200">Total de Usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{stats.totalUsers}</span>
                <Users className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200">Total de Páginas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{stats.totalLandingPages}</span>
                <FileText className="h-10 w-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-200">Páginas Publicadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{stats.publishedPages}</span>
                <TrendingUp className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-orange-200">Rascunhos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{stats.draftPages}</span>
                <FileText className="h-10 w-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="pages" className="space-y-4">
          <TabsList className="bg-white/10 border border-white/20">
            <TabsTrigger value="pages" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              <FileText className="h-4 w-4 mr-2" />
              Landing Pages
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Landing Pages</CardTitle>
                <CardDescription className="text-white/60">
                  Gerencie todas as landing pages do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {landingPages.length === 0 ? (
                    <p className="text-white/60 text-center py-8">Nenhuma landing page encontrada</p>
                  ) : (
                    landingPages.map((page) => (
                      <div 
                        key={page.id} 
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{page.hero_title}</h3>
                            <Badge 
                              variant={page.is_published ? "default" : "secondary"}
                              className={page.is_published ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-gray-500/20 text-gray-300 border-gray-500/30"}
                            >
                              {page.is_published ? "Publicada" : "Rascunho"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>/{page.slug}</span>
                            <span>•</span>
                            <span>{page.user_email}</span>
                            <span>•</span>
                            <span>{new Date(page.created_at).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`/${page.slug}`, "_blank")}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/dashboard/editor/${page.id}`)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePagePublish(page.id, page.is_published)}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            title={page.is_published ? "Despublicar" : "Publicar"}
                          >
                            {page.is_published ? (
                              <ToggleRight className="h-4 w-4 text-green-400" />
                            ) : (
                              <ToggleLeft className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteLandingPage(page.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Usuários</CardTitle>
                <CardDescription className="text-white/60">
                  Lista de todos os usuários cadastrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.length === 0 ? (
                    <p className="text-white/60 text-center py-8">Nenhum usuário encontrado</p>
                  ) : (
                    users.map((user) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">
                                {user.full_name || user.email.split('@')[0]}
                              </h3>
                              {user.is_admin && (
                                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-white/60">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="text-center">
                            <p className="text-white font-semibold">{user.landing_pages_count}</p>
                            <p className="text-xs">páginas</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">
                              {new Date(user.created_at).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-xs">cadastro</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
