
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { useTimeSlotAppointments } from "@/hooks/useTimeSlotAppointments";
import EmptyTimeSlotCell from "./EmptyTimeSlotCell";
import OngoingAppointmentCell from "./OngoingAppointmentCell";
import StartingAppointmentCell from "./StartingAppointmentCell";

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
  
  const {
    appointmentsStartingHere,
    ongoingAppointments,
    hasStartingAppointments,
    hasOngoingAppointments
  } = useTimeSlotAppointments(appointments, timeSlot);

  // Se há agendamentos em andamento mas nenhum iniciando aqui
  if (!hasStartingAppointments && hasOngoingAppointments) {
    return (
      <OngoingAppointmentCell
        appointments={ongoingAppointments}
        professional={professional}
        shouldHaveRightBorder={shouldHaveRightBorder}
      />
    );
  }
  
  // Se não há agendamentos iniciando aqui
  if (!hasStartingAppointments) {
    return (
      <EmptyTimeSlotCell
        timeSlot={timeSlot}
        professionalId={professional.id}
        selectedDate={selectedDate}
        onAddAppointment={onAddAppointment}
        shouldHaveRightBorder={shouldHaveRightBorder}
      />
    );
  }

  // Há agendamentos iniciando neste slot
  return (
    <StartingAppointmentCell
      appointments={appointmentsStartingHere}
      professional={professional}
      timeSlot={timeSlot}
      selectedDate={selectedDate}
      onAddAppointment={onAddAppointment}
      onEditAppointment={onEditAppointment}
      shouldHaveRightBorder={shouldHaveRightBorder}
    />
  );
};

export default TimeSlotCell;
