
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";

interface TimeSlotCellProps {
  timeSlot: string;
  professional: Professional;
  appointment?: Appointment;
  isAppointmentStart: boolean;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  professionalIndex?: number;
  totalProfessionals?: number;
  allTimeSlots?: string[];
}

const TimeSlotCell = ({ 
  timeSlot, 
  professional, 
  appointment, 
  isAppointmentStart,
  selectedDate, 
  onAddAppointment,
  professionalIndex = 0,
  totalProfessionals = 1,
  allTimeSlots = []
}: TimeSlotCellProps) => {
  
  const shouldHaveRightBorder = professionalIndex < totalProfessionals - 1;
  
  // Calcular altura do agendamento baseado na duração
  const calculateAppointmentHeight = () => {
    if (!appointment || !isAppointmentStart) return 40;
    
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    
    // Cada slot de 10 minutos = 40px de altura
    const slotsOccupied = Math.ceil(durationMinutes / 10);
    return slotsOccupied * 40;
  };
  
  const appointmentHeight = calculateAppointmentHeight();
  
  // Se o slot está ocupado por um agendamento em andamento (mas não é o início), não renderizar
  if (appointment && !isAppointmentStart) {
    return null;
  }
  
  return (
    <AppointmentContextMenu
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 p-1 cursor-pointer hover:bg-gray-100 ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        } ${
          appointment && isAppointmentStart ? getProfessionalColor(professional.color) : 'bg-white'
        }`}
        style={{
          height: `${appointmentHeight}px`,
          minHeight: '40px',
          zIndex: isAppointmentStart ? 10 : 1,
          position: 'relative'
        }}
      >
        {appointment && isAppointmentStart ? (
          <AppointmentCell appointment={appointment} />
        ) : (
          <div className="h-full rounded transition-opacity flex items-center justify-center border-dashed border border-gray-200">
            {/* Célula vazia */}
          </div>
        )}
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
