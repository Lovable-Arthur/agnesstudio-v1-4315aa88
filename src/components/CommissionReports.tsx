
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, DollarSign } from "lucide-react";

interface AppointmentCommission {
  id: string;
  date: string;
  professionalId: number;
  professionalName: string;
  clientName: string;
  serviceName: string;
  servicePrice: number;
  commissionType: "percentage" | "fixed";
  commissionValue: number;
  commissionAmount: number;
}

const professionals = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "João Oliveira" },
  { id: 4, name: "Paula Costa" },
  { id: 5, name: "Carlos Lima" }
];

const CommissionReports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  
  // Dados simulados de comissões de agendamentos
  const [commissionData] = useState<AppointmentCommission[]>([
    {
      id: "1",
      date: "2024-06-10",
      professionalId: 1,
      professionalName: "Ana Silva",
      clientName: "Maria João",
      serviceName: "Corte Feminino",
      servicePrice: 45,
      commissionType: "percentage",
      commissionValue: 40,
      commissionAmount: 18
    },
    {
      id: "2",
      date: "2024-06-10",
      professionalId: 1,
      professionalName: "Ana Silva",
      clientName: "Julia Santos",
      serviceName: "Coloração",
      servicePrice: 120,
      commissionType: "percentage",
      commissionValue: 35,
      commissionAmount: 42
    },
    {
      id: "3",
      date: "2024-06-09",
      professionalId: 2,
      professionalName: "Maria Santos",
      clientName: "Carlos Lima",
      serviceName: "Manicure",
      servicePrice: 25,
      commissionType: "fixed",
      commissionValue: 15,
      commissionAmount: 15
    },
    {
      id: "4",
      date: "2024-06-08",
      professionalId: 3,
      professionalName: "João Oliveira",
      clientName: "Ana Costa",
      serviceName: "Corte Feminino",
      servicePrice: 45,
      commissionType: "percentage",
      commissionValue: 45,
      commissionAmount: 20.25
    }
  ]);

  const filteredData = commissionData.filter(item => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);
    const professionalMatch = !selectedProfessional || item.professionalId.toString() === selectedProfessional;
    
    return dateMatch && professionalMatch;
  });

  const totalCommission = filteredData.reduce((sum, item) => sum + item.commissionAmount, 0);

  const commissionByProfessional = filteredData.reduce((acc, item) => {
    const existing = acc.find(p => p.id === item.professionalId);
    if (existing) {
      existing.total += item.commissionAmount;
      existing.services += 1;
    } else {
      acc.push({
        id: item.professionalId,
        name: item.professionalName,
        total: item.commissionAmount,
        services: 1
      });
    }
    return acc;
  }, [] as Array<{ id: number; name: string; total: number; services: number }>);

  const handleExport = () => {
    // Simular exportação
    const csvContent = [
      "Data,Profissional,Cliente,Serviço,Valor do Serviço,Tipo Comissão,Valor Comissão,Comissão (R$)",
      ...filteredData.map(item => 
        `${item.date},${item.professionalName},${item.clientName},${item.serviceName},${item.servicePrice},${item.commissionType === "percentage" ? "Porcentagem" : "Valor Fixo"},${item.commissionValue},${item.commissionAmount.toFixed(2)}`
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-comissoes-${startDate || "todas"}-${endDate || "datas"}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Filtros do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Data Início</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Profissional</Label>
              <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os profissionais" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os profissionais</SelectItem>
                  {professionals.map(prof => (
                    <SelectItem key={prof.id} value={prof.id.toString()}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleExport} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total de Comissões</p>
                <p className="text-2xl font-bold">R$ {totalCommission.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Serviços Realizados</p>
                <p className="text-2xl font-bold">{filteredData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold">
                  R$ {filteredData.length > 0 ? (totalCommission / filteredData.length).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo por Profissional */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo por Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead>Serviços</TableHead>
                <TableHead>Total Comissão</TableHead>
                <TableHead>Média por Serviço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionByProfessional.map((prof) => (
                <TableRow key={prof.id}>
                  <TableCell className="font-medium">{prof.name}</TableCell>
                  <TableCell>{prof.services}</TableCell>
                  <TableCell className="font-medium">R$ {prof.total.toFixed(2)}</TableCell>
                  <TableCell>R$ {(prof.total / prof.services).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detalhamento */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Comissões</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Valor Serviço</TableHead>
                <TableHead>Tipo Comissão</TableHead>
                <TableHead>Comissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{item.professionalName}</TableCell>
                  <TableCell>{item.clientName}</TableCell>
                  <TableCell>{item.serviceName}</TableCell>
                  <TableCell>R$ {item.servicePrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {item.commissionType === "percentage" 
                      ? `${item.commissionValue}%` 
                      : `R$ ${item.commissionValue.toFixed(2)}`
                    }
                  </TableCell>
                  <TableCell className="font-medium">R$ {item.commissionAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionReports;
