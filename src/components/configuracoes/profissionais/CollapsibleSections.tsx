
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import ServiceCommissionSection from "./ServiceCommissionSection";

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

interface CollapsibleSectionsProps {
  professional: Professional;
  onUpdate: (professional: Professional) => void;
  expandedSections: string[];
  onToggleSection: (section: string) => void;
  services: Service[];
  onServiceToggle: (serviceId: number) => void;
  onCommissionChange: (serviceId: number, commission: number) => void;
  onDurationChange: (serviceId: number, duration: number) => void;
}

const CollapsibleSections = ({
  professional,
  onUpdate,
  expandedSections,
  onToggleSection,
  services,
  onServiceToggle,
  onCommissionChange,
  onDurationChange
}: CollapsibleSectionsProps) => {
  return (
    <div className="space-y-4">
      {/* Acesso */}
      <Collapsible open={expandedSections.includes('access')} onOpenChange={() => onToggleSection('access')}>
        <CollapsibleTrigger className="flex items-center space-x-2 w-full p-4 bg-gray-100 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-medium">Acesso</span>
          {expandedSections.includes('access') ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-lg bg-white">
          <div className="space-y-4">
            <div>
              <Label>Qual será o e-mail de acesso para esse profissional?</Label>
              <div className="flex space-x-2">
                <Input 
                  value={professional.email}
                  onChange={(e) => onUpdate({...professional, email: e.target.value})}
                />
                <Button variant="outline">Trocar Senha</Button>
                <Button variant="destructive">Excluir Acesso</Button>
              </div>
            </div>
            <div>
              <Label>Qual o nível de acesso desse profissional?</Label>
              <Select value={professional.accessLevel} onValueChange={(value) => onUpdate({...professional, accessLevel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Profissionais">Profissionais</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-blue-500 mt-1">Não achou o acesso ideal? Cadastre aqui!</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Serviço e Comissão */}
      <Collapsible open={expandedSections.includes('service')} onOpenChange={() => onToggleSection('service')}>
        <CollapsibleTrigger className="flex items-center space-x-2 w-full p-4 bg-gray-100 rounded-lg">
          <Scissors className="w-5 h-5" />
          <span className="font-medium">Serviço e Comissão</span>
          {expandedSections.includes('service') ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-lg bg-white">
          <ServiceCommissionSection 
            services={services}
            onServiceToggle={onServiceToggle}
            onCommissionChange={onCommissionChange}
            onDurationChange={onDurationChange}
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Outras seções */}
      {[
        { key: 'contract', icon: FileText, title: 'Regras de Contrato e Comissão' },
        { key: 'schedule', icon: Clock, title: 'Horário de Trabalho' },
        { key: 'payment', icon: CreditCard, title: 'Recebimento de Comissão (Dados Bancários ou AvecConta)' },
        { key: 'contact', icon: Phone, title: 'Contato profissional' },
        { key: 'address', icon: MapPin, title: 'Endereço' }
      ].map(section => (
        <Collapsible key={section.key} open={expandedSections.includes(section.key)} onOpenChange={() => onToggleSection(section.key)}>
          <CollapsibleTrigger className="flex items-center space-x-2 w-full p-4 bg-gray-100 rounded-lg">
            <section.icon className="w-5 h-5" />
            <span className="font-medium">{section.title}</span>
            {expandedSections.includes(section.key) ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded-lg bg-white">
            <p className="text-muted-foreground">Configurações para {section.title}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleSections;
