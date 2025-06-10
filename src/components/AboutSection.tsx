
import { Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">Sobre Nós</h3>
            <p className="text-muted-foreground mb-6">
              Com mais de 10 anos de experiência, o Beleza Salon é referência em cuidados 
              de beleza na região. Nossa equipe de profissionais altamente qualificados 
              está sempre atualizada com as últimas tendências do mercado.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Qualidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Produtos premium e técnicas modernas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Pontualidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Respeitamos seu tempo e horário
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
