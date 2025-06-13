
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

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

interface AccessSectionProps {
  professional: Professional;
  onUpdate: (professional: Professional) => void;
}

const AccessSection = ({ professional, onUpdate }: AccessSectionProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasAccess, setHasAccess] = useState(!!professional.email);

  const handleCreateAccess = () => {
    if (!professional.email) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setHasAccess(true);
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Acesso criado",
      description: `Acesso criado com sucesso para ${professional.email}`,
    });
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Senha alterada",
      description: "Senha alterada com sucesso.",
    });
  };

  const handleDeleteAccess = () => {
    setHasAccess(false);
    onUpdate({...professional, email: ""});
    
    toast({
      title: "Acesso excluído",
      description: "Acesso excluído com sucesso.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>E-mail de acesso:</Label>
        <Input 
          type="email"
          value={professional.email}
          onChange={(e) => onUpdate({...professional, email: e.target.value})}
          placeholder="Digite o email do profissional"
        />
      </div>

      {!hasAccess ? (
        <div className="space-y-4">
          <div>
            <Label>Senha:</Label>
            <Input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <Label>Confirmar senha:</Label>
            <Input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite a senha novamente"
            />
          </div>
          <Button onClick={handleCreateAccess} className="bg-green-600 hover:bg-green-700">
            Criar Acesso
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Acesso ativo para {professional.email}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Nova senha (deixe em branco para manter a atual):</Label>
            <Input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nova senha"
            />
            {newPassword && (
              <Input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar nova senha"
              />
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleChangePassword}>
              Trocar Senha
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccess}>
              Excluir Acesso
            </Button>
          </div>
        </div>
      )}

      <div>
        <Label>Nível de acesso:</Label>
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
        <p className="text-sm text-blue-500 mt-1">
          Profissionais têm acesso limitado apenas à Agenda e Clientes
        </p>
      </div>
    </div>
  );
};

export default AccessSection;
