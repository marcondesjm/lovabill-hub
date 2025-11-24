import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type LandingPage = {
  id: string;
  slug: string;
  hero_title: string;
  is_published: boolean;
  created_at: string;
};

export const LandingPageList = ({ userId }: { userId: string }) => {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadPages();
  }, [userId]);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .select("id, slug, hero_title, is_published, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar páginas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta landing page?")) return;

    try {
      const { error } = await supabase.from("landing_pages").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Landing page excluída",
        description: "A página foi removida com sucesso.",
      });
      loadPages();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (pages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhuma landing page criada</CardTitle>
          <CardDescription>
            Clique em "Nova Landing Page" para criar sua primeira página de captura.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <Card key={page.id}>
          <CardHeader>
            <CardTitle className="text-lg">{page.hero_title}</CardTitle>
            <CardDescription>
              /{page.slug}
              {page.is_published ? (
                <span className="ml-2 text-green-600">● Publicada</span>
              ) : (
                <span className="ml-2 text-gray-500">● Rascunho</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/dashboard/editor/${page.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`/${page.slug}`, "_blank")}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(page.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
