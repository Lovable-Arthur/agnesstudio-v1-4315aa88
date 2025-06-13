import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Search, 
  X, 
  Save,
  User,
  Lock,
  Scissors,
  DollarSign,
  FileText,
  Clock,
  CreditCard,
  MapPin,
  Phone
} from "lucide-react";

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

  const filteredProfessionals = professionals.filter(prof => 
    prof.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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
          {/* Header com foto e informações básicas */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                  <div className="absolute mt-16 text-xs text-center">
                    <div>Tamanho máximo: 4 Mb</div>
                    <button className="text-blue-500">Dúvida?</button>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <Label>Nome conforme documento: (Obrigatório)</Label>
                    <Input 
                      value={selectedProfessional.name}
                      onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                  </div>
                  <div>
                    <Label>Qual o CPF? (Obrigatório)</Label>
                    <Input 
                      value={selectedProfessional.cpf}
                      onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, cpf: e.target.value} : null)}
                    />
                  </div>
                  <div>
                    <Label>Definir:</Label>
                    <Button variant="outline" className="w-full bg-cyan-500 text-white">
                      {selectedProfessional.name} como master
                    </Button>
                  </div>
                  <div>
                    <Label>Nome Social:</Label>
                    <Input 
                      value={selectedProfessional.socialName}
                      onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, socialName: e.target.value} : null)}
                    />
                  </div>
                  <div>
                    <Label>Qual o RG?</Label>
                    <Input 
                      value={selectedProfessional.rg}
                      onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, rg: e.target.value} : null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={selectedProfessional.hasAgenda}
                        onCheckedChange={(checked) => setSelectedProfessional(prev => prev ? {...prev, hasAgenda: !!checked} : null)}
                      />
                      <Label>Este profissional possui agenda</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={selectedProfessional.showOnlineBooking}
                        onCheckedChange={(checked) => setSelectedProfessional(prev => prev ? {...prev, showOnlineBooking: !!checked} : null)}
                      />
                      <Label>E deve aparecer no agendamento online</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedProfessional.canBeAssistant}
                    onCheckedChange={(checked) => setSelectedProfessional(prev => prev ? {...prev, canBeAssistant: !!checked} : null)}
                  />
                  <Label>Esse profissional pode ser um assistente</Label>
                </div>
                <div>
                  <Label>Qual a data de nascimento?</Label>
                  <Input 
                    value={selectedProfessional.birthDate}
                    onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, birthDate: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label>Cargo: (Obrigatório)</Label>
                  <Select value={selectedProfessional.position} onValueChange={(value) => setSelectedProfessional(prev => prev ? {...prev, position: value} : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="Sócio">Sócio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-cyan-500 text-white mt-6"
                    onClick={handleSaveProfessional}
                  >
                    Ver Comissão Profissional
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <Label>Possui alguma(s) especialidade(s)?</Label>
                  <Input 
                    value={selectedProfessional.specialties}
                    onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, specialties: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label>Qual cor deverá aparecer na agenda?</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={selectedProfessional.color}
                      onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, color: e.target.value} : null)}
                    />
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: selectedProfessional.color }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Qual intervalo de agendamento deve aparecer na agenda?</Label>
                  <Select value={selectedProfessional.agendaInterval.toString()} onValueChange={(value) => setSelectedProfessional(prev => prev ? {...prev, agendaInterval: parseInt(value)} : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Qual ordem em que deve aparecer na Agenda?</Label>
                  <Input 
                    type="number"
                    value={selectedProfessional.agendaOrder}
                    onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, agendaOrder: parseInt(e.target.value)} : null)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Escreva uma descrição sobre este profissional:</Label>
                <Textarea 
                  value={selectedProfessional.description}
                  onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, description: e.target.value} : null)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seções colapsáveis */}
          <div className="space-y-4">
            {/* Acesso */}
            <Collapsible open={expandedSections.includes('access')} onOpenChange={() => toggleSection('access')}>
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
                        value={selectedProfessional.email}
                        onChange={(e) => setSelectedProfessional(prev => prev ? {...prev, email: e.target.value} : null)}
                      />
                      <Button variant="outline">Trocar Senha</Button>
                      <Button variant="destructive">Excluir Acesso</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Qual o nível de acesso desse profissional?</Label>
                    <Select value={selectedProfessional.accessLevel} onValueChange={(value) => setSelectedProfessional(prev => prev ? {...prev, accessLevel: value} : null)}>
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
            <Collapsible open={expandedSections.includes('service')} onOpenChange={() => toggleSection('service')}>
              <CollapsibleTrigger className="flex items-center space-x-2 w-full p-4 bg-gray-100 rounded-lg">
                <Scissors className="w-5 h-5" />
                <span className="font-medium">Serviço e Comissão</span>
                {expandedSections.includes('service') ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg bg-white">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Cabelo</h4>
                    <div className="space-y-2">
                      {services.slice(0, 4).map(service => (
                        <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox 
                            checked={service.selected}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <span className="flex-1 text-sm">{service.name}</span>
                          <Input 
                            type="number" 
                            value={service.commission} 
                            onChange={(e) => handleServiceCommissionChange(service.id, parseInt(e.target.value))}
                            className="w-16 h-8"
                          />
                          <span className="text-sm">%</span>
                          <Input 
                            type="number" 
                            value={service.duration}
                            onChange={(e) => handleServiceDurationChange(service.id, parseInt(e.target.value))}
                            className="w-16 h-8"
                          />
                          <span className="text-sm">min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Manicure e Pedicure</h4>
                    <div className="space-y-2">
                      {services.slice(4).map(service => (
                        <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox 
                            checked={service.selected}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <span className="flex-1 text-sm">{service.name}</span>
                          <Input 
                            type="number" 
                            value={service.commission}
                            onChange={(e) => handleServiceCommissionChange(service.id, parseInt(e.target.value))}
                            className="w-16 h-8"
                          />
                          <span className="text-sm">%</span>
                          <Input 
                            type="number" 
                            value={service.duration}
                            onChange={(e) => handleServiceDurationChange(service.id, parseInt(e.target.value))}
                            className="w-16 h-8"
                          />
                          <span className="text-sm">min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
              <Collapsible key={section.key} open={expandedSections.includes(section.key)} onOpenChange={() => toggleSection(section.key)}>
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
        {/* Sidebar com lista de profissionais */}
        <div className="w-80 space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Profissional
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar profissional"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Total: {professionals.length}
          </div>

          <div className="space-y-2">
            {filteredProfessionals.map((professional) => (
              <Card 
                key={professional.id} 
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedProfessional(professional)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{professional.socialName}</div>
                      <div className="text-sm text-muted-foreground">{professional.position}</div>
                    </div>
                    {professional.accessLevel === "master" && (
                      <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">MASTER</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-blue-500 text-sm cursor-pointer">
            Profissionais excluídos
          </div>
        </div>

        {/* Conteúdo principal */}
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
