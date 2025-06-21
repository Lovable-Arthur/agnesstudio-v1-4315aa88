
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      allAppointments.push(...professionalAppointments);
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
    // Aqui você pode implementar a lógica para calcular o total
    // Por enquanto, vamos simular um cálculo básico
    return clientAppointments.length * 50; // Exemplo: R$ 50 por serviço
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Comanda - {clientName}</DialogTitle>
          <DialogDescription>
            Histórico de agendamentos do cliente
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            {clientAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum agendamento encontrado para este cliente.
              </div>
            ) : (
              <>
                {clientAppointments.map((appointment, index) => (
                  <Card key={`${appointment.id}-${index}`} className="w-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {appointment.service}
                        </CardTitle>
                        <Badge 
                          className={`${getStatusColor(appointment.status)} text-white`}
                        >
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Data:</span>
                          <p>{formatDate(appointment.date)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Horário:</span>
                          <p>{appointment.time}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Duração:</span>
                          <p>{appointment.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">ID:</span>
                          <p>#{appointment.id}</p>
                        </div>
                      </div>
                      
                      {appointment.labels && appointment.labels.length > 0 && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-600 text-sm">Etiquetas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {appointment.labels.map((label, labelIndex) => (
                              <Badge key={labelIndex} variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {appointment.observations && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-600 text-sm">Observações:</span>
                          <p className="text-sm mt-1 text-gray-700">{appointment.observations}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-gray-50 border-2 border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">Total de Agendamentos</h3>
                        <p className="text-gray-600">{clientAppointments.length} serviços realizados</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          R$ {calculateTotal().toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">Valor estimado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ClientComandaDialog;
