
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import AppointmentForm from "./AppointmentForm";

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  timeSlot: string;
  professionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
}

const AppointmentDialog = ({
  isOpen,
  onClose,
  timeSlot,
  professionalId,
  selectedDate,
  onAddAppointment
}: AppointmentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>
            Preencha os dados do agendamento
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 pb-20">
            <div className="flex justify-end">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                $ Abrir Comanda
              </Button>
            </div>
            
            <AppointmentForm
              timeSlot={timeSlot}
              professionalId={professionalId}
              selectedDate={selectedDate}
              onAddAppointment={onAddAppointment}
              onClose={onClose}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
