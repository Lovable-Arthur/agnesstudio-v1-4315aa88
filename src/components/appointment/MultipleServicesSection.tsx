
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ServiceItem {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  price: string;
}

interface MultipleServicesSectionProps {
  services: ServiceItem[];
  availableServices: Service[];
  onAddService: () => void;
  onRemoveService: (serviceId: string) => void;
  onRemoveLastService: () => void;
  onUpdateService: (serviceId: string, field: keyof ServiceItem, value: string) => void;
  canAddService: boolean;
}

const MultipleServicesSection = ({
  services,
  availableServices,
  onAddService,
  onRemoveService,
  onRemoveLastService,
  onUpdateService,
  canAddService
}: MultipleServicesSectionProps) => {
  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleServiceChange = (serviceId: string, selectedServiceId: string) => {
    onUpdateService(serviceId, 'serviceId', selectedServiceId);
  };

  const handleTimeChange = (serviceId: string, field: 'startTime' | 'endTime', value: string) => {
    onUpdateService(serviceId, field, value);
    
    if (field === 'startTime') {
      const service = services.find(s => s.id === serviceId);
      if (service && service.serviceId) {
        const selectedService = availableServices.find(s => s.id.toString() === service.serviceId);
        if (selectedService) {
          const startMinutes = convertTimeToMinutes(value);
          const endMinutes = startMinutes + selectedService.duration;
          const endTime = convertMinutesToTime(endMinutes);
          onUpdateService(serviceId, 'endTime', endTime);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Serviços Adicionais</h3>
        <div className="flex gap-2">
          {services.length > 0 && (
            <Button
              onClick={onRemoveLastService}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Remover Último
            </Button>
          )}
          <Button
            onClick={onAddService}
            variant="outline"
            size="sm"
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>
      </div>

      {services.length > 0 && (
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={service.id} className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Serviço</label>
                <Select 
                  value={service.serviceId} 
                  onValueChange={(value) => handleServiceChange(service.id, value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServices.map((availableService) => (
                      <SelectItem key={availableService.id} value={availableService.id.toString()}>
                        {availableService.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Tempo</label>
                <Input 
                  value={service.serviceId ? availableServices.find(s => s.id.toString() === service.serviceId)?.duration + "min" : ""} 
                  readOnly 
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Início</label>
                <Input 
                  type="time" 
                  value={service.startTime} 
                  onChange={(e) => handleTimeChange(service.id, 'startTime', e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Fim</label>
                <Input 
                  type="time" 
                  value={service.endTime} 
                  readOnly
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Valor (R$)</label>
                <Input 
                  type="number" 
                  value={service.price} 
                  onChange={(e) => onUpdateService(service.id, 'price', e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Ação</label>
                <Button
                  onClick={() => onRemoveService(service.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {services.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          Clique em "Adicionar Serviço" para incluir serviços adicionais
        </div>
      )}
    </div>
  );
};

export default MultipleServicesSection;
