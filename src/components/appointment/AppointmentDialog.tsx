
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import AppointmentFormHeader from "./AppointmentFormHeader";

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
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-4 pb-20 pr-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Novo Agendamento</h2>
                </div>
                <p className="text-sm text-muted-foreground">Preencha os dados do agendamento</p>
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
