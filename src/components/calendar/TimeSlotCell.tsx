
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
  
  // Separar agendamentos que iniciam neste slot dos que apenas passam por ele
  const appointmentsStartingHere = appointments.filter(apt => apt.time === timeSlot);
  const appointmentsOngoing = appointments.filter(apt => apt.time !== timeSlot);
  
  console.log(`TimeSlotCell ${timeSlot}: ${appointmentsStartingHere.length} iniciando, ${appointmentsOngoing.length} em andamento`);
  
  // Calcular rowSpan baseado nos agendamentos que iniciam aqui
  const calculateMaxRowSpan = () => {
    if (appointmentsStartingHere.length === 0) return 1;
    
    let maxSpan = 1;
    appointmentsStartingHere.forEach(appointment => {
      const durationMatch = appointment.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const slotsOccupied = Math.ceil(durationMinutes / 10);
      maxSpan = Math.max(maxSpan, slotsOccupied);
    });
    
    return maxSpan;
  };
  
  const rowSpan = calculateMaxRowSpan();
  
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
          appointmentsStartingHere.length > 0 ? getProfessionalColor(professional.color) : 'bg-white'
        }`}
        style={{
          height: `${rowSpan * 40}px`,
          minHeight: '40px',
          zIndex: appointmentsStartingHere.length > 0 ? 10 : 1,
          position: 'relative',
          gridRowEnd: `span ${rowSpan}`
        }}
      >
        {appointmentsStartingHere.length > 0 ? (
          <div className={`h-full flex gap-1`}>
            {appointmentsStartingHere.map((appointment, index) => (
              <div 
                key={appointment.id}
                className="flex-1"
                style={{ minWidth: `${100/appointmentsStartingHere.length}%` }}
              >
                <AppointmentCell 
                  appointment={appointment} 
                  onEditAppointment={onEditAppointment}
                  isCompact={appointmentsStartingHere.length > 1}
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
