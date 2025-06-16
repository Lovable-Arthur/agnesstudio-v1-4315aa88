
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Clock } from "lucide-react";
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

const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      options.push(`${hour}:${minute}`);
    }
  }
  return options;
};

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

  const timeOptions = generateTimeOptions();

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

  const handleTimeSelect = (time: string, field: 'start' | 'end') => {
    if (field === 'start') {
      setStartTime(time);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="space-y-2">
        <Label>Serviço</Label>
        <Select value={selectedService} onValueChange={onServiceChange}>
          <SelectTrigger>
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
                <Plus className="w-4 h-4 mr-2" />
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
        <Label>Profissional</Label>
        <Select value={selectedProfessional?.id.toString() || ""} onValueChange={handleSelectProfessional}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar Profissional" />
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
        <Label>Tempo</Label>
        <Input 
          value={selectedService ? availableServices.find(s => s.id.toString() === selectedService)?.duration + "min" : ""} 
          readOnly 
        />
      </div>

      <div className="space-y-2">
        <Label>Início</Label>
        <div className="relative">
          <Input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <Clock className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="grid grid-cols-4 gap-1 max-h-60 overflow-y-auto">
                {timeOptions.map((time) => (
                  <Button
                    key={time}
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleTimeSelect(time, 'start')}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Fim</Label>
        <div className="relative">
          <Input 
            type="time" 
            value={endTime} 
            readOnly
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <Clock className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="grid grid-cols-4 gap-1 max-h-60 overflow-y-auto">
                {timeOptions.map((time) => (
                  <Button
                    key={time}
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleTimeSelect(time, 'end')}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Valor (R$)</Label>
        <Input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ServiceDetailsSection;
