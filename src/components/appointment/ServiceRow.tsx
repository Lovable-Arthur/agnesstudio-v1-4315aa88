import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

interface ServiceRowProps {
  service: ServiceItem;
  availableServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onUpdateService: (serviceId: string, field: keyof ServiceItem, value: string) => void;
}

const ServiceRow = ({
  service,
  availableServices,
  onRemoveService,
  onUpdateService
}: ServiceRowProps) => {
  const { professionals } = useProfessionals();
  const availableProfessionals = professionals.filter(prof => prof.hasAgenda);

  const handleServiceChange = (selectedServiceId: string) => {
    onUpdateService(service.id, 'serviceId', selectedServiceId);
    
    // Update price when service changes
    const selectedService = availableServices.find(s => s.id.toString() === selectedServiceId);
    if (selectedService) {
      onUpdateService(service.id, 'price', selectedService.price.toString());
      
      // Update duration field with the service's default duration
      onUpdateService(service.id, 'duration', selectedService.duration.toString());
      
      // Update end time based on duration if start time exists
      if (service.startTime) {
        const endTime = calculateServiceEndTime(service.startTime, selectedService.duration);
        onUpdateService(service.id, 'endTime', endTime);
      }
    }
  };

  const handleDurationChange = (newDuration: string) => {
    const duration = parseInt(newDuration) || 0;
    console.log('Changing duration for service:', service.id, 'to:', duration);
    
    // Update duration in service state
    onUpdateService(service.id, 'duration', duration.toString());
    
    if (service.startTime && duration > 0) {
      const endTime = calculateServiceEndTime(service.startTime, duration);
      console.log('Calculated end time:', endTime);
      onUpdateService(service.id, 'endTime', endTime);
    }
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    onUpdateService(service.id, field, value);
    
    if (field === 'startTime' && service.duration) {
      const duration = parseInt(service.duration) || 0;
      if (duration > 0) {
        const endTime = calculateServiceEndTime(value, duration);
        onUpdateService(service.id, 'endTime', endTime);
      }
    }
  };

  const getServicesByProfessional = (professionalId: string) => {
    // Se não há profissional selecionado, retorna lista vazia
    if (!professionalId) return [];
    
    // Converte para número para comparação
    const profId = parseInt(professionalId);
    if (isNaN(profId)) return [];
    
    // Filtra serviços pelo profissional selecionado
    return availableServices.filter(service => 
      service.allowedProfessionals.includes(profId)
    );
  };

  const getCurrentDuration = () => {
    // Return the stored duration or the default service duration
    if (service.duration) {
      return service.duration;
    }
    
    if (service.serviceId) {
      const selectedService = availableServices.find(s => s.id.toString() === service.serviceId);
      return selectedService ? selectedService.duration.toString() : "";
    }
    
    return "";
  };

  // Obter os serviços filtrados para exibição
  const servicesToShow = getServicesByProfessional(service.professionalId);

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg items-end">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Serviço</Label>
        <Select 
          value={service.serviceId} 
          onValueChange={handleServiceChange}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            {servicesToShow.length > 0 ? (
              servicesToShow.map((availableService) => (
                <SelectItem key={availableService.id} value={availableService.id.toString()}>
                  {availableService.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground text-center">
                {service.professionalId ? "Nenhum serviço disponível para este profissional" : "Selecione um profissional primeiro"}
              </div>
            )}
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
            value={getCurrentDuration()} 
            onChange={(e) => {
              const newDuration = e.target.value;
              console.log('Duration input changed:', newDuration);
              handleDurationChange(newDuration);
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
          onChange={(e) => handleTimeChange('startTime', e.target.value)}
          className="h-8"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Fim</Label>
        <Input 
          type="time" 
          value={service.endTime} 
          onChange={(e) => handleTimeChange('endTime', e.target.value)}
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
  );
};

export default ServiceRow;
