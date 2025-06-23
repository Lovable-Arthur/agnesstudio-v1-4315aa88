
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ServiceForm from "@/components/configuracoes/services/ServiceForm";
import { Service } from "@/contexts/ServicesContext";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceAdded: (service: Service) => void;
}

const AddServiceModal = ({
  isOpen,
  onClose,
  onServiceAdded
}: AddServiceModalProps) => {
  const handleSaveService = (serviceData: Omit<Service, 'id'>) => {
    // Criar o serviço com um ID temporário
    const newService: Service = {
      ...serviceData,
      id: Date.now() // ID temporário para demo
    };
    
    onServiceAdded(newService);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Serviço</DialogTitle>
        </DialogHeader>
        <ServiceForm
          service={null}
          onSave={handleSaveService}
          onBack={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
