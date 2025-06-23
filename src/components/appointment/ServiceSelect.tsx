
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Service, useServices } from "@/contexts/ServicesContext";
import AddServiceModal from "./AddServiceModal";

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
  const { addService } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewService = () => {
    setIsAddServiceModalOpen(true);
  };

  const handleServiceAdded = (newService: Service) => {
    // Adicionar o serviço ao contexto
    addService(newService);
    
    // Selecionar automaticamente o novo serviço
    onServiceChange(newService.id.toString());
  };

  const handleServiceSelect = (serviceId: string) => {
    console.log('ServiceSelect: Service selected:', serviceId);
    onServiceChange(serviceId);
  };

  const selectedServiceData = availableServices.find(s => s.id.toString() === selectedService);

  console.log('ServiceSelect: Rendering with', availableServices.length, 'available services');
  console.log('ServiceSelect: Selected service:', selectedService, 'found:', !!selectedServiceData);

  return (
    <>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Serviço</Label>
        <Select value={selectedService} onValueChange={handleServiceSelect}>
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
                className="w-full text-green-600 border-green-200 hover:bg-green-50"
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

      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onServiceAdded={handleServiceAdded}
      />
    </>
  );
};

export default ServiceSelect;
