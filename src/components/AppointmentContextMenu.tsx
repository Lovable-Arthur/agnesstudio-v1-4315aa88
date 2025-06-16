
import React, { useState } from "react";
import AppointmentDialog from "./appointment/AppointmentDialog";

interface AppointmentContextMenuProps {
  children: React.ReactNode;
  timeSlot: string;
  professionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
}

const AppointmentContextMenu = ({
  children,
  timeSlot,
  professionalId,
  selectedDate,
  onAddAppointment
}: AppointmentContextMenuProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div onClick={handleOpenDialog}>
        {children}
      </div>

      <AppointmentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        timeSlot={timeSlot}
        professionalId={professionalId}
        selectedDate={selectedDate}
        onAddAppointment={onAddAppointment}
      />
    </>
  );
};

export default AppointmentContextMenu;
