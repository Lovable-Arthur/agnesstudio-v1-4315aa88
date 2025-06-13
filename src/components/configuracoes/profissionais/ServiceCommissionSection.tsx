
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useServices } from "@/contexts/ServicesContext";

interface ServiceCommissionSectionProps {
  professionalId?: number;
}

const ServiceCommissionSection = ({ professionalId }: ServiceCommissionSectionProps) => {
  const { services, updateService } = useServices();

  const handleServiceToggle = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service && professionalId) {
      const updatedService = {
        ...service,
        allowedProfessionals: service.allowedProfessionals.includes(professionalId)
          ? service.allowedProfessionals.filter(id => id !== professionalId)
          : [...service.allowedProfessionals, professionalId]
      };
      updateService(updatedService);
    }
  };

  const handleCommissionChange = (serviceId: number, commission: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService({ ...service, commission });
    }
  };

  const handleDurationChange = (serviceId: number, duration: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService({ ...service, duration });
    }
  };

  const cabeloServices = services.filter(s => s.category === 'cabelo' && !s.isPackage);
  const manicureServices = services.filter(s => s.category === 'manicure' && !s.isPackage);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h4 className="font-medium mb-3">Cabelo</h4>
        <div className="space-y-2">
          {cabeloServices.map(service => (
            <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox 
                checked={professionalId ? service.allowedProfessionals.includes(professionalId) : false}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <span className="flex-1 text-sm">{service.name}</span>
              <Input 
                type="number" 
                value={service.commission} 
                onChange={(e) => handleCommissionChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">%</span>
              <Input 
                type="number" 
                value={service.duration}
                onChange={(e) => handleDurationChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">min</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-3">Manicure e Pedicure</h4>
        <div className="space-y-2">
          {manicureServices.map(service => (
            <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox 
                checked={professionalId ? service.allowedProfessionals.includes(professionalId) : false}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <span className="flex-1 text-sm">{service.name}</span>
              <Input 
                type="number" 
                value={service.commission}
                onChange={(e) => handleCommissionChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">%</span>
              <Input 
                type="number" 
                value={service.duration}
                onChange={(e) => handleDurationChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCommissionSection;
