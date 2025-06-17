
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";

interface TimeSlotCellProps {
  timeSlot: string;
  professional: Professional;
  appointment?: Appointment;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
}

const TimeSlotCell = ({ 
  timeSlot, 
  professional, 
  appointment, 
  selectedDate, 
  onAddAppointment 
}: TimeSlotCellProps) => {
  return (
    <AppointmentContextMenu
      key={`${timeSlot}-${professional.id}`}
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-r border-b border-gray-400 last:border-r-0 min-h-[60px] p-1 cursor-pointer hover:bg-gray-100 ${
          appointment ? getProfessionalColor(professional.color) : 'bg-white'
        }`}
      >
        {appointment ? (
          <AppointmentCell appointment={appointment} />
        ) : (
          <div className="h-full rounded transition-opacity flex items-center justify-center">
            {/* Célula vazia de planilha */}
          </div>
        )}
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
