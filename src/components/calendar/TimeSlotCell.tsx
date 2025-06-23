
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
  
  // Encontrar agendamentos que iniciam exatamente neste slot
  const appointmentsStartingHere = appointments.filter(appointment => appointment.time === timeSlot);
  
  // Encontrar agendamentos que estão em andamento neste slot (mas não iniciaram aqui)
  const ongoingAppointments = appointments.filter(appointment => {
    if (appointment.time === timeSlot) return false; // Já considerados acima
    
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  });

  // Se há agendamentos em andamento mas nenhum iniciando aqui
  if (appointmentsStartingHere.length === 0 && ongoingAppointments.length > 0) {
    return (
      <div 
        className={`border-b-2 border-b-gray-400 cursor-pointer ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        }`}
        style={{
          height: '40px',
          minHeight: '40px',
          display: 'flex'
        }}
      >
        {ongoingAppointments.map((appointment, index) => {
          const width = 100 / ongoingAppointments.length;
          
          return (
            <div 
              key={`${appointment.id}-ongoing`}
              className={`${getProfessionalColor(professional.color)}`}
              style={{
                width: `${width}%`,
                height: '100%',
                flexShrink: 0
              }}
            >
              {/* Continuação do agendamento - sem conteúdo visual */}
            </div>
          );
        })}
      </div>
    );
  }
  
  // Se não há agendamentos iniciando aqui
  if (appointmentsStartingHere.length === 0) {
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

  // Há agendamentos iniciando neste slot
  // Calcular altura máxima necessária
  const maxHeight = Math.max(...appointmentsStartingHere.map(apt => {
    const durationMatch = apt.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    return Math.ceil(durationMinutes / 10) * 40;
  }));

  // Calcular quantos agendamentos precisam ser exibidos lado a lado
  const totalAppointments = appointmentsStartingHere.length;
  const appointmentWidth = 100 / totalAppointments;

  console.log(`Slot ${timeSlot}: ${totalAppointments} agendamentos iniciando, largura: ${appointmentWidth}%`);

  return (
    <AppointmentContextMenu
      timeSlot={timeSlot}
      professionalId={professional.id}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
    >
      <div 
        className={`border-b-2 border-b-gray-400 cursor-pointer relative ${
          shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
        }`}
        style={{
          height: `${maxHeight}px`,
          minHeight: '40px',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {appointmentsStartingHere.map((appointment, index) => {
          const durationMatch = appointment.duration.match(/(\d+)/);
          const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
          const appointmentHeight = Math.ceil(durationMinutes / 10) * 40;
          
          return (
            <div 
              key={appointment.id}
              className={`${getProfessionalColor(professional.color)}`}
              style={{
                width: `${appointmentWidth}%`,
                height: `${appointmentHeight}px`,
                flexShrink: 0,
                position: 'relative'
              }}
            >
              <AppointmentCell 
                appointment={appointment} 
                onEditAppointment={onEditAppointment}
                isCompact={totalAppointments > 1}
              />
            </div>
          );
        })}
      </div>
    </AppointmentContextMenu>
  );
};

export default TimeSlotCell;
