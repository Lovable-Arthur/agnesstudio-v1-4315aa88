
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { Professional } from "@/types/calendar";

interface ProfessionalFormProps {
  professional: Professional;
  onUpdate: (professional: Professional) => void;
  onSave: () => void;
}

const ProfessionalForm = ({ professional, onUpdate, onSave }: ProfessionalFormProps) => {
  const colorOptions = [
    { value: "bg-blue-500", label: "Azul", hex: "#3b82f6" },
    { value: "bg-green-500", label: "Verde", hex: "#10b981" },
    { value: "bg-purple-500", label: "Roxo", hex: "#8b5cf6" },
    { value: "bg-orange-500", label: "Laranja", hex: "#f97316" },
    { value: "bg-pink-500", label: "Rosa", hex: "#ec4899" },
    { value: "bg-red-500", label: "Vermelho", hex: "#ef4444" },
    { value: "bg-yellow-500", label: "Amarelo", hex: "#eab308" },
    { value: "bg-indigo-500", label: "Índigo", hex: "#6366f1" },
  ];

  return (
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
                value={professional.name}
                onChange={(e) => onUpdate({...professional, name: e.target.value})}
              />
            </div>
            <div>
              <Label>Qual o CPF? (Obrigatório)</Label>
              <Input 
                value={professional.cpf}
                onChange={(e) => onUpdate({...professional, cpf: e.target.value})}
              />
            </div>
            <div>
              <Label>Definir:</Label>
              <Button variant="outline" className="w-full bg-cyan-500 text-white">
                {professional.name} como master
              </Button>
            </div>
            <div>
              <Label>Nome Social:</Label>
              <Input 
                value={professional.socialName}
                onChange={(e) => onUpdate({...professional, socialName: e.target.value})}
              />
            </div>
            <div>
              <Label>Qual o RG?</Label>
              <Input 
                value={professional.rg}
                onChange={(e) => onUpdate({...professional, rg: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={professional.hasAgenda}
                  onCheckedChange={(checked) => onUpdate({...professional, hasAgenda: !!checked})}
                />
                <Label>Este profissional possui agenda</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={professional.showOnlineBooking}
                  onCheckedChange={(checked) => onUpdate({...professional, showOnlineBooking: !!checked})}
                />
                <Label>E deve aparecer no agendamento online</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={professional.canBeAssistant}
              onCheckedChange={(checked) => onUpdate({...professional, canBeAssistant: !!checked})}
            />
            <Label>Esse profissional pode ser um assistente</Label>
          </div>
          <div>
            <Label>Qual a data de nascimento?</Label>
            <Input 
              value={professional.birthDate}
              onChange={(e) => onUpdate({...professional, birthDate: e.target.value})}
            />
          </div>
          <div>
            <Label>Cargo: (Obrigatório)</Label>
            <Select value={professional.position} onValueChange={(value) => onUpdate({...professional, position: value})}>
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
              onClick={onSave}
            >
              Ver Comissão Profissional
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div>
            <Label>Possui alguma(s) especialidade(s)?</Label>
            <Input 
              value={professional.specialties}
              onChange={(e) => onUpdate({...professional, specialties: e.target.value, specialty: e.target.value})}
            />
          </div>
          <div>
            <Label>Qual cor deverá aparecer na agenda?</Label>
            <Select value={professional.color} onValueChange={(value) => onUpdate({...professional, color: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Qual intervalo de agendamento deve aparecer na agenda?</Label>
            <Select value={professional.agendaInterval.toString()} onValueChange={(value) => onUpdate({...professional, agendaInterval: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutos</SelectItem>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Qual ordem em que deve aparecer na Agenda?</Label>
            <Input 
              type="number"
              value={professional.agendaOrder}
              onChange={(e) => onUpdate({...professional, agendaOrder: parseInt(e.target.value) || 1})}
            />
          </div>
        </div>

        <div className="mt-4">
          <Label>Escreva uma descrição sobre este profissional:</Label>
          <Textarea 
            value={professional.description}
            onChange={(e) => onUpdate({...professional, description: e.target.value})}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalForm;
