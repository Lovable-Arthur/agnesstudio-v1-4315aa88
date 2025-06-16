
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
  price: string;
  setPrice: (price: string) => void;
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
  price,
  setPrice
}: ServiceDetailsSectionProps) => {
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
        <Input 
          value={selectedService ? availableServices.find(s => s.id.toString() === selectedService)?.duration + "min" : ""} 
          readOnly 
          className="h-8"
        />
      </div>

      <TimeInput
        label="Início"
        value={startTime}
        onChange={setStartTime}
      />

      <TimeInput
        label="Fim"
        value={endTime}
        readOnly
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
