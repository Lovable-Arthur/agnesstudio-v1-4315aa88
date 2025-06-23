
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
  
  // Calcular posicionamento e altura para agendamentos que iniciam aqui
  const calculateAppointmentSpans = () => {
    return appointmentsStartingHere.map(appointment => {
      const durationMatch = appointment.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const slotsOccupied = Math.ceil(durationMinutes / 10);
      return {
        appointment,
        rowSpan: slotsOccupied,
        height: slotsOccupied * 40
      };
    });
  };
  
  const appointmentSpans = calculateAppointmentSpans();
  const maxRowSpan = appointmentSpans.length > 0 ? Math.max(...appointmentSpans.map(span => span.rowSpan)) : 1;
  
  // Total de agendamentos (iniciando + em andamento)
  const totalAppointments = appointmentsStartingHere.length + appointmentsOngoing.length;
  
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
        className={`border-b-2 border-b-gray-400 p-1 cursor-pointer hover:bg-gray-100 relative ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        } ${
          appointmentsStartingHere.length > 0 ? '' : 'bg-white'
        }`}
        style={{
          height: `${maxRowSpan * 40}px`,
          minHeight: '40px',
          zIndex: appointmentsStartingHere.length > 0 ? 10 : 1,
          gridRowEnd: `span ${maxRowSpan}`
        }}
      >
        {appointmentsStartingHere.length > 0 ? (
          <div className="h-full relative flex gap-1">
            {appointmentSpans.map((span, index) => (
              <div 
                key={span.appointment.id}
                className={`flex-1 ${getProfessionalColor(professional.color)}`}
                style={{
                  height: `${span.height}px`,
                  minWidth: 0, // Permite que os itens flex encolham
                  zIndex: 10 + index
                }}
              >
                <AppointmentCell 
                  appointment={span.appointment} 
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
