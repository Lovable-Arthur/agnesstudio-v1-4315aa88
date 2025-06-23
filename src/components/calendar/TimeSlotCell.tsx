
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import { useTimeSlotAppointments } from "@/hooks/useTimeSlotAppointments";
import EmptyTimeSlotCell from "./EmptyTimeSlotCell";
import ActiveAppointmentsCell from "./ActiveAppointmentsCell";

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
    activeAppointments,
    appointmentsStartingHere,
    hasActiveAppointments
  } = useTimeSlotAppointments(appointments, timeSlot);

  // Se não há agendamentos ativos neste slot
  if (!hasActiveAppointments) {
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

  // Há agendamentos ativos (iniciando ou em andamento) neste slot
  return (
    <ActiveAppointmentsCell
      appointments={activeAppointments}
      appointmentsStartingHere={appointmentsStartingHere}
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
