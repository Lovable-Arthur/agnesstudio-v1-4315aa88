
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AppointmentForm
          timeSlot={timeSlot}
          professionalId={professionalId}
          selectedDate={selectedDate}
          onAddAppointment={onAddAppointment}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
