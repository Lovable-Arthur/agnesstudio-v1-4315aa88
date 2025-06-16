
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { Professional } from "@/types/calendar";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [professionalSearchTerm, setProfessionalSearchTerm] = useState("");
  const { professionals } = useProfessionals();

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableProfessionals = professionals.filter(prof => prof.hasAgenda);
  const filteredProfessionals = availableProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(professionalSearchTerm.toLowerCase()) ||
    (prof.socialName && prof.socialName.toLowerCase().includes(professionalSearchTerm.toLowerCase()))
  );

  const handleAddNewService = () => {
    console.log("Adicionar novo serviço");
  };

  const handleSelectProfessional = (professionalId: string) => {
    onProfessionalChange(Number(professionalId));
    const prof = professionals.find(p => p.id === Number(professionalId));
    if (prof) {
      setProfessionalSearchTerm(prof.socialName || prof.name);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg items-end">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Serviço</Label>
        <Select value={selectedService} onValueChange={onServiceChange}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="p-2 border-b">
              <Button
                onClick={handleAddNewService}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Adicionar Novo Serviço
              </Button>
            </div>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground text-center">
                Nenhum serviço encontrado
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Profissional</Label>
        <Select value={selectedProfessional?.id.toString() || ""} onValueChange={handleSelectProfessional}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Pesquisar profissional..."
                value={professionalSearchTerm}
                onChange={(e) => setProfessionalSearchTerm(e.target.value)}
                className="mb-2"
              />
            </div>
            {filteredProfessionals.length > 0 ? (
              filteredProfessionals.map((professional) => (
                <SelectItem key={professional.id} value={professional.id.toString()}>
                  {professional.socialName || professional.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground text-center">
                Nenhum profissional encontrado
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Tempo</Label>
        <Input 
          value={selectedService ? availableServices.find(s => s.id.toString() === selectedService)?.duration + "min" : ""} 
          readOnly 
          className="h-8"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Início</Label>
        <Input 
          type="time" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)}
          className="h-8"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Fim</Label>
        <Input 
          type="time" 
          value={endTime} 
          readOnly
          className="h-8"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Valor (R$)</Label>
        <Input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          className="h-8"
        />
      </div>

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
