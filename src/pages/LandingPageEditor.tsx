import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Save, Upload, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingPagePreview } from "@/components/editor/LandingPagePreview";
const LandingPageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const [formData, setFormData] = useState({
    slug: "",
    hero_title: "CRÉDITOS LOVABLE COM BÔNUS EXCLUSIVO",
    hero_subtitle: "ENTREGA GARANTIDA",
    hero_badge: "Mestre do Lovable",
    hero_image_url: "",
    offer_text: "🔥 Oferta Limitada: Até 40% de desconto em créditos Lovable!",
    bonus_text: "+50 CRÉDITOS BÔNUS EM TODOS OS PLANOS",
    delivery_time: "45 a 120 minutos",
    cta_text: "Falar no WhatsApp",
    whatsapp_number: "",
    channel_url: "",
    is_published: true,
    meta_title: "",
    meta_description: "",
    about_name: "Wallas",
    about_title: "Especialista em Lovable",
    about_description: "Com anos de experiência em desenvolvimento no-code e IA, me tornei referência na comunidade brasileira de Lovable.",
    about_image_url: "",
    about_highlights: [
      { title: "Criador da Bíblia do Lovable", description: "O guia definitivo com todas as melhores práticas" },
      { title: "Canal Mestre do Lovable", description: "Tutoriais e estratégias exclusivas" },
      { title: "Comunidade com +900 Membros", description: "Líder da maior comunidade brasileira" },
      { title: "Serviço Confiável", description: "Centenas de clientes satisfeitos" }
    ],
    why_buy_items: [
      { icon: "users", title: "900+ membros satisfeitos" },
      { icon: "book", title: "Criador da Bíblia do Lovable" },
      { icon: "clock", title: "Entrega rápida (45-120 min)" },
      { icon: "message", title: "Suporte direto via WhatsApp" }
    ],
    how_to_steps: [
      { step: 1, title: "Entre na sua conta Lovable.dev" },
      { step: 2, title: "Acesse o menu e copie seu Invite Link 🔗" },
      { step: 3, title: "Escolha o pacote de créditos desejado" },
      { step: 4, title: "Envie seu link no privado do adm pelo WhatsApp" },
      { step: 5, title: "Aguarde a confirmação da recarga" }
    ],
    benefits_receive: [
      "Créditos válidos diretamente na sua conta Lovable.dev",
      "Processamento seguro dentro das normas da plataforma",
      "Serviço 100% digital e instantâneo",
      "Suporte humano para dúvidas, ajustes e orientações"
    ],
    security_items: [
      "Nenhum dado sensível da sua conta é solicitado",
      "Seu Invite Link é usado somente para liberação dos créditos",
      "Processamento 100% seguro e dentro das políticas da plataforma"
    ],
    pricing_plans: [
      { credits: "100", price: "97", bonus: "50" },
      { credits: "150", price: "127", bonus: "50" },
      { credits: "200", price: "157", bonus: "50" },
      { credits: "250", price: "177", bonus: "50" },
      { credits: "300", price: "197", bonus: "50" },
      { credits: "400", price: "297", bonus: "50" },
      { credits: "500", price: "347", bonus: "50" },
      { credits: "1000", price: "597", bonus: "50" },
      { credits: "1500", price: "697", bonus: "50" },
      { credits: "2000", price: "847", bonus: "50" }
    ],
    testimonials: [
      {
        name: "Carlos Silva",
        role: "Desenvolvedor",
        rating: 5,
        content: "Excelente serviço! Recebi os créditos rapidamente."
      },
      {
        name: "Marina Costa",
        role: "Empreendedora",
        rating: 5,
        content: "Muito bom! Processo simples e rápido."
      }
    ],
    faq_items: [
      {
        question: "Como funcionam os créditos Lovable?",
        answer: "Os créditos Lovable são adicionados diretamente na sua conta após a confirmação do pagamento."
      },
      {
        question: "Quanto tempo leva para receber os créditos?",
        answer: "O processamento leva entre 45 a 120 minutos após a confirmação do pagamento."
      },
      {
        question: "Os créditos têm prazo de validade?",
        answer: "Os créditos não expiram e ficam disponíveis na sua conta."
      },
      {
        question: "É seguro fornecer meu Invite Link?",
        answer: "Sim, o Invite Link não dá acesso à sua conta, apenas permite adicionar créditos."
      },
      {
        question: "Posso escolher qualquer pacote?",
        answer: "Sim, você pode escolher o pacote que melhor atende suas necessidades."
      }
    ],
  });

  useEffect(() => {
    if (id) {
      loadPage();
    }
  }, [id]);

  // Verificar disponibilidade do slug
  useEffect(() => {
    const checkSlugAvailability = async () => {
      if (!formData.slug || formData.slug.length < 3) {
        setSlugAvailable(null);
        return;
      }

      setCheckingSlug(true);
      try {
        const { data } = await supabase
          .from("landing_pages")
          .select("id")
          .eq("slug", formData.slug)
          .maybeSingle();

        // Se estamos editando, o slug atual é válido
        if (id && data?.id === id) {
          setSlugAvailable(true);
        } else {
          setSlugAvailable(!data);
        }
      } catch (error) {
        setSlugAvailable(null);
      } finally {
        setCheckingSlug(false);
      }
    };

    const timeoutId = setTimeout(checkSlugAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.slug, id]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setFormData({
        slug: data.slug || "",
        hero_title: data.hero_title || "",
        hero_subtitle: data.hero_subtitle || "",
        hero_badge: data.hero_badge || "",
        hero_image_url: data.hero_image_url || "",
        offer_text: data.offer_text || "",
        bonus_text: data.bonus_text || "",
        delivery_time: data.delivery_time || "",
        cta_text: data.cta_text || "",
        whatsapp_number: data.whatsapp_number || "",
        channel_url: data.channel_url || "",
        is_published: data.is_published || false,
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        about_name: data.about_name || "",
        about_title: data.about_title || "",
        about_description: data.about_description || "",
        about_image_url: data.about_image_url || "",
        about_highlights: (Array.isArray(data.about_highlights) ? data.about_highlights : []) as any[],
        why_buy_items: (Array.isArray(data.why_buy_items) ? data.why_buy_items : []) as any[],
        how_to_steps: (Array.isArray(data.how_to_steps) ? data.how_to_steps : []) as any[],
        benefits_receive: (Array.isArray(data.benefits_receive) ? data.benefits_receive : []) as any[],
        security_items: (Array.isArray(data.security_items) ? data.security_items : []) as any[],
        pricing_plans: (Array.isArray(data.pricing_plans) ? data.pricing_plans : []) as any[],
        testimonials: (Array.isArray(data.testimonials) ? data.testimonials : []) as any[],
        faq_items: (Array.isArray(data.faq_items) ? data.faq_items : []) as any[],
      });
    } catch (error: any) {
      toast({
        title: "Erro ao carregar página",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "hero_image_url" | "about_image_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = fieldName === "hero_image_url" ? setUploadingHero : setUploadingAbout;
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("landing-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("landing-images")
        .getPublicUrl(filePath);

      setFormData({ ...formData, [fieldName]: publicUrl });

      toast({
        title: "Imagem enviada!",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    // Validar antes de salvar
    if (!formData.slug) {
      toast({
        title: "URL obrigatória",
        description: "Por favor, defina uma URL amigável para sua página.",
        variant: "destructive",
      });
      return;
    }

    if (slugAvailable === false) {
      toast({
        title: "URL já em uso",
        description: "Esta URL já está sendo utilizada. Escolha outra.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Validar slug
      let finalSlug = formData.slug.trim();
      if (!finalSlug) {
        // Gerar slug automaticamente a partir do título
        finalSlug = formData.hero_title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove acentos
          .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
          .replace(/\s+/g, "-") // Substitui espaços por hífens
          .replace(/-+/g, "-") // Remove hífens duplicados
          .substring(0, 50); // Limita tamanho
        
        // Adiciona sufixo único se necessário
        const timestamp = Date.now();
        finalSlug = `${finalSlug}-${timestamp}`;
      }

      // Verificar se o perfil existe, se não, criar
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Perfil não existe, criar
        const { error: createError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || ""
          });
        
        if (createError) throw createError;
      }

      if (id) {
        // Ao atualizar, verificar se o slug mudou e se já existe
        if (finalSlug !== formData.slug) {
          const { data: existingPage } = await supabase
            .from("landing_pages")
            .select("id")
            .eq("slug", finalSlug)
            .neq("id", id)
            .maybeSingle();
          
          if (existingPage) {
            throw new Error("Este slug já está em uso. Por favor, escolha outro.");
          }
        }

        const { error } = await supabase
          .from("landing_pages")
          .update({ ...formData, slug: finalSlug })
          .eq("id", id);
        if (error) throw error;
      } else {
        // Ao criar, verificar se o slug já existe
        const { data: existingPage } = await supabase
          .from("landing_pages")
          .select("id")
          .eq("slug", finalSlug)
          .maybeSingle();
        
        if (existingPage) {
          // Se existir, adicionar timestamp para tornar único
          finalSlug = `${finalSlug}-${Date.now()}`;
        }

        const { error } = await supabase
          .from("landing_pages")
          .insert({ ...formData, slug: finalSlug, user_id: user.id });
        if (error) throw error;
      }

      toast({
        title: "Salvo com sucesso!",
        description: "Sua landing page foi atualizada.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">
              {id ? "Editar Landing Page" : "Nova Landing Page"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="hidden lg:flex"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Ocultar Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Mostrar Preview
                </>
              )}
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving || slugAvailable === false || !formData.slug || formData.slug.length < 3}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <main className={`flex-1 overflow-auto p-4 ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic" className="text-xs">Básico</TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs">Preços</TabsTrigger>
                <TabsTrigger value="about" className="text-xs">Sobre</TabsTrigger>
                <TabsTrigger value="content" className="text-xs">Conteúdo</TabsTrigger>
                <TabsTrigger value="testimonials" className="text-xs">Depoimentos</TabsTrigger>
                <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
              </TabsList>

          {/* Basic Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Configure os dados principais da landing page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug">URL Amigável da Página</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const generatedSlug = formData.hero_title
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^a-z0-9\s-]/g, "")
                          .replace(/\s+/g, "-")
                          .replace(/-+/g, "-")
                          .replace(/^-+|-+$/g, "")
                          .substring(0, 50);
                        setFormData({ ...formData, slug: generatedSlug });
                      }}
                    >
                      Gerar do Título
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => {
                        const cleanSlug = e.target.value
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^a-z0-9-]/g, "");
                        setFormData({ ...formData, slug: cleanSlug });
                      }}
                      placeholder="minha-pagina-de-vendas"
                      className={
                        slugAvailable === false
                          ? "border-destructive"
                          : slugAvailable === true
                          ? "border-green-500"
                          : ""
                      }
                    />
                    {checkingSlug && (
                      <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      Sua página ficará disponível em:{" "}
                      <span className="font-mono text-primary">
                        {window.location.origin}/{formData.slug || "sua-url"}
                      </span>
                    </p>
                    {slugAvailable === false && (
                      <p className="text-sm text-destructive font-medium">
                        ⚠️ Esta URL já está em uso. Escolha outra.
                      </p>
                    )}
                    {slugAvailable === true && formData.slug && (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ URL disponível!
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Use apenas letras minúsculas, números e hífens (ex: creditos-lovable-2024)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_published: checked })
                    }
                  />
                  <Label htmlFor="is_published">Página publicada</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seção Hero</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_badge">Badge/Etiqueta</Label>
                  <Input
                    id="hero_badge"
                    value={formData.hero_badge}
                    onChange={(e) => setFormData({ ...formData, hero_badge: e.target.value })}
                    placeholder="Mestre do Lovable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_title">Título principal</Label>
                  <Input
                    id="hero_title"
                    value={formData.hero_title}
                    onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                    placeholder="CRÉDITOS LOVABLE COM BÔNUS EXCLUSIVO"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_subtitle">Subtítulo</Label>
                  <Textarea
                    id="hero_subtitle"
                    value={formData.hero_subtitle}
                    onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                    placeholder="ENTREGA GARANTIDA"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagem Hero</Label>
                  {formData.hero_image_url && (
                    <div className="relative w-full h-48 mb-2">
                      <img
                        src={formData.hero_image_url}
                        alt="Hero"
                        className="w-full h-full object-cover rounded"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData({ ...formData, hero_image_url: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "hero_image_url")}
                    disabled={uploadingHero}
                  />
                  {uploadingHero && <p className="text-sm">Enviando imagem...</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offer_text">Texto da oferta (banner)</Label>
                  <Input
                    id="offer_text"
                    value={formData.offer_text}
                    onChange={(e) => setFormData({ ...formData, offer_text: e.target.value })}
                    placeholder="🔥 Oferta Limitada: Até 40% de desconto!"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bonus_text">Texto do bônus</Label>
                  <Input
                    id="bonus_text"
                    value={formData.bonus_text}
                    onChange={(e) => setFormData({ ...formData, bonus_text: e.target.value })}
                    placeholder="+50 CRÉDITOS BÔNUS EM TODOS OS PLANOS"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery_time">Prazo de entrega</Label>
                  <Input
                    id="delivery_time"
                    value={formData.delivery_time}
                    onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                    placeholder="45 a 120 minutos"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA e Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">Texto do botão de ação</Label>
                  <Input
                    id="cta_text"
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    placeholder="Falar no WhatsApp"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
                  <Input
                    id="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    placeholder="5511999999999"
                  />
                  <p className="text-sm text-muted-foreground">
                    Apenas números, com código do país e DDD
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel_url">URL do Canal/YouTube</Label>
                  <Input
                    id="channel_url"
                    value={formData.channel_url}
                    onChange={(e) => setFormData({ ...formData, channel_url: e.target.value })}
                    placeholder="https://youtube.com/@seu-canal"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tabela de Preços</CardTitle>
                <CardDescription>Configure os pacotes de créditos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      pricing_plans: [
                        ...formData.pricing_plans,
                        { credits: "", price: "", bonus: "50" },
                      ],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Pacote
                </Button>

                {formData.pricing_plans.map((plan: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Pacote {index + 1}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newPlans = [...formData.pricing_plans];
                            newPlans.splice(index, 1);
                            setFormData({ ...formData, pricing_plans: newPlans });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Créditos</Label>
                          <Input
                            value={plan.credits}
                            onChange={(e) => {
                              const newPlans = [...formData.pricing_plans];
                              newPlans[index] = { ...plan, credits: e.target.value };
                              setFormData({ ...formData, pricing_plans: newPlans });
                            }}
                            placeholder="100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Preço (R$)</Label>
                          <Input
                            value={plan.price}
                            onChange={(e) => {
                              const newPlans = [...formData.pricing_plans];
                              newPlans[index] = { ...plan, price: e.target.value };
                              setFormData({ ...formData, pricing_plans: newPlans });
                            }}
                            placeholder="97"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Bônus</Label>
                          <Input
                            value={plan.bonus}
                            onChange={(e) => {
                              const newPlans = [...formData.pricing_plans];
                              newPlans[index] = { ...plan, bonus: e.target.value };
                              setFormData({ ...formData, pricing_plans: newPlans });
                            }}
                            placeholder="50"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção "Quem Sou Eu"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about_name">Nome</Label>
                  <Input
                    id="about_name"
                    value={formData.about_name}
                    onChange={(e) => setFormData({ ...formData, about_name: e.target.value })}
                    placeholder="Wallas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_title">Título/Cargo</Label>
                  <Input
                    id="about_title"
                    value={formData.about_title}
                    onChange={(e) => setFormData({ ...formData, about_title: e.target.value })}
                    placeholder="Especialista em Lovable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_description">Descrição</Label>
                  <Textarea
                    id="about_description"
                    value={formData.about_description}
                    onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                    placeholder="Com anos de experiência..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto de perfil</Label>
                  {formData.about_image_url && (
                    <div className="relative w-32 h-32 mb-2">
                      <img
                        src={formData.about_image_url}
                        alt="Perfil"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() => setFormData({ ...formData, about_image_url: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "about_image_url")}
                    disabled={uploadingAbout}
                  />
                  {uploadingAbout && <p className="text-sm">Enviando imagem...</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Destaques (Highlights)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      about_highlights: [
                        ...formData.about_highlights,
                        { title: "", description: "" },
                      ],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Destaque
                </Button>

                {formData.about_highlights.map((highlight: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Destaque {index + 1}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newHighlights = [...formData.about_highlights];
                            newHighlights.splice(index, 1);
                            setFormData({ ...formData, about_highlights: newHighlights });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input
                          value={highlight.title}
                          onChange={(e) => {
                            const newHighlights = [...formData.about_highlights];
                            newHighlights[index] = { ...highlight, title: e.target.value };
                            setFormData({ ...formData, about_highlights: newHighlights });
                          }}
                          placeholder="Criador da Bíblia do Lovable"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea
                          value={highlight.description}
                          onChange={(e) => {
                            const newHighlights = [...formData.about_highlights];
                            newHighlights[index] = { ...highlight, description: e.target.value };
                            setFormData({ ...formData, about_highlights: newHighlights });
                          }}
                          placeholder="O guia definitivo com todas as melhores práticas"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Por Que Comprar de Mim?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      why_buy_items: [...formData.why_buy_items, { title: "", icon: "" }],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>

                {formData.why_buy_items.map((item: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Item {index + 1}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newItems = [...formData.why_buy_items];
                            newItems.splice(index, 1);
                            setFormData({ ...formData, why_buy_items: newItems });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...formData.why_buy_items];
                              newItems[index] = { ...item, title: e.target.value };
                              setFormData({ ...formData, why_buy_items: newItems });
                            }}
                            placeholder="900+ membros satisfeitos"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Ícone</Label>
                          <Input
                            value={item.icon}
                            onChange={(e) => {
                              const newItems = [...formData.why_buy_items];
                              newItems[index] = { ...item, icon: e.target.value };
                              setFormData({ ...formData, why_buy_items: newItems });
                            }}
                            placeholder="users"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como Solicitar (Passos)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      how_to_steps: [
                        ...formData.how_to_steps,
                        { step: formData.how_to_steps.length + 1, title: "" },
                      ],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Passo
                </Button>

                {formData.how_to_steps.map((step: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Passo {step.step}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newSteps = [...formData.how_to_steps];
                            newSteps.splice(index, 1);
                            setFormData({ ...formData, how_to_steps: newSteps });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Título do Passo</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...formData.how_to_steps];
                            newSteps[index] = { ...step, title: e.target.value };
                            setFormData({ ...formData, how_to_steps: newSteps });
                          }}
                          placeholder="Entre na sua conta Lovable.dev"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>O Que Recebe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      benefits_receive: [...formData.benefits_receive, ""],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Benefício
                </Button>

                {formData.benefits_receive.map((benefit: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits_receive];
                        newBenefits[index] = e.target.value;
                        setFormData({ ...formData, benefits_receive: newBenefits });
                      }}
                      placeholder="Créditos válidos diretamente na sua conta"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newBenefits = [...formData.benefits_receive];
                        newBenefits.splice(index, 1);
                        setFormData({ ...formData, benefits_receive: newBenefits });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      security_items: [...formData.security_items, ""],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item de Segurança
                </Button>

                {formData.security_items.map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...formData.security_items];
                        newItems[index] = e.target.value;
                        setFormData({ ...formData, security_items: newItems });
                      }}
                      placeholder="Nenhum dado sensível é solicitado"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newItems = [...formData.security_items];
                        newItems.splice(index, 1);
                        setFormData({ ...formData, security_items: newItems });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ (Perguntas Frequentes)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      faq_items: [...formData.faq_items, { question: "", answer: "" }],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Pergunta
                </Button>

                {formData.faq_items.map((faq: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Pergunta {index + 1}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newFaqs = [...formData.faq_items];
                            newFaqs.splice(index, 1);
                            setFormData({ ...formData, faq_items: newFaqs });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Pergunta</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...formData.faq_items];
                            newFaqs[index] = { ...faq, question: e.target.value };
                            setFormData({ ...formData, faq_items: newFaqs });
                          }}
                          placeholder="Como funcionam os créditos Lovable?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Resposta</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...formData.faq_items];
                            newFaqs[index] = { ...faq, answer: e.target.value };
                            setFormData({ ...formData, faq_items: newFaqs });
                          }}
                          placeholder="Os créditos são adicionados diretamente na sua conta..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Depoimentos de Clientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      testimonials: [
                        ...formData.testimonials,
                        { name: "", role: "", content: "", rating: 5 },
                      ],
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Depoimento
                </Button>

                {formData.testimonials.map((testimonial: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Depoimento {index + 1}</h4>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials.splice(index, 1);
                            setFormData({ ...formData, testimonials: newTestimonials });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) => {
                              const newTestimonials = [...formData.testimonials];
                              newTestimonials[index] = { ...testimonial, name: e.target.value };
                              setFormData({ ...formData, testimonials: newTestimonials });
                            }}
                            placeholder="Carlos Silva"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Cargo/Função</Label>
                          <Input
                            value={testimonial.role}
                            onChange={(e) => {
                              const newTestimonials = [...formData.testimonials];
                              newTestimonials[index] = { ...testimonial, role: e.target.value };
                              setFormData({ ...formData, testimonials: newTestimonials });
                            }}
                            placeholder="Desenvolvedor Freelancer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Depoimento</Label>
                        <Textarea
                          value={testimonial.content}
                          onChange={(e) => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials[index] = { ...testimonial, content: e.target.value };
                            setFormData({ ...formData, testimonials: newTestimonials });
                          }}
                          placeholder="Comprei os créditos e recebi na hora!"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Nota (1-5)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials[index] = {
                              ...testimonial,
                              rating: parseInt(e.target.value),
                            };
                            setFormData({ ...formData, testimonials: newTestimonials });
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Configure as meta tags para otimização em buscadores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Título SEO</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="Créditos Lovable com Desconto | Compre Agora"
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.meta_title.length}/60 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Descrição SEO</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder="Compre créditos Lovable com até 40% de desconto. Entrega rápida e segura. Suporte dedicado via WhatsApp."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.meta_description.length}/160 caracteres
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </main>

        {/* Preview Panel */}
        {showPreview && (
          <aside className="hidden lg:block lg:w-1/2 border-l border-border bg-muted/30 overflow-auto">
            <div className="sticky top-0 bg-muted/50 border-b border-border px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Preview</span>
              <span className="text-xs text-muted-foreground">/{formData.slug || "sua-url"}</span>
            </div>
            <div className="h-[calc(100vh-120px)] overflow-auto">
              <LandingPagePreview formData={formData} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default LandingPageEditor;
