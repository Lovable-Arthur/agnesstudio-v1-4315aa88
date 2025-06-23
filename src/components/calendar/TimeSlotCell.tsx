
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
  
  // Separar agendamentos que iniciam neste slot dos que apenas passam por ele
  const appointmentsStartingHere = appointments.filter(apt => apt.time === timeSlot);
  const appointmentsOngoing = appointments.filter(apt => apt.time !== timeSlot);
  
  console.log(`TimeSlotCell ${timeSlot}: ${appointmentsStartingHere.length} iniciando, ${appointmentsOngoing.length} em andamento`);
  
  // Função para calcular sobreposições entre agendamentos
  const getOverlappingAppointments = () => {
    const allAppointments = [...appointmentsStartingHere, ...appointmentsOngoing];
    const overlapping: Appointment[][] = [];
    
    allAppointments.forEach(apt => {
      const aptStartMinutes = convertTimeToMinutes(apt.time);
      const durationMatch = apt.duration.match(/(\d+)/);
      const aptDurationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const aptEndMinutes = aptStartMinutes + aptDurationMinutes;
      
      // Verificar se este agendamento se sobrepõe com o slot atual
      if (currentSlotMinutes >= aptStartMinutes && currentSlotMinutes < aptEndMinutes) {
        // Encontrar grupo de sobreposição existente ou criar novo
        let groupFound = false;
        for (let group of overlapping) {
          const hasOverlap = group.some(existingApt => {
            const existingStartMinutes = convertTimeToMinutes(existingApt.time);
            const existingDurationMatch = existingApt.duration.match(/(\d+)/);
            const existingDurationMinutes = existingDurationMatch ? parseInt(existingDurationMatch[1]) : 30;
            const existingEndMinutes = existingStartMinutes + existingDurationMinutes;
            
            return (
              (aptStartMinutes < existingEndMinutes && aptEndMinutes > existingStartMinutes)
            );
          });
          
          if (hasOverlap) {
            group.push(apt);
            groupFound = true;
            break;
          }
        }
        
        if (!groupFound) {
          overlapping.push([apt]);
        }
      }
    });
    
    return overlapping;
  };
  
  // Calcular posicionamento e altura para agendamentos
  const calculateAppointmentDisplay = () => {
    const overlappingGroups = getOverlappingAppointments();
    const displayItems: Array<{
      appointment: Appointment;
      width: number;
      height: number;
      isStartingHere: boolean;
      position: number;
    }> = [];
    
    overlappingGroups.forEach(group => {
      const groupSize = group.length;
      group.forEach((apt, index) => {
        const aptStartMinutes = convertTimeToMinutes(apt.time);
        const durationMatch = apt.duration.match(/(\d+)/);
        const aptDurationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
        const slotsOccupied = Math.ceil(aptDurationMinutes / 10);
        
        displayItems.push({
          appointment: apt,
          width: 100 / groupSize,
          height: slotsOccupied * 40,
          isStartingHere: apt.time === timeSlot,
          position: index
        });
      });
    });
    
    return displayItems;
  };
  
  const appointmentDisplay = calculateAppointmentDisplay();
  const appointmentsToShow = appointmentDisplay.filter(item => item.isStartingHere);
  const maxRowSpan = appointmentsToShow.length > 0 ? Math.max(...appointmentsToShow.map(item => Math.ceil(item.height / 40))) : 1;
  
  // Se há apenas agendamentos em andamento (não iniciando aqui), mostrar célula simplificada
  if (appointmentsToShow.length === 0 && appointmentsOngoing.length > 0) {
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
          appointmentsToShow.length > 0 ? '' : 'bg-white'
        }`}
        style={{
          height: `${maxRowSpan * 40}px`,
          minHeight: '40px',
          zIndex: appointmentsToShow.length > 0 ? 10 : 1,
          gridRowEnd: `span ${maxRowSpan}`
        }}
      >
        {appointmentsToShow.length > 0 ? (
          <div className="h-full relative">
            {appointmentsToShow.map((item, index) => (
              <div 
                key={item.appointment.id}
                className={`absolute ${getProfessionalColor(professional.color)}`}
                style={{
                  left: `${item.position * item.width}%`,
                  width: `${item.width}%`,
                  height: `${item.height}px`,
                  top: 0,
                  zIndex: 10 + index
                }}
              >
                <AppointmentCell 
                  appointment={item.appointment} 
                  onEditAppointment={onEditAppointment}
                  isCompact={appointmentsToShow.length > 1}
                />
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
