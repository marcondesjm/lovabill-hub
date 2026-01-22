import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, LogOut, Shield } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { LandingPageList } from "@/components/dashboard/LandingPageList";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { DeveloperDonation } from "@/components/dashboard/DeveloperDonation";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAdminCheck();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCreateNew = () => {
    navigate("/dashboard/editor");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-2xl font-bold">Minhas Landing Pages</h1>
            <div className="flex gap-2">
              <DeveloperDonation />
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate("/admin")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Painel Admin
                </Button>
              )}
              <Button onClick={handleCreateNew}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Landing Page
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Minhas Landing Pages</h1>
              <Button variant="outline" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCreateNew} className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Nova Landing Page
              </Button>
              <DeveloperDonation />
              {isAdmin && (
                <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
                  <Shield className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {user && <LandingPageList userId={user.id} />}
      </main>
    </div>
  );
};

export default Dashboard;
