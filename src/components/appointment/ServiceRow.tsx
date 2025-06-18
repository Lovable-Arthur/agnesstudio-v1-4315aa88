
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";
import { useServices } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import ServiceSelect from "./ServiceSelect";
import ProfessionalSelect from "./ProfessionalSelect";
import DurationInput from "./DurationInput";
import TimeInput from "./TimeInput";
import PriceInput from "./PriceInput";

interface ServiceRowProps {
  service: ServiceItem;
  availableServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onUpdateService: (serviceId: string, field: keyof ServiceItem, value: string) => void;
  getDurationForService?: (service: ServiceItem) => string;
}

const ServiceRow = ({
  service,
  availableServices,
  onRemoveService,
  onUpdateService,
  getDurationForService
}: ServiceRowProps) => {
  const { professionals } = useProfessionals();
  const { getServicesByProfessional } = useServices();

  const handleServiceChange = (selectedServiceId: string) => {
    onUpdateService(service.id, 'serviceId', selectedServiceId);
  };

  const handleDurationChange = (newDuration: string) => {
    const duration = parseInt(newDuration) || 0;
    console.log('Changing duration for service:', service.id, 'to:', duration);
    
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
    if (getDurationForService) {
      return getDurationForService(service);
    }
    
    console.log('Getting current duration for service:', service.id, 'stored duration:', service.duration, 'serviceId:', service.serviceId);
    
    if (service.duration) {
      return service.duration;
    }
    
    if (service.serviceId) {
      const selectedService = availableServices.find(s => s.id.toString() === service.serviceId);
      if (selectedService) {
        console.log('Using service default duration:', selectedService.duration);
        return selectedService.duration.toString();
      }
    }
    
    return "";
  };

  const selectedProfessional = professionals.find(p => p.id.toString() === service.professionalId);
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
