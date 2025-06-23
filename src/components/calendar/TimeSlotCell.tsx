
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
  
  // Encontrar agendamentos que estão ativos neste slot
  const activeAppointments = appointments.filter(appointment => {
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  });

  // Separar agendamentos que iniciam neste slot
  const appointmentsStartingHere = activeAppointments.filter(apt => apt.time === timeSlot);
  
  // Se não há agendamentos iniciando aqui, verificar se há agendamentos em andamento
  if (appointmentsStartingHere.length === 0) {
    const hasOngoingAppointments = activeAppointments.length > 0;
    
    if (hasOngoingAppointments) {
      // Célula em andamento - renderizar continuação dos agendamentos
      return (
        <div 
          className={`border-b-2 border-b-gray-400 cursor-pointer flex ${
            shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
          }`}
          style={{
            height: '40px',
            minHeight: '40px'
          }}
        >
          {activeAppointments.map((appointment, index) => {
            const width = 100 / activeAppointments.length;
            
            return (
              <div 
                key={appointment.id}
                className={`${getProfessionalColor(professional.color)} flex-1`}
                style={{
                  width: `${width}%`,
                  height: '100%'
                }}
              >
                {/* Continuação do agendamento - sem conteúdo visual */}
              </div>
            );
          })}
        </div>
      );
    }
    
    // Célula completamente vazia
    return (
      <AppointmentContextMenu
        timeSlot={timeSlot}
        professionalId={professional.id}
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
  }

  // Detectar todos os agendamentos que se sobrepõem temporalmente
  const getAllOverlappingAppointments = () => {
    const overlapping: Appointment[] = [];
    const processed = new Set<number>();
    
    appointmentsStartingHere.forEach(startingApt => {
      if (processed.has(startingApt.id)) return;
      
      const startingAptStartMinutes = convertTimeToMinutes(startingApt.time);
      const startingDurationMatch = startingApt.duration.match(/(\d+)/);
      const startingAptDurationMinutes = startingDurationMatch ? parseInt(startingDurationMatch[1]) : 30;
      const startingAptEndMinutes = startingAptStartMinutes + startingAptDurationMinutes;
      
      // Adicionar o próprio agendamento
      overlapping.push(startingApt);
      processed.add(startingApt.id);
      
      // Procurar outros agendamentos que se sobrepõem
      appointments.forEach(otherApt => {
        if (processed.has(otherApt.id)) return;
        
        const otherStartMinutes = convertTimeToMinutes(otherApt.time);
        const otherDurationMatch = otherApt.duration.match(/(\d+)/);
        const otherDurationMinutes = otherDurationMatch ? parseInt(otherDurationMatch[1]) : 30;
        const otherEndMinutes = otherStartMinutes + otherDurationMinutes;
        
        // Verificar sobreposição temporal
        const hasOverlap = (startingAptStartMinutes < otherEndMinutes && startingAptEndMinutes > otherStartMinutes);
        
        if (hasOverlap) {
          overlapping.push(otherApt);
          processed.add(otherApt.id);
        }
      });
    });
    
    return overlapping.sort((a, b) => convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time));
  };

  const overlappingAppointments = getAllOverlappingAppointments();
  const totalOverlapping = overlappingAppointments.length;

  // Calcular altura máxima baseada nos agendamentos que iniciam aqui
  const maxRowSpan = Math.max(...appointmentsStartingHere.map(apt => {
    const durationMatch = apt.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    return Math.ceil(durationMinutes / 10);
  }));

  return (
    <AppointmentContextMenu
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 p-0 cursor-pointer hover:bg-gray-100 relative flex ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        }`}
        style={{
          height: `${maxRowSpan * 40}px`,
          minHeight: '40px',
          zIndex: 10,
          gridRowEnd: `span ${maxRowSpan}`
        }}
      >
        {appointmentsStartingHere.map((appointment, index) => {
          const durationMatch = appointment.duration.match(/(\d+)/);
          const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
          const height = Math.ceil(durationMinutes / 10) * 40;
          
          // Calcular largura proporcional baseado na sobreposição
          const width = 100 / totalOverlapping;
          const appointmentIndex = overlappingAppointments.findIndex(apt => apt.id === appointment.id);
          
          return (
            <div 
              key={appointment.id}
              className={`${getProfessionalColor(professional.color)}`}
              style={{
                width: `${width}%`,
                height: `${height}px`,
                zIndex: 10 + index,
                flexShrink: 0
              }}
            >
              <AppointmentCell 
                appointment={appointment} 
                onEditAppointment={onEditAppointment}
                isCompact={totalOverlapping > 1}
              />
            </div>
          );
        })}
        
        {/* Preencher espaço restante se necessário */}
        {appointmentsStartingHere.length < totalOverlapping && (
          <div className="flex-1" />
        )}
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
