
import { MapPin, Phone, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
