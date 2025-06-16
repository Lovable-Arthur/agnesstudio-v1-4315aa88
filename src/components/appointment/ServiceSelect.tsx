
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";

interface ServiceSelectProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  availableServices: Service[];
}

const ServiceSelect = ({
  selectedService,
  onServiceChange,
  availableServices
}: ServiceSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewService = () => {
    console.log("Adicionar novo serviço");
  };

  return (
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
  );
};

export default ServiceSelect;
