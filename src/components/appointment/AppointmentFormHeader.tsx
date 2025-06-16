
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

const AppointmentFormHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Novo Agendamento
      </DialogTitle>
    </DialogHeader>
  );
};

export default AppointmentFormHeader;
