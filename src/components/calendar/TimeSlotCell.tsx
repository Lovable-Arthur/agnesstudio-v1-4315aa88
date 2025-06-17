
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";

interface TimeSlotCellProps {
  timeSlot: string;
  professional: Professional;
  appointment?: Appointment;
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
  selectedDate, 
  onAddAppointment,
  professionalIndex = 0,
  totalProfessionals = 1,
  allTimeSlots = []
}: TimeSlotCellProps) => {
  const shouldHaveRightBorder = professionalIndex < totalProfessionals - 1;
  
  // Verificar se este slot é o início de um agendamento
  const isAppointmentStart = appointment && appointment.time === timeSlot;
  
  // Calcular quantos slots o agendamento deve ocupar baseado na duração exata
  const calculateAppointmentHeight = () => {
    if (!appointment || !isAppointmentStart) return 1;
    
    // Extrair duração em minutos do campo duration
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    
    // Calcular altura baseada na duração (cada slot tem 30 minutos e 40px de altura)
    const slotsOccupied = Math.ceil(durationMinutes / 30);
    return slotsOccupied;
  };
  
  const appointmentHeight = calculateAppointmentHeight();
  
  // Se este slot não é o início do agendamento mas está ocupado por um agendamento em andamento
  const isOccupiedByOngoingAppointment = () => {
    if (!appointment || isAppointmentStart) return false;
    
    const currentSlotMinutes = convertTimeToMinutes(timeSlot);
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  };
  
  const isOccupied = isOccupiedByOngoingAppointment();
  
  // Se o slot está ocupado por um agendamento em andamento, não renderiza nada
  if (isOccupied) {
    return null;
  }
  
  return (
    <AppointmentContextMenu
      key={`${timeSlot}-${professional.id}`}
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 min-h-[40px] p-1 cursor-pointer hover:bg-gray-100 ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        } ${
          appointment && isAppointmentStart ? getProfessionalColor(professional.color) : 'bg-white'
        }`}
        style={{
          height: isAppointmentStart ? `${appointmentHeight * 40}px` : '40px',
          zIndex: isAppointmentStart ? 10 : 1,
          position: 'relative'
        }}
      >
        {appointment && isAppointmentStart ? (
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
