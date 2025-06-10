
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Calendar, CreditCard, DollarSign, Download } from "lucide-react";

interface PaymentPeriod {
  id: string;
  startDate: string;
  endDate: string;
  status: "pending" | "processing" | "paid";
  professionals: Array<{
    id: number;
    name: string;
    totalCommission: number;
    servicesCount: number;
    status: "pending" | "paid";
  }>;
}

const professionals = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "João Oliveira" },
  { id: 4, name: "Paula Costa" },
  { id: 5, name: "Carlos Lima" }
];

const CommissionPayments = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [paymentPeriods, setPaymentPeriods] = useState<PaymentPeriod[]>([
    {
      id: "1",
      startDate: "2024-06-01",
      endDate: "2024-06-15",
      status: "paid",
      professionals: [
        { id: 1, name: "Ana Silva", totalCommission: 245.50, servicesCount: 8, status: "paid" },
        { id: 2, name: "Maria Santos", totalCommission: 180.00, servicesCount: 6, status: "paid" },
        { id: 3, name: "João Oliveira", totalCommission: 320.75, servicesCount: 10, status: "paid" }
      ]
    },
    {
      id: "2",
      startDate: "2024-06-16",
      endDate: "2024-06-30",
      status: "pending",
      professionals: [
        { id: 1, name: "Ana Silva", totalCommission: 420.00, servicesCount: 12, status: "pending" },
        { id: 2, name: "Maria Santos", totalCommission: 280.50, servicesCount: 9, status: "pending" },
        { id: 3, name: "João Oliveira", totalCommission: 180.25, servicesCount: 7, status: "pending" },
        { id: 4, name: "Paula Costa", totalCommission: 95.00, servicesCount: 4, status: "pending" }
      ]
    }
  ]);

  const handleGeneratePayment = () => {
    if (!selectedPeriod) {
      toast({
        title: "Erro",
        description: "Selecione um período para gerar o pagamento.",
        variant: "destructive"
      });
      return;
    }

    setPaymentPeriods(prev => prev.map(period => 
      period.id === selectedPeriod 
        ? { ...period, status: "processing" as const }
        : period
    ));

    toast({
      title: "Pagamento Iniciado",
      description: "O processamento dos pagamentos foi iniciado.",
    });

    // Simular processamento
    setTimeout(() => {
      setPaymentPeriods(prev => prev.map(period => 
        period.id === selectedPeriod 
          ? { 
              ...period, 
              status: "paid" as const,
              professionals: period.professionals.map(prof => ({ ...prof, status: "paid" as const }))
            }
          : period
      ));

      toast({
        title: "Pagamentos Concluídos",
        description: "Todos os pagamentos foram processados com sucesso.",
      });
    }, 3000);
  };

  const handleExportPayroll = (periodId: string) => {
    const period = paymentPeriods.find(p => p.id === periodId);
    if (!period) return;

    const csvContent = [
      "Profissional,Serviços Realizados,Total Comissão,Status",
      ...period.professionals.map(prof => 
        `${prof.name},${prof.servicesCount},${prof.totalCommission.toFixed(2)},${prof.status === "paid" ? "Pago" : "Pendente"}`
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `folha-pagamento-${period.startDate}-${period.endDate}.csv`;
    a.click();
  };

  const selectedPeriodData = paymentPeriods.find(p => p.id === selectedPeriod);
  const totalToPay = selectedPeriodData?.professionals.reduce((sum, prof) => sum + prof.totalCommission, 0) || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processando</Badge>;
      case "pending":
      default:
        return <Badge className="bg-red-100 text-red-800">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Geração de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Gerar Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Período de Pagamento</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  {paymentPeriods.map(period => (
                    <SelectItem key={period.id} value={period.id}>
                      {new Date(period.startDate).toLocaleDateString('pt-BR')} até {new Date(period.endDate).toLocaleDateString('pt-BR')} - {getStatusBadge(period.status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleGeneratePayment} 
                className="w-full"
                disabled={!selectedPeriod || selectedPeriodData?.status !== "pending"}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Processar Pagamentos
              </Button>
            </div>
          </div>

          {selectedPeriodData && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium">Resumo do Período Selecionado</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedPeriodData.startDate).toLocaleDateString('pt-BR')} até {new Date(selectedPeriodData.endDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">R$ {totalToPay.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total a pagar</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold">{selectedPeriodData.professionals.length}</p>
                  <p className="text-sm text-muted-foreground">Profissionais</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedPeriodData.professionals.reduce((sum, prof) => sum + prof.servicesCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Serviços Realizados</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    R$ {(totalToPay / selectedPeriodData.professionals.reduce((sum, prof) => sum + prof.servicesCount, 0)).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Comissão Média</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {paymentPeriods.map((period) => (
              <div key={period.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-medium">
                      {new Date(period.startDate).toLocaleDateString('pt-BR')} até {new Date(period.endDate).toLocaleDateString('pt-BR')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Total: R$ {period.professionals.reduce((sum, prof) => sum + prof.totalCommission, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(period.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportPayroll(period.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Serviços</TableHead>
                      <TableHead>Comissão Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {period.professionals.map((prof) => (
                      <TableRow key={prof.id}>
                        <TableCell className="font-medium">{prof.name}</TableCell>
                        <TableCell>{prof.servicesCount}</TableCell>
                        <TableCell>R$ {prof.totalCommission.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(prof.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionPayments;
