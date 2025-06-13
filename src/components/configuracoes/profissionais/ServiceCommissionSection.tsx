
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Service {
  id: number;
  name: string;
  commission: number;
  duration: number;
  selected: boolean;
}

interface ServiceCommissionSectionProps {
  services: Service[];
  onServiceToggle: (serviceId: number) => void;
  onCommissionChange: (serviceId: number, commission: number) => void;
  onDurationChange: (serviceId: number, duration: number) => void;
}

const ServiceCommissionSection = ({ 
  services, 
  onServiceToggle, 
  onCommissionChange, 
  onDurationChange 
}: ServiceCommissionSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h4 className="font-medium mb-3">Cabelo</h4>
        <div className="space-y-2">
          {services.slice(0, 4).map(service => (
            <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox 
                checked={service.selected}
                onCheckedChange={() => onServiceToggle(service.id)}
              />
              <span className="flex-1 text-sm">{service.name}</span>
              <Input 
                type="number" 
                value={service.commission} 
                onChange={(e) => onCommissionChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">%</span>
              <Input 
                type="number" 
                value={service.duration}
                onChange={(e) => onDurationChange(service.id, parseInt(e.target.value))}
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
          {services.slice(4).map(service => (
            <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox 
                checked={service.selected}
                onCheckedChange={() => onServiceToggle(service.id)}
              />
              <span className="flex-1 text-sm">{service.name}</span>
              <Input 
                type="number" 
                value={service.commission}
                onChange={(e) => onCommissionChange(service.id, parseInt(e.target.value))}
                className="w-16 h-8"
              />
              <span className="text-sm">%</span>
              <Input 
                type="number" 
                value={service.duration}
                onChange={(e) => onDurationChange(service.id, parseInt(e.target.value))}
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
