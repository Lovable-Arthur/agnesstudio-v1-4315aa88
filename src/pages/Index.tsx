
import { useState } from "react";
import { Calendar, Clock, Star, Phone, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BookingModal from "@/components/BookingModal";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    id: 1,
    name: "Corte Feminino",
    price: "R$ 45,00",
    duration: "45 min",
    description: "Corte personalizado com lavagem e escovação"
  },
  {
    id: 2,
    name: "Coloração",
    price: "R$ 120,00",
    duration: "2h 30min",
    description: "Coloração completa com produtos de qualidade"
  },
  {
    id: 3,
    name: "Escova Progressiva",
    price: "R$ 200,00",
    duration: "3h",
    description: "Alisamento natural e duradouro"
  },
  {
    id: 4,
    name: "Manicure",
    price: "R$ 25,00",
    duration: "30 min",
    description: "Cuidado completo das unhas das mãos"
  },
  {
    id: 5,
    name: "Pedicure",
    price: "R$ 30,00",
    duration: "45 min",
    description: "Cuidado completo das unhas dos pés"
  },
  {
    id: 6,
    name: "Sobrancelha",
    price: "R$ 20,00",
    duration: "20 min",
    description: "Design e limpeza das sobrancelhas"
  }
];

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleBookService = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Beleza Salon</h1>
            </div>
            <Button onClick={() => setIsBookingOpen(true)} className="bg-primary hover:bg-primary/90">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
            <Button size="lg" onClick={() => setIsBookingOpen(true)} className="bg-primary hover:bg-primary/90">
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

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Nossos Serviços</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços de beleza para realçar sua natural elegância
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => handleBookService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Entre em Contato</h3>
            <p className="text-muted-foreground">Estamos aqui para cuidar da sua beleza</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rua das Flores, 123<br />
                  Centro - São Paulo/SP<br />
                  CEP: 01234-567
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  (11) 99999-9999<br />
                  (11) 3333-3333<br />
                  Segunda a Sábado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Instagram className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  @belezasalon<br />
                  Siga-nos para dicas<br />
                  e novidades
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">B</span>
            </div>
            <h4 className="text-xl font-bold">Beleza Salon</h4>
          </div>
          <p className="text-primary-foreground/80">
            © 2024 Beleza Salon. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Index;
