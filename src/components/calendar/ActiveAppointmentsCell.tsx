
import React from "react";
import { Appointment, Professional } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";

interface ActiveAppointmentsCellProps {
  appointments: Appointment[];
  appointmentsStartingHere: Appointment[];
  professional: Professional;
  timeSlot: string;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  onEditAppointment?: (appointment: Appointment) => void;
  shouldHaveRightBorder: boolean;
}

const ActiveAppointmentsCell = ({
  appointments,
  appointmentsStartingHere,
  professional,
  timeSlot,
  selectedDate,
  onAddAppointment,
  onEditAppointment,
  shouldHaveRightBorder
}: ActiveAppointmentsCellProps) => {
  // Calcular altura máxima necessária baseada nos agendamentos que iniciam aqui
  const maxHeight = appointmentsStartingHere.length > 0 ? Math.max(...appointmentsStartingHere.map(apt => {
    const durationMatch = apt.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    return Math.ceil(durationMinutes / 10) * 40;
  })) : 40;

  // Largura proporcional para cada agendamento
  const appointmentWidth = 100 / appointments.length;

  console.log(`Slot ${timeSlot}: ${appointments.length} agendamentos ativos, largura: ${appointmentWidth}%`);

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
        {appointments.map((appointment, index) => {
          const isStartingHere = appointmentsStartingHere.some(apt => apt.id === appointment.id);
          
          // Para agendamentos que iniciam aqui, calcular altura baseada na duração
          let appointmentHeight = 40;
          if (isStartingHere) {
            const durationMatch = appointment.duration.match(/(\d+)/);
            const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
            appointmentHeight = Math.ceil(durationMinutes / 10) * 40;
          }
          
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
              {isStartingHere ? (
                <AppointmentCell 
                  appointment={appointment} 
                  onEditAppointment={onEditAppointment}
                  isCompact={appointments.length > 1}
                />
              ) : (
                // Para agendamentos em andamento, apenas mostrar a cor de fundo
                <div className="h-full w-full" />
              )}
            </div>
          );
        })}
      </div>
    </AppointmentContextMenu>
  );
};

export default ActiveAppointmentsCell;
