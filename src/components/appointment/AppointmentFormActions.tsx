
import React from "react";
import FixedFormActions from "./FixedFormActions";

interface AppointmentFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
  price: string;
}

const AppointmentFormActions = ({ onCancel, onSave, disabled, price }: AppointmentFormActionsProps) => {
  return (
    <FixedFormActions 
      onCancel={onCancel}
      onSave={onSave}
      disabled={disabled}
      price={price}
    />
  );
};

export default AppointmentFormActions;
