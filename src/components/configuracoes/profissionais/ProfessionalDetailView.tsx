
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Save, X } from "lucide-react";
import { Professional } from "@/types/calendar";
import ProfessionalForm from "./ProfessionalForm";
import CollapsibleSections from "./CollapsibleSections";

interface ProfessionalDetailViewProps {
  professional: Professional;
  pendingChanges: Professional;
  hasUnsavedChanges: boolean;
  onUpdate: (professional: Professional) => void;
  onSave: () => void;
  onDiscard: () => void;
  onBack: () => void;
  isInlineView?: boolean;
}

const ProfessionalDetailView = ({
  professional,
  pendingChanges,
  hasUnsavedChanges,
  onUpdate,
  onSave,
  onDiscard,
  onBack,
  isInlineView = false
}: ProfessionalDetailViewProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['access']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSaveProfessional = () => {
    onSave();
  };

  return (
    <div className={`h-full bg-background ${!isInlineView ? 'p-6' : ''}`}>
      {!isInlineView && (
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Configurações
          </Button>
          <span className="text-sm text-muted-foreground">Profissionais</span>
        </div>
      )}

      {isInlineView && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Editar Profissional</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {hasUnsavedChanges && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Você tem alterações não salvas. Clique em "Salvar Alterações" para aplicá-las ou "Descartar" para cancelá-las.
          </p>
        </div>
      )}

      <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <ProfessionalForm 
          professional={pendingChanges}
          onUpdate={onUpdate}
          onSave={handleSaveProfessional}
          isCompact={isInlineView}
        />

        <CollapsibleSections 
          professional={pendingChanges}
          onUpdate={onUpdate}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          professionalId={pendingChanges.id}
        />

        <div className="flex space-x-4 pt-4">
          <Button 
            onClick={onSave} 
            className="bg-cyan-500 hover:bg-cyan-600"
            disabled={!hasUnsavedChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
          <Button 
            variant="outline" 
            onClick={onDiscard}
            disabled={!hasUnsavedChanges}
          >
            Descartar
          </Button>
          <Button variant="destructive">Excluir</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailView;
