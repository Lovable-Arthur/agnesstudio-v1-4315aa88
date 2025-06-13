
import ServiceCard from "@/components/ServiceCard";
import { useServices } from "@/contexts/ServicesContext";

interface ServicesSectionProps {
  onServiceBook: (service: any) => void;
}

const ServicesSection = ({ onServiceBook }: ServicesSectionProps) => {
  const { getActiveServices } = useServices();
  const services = getActiveServices();

  // Transformar os serviços do contexto para o formato esperado pelo ServiceCard
  const transformedServices = services.map(service => ({
    id: service.id,
    name: service.name,
    price: `R$ ${service.price.toFixed(2)}`,
    duration: `${service.duration} min`,
    description: service.description
  }));

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
          {transformedServices.map((service) => (
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
