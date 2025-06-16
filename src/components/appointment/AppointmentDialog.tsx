
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>
            Preencha os dados do agendamento
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[75vh] pr-4">
          <AppointmentForm
            timeSlot={timeSlot}
            professionalId={professionalId}
            selectedDate={selectedDate}
            onAddAppointment={onAddAppointment}
            onClose={onClose}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
