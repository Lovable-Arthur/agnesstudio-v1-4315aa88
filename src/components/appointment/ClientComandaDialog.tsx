
import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { Appointment } from "@/types/calendar";
import { getStatusColor } from "@/utils/styleUtils";

interface ClientComandaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
}

const ClientComandaDialog = ({
  isOpen,
  onClose,
  clientName
}: ClientComandaDialogProps) => {
  const { professionals } = useProfessionals();

  // Buscar todos os agendamentos do cliente
  const clientAppointments = useMemo(() => {
    const allAppointments: Appointment[] = [];
    
    professionals.forEach(professional => {
      const professionalAppointments = professional.appointments.filter(
        appointment => appointment.clientName === clientName
      );
      allAppointments.push(...professionalAppointments.map(apt => ({
        ...apt,
        professionalName: professional.name
      })));
    });

    // Ordenar por data e horário
    return allAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime(); // Mais recentes primeiro
    });
  }, [professionals, clientName]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const calculateTotal = () => {
    // Simulação de cálculo - você pode implementar a lógica real aqui
    return clientAppointments.length * 50;
  };

  const getComandaNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000; // Simula um número de comanda
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] w-[95vw]">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-blue-700">
                Comanda {getComandaNumber()} - {clientName}
              </DialogTitle>
              <DialogDescription>
                Histórico completo de agendamentos do cliente
              </DialogDescription>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              ✕
            </Button>
          </div>
        </DialogHeader>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Cliente:</span>
              <p className="font-semibold">{clientName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Data da Comanda:</span>
              <p className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Nº:</span>
              <p className="font-semibold">{getComandaNumber()}</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[60vh]">
          {clientAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum agendamento encontrado para este cliente.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold">Item</TableHead>
                  <TableHead className="font-semibold">Profissional</TableHead>
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Horário</TableHead>
                  <TableHead className="font-semibold">Duração</TableHead>
                  <TableHead className="font-semibold">Valor (R$)</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientAppointments.map((appointment, index) => (
                  <TableRow key={`${appointment.id}-${index}`} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.service}</p>
                        {appointment.labels && appointment.labels.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {appointment.labels.slice(0, 2).map((label, labelIndex) => (
                              <Badge key={labelIndex} variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{appointment.professionalName || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{formatDate(appointment.date)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{appointment.time}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{appointment.duration}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">50,00</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusColor(appointment.status)} text-white text-xs`}
                      >
                        {getStatusText(appointment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-blue-600">
                          ✏️
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-red-600">
                          🗑️
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">Total de Serviços: {clientAppointments.length}</h3>
              <p className="text-sm text-gray-600">Valor total estimado</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-700">
                R$ {calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                🔄 Atualizar Comanda
              </Button>
              <Button variant="outline" size="sm">
                🖨️ Imprimir
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Confirmar
              </Button>
              <Button className="bg-red-500 hover:bg-red-600">
                Finalizar Comanda
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientComandaDialog;
