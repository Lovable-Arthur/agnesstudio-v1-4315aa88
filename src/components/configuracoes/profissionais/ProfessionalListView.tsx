
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import { Professional } from "@/types/calendar";
import ProfessionalList from "./ProfessionalList";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

interface ProfessionalListViewProps {
  onBack: () => void;
  onSelectProfessional: (professional: Professional) => void;
}

const ProfessionalListView = ({ onBack, onSelectProfessional }: ProfessionalListViewProps) => {
  const { professionals } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState("");

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
        <ProfessionalList 
          professionals={professionals}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectProfessional={onSelectProfessional}
        />

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profissionais</h3>
            <p className="text-muted-foreground">
              Selecione um profissional na lista ao lado para visualizar e editar suas informações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalListView;
