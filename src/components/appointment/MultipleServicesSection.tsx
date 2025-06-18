
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

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
  const { professionals } = useProfessionals();
  const availableProfessionals = professionals.filter(prof => prof.hasAgenda);

  const handleServiceChange = (serviceId: string, selectedServiceId: string) => {
    onUpdateService(serviceId, 'serviceId', selectedServiceId);
    
    // Update price when service changes
    const service = availableServices.find(s => s.id.toString() === selectedServiceId);
    if (service) {
      onUpdateService(serviceId, 'price', service.price.toString());
      
      // Update end time based on duration if start time exists
      const serviceItem = services.find(s => s.id === serviceId);
      if (serviceItem && serviceItem.startTime) {
        const endTime = calculateServiceEndTime(serviceItem.startTime, service.duration);
        onUpdateService(serviceId, 'endTime', endTime);
      }
    }
  };

  const handleDurationChange = (serviceId: string, duration: number) => {
    console.log('Changing duration for service:', serviceId, 'to:', duration);
    const serviceItem = services.find(s => s.id === serviceId);
    if (serviceItem && serviceItem.startTime) {
      const endTime = calculateServiceEndTime(serviceItem.startTime, duration);
      console.log('Calculated end time:', endTime);
      onUpdateService(serviceId, 'endTime', endTime);
    }
  };

  const handleTimeChange = (serviceId: string, field: 'startTime' | 'endTime', value: string) => {
    onUpdateService(serviceId, field, value);
    
    if (field === 'startTime') {
      const service = services.find(s => s.id === serviceId);
      if (service && service.serviceId) {
        const selectedService = availableServices.find(s => s.id.toString() === service.serviceId);
        if (selectedService) {
          const endTime = calculateServiceEndTime(value, selectedService.duration);
          onUpdateService(serviceId, 'endTime', endTime);
        }
      }
    }
  };

  const getServicesByProfessional = (professionalId: string) => {
    if (!professionalId) return availableServices;
    return availableServices.filter(service => 
      service.allowedProfessionals.includes(Number(professionalId))
    );
  };

  const getServiceDuration = (serviceId: string) => {
    const service = availableServices.find(s => s.id.toString() === serviceId);
    return service ? service.duration : 0;
  };

  return (
    <div className="space-y-4">
      {services.length > 0 && (
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={service.id} className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg items-end">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Serviço</Label>
                <Select 
                  value={service.serviceId} 
                  onValueChange={(value) => handleServiceChange(service.id, value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {getServicesByProfessional(service.professionalId).map((availableService) => (
                      <SelectItem key={availableService.id} value={availableService.id.toString()}>
                        {availableService.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Profissional</Label>
                <Select 
                  value={service.professionalId} 
                  onValueChange={(value) => onUpdateService(service.id, 'professionalId', value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProfessionals.map((professional) => (
                      <SelectItem key={professional.id} value={professional.id.toString()}>
                        {professional.socialName || professional.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Tempo</Label>
                <div className="relative">
                  <Input 
                    type="number"
                    value={service.serviceId ? getServiceDuration(service.serviceId) : ""} 
                    onChange={(e) => {
                      const newDuration = parseInt(e.target.value) || 0;
                      console.log('Duration input changed:', newDuration);
                      handleDurationChange(service.id, newDuration);
                    }}
                    className="h-8 pr-8"
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">min</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Início</Label>
                <Input 
                  type="time" 
                  value={service.startTime} 
                  onChange={(e) => handleTimeChange(service.id, 'startTime', e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Fim</Label>
                <Input 
                  type="time" 
                  value={service.endTime} 
                  onChange={(e) => handleTimeChange(service.id, 'endTime', e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Valor (R$)</Label>
                <Input 
                  type="number" 
                  value={service.price} 
                  onChange={(e) => onUpdateService(service.id, 'price', e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="flex justify-center items-end h-full pb-1">
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

      <div className="flex gap-2">
        <Button
          onClick={onAddService}
          variant="outline"
          size="sm"
          className="text-green-600 border-green-200 hover:bg-green-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </Button>
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
      </div>
    </div>
  );
};

export default MultipleServicesSection;
