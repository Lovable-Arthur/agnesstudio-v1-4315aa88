
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import EditAppointmentForm from "./EditAppointmentForm";
import ClientComandaDialog from "./ClientComandaDialog";
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
  const [comandaDialogOpen, setComandaDialogOpen] = useState(false);

  if (!appointment) return null;

  const handleOpenComanda = () => {
    setComandaDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw] flex flex-col">
          <DialogHeader>
            <DialogTitle>Agendamento</DialogTitle>
            <DialogDescription>
              Modifique os dados do agendamento
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-20">
              <div className="flex justify-end">
                <Button 
                  onClick={handleOpenComanda}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  $ Abrir Comanda
                </Button>
              </div>
              
              <EditAppointmentForm
                appointment={appointment}
                onUpdateAppointment={onUpdateAppointment}
                onClose={onClose}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <ClientComandaDialog
        isOpen={comandaDialogOpen}
        onClose={() => setComandaDialogOpen(false)}
        clientName={appointment.clientName}
      />
    </>
  );
};

export default EditAppointmentDialog;
