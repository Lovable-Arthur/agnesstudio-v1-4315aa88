
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";

interface ServiceItem {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  price: string;
}

interface MultipleServicesSectionProps {
  services: ServiceItem[];
  availableServices: Service[];
  onAddService: () => void;
  onRemoveService: (serviceId: string) => void;
  canAddService: boolean;
}

const MultipleServicesSection = ({
  services,
  availableServices,
  onAddService,
  onRemoveService,
  canAddService
}: MultipleServicesSectionProps) => {
  const getServiceName = (serviceId: string) => {
    return availableServices.find(s => s.id.toString() === serviceId)?.name || "Serviço não encontrado";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Serviços Adicionados</h3>
        <Button
          onClick={onAddService}
          disabled={!canAddService}
          variant="outline"
          size="sm"
          className="text-green-600 border-green-200 hover:bg-green-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </Button>
      </div>

      {services.length > 0 && (
        <div className="space-y-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {getServiceName(service.serviceId)}
                </div>
                <div className="text-xs text-gray-500">
                  {service.startTime} - {service.endTime} | R$ {service.price}
                </div>
              </div>
              <Button
                onClick={() => onRemoveService(service.id)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {services.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          Nenhum serviço adicionado ainda
        </div>
      )}
    </div>
  );
};

export default MultipleServicesSection;
