
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
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
          <ScrollArea className="flex-1 overflow-auto">
            <div className="space-y-4 pb-20 pr-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Agendamento</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Modifique os dados do agendamento</p>
                </div>
                
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
