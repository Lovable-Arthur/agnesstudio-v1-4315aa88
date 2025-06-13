
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, Save, User } from "lucide-react";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import ProfessionalList from "./profissionais/ProfessionalList";
import ProfessionalForm from "./profissionais/ProfessionalForm";
import CollapsibleSections from "./profissionais/CollapsibleSections";
import { Professional } from "@/types/calendar";

interface Service {
  id: number;
  name: string;
  commission: number;
  duration: number;
  selected: boolean;
}

interface ProfissionaisConfigProps {
  onBack: () => void;
}

const ProfissionaisConfig = ({ onBack }: ProfissionaisConfigProps) => {
  const { professionals, updateProfessional } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Professional | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['access']);

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Ampola Com Aplicação", commission: 0, duration: 30, selected: false },
    { id: 2, name: "Aplicação de Tratamento Trago pela cliente", commission: 0, duration: 30, selected: false },
    { id: 3, name: "Baby Liss Extra Longo", commission: 0, duration: 60, selected: false },
    { id: 4, name: "Baby Liss Longo com Mega", commission: 0, duration: 60, selected: false },
    { id: 5, name: "Banho de Gel", commission: 80, duration: 90, selected: true },
    { id: 6, name: "Esmaltação", commission: 80, duration: 30, selected: true },
    { id: 7, name: "Esmaltação gel", commission: 80, duration: 120, selected: true },
    { id: 8, name: "Mão Somente", commission: 80, duration: 60, selected: true },
    { id: 9, name: "Pé e Mão", commission: 80, duration: 90, selected: true },
  ]);

  // Atualiza o profissional selecionado quando a lista de profissionais muda
  useEffect(() => {
    if (selectedProfessional && !hasUnsavedChanges) {
      const updatedProfessional = professionals.find(p => p.id === selectedProfessional.id);
      if (updatedProfessional) {
        setSelectedProfessional(updatedProfessional);
        setPendingChanges(updatedProfessional);
      }
    }
  }, [professionals, selectedProfessional, hasUnsavedChanges]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleUpdateProfessional = (updatedProfessional: Professional) => {
    // Armazena as alterações pendentes sem aplicar imediatamente
    setPendingChanges(updatedProfessional);
    setHasUnsavedChanges(true);
  };

  const handleSaveAllChanges = () => {
    if (pendingChanges) {
      // Aplica as alterações no contexto para refletir na agenda
      updateProfessional(pendingChanges);
      setSelectedProfessional(pendingChanges);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Alterações salvas",
        description: "As informações foram atualizadas automaticamente na agenda.",
      });
    }
  };

  const handleDiscardChanges = () => {
    if (selectedProfessional) {
      setPendingChanges(selectedProfessional);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Alterações descartadas",
        description: "As alterações foram descartadas e os dados originais foram restaurados.",
      });
    }
  };

  const handleSaveProfessional = () => {
    handleSaveAllChanges();
  };

  const handleServiceToggle = (serviceId: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, selected: !s.selected } : s)
    );
  };

  const handleServiceCommissionChange = (serviceId: number, commission: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, commission } : s)
    );
  };

  const handleServiceDurationChange = (serviceId: number, duration: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, duration } : s)
    );
  };

  const handleSelectProfessional = (professional: Professional) => {
    if (hasUnsavedChanges) {
      toast({
        title: "Alterações não salvas",
        description: "Você tem alterações não salvas. Salve ou descarte antes de selecionar outro profissional.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedProfessional(professional);
    setPendingChanges(professional);
    setHasUnsavedChanges(false);
  };

  if (selectedProfessional) {
    return (
      <div className="h-full bg-background p-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              if (hasUnsavedChanges) {
                toast({
                  title: "Alterações não salvas",
                  description: "Você tem alterações não salvas. Salve ou descarte antes de voltar.",
                  variant: "destructive",
                });
                return;
              }
              setSelectedProfessional(null);
            }}
            className="mb-4"
          >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Configurações
          </Button>
          <span className="text-sm text-muted-foreground">Profissionais</span>
        </div>

        {hasUnsavedChanges && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Você tem alterações não salvas. Clique em "Salvar Alterações" para aplicá-las ou "Descartar" para cancelá-las.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <ProfessionalForm 
            professional={pendingChanges || selectedProfessional}
            onUpdate={handleUpdateProfessional}
            onSave={handleSaveProfessional}
          />

          <CollapsibleSections 
            professional={pendingChanges || selectedProfessional}
            onUpdate={handleUpdateProfessional}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            services={services}
            onServiceToggle={handleServiceToggle}
            onCommissionChange={handleServiceCommissionChange}
            onDurationChange={handleServiceDurationChange}
          />

          <div className="flex space-x-4">
            <Button 
              onClick={handleSaveAllChanges} 
              className="bg-cyan-500 hover:bg-cyan-600"
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDiscardChanges}
              disabled={!hasUnsavedChanges}
            >
              Descartar
            </Button>
            <Button variant="destructive">Excluir</Button>
          </div>
        </div>
      </div>
    );
  }

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
          onSelectProfessional={handleSelectProfessional}
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

export default ProfissionaisConfig;
