
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Service } from "@/contexts/ServicesContext";
import { Professional } from "@/types/calendar";
import ServiceSelect from "./ServiceSelect";
import ProfessionalSelect from "./ProfessionalSelect";
import TimeInput from "./TimeInput";
import PriceInput from "./PriceInput";

interface ServiceDetailsSectionProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  selectedProfessional: Professional | undefined;
  onProfessionalChange: (professionalId: number) => void;
  availableServices: Service[];
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  price: string;
  setPrice: (price: string) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  onStartTimeChange: (time: string) => void;
}

const ServiceDetailsSection = ({
  selectedService,
  onServiceChange,
  selectedProfessional,
  onProfessionalChange,
  availableServices,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  price,
  setPrice,
  duration,
  onDurationChange,
  onStartTimeChange
}: ServiceDetailsSectionProps) => {
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value) || 0;
    onDurationChange(newDuration);
  };

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg items-end">
      <ServiceSelect
        selectedService={selectedService}
        onServiceChange={onServiceChange}
        availableServices={availableServices}
      />

      <ProfessionalSelect
        selectedProfessional={selectedProfessional}
        onProfessionalChange={onProfessionalChange}
      />

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Tempo</Label>
        <div className="relative">
          <Input 
            type="number"
            value={duration || ""} 
            onChange={handleDurationChange}
            className="h-8 pr-8"
            placeholder="0"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">min</span>
        </div>
      </div>

      <TimeInput
        label="Início"
        value={startTime}
        onChange={onStartTimeChange}
      />

      <TimeInput
        label="Fim"
        value={endTime}
        onChange={setEndTime}
      />

      <PriceInput
        value={price}
        onChange={setPrice}
      />

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700 opacity-0">Ação</Label>
        <div className="h-8 flex items-center justify-center">
          <span className="text-xs text-gray-500">Principal</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsSection;
