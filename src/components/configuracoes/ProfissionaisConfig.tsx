
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, Save, User } from "lucide-react";
import ProfessionalList from "./profissionais/ProfessionalList";
import ProfessionalForm from "./profissionais/ProfessionalForm";
import CollapsibleSections from "./profissionais/CollapsibleSections";

interface Professional {
  id: number;
  name: string;
  socialName: string;
  cpf: string;
  rg: string;
  birthDate: string;
  color: string;
  agendaInterval: number;
  agendaOrder: number;
  position: string;
  canBeAssistant: boolean;
  specialties: string;
  description: string;
  email: string;
  accessLevel: string;
  hasAgenda: boolean;
  showOnlineBooking: boolean;
  avatar?: string;
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['access']);

  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: 1,
      name: "Lorena da Silva Rocha",
      socialName: "Lorena",
      cpf: "170.831.567-51",
      rg: "",
      birthDate: "16/03/1993",
      color: "#74ff9b",
      agendaInterval: 10,
      agendaOrder: 9,
      position: "Freelancer",
      canBeAssistant: false,
      specialties: "",
      description: "",
      email: "Lorenaroxca@gmail.com",
      accessLevel: "Profissionais",
      hasAgenda: true,
      showOnlineBooking: true
    }
  ]);

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleUpdateProfessional = (updatedProfessional: Professional) => {
    setSelectedProfessional(updatedProfessional);
  };

  const handleSaveProfessional = () => {
    if (selectedProfessional) {
      setProfessionals(prev => 
        prev.map(p => p.id === selectedProfessional.id ? selectedProfessional : p)
      );
      toast({
        title: "Profissional atualizado",
        description: "As informações foram salvas com sucesso.",
      });
    }
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

  if (selectedProfessional) {
    return (
      <div className="h-full bg-background p-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedProfessional(null)}
            className="mb-4"
          >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Configurações
          </Button>
          <span className="text-sm text-muted-foreground">Profissionais</span>
        </div>

        <div className="space-y-6">
          <ProfessionalForm 
            professional={selectedProfessional}
            onUpdate={handleUpdateProfessional}
            onSave={handleSaveProfessional}
          />

          <CollapsibleSections 
            professional={selectedProfessional}
            onUpdate={handleUpdateProfessional}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            services={services}
            onServiceToggle={handleServiceToggle}
            onCommissionChange={handleServiceCommissionChange}
            onDurationChange={handleServiceDurationChange}
          />

          <div className="flex space-x-4">
            <Button onClick={handleSaveProfessional} className="bg-cyan-500 hover:bg-cyan-600">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
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
          onSelectProfessional={setSelectedProfessional}
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
