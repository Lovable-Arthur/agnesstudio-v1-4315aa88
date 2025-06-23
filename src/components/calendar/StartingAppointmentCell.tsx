
import React from "react";
import { Appointment, Professional } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";
import AppointmentContextMenu from "../AppointmentContextMenu";
import AppointmentCell from "./AppointmentCell";

interface StartingAppointmentCellProps {
  appointments: Appointment[];
  professional: Professional;
  timeSlot: string;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  onEditAppointment?: (appointment: Appointment) => void;
  shouldHaveRightBorder: boolean;
}

const StartingAppointmentCell = ({
  appointments,
  professional,
  timeSlot,
  selectedDate,
  onAddAppointment,
  onEditAppointment,
  shouldHaveRightBorder
}: StartingAppointmentCellProps) => {
  // Calcular altura máxima necessária
  const maxHeight = Math.max(...appointments.map(apt => {
    const durationMatch = apt.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    return Math.ceil(durationMinutes / 10) * 40;
  }));

  // Calcular quantos agendamentos precisam ser exibidos lado a lado
  const totalAppointments = appointments.length;
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
        {appointments.map((appointment, index) => {
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

export default StartingAppointmentCell;
