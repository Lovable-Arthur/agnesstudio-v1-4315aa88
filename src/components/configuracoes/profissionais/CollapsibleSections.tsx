
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronRight, 
  ChevronDown, 
  Lock,
  Scissors,
  FileText,
  Clock,
  CreditCard,
  MapPin,
  Phone
} from "lucide-react";
import AccessSection from "./AccessSection";
import ServiceCommissionSection from "./ServiceCommissionSection";
import PlaceholderSection from "./PlaceholderSection";

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

interface CollapsibleSectionsProps {
  professional: Professional;
  onUpdate: (professional: Professional) => void;
  expandedSections: string[];
  onToggleSection: (section: string) => void;
  professionalId: number;
}

const CollapsibleSections = ({
  professional,
  onUpdate,
  expandedSections,
  onToggleSection,
  professionalId
}: CollapsibleSectionsProps) => {
  const sections = [
    {
      key: 'access',
      icon: Lock,
      title: 'Acesso',
      component: <AccessSection professional={professional} onUpdate={onUpdate} />
    },
    {
      key: 'service',
      icon: Scissors,
      title: 'Serviço e Comissão',
      component: <ServiceCommissionSection professionalId={professionalId} />
    },
    {
      key: 'contract',
      icon: FileText,
      title: 'Regras de Contrato e Comissão',
      component: <PlaceholderSection title="Regras de Contrato e Comissão" />
    },
    {
      key: 'schedule',
      icon: Clock,
      title: 'Horário de Trabalho',
      component: <PlaceholderSection title="Horário de Trabalho" />
    },
    {
      key: 'payment',
      icon: CreditCard,
      title: 'Recebimento de Comissão (Dados Bancários ou AvecConta)',
      component: <PlaceholderSection title="Recebimento de Comissão (Dados Bancários ou AvecConta)" />
    },
    {
      key: 'contact',
      icon: Phone,
      title: 'Contato profissional',
      component: <PlaceholderSection title="Contato profissional" />
    },
    {
      key: 'address',
      icon: MapPin,
      title: 'Endereço',
      component: <PlaceholderSection title="Endereço" />
    }
  ];

  return (
    <div className="space-y-4">
      {sections.map(section => (
        <Collapsible 
          key={section.key} 
          open={expandedSections.includes(section.key)} 
          onOpenChange={() => onToggleSection(section.key)}
        >
          <CollapsibleTrigger className="flex items-center space-x-2 w-full p-4 bg-gray-100 rounded-lg">
            <section.icon className="w-5 h-5" />
            <span className="font-medium">{section.title}</span>
            {expandedSections.includes(section.key) ? 
              <ChevronDown className="w-4 h-4 ml-auto" /> : 
              <ChevronRight className="w-4 h-4 ml-auto" />
            }
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded-lg bg-white">
            {section.component}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleSections;
