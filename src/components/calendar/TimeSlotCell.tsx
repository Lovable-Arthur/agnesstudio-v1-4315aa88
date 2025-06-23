
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
  
  // Função para verificar se um agendamento está ativo neste slot
  const isAppointmentActiveInSlot = (appointment: Appointment) => {
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  };
  
  // Pegar todos os agendamentos ativos neste slot
  const activeAppointments = appointments.filter(isAppointmentActiveInSlot);
  
  // Separar agendamentos que iniciam neste slot dos que apenas passam por ele
  const appointmentsStartingHere = activeAppointments.filter(apt => apt.time === timeSlot);
  const appointmentsOngoing = activeAppointments.filter(apt => apt.time !== timeSlot);
  
  console.log(`TimeSlotCell ${timeSlot}: ${appointmentsStartingHere.length} iniciando, ${appointmentsOngoing.length} em andamento, ${activeAppointments.length} total ativos`);
  
  // Função para detectar sobreposições entre todos os agendamentos ativos
  const detectOverlappingGroups = () => {
    if (activeAppointments.length <= 1) return [activeAppointments];
    
    const groups: Appointment[][] = [];
    
    activeAppointments.forEach(appointment => {
      const aptStartMinutes = convertTimeToMinutes(appointment.time);
      const durationMatch = appointment.duration.match(/(\d+)/);
      const aptDurationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const aptEndMinutes = aptStartMinutes + aptDurationMinutes;
      
      // Procurar um grupo existente onde este agendamento se sobrepõe
      let addedToGroup = false;
      
      for (let group of groups) {
        const hasOverlap = group.some(existingApt => {
          const existingStartMinutes = convertTimeToMinutes(existingApt.time);
          const existingDurationMatch = existingApt.duration.match(/(\d+)/);
          const existingDurationMinutes = existingDurationMatch ? parseInt(existingDurationMatch[1]) : 30;
          const existingEndMinutes = existingStartMinutes + existingDurationMinutes;
          
          // Verificar se há sobreposição temporal
          return (aptStartMinutes < existingEndMinutes && aptEndMinutes > existingStartMinutes);
        });
        
        if (hasOverlap) {
          group.push(appointment);
          addedToGroup = true;
          break;
        }
      }
      
      if (!addedToGroup) {
        groups.push([appointment]);
      }
    });
    
    return groups;
  };
  
  const overlappingGroups = detectOverlappingGroups();
  
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
  
  // Calcular altura baseada no maior agendamento que inicia neste slot
  const maxRowSpan = appointmentsStartingHere.length > 0 
    ? Math.max(...appointmentsStartingHere.map(apt => {
        const durationMatch = apt.duration.match(/(\d+)/);
        const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
        return Math.ceil(durationMinutes / 10);
      }))
    : 1;
  
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
        } ${
          activeAppointments.length > 0 ? '' : 'bg-white'
        }`}
        style={{
          height: `${maxRowSpan * 40}px`,
          minHeight: '40px',
          zIndex: activeAppointments.length > 0 ? 10 : 1,
          gridRowEnd: `span ${maxRowSpan}`
        }}
      >
        {activeAppointments.length > 0 ? (
          <div className="h-full relative">
            {overlappingGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="absolute inset-0 flex">
                {group.map((appointment, index) => {
                  const durationMatch = appointment.duration.match(/(\d+)/);
                  const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
                  const height = Math.ceil(durationMinutes / 10) * 40;
                  const width = 100 / group.length;
                  const left = (index * width);
                  
                  return (
                    <div 
                      key={appointment.id}
                      className={`absolute ${getProfessionalColor(professional.color)}`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        height: `${height}px`,
                        top: 0,
                        zIndex: 10 + index
                      }}
                    >
                      <AppointmentCell 
                        appointment={appointment} 
                        onEditAppointment={onEditAppointment}
                        isCompact={group.length > 1}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
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
