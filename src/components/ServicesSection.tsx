
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

interface ServicesSectionProps {
  onServiceBook: (service: typeof services[0]) => void;
}

const ServicesSection = ({ onServiceBook }: ServicesSectionProps) => {
  return (
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
              onBook={() => onServiceBook(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
export { services };
