
import { Appointment } from "@/types/calendar";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";

export const useTimeSlotAppointments = (appointments: Appointment[], timeSlot: string) => {
  const currentSlotMinutes = convertTimeToMinutes(timeSlot);
  
  // Encontrar todos os agendamentos que estão ativos neste slot (iniciando ou em andamento)
  const activeAppointments = appointments.filter(appointment => {
    const appointmentStartMinutes = convertTimeToMinutes(appointment.time);
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
    
    return currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes;
  });

  // Separar entre agendamentos que iniciam neste slot e os que estão em andamento
  const appointmentsStartingHere = activeAppointments.filter(appointment => appointment.time === timeSlot);
  const ongoingAppointments = activeAppointments.filter(appointment => appointment.time !== timeSlot);

  return {
    appointmentsStartingHere,
    ongoingAppointments,
    activeAppointments,
    hasStartingAppointments: appointmentsStartingHere.length > 0,
    hasOngoingAppointments: ongoingAppointments.length > 0,
    hasActiveAppointments: activeAppointments.length > 0,
    totalActiveAppointments: activeAppointments.length
  };
};
