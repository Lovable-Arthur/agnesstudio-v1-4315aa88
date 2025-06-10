
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Pencil, Save, X } from "lucide-react";

interface Commission {
  id: string;
  professionalId: number;
  serviceId: number;
  commissionType: "percentage" | "fixed";
  value: number;
}

const professionals = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "João Oliveira" },
  { id: 4, name: "Paula Costa" },
  { id: 5, name: "Carlos Lima" }
];

const services = [
  { id: 1, name: "Corte Feminino", price: 45 },
  { id: 2, name: "Coloração", price: 120 },
  { id: 3, name: "Escova Progressiva", price: 200 },
  { id: 4, name: "Manicure", price: 25 },
  { id: 5, name: "Pedicure", price: 30 },
  { id: 6, name: "Sobrancelha", price: 20 }
];

const CommissionSettings = () => {
  const [commissions, setCommissions] = useState<Commission[]>([
    { id: "1", professionalId: 1, serviceId: 1, commissionType: "percentage", value: 40 },
    { id: "2", professionalId: 1, serviceId: 2, commissionType: "percentage", value: 35 },
    { id: "3", professionalId: 2, serviceId: 4, commissionType: "fixed", value: 15 },
    { id: "4", professionalId: 3, serviceId: 1, commissionType: "percentage", value: 45 },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCommission, setNewCommission] = useState({
    professionalId: "",
    serviceId: "",
    commissionType: "percentage" as "percentage" | "fixed",
    value: ""
  });

  const handleEdit = (commission: Commission) => {
    setEditingId(commission.id);
  };

  const handleSave = (id: string, updatedCommission: Partial<Commission>) => {
    setCommissions(prev => prev.map(c => 
      c.id === id ? { ...c, ...updatedCommission } : c
    ));
    setEditingId(null);
    toast({
      title: "Comissão atualizada",
      description: "A comissão foi atualizada com sucesso.",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAddCommission = () => {
    if (!newCommission.professionalId || !newCommission.serviceId || !newCommission.value) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const commission: Commission = {
      id: Date.now().toString(),
      professionalId: parseInt(newCommission.professionalId),
      serviceId: parseInt(newCommission.serviceId),
      commissionType: newCommission.commissionType,
      value: parseFloat(newCommission.value)
    };

    setCommissions(prev => [...prev, commission]);
    setNewCommission({
      professionalId: "",
      serviceId: "",
      commissionType: "percentage",
      value: ""
    });

    toast({
      title: "Comissão adicionada",
      description: "Nova comissão foi configurada com sucesso.",
    });
  };

  const handleDelete = (id: string) => {
    setCommissions(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Comissão removida",
      description: "A comissão foi removida com sucesso.",
    });
  };

  const getProfessionalName = (id: number) => {
    return professionals.find(p => p.id === id)?.name || "Desconhecido";
  };

  const getServiceName = (id: number) => {
    return services.find(s => s.id === id)?.name || "Desconhecido";
  };

  const getServicePrice = (id: number) => {
    return services.find(s => s.id === id)?.price || 0;
  };

  const calculateCommissionAmount = (commission: Commission) => {
    const servicePrice = getServicePrice(commission.serviceId);
    if (commission.commissionType === "percentage") {
      return (servicePrice * commission.value) / 100;
    }
    return commission.value;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Comissão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Formulário para adicionar nova comissão */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-muted/50">
              <div>
                <Label>Profissional</Label>
                <Select value={newCommission.professionalId} onValueChange={(value) => setNewCommission(prev => ({ ...prev, professionalId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionals.map(prof => (
                      <SelectItem key={prof.id} value={prof.id.toString()}>
                        {prof.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Serviço</Label>
                <Select value={newCommission.serviceId} onValueChange={(value) => setNewCommission(prev => ({ ...prev, serviceId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name} (R$ {service.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tipo</Label>
                <Select value={newCommission.commissionType} onValueChange={(value: "percentage" | "fixed") => setNewCommission(prev => ({ ...prev, commissionType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Valor</Label>
                <Input
                  type="number"
                  value={newCommission.value}
                  onChange={(e) => setNewCommission(prev => ({ ...prev, value: e.target.value }))}
                  placeholder={newCommission.commissionType === "percentage" ? "Ex: 40" : "Ex: 15.00"}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddCommission} className="w-full">
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Tabela de comissões */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Comissão (R$)</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>{getProfessionalName(commission.professionalId)}</TableCell>
                    <TableCell>{getServiceName(commission.serviceId)}</TableCell>
                    <TableCell>
                      {commission.commissionType === "percentage" ? "Porcentagem" : "Valor Fixo"}
                    </TableCell>
                    <TableCell>
                      {commission.commissionType === "percentage" 
                        ? `${commission.value}%` 
                        : `R$ ${commission.value.toFixed(2)}`
                      }
                    </TableCell>
                    <TableCell className="font-medium">
                      R$ {calculateCommissionAmount(commission).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(commission)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(commission.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionSettings;
