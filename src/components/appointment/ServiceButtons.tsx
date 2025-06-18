
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ServiceButtonsProps {
  servicesCount: number;
  onAddService: () => void;
  onRemoveLastService: () => void;
  canAddService: boolean;
}

const ServiceButtons = ({
  servicesCount,
  onAddService,
  onRemoveLastService,
  canAddService
}: ServiceButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onAddService}
        variant="outline"
        size="sm"
        className="text-green-600 border-green-200 hover:bg-green-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Serviço
      </Button>
      {servicesCount > 0 && (
        <Button
          onClick={onRemoveLastService}
          variant="outline"
          size="sm"
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-2" />
          Remover Último
        </Button>
      )}
    </div>
  );
};

export default ServiceButtons;
