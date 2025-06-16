
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@/contexts/ServicesContext";
import { Professional } from "@/types/calendar";

interface ServiceDetailsSectionProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  selectedProfessional: Professional | undefined;
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
  availableServices,
  startTime,
  setStartTime,
  endTime,
  price,
  setPrice
}: ServiceDetailsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Serviço</Label>
          <Select value={selectedService} onValueChange={onServiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {availableServices.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Profissional</Label>
          <Input value={selectedProfessional?.socialName || selectedProfessional?.name || "Não encontrado"} readOnly />
        </div>

        <div className="space-y-2">
          <Label>Tempo</Label>
          <Input 
            value={selectedService ? availableServices.find(s => s.id.toString() === selectedService)?.duration + "min" : ""} 
            readOnly 
          />
        </div>

        <div className="space-y-2">
          <Label>Início</Label>
          <Input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Fim</Label>
          <Input 
            type="time" 
            value={endTime} 
            readOnly
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Valor (R$)</Label>
        <Input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          className="w-32"
        />
      </div>
    </>
  );
};

export default ServiceDetailsSection;
