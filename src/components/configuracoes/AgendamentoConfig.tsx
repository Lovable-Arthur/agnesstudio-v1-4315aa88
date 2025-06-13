
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

interface AgendamentoConfigProps {
  onBack: () => void;
}

const AgendamentoConfig = ({ onBack }: AgendamentoConfigProps) => {
  return (
    <div className="h-full bg-background p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Configurações
        </Button>
        <h1 className="text-2xl font-bold">Configurações de Agendamento</h1>
        <p className="text-muted-foreground">Configure as regras de agendamento do seu estabelecimento</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Horário de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Segunda a Sexta</Label>
              <div className="flex items-center space-x-2 mt-2">
                <select className="border rounded px-3 py-2">
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                </select>
                <span>às</span>
                <select className="border rounded px-3 py-2">
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Sábado</Label>
              <div className="flex items-center space-x-2 mt-2">
                <select className="border rounded px-3 py-2">
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                </select>
                <span>às</span>
                <select className="border rounded px-3 py-2">
                  <option>16:00</option>
                  <option>17:00</option>
                  <option>18:00</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regras de Agendamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Antecedência mínima para agendamento</Label>
              <RadioGroup defaultValue="30min" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15min" id="15min" />
                  <Label htmlFor="15min">15 minutos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30min" id="30min" />
                  <Label htmlFor="30min">30 minutos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1h" id="1h" />
                  <Label htmlFor="1h">1 hora</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2h" id="2h" />
                  <Label htmlFor="2h">2 horas</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Antecedência máxima para agendamento</Label>
              <RadioGroup defaultValue="30dias" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7dias" id="7dias" />
                  <Label htmlFor="7dias">7 dias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15dias" id="15dias" />
                  <Label htmlFor="15dias">15 dias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30dias" id="30dias" />
                  <Label htmlFor="30dias">30 dias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60dias" id="60dias" />
                  <Label htmlFor="60dias">60 dias</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoConfig;
