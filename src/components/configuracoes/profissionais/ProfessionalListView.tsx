
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import { Professional } from "@/types/calendar";
import ProfessionalList from "./ProfessionalList";
import ProfessionalDetailView from "./ProfessionalDetailView";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { usePendingChanges } from "@/hooks/usePendingChanges";

interface ProfessionalListViewProps {
  onBack: () => void;
  onSelectProfessional: (professional: Professional) => void;
}

const ProfessionalListView = ({ onBack }: ProfessionalListViewProps) => {
  const { professionals } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    selectedProfessional,
    pendingChanges,
    hasUnsavedChanges,
    handleUpdateProfessional,
    handleSaveAllChanges,
    handleDiscardChanges,
    handleSelectProfessional,
    clearSelection
  } = usePendingChanges();

  return (
    <div className="h-full bg-background p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
        Voltar para Configurações
      </Button>

      <div className="flex space-x-6 h-full">
        <div className="w-64 flex-shrink-0">
          <ProfessionalList 
            professionals={professionals}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectProfessional={handleSelectProfessional}
            selectedProfessionalId={selectedProfessional?.id}
          />
        </div>

        <div className="flex-1 min-w-0">
          {selectedProfessional && pendingChanges ? (
            <ProfessionalDetailView
              professional={selectedProfessional}
              pendingChanges={pendingChanges}
              hasUnsavedChanges={hasUnsavedChanges}
              onUpdate={handleUpdateProfessional}
              onSave={handleSaveAllChanges}
              onDiscard={handleDiscardChanges}
              onBack={clearSelection}
              isInlineView={true}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Profissionais</h3>
                <p className="text-muted-foreground">
                  Selecione um profissional na lista ao lado para visualizar e editar suas informações.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalListView;
