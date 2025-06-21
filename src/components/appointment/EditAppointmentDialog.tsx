
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditAppointmentForm from "./EditAppointmentForm";
import { Appointment } from "@/types/calendar";

interface EditAppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateAppointment?: (appointmentData: any) => void;
}

const EditAppointmentDialog = ({
  isOpen,
  onClose,
  appointment,
  onUpdateAppointment
}: EditAppointmentDialogProps) => {
  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
          <DialogDescription>
            Modifique os dados do agendamento
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[75vh] pr-4">
          <EditAppointmentForm
            appointment={appointment}
            onUpdateAppointment={onUpdateAppointment}
            onClose={onClose}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentDialog;
