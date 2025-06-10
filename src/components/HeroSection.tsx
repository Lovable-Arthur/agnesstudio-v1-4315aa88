
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookingOpen: () => void;
}

const HeroSection = ({ onBookingOpen }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Sua Beleza é Nossa Paixão
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubra o melhor em cuidados de beleza. Profissionais qualificados, 
          ambiente acolhedor e produtos de primeira qualidade.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onBookingOpen} className="bg-primary hover:bg-primary/90">
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Agora
          </Button>
          <Button size="lg" variant="outline">
            <Phone className="w-5 h-5 mr-2" />
            (11) 99999-9999
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
