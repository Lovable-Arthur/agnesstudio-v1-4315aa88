
import React from "react";
import AppointmentContextMenu from "../AppointmentContextMenu";

interface EmptyTimeSlotCellProps {
  timeSlot: string;
  professionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  shouldHaveRightBorder: boolean;
}

const EmptyTimeSlotCell = ({
  timeSlot,
  professionalId,
  selectedDate,
  onAddAppointment,
  shouldHaveRightBorder
}: EmptyTimeSlotCellProps) => {
  return (
    <AppointmentContextMenu
      timeSlot={timeSlot}
      professionalId={professionalId}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 p-1 cursor-pointer hover:bg-gray-100 bg-white ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        }`}
        style={{
          height: '40px',
          minHeight: '40px'
        }}
      >
        <div className="h-full rounded transition-opacity flex items-center justify-center border-dashed border border-gray-200">
          {/* Célula vazia */}
        </div>
      </div>
    </AppointmentContextMenu>
  );
};

export default EmptyTimeSlotCell;
