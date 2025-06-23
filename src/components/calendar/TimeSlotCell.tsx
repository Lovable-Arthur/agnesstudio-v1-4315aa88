
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";

interface TimeSlotCellProps {
  timeSlot: string;
  professional: Professional;
  appointments: Appointment[];
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  onEditAppointment?: (appointment: Appointment) => void;
  professionalIndex?: number;
  totalProfessionals?: number;
  allTimeSlots?: string[];
}

const TimeSlotCell = ({ 
  timeSlot, 
  professional, 
  appointments = [],
  selectedDate, 
  onAddAppointment,
  onEditAppointment,
  professionalIndex = 0,
  totalProfessionals = 1,
  allTimeSlots = []
}: TimeSlotCellProps) => {
  
  const shouldHaveRightBorder = professionalIndex < totalProfessionals - 1;
  const currentSlotMinutes = convertTimeToMinutes(timeSlot);
  
  // Apenas agendamentos que INICIAM neste slot específico
  const appointmentsStartingHere = appointments.filter(apt => apt.time === timeSlot);
  
  // Agendamentos que estão ativos neste slot (incluindo os que começaram antes)
  const isAppointmentActiveInSlot = (appointment: Appointment) => {
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  };
  
  const activeAppointments = appointments.filter(isAppointmentActiveInSlot);
  const appointmentsOngoing = activeAppointments.filter(apt => apt.time !== timeSlot);
  
  console.log(`TimeSlotCell ${timeSlot}: ${appointmentsStartingHere.length} iniciando aqui, ${appointmentsOngoing.length} em andamento`);
  
  // Se há apenas agendamentos em andamento (não iniciando aqui), mostrar célula simplificada
  if (appointmentsStartingHere.length === 0 && appointmentsOngoing.length > 0) {
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
          } ${getProfessionalColor(professional.color)} opacity-60`}
          style={{
            height: '40px',
            minHeight: '40px',
            zIndex: 5,
            position: 'relative'
          }}
        >
          <div className="h-full rounded transition-opacity flex items-center justify-center">
            <span className="text-xs text-white font-medium">Em andamento</span>
          </div>
        </div>
      </AppointmentContextMenu>
    );
  }
  
  // Se não há agendamentos iniciando aqui, retorna célula vazia
  if (appointmentsStartingHere.length === 0) {
    return (
      <AppointmentContextMenu
        timeSlot={timeSlot}
        professionalId={professional.id}
        selectedDate={selectedDate}
        onAddAppointment={onAddAppointment}
      >
        <div 
          className={`border-b-2 border-b-gray-400 p-1 cursor-pointer hover:bg-gray-100 relative ${
            shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
          } bg-white`}
          style={{
            height: '40px',
            minHeight: '40px',
            zIndex: 1
          }}
        >
          <div className="h-full rounded transition-opacity flex items-center justify-center border-dashed border border-gray-200">
            {/* Célula vazia */}
          </div>
        </div>
      </AppointmentContextMenu>
    );
  }
  
  // Função para calcular larguras dos agendamentos que se sobrepõem
  const calculateOverlappingWidths = () => {
    // Para cada agendamento que inicia aqui, verificar com quais outros se sobrepõe
    return appointmentsStartingHere.map((appointment, index) => {
      const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
      const durationMatch = appointment.duration.match(/(\d+)/);
      const appointmentDurationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const appointmentEndMinutes = appointmentStartMinutes + appointmentDurationMinutes;
      
      // Encontrar todos os agendamentos (incluindo de outros slots) que se sobrepõem com este
      const overlappingAppointments = appointments.filter(otherApt => {
        if (otherApt.id === appointment.id) return true; // incluir o próprio
        
        const otherStartMinutes = convertTimeToMinutes(otherApt.time);
        const otherDurationMatch = otherApt.duration.match(/(\d+)/);
        const otherDurationMinutes = otherDurationMatch ? parseInt(otherDurationMatch[1]) : 30;
        const otherEndMinutes = otherStartMinutes + otherDurationMinutes;
        
        // Verificar se há sobreposição temporal
        return (appointmentStartMinutes < otherEndMinutes && appointmentEndMinutes > otherStartMinutes);
      });
      
      const totalOverlapping = overlappingAppointments.length;
      const appointmentPosition = overlappingAppointments
        .sort((a, b) => convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time))
        .findIndex(apt => apt.id === appointment.id);
      
      return {
        appointment,
        width: totalOverlapping > 1 ? 100 / totalOverlapping : 100,
        left: totalOverlapping > 1 ? (appointmentPosition * (100 / totalOverlapping)) : 0,
        height: Math.ceil(appointmentDurationMinutes / 10) * 40
      };
    });
  };
  
  const appointmentLayouts = calculateOverlappingWidths();
  const maxHeight = Math.max(...appointmentLayouts.map(layout => layout.height));
  
  return (
    <AppointmentContextMenu
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 p-1 cursor-pointer hover:bg-gray-100 relative ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        }`}
        style={{
          height: `${maxHeight}px`,
          minHeight: '40px',
          zIndex: 10,
          gridRowEnd: `span ${Math.ceil(maxHeight / 40)}`
        }}
      >
        <div className="h-full relative">
          {appointmentLayouts.map((layout, index) => (
            <div 
              key={layout.appointment.id}
              className={`absolute ${getProfessionalColor(professional.color)}`}
              style={{
                left: `${layout.left}%`,
                width: `${layout.width}%`,
                height: `${layout.height}px`,
                top: 0,
                zIndex: 10 + index
              }}
            >
              <AppointmentCell 
                appointment={layout.appointment} 
                onEditAppointment={onEditAppointment}
                isCompact={appointmentLayouts.length > 1}
              />
            </div>
          ))}
        </div>
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
