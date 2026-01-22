import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { OfferBanner } from "@/components/OfferBanner";
import { Hero } from "@/components/Hero";
import { PricingTable } from "@/components/PricingTable";
import { WhyBuyFromMe } from "@/components/WhyBuyFromMe";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Security } from "@/components/Security";
import { AboutMe } from "@/components/AboutMe";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTAButton } from "@/components/CTAButton";
import { ImportantNotices } from "@/components/ImportantNotices";
import { PixDonation } from "@/components/PixDonation";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-12 right-0 p-4 z-40">
        <Button onClick={() => navigate("/auth")} variant="outline">
          Login / Cadastro
        </Button>
      </header>
      <OfferBanner />
      <Hero />
      <PricingTable />
      <WhyBuyFromMe />
      <HowItWorks />
      <Benefits />
      <Security />
      <AboutMe />
      <Testimonials />
      <ImportantNotices />
      <FAQ />
      <PixDonation 
        pixKey="48996029392" 
        pixName="MARCONDES JORGE MACHADO" 
        title="Apoie meu trabalho"
      />
      <CTAButton />
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>© 2024 Créditos Lovable. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
