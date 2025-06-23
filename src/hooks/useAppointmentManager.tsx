
import { useState } from "react";
import { Appointment } from "@/types/calendar";

export const useAppointmentManager = () => {
  const [savedAppointments, setSavedAppointments] = useState<{ [key: string]: Appointment[] }>({});
  const [updatedAppointments, setUpdatedAppointments] = useState<{ [key: number]: Appointment }>({});

  const handleAddAppointment = (appointmentData: any) => {
    console.log("Novo agendamento:", appointmentData);
    
    appointmentData.services.forEach((service: any, index: number) => {
      let calculatedDuration = "30min";
      if (service.startTime && service.endTime) {
        const startDate = new Date(`1970-01-01T${service.startTime}:00`);
        const endDate = new Date(`1970-01-01T${service.endTime}:00`);
        
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          const durationMs = endDate.getTime() - startDate.getTime();
          const durationMinutes = Math.round(durationMs / 60000);
          calculatedDuration = `${durationMinutes}min`;
        }
      }

      const newAppointment: Appointment = {
        id: Date.now() + index,
        clientName: appointmentData.clientName,
        service: service.name,
        time: service.startTime,
        duration: calculatedDuration,
        status: appointmentData.status,
        date: appointmentData.date,
        labels: appointmentData.labels || [],
        observations: appointmentData.observations
      };

      const dayKey = `${appointmentData.date}-${service.professionalId}`;
      setSavedAppointments(prev => ({
        ...prev,
        [dayKey]: [...(prev[dayKey] || []), newAppointment]
      }));
    });
  };

  const handleUpdateAppointment = (updatedAppointmentData: any) => {
    console.log("Agendamento atualizado:", updatedAppointmentData);
    
    // Atualizar o agendamento no estado
    setUpdatedAppointments(prev => ({
      ...prev,
      [updatedAppointmentData.id]: updatedAppointmentData
    }));
  };

  return {
    savedAppointments,
    updatedAppointments,
    handleAddAppointment,
    handleUpdateAppointment
  };
};
