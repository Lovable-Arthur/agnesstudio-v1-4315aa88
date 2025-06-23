
import { Appointment } from "@/types/calendar";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";

export const useTimeSlotAppointments = (appointments: Appointment[], timeSlot: string) => {
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

  return {
    appointmentsStartingHere,
    ongoingAppointments,
    hasStartingAppointments: appointmentsStartingHere.length > 0,
    hasOngoingAppointments: ongoingAppointments.length > 0
  };
};
