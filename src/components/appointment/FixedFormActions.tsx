
import React from "react";
import { Button } from "@/components/ui/button";

interface FixedFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
  price: string;
}

const FixedFormActions = ({ onCancel, onSave, disabled, price }: FixedFormActionsProps) => {
  return (
    <div className="sticky bottom-0 bg-white border-t pt-4 mt-6 z-10">
      <div className="text-right text-lg font-semibold mb-4">
        Total (R$): {price || "0,00"}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave} disabled={disabled}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default FixedFormActions;
