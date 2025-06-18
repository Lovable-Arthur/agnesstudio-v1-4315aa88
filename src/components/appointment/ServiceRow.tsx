
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";
import { useServices } from "@/contexts/ServicesContext";
import ServiceSelect from "./ServiceSelect";
import ProfessionalSelect from "./ProfessionalSelect";
import DurationInput from "./DurationInput";
import TimeInput from "./TimeInput";
import PriceInput from "./PriceInput";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

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
  const { getServicesByProfessional } = useServices();

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

  const selectedProfessional = professionals.find(p => p.id.toString() === service.professionalId);

  // Obter os serviços filtrados para exibição usando a função do contexto
  const servicesToShow = service.professionalId 
    ? getServicesByProfessional(parseInt(service.professionalId))
    : [];

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg items-end">
      <ServiceSelect
        selectedService={service.serviceId}
        onServiceChange={handleServiceChange}
        availableServices={servicesToShow}
      />

      <ProfessionalSelect
        selectedProfessional={selectedProfessional}
        onProfessionalChange={(professionalId) => onUpdateService(service.id, 'professionalId', professionalId.toString())}
      />

      <DurationInput
        value={getCurrentDuration()}
        onChange={handleDurationChange}
      />

      <TimeInput
        label="Início"
        value={service.startTime}
        onChange={(value) => handleTimeChange('startTime', value)}
      />

      <TimeInput
        label="Fim"
        value={service.endTime}
        onChange={(value) => handleTimeChange('endTime', value)}
      />

      <PriceInput
        value={service.price}
        onChange={(value) => onUpdateService(service.id, 'price', value)}
      />

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
