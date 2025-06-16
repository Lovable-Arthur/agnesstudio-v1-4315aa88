
import React from "react";
import { Button } from "@/components/ui/button";

interface AppointmentFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
  price: string;
}

const AppointmentFormActions = ({ onCancel, onSave, disabled, price }: AppointmentFormActionsProps) => {
  return (
    <>
      <div className="text-right text-lg font-semibold">
        Total (R$): {price || "0,00"}
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave} disabled={disabled}>
          Salvar
        </Button>
      </div>
    </>
  );
};

export default AppointmentFormActions;
