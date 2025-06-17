
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
  professionalIndex?: number;
  totalProfessionals?: number;
}

const TimeSlotCell = ({ 
  timeSlot, 
  professional, 
  appointment, 
  selectedDate, 
  onAddAppointment,
  professionalIndex = 0,
  totalProfessionals = 1
}: TimeSlotCellProps) => {
  // Aplicar borda direita mais forte para separar entre profissionais (exceto o último)
  const shouldHaveRightBorder = professionalIndex < totalProfessionals - 1;
  
  return (
    <AppointmentContextMenu
      key={`${timeSlot}-${professional.id}`}
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b border-gray-400 min-h-[40px] p-1 cursor-pointer hover:bg-gray-100 ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-500' : 'border-r border-gray-400'
        } ${
          appointment ? getProfessionalColor(professional.color) : 'bg-white'
        }`}
      >
        {appointment ? (
          <AppointmentCell appointment={appointment} />
        ) : (
          <div className="h-full rounded transition-opacity flex items-center justify-center border-dashed border border-gray-200">
            {/* Célula vazia de planilha com borda interna */}
          </div>
        )}
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
