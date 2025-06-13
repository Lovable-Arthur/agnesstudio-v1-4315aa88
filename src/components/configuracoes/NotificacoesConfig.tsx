
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";

interface NotificacoesConfigProps {
  onBack: () => void;
}

const NotificacoesConfig = ({ onBack }: NotificacoesConfigProps) => {
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
        <h1 className="text-2xl font-bold">Configurações de Notificações</h1>
        <p className="text-muted-foreground">Configure o disparo de SMS, e-mail e WhatsApp para os seus clientes</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notificações por E-mail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Confirmação de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar e-mail quando um agendamento for confirmado</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Lembrete de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar lembrete 24h antes do agendamento</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Cancelamento de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar e-mail quando um agendamento for cancelado</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações por SMS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Confirmação de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar SMS quando um agendamento for confirmado</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Lembrete de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar lembrete 2h antes do agendamento</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações por WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Confirmação de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar mensagem quando um agendamento for confirmado</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Lembrete de agendamento</Label>
                <p className="text-sm text-muted-foreground">Enviar lembrete 1h antes do agendamento</p>
              </div>
              <Switch defaultChecked />
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

export default NotificacoesConfig;
