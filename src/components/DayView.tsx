import React, { useMemo, useState } from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getDisplayTimeSlots } from "@/utils/dateUtils";
import ProfessionalHeader from "./calendar/ProfessionalHeader";
import TimeSlotCell from "./calendar/TimeSlotCell";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";

interface DayViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const DayView = ({ selectedDate, professionals }: DayViewProps) => {
  const displayTimeSlots = useMemo(() => getDisplayTimeSlots(10), []);
  const [savedAppointments, setSavedAppointments] = useState<{ [key: string]: Appointment[] }>({});

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string): Appointment | undefined => {
    // Primeiro, verifica os agendamentos originais do profissional
    const originalAppointments = professional.appointments.filter(apt => apt.date === selectedDate);
    
    // Depois, verifica os agendamentos salvos dinamicamente
    const dayKey = `${selectedDate}-${professional.id}`;
    const savedDayAppointments = savedAppointments[dayKey] || [];
    
    const allAppointments = [...originalAppointments, ...savedDayAppointments];
    
    // Encontrar o agendamento que começa neste slot ou que está em andamento
    const currentSlotMinutes = convertTimeToMinutes(timeSlot);
    
    for (const apt of allAppointments) {
      const appointmentStartMinutes = convertTimeToMinutes(apt.time);
      const durationMatch = apt.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
      
      // Se este slot está dentro do período do agendamento
      if (currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes) {
        return apt;
      }
    }
    
    return undefined;
  };

  const handleAddAppointment = (appointmentData: any) => {
    console.log("Novo agendamento:", appointmentData);
    
    // Criar agendamentos individuais para cada serviço
    appointmentData.services.forEach((service: any, index: number) => {
      // Calcular duração com base nos horários de início e fim do serviço
      let calculatedDuration = "30min"; // valor padrão
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
        time: service.startTime, // Usar o horário de início específico do serviço
        duration: calculatedDuration, // Usar a duração calculada do serviço
        status: appointmentData.status,
        date: appointmentData.date,
        labels: appointmentData.labels || [],
        observations: appointmentData.observations
      };

      // Adicionar aos agendamentos salvos do profissional correto
      const dayKey = `${appointmentData.date}-${service.professionalId}`;
      setSavedAppointments(prev => ({
        ...prev,
        [dayKey]: [...(prev[dayKey] || []), newAppointment]
      }));
    });
  };

  const renderTimeSlot = (timeSlot: string, professional: Professional, professionalIndex: number) => {
    const appointment = getAppointmentForTimeSlot(professional, timeSlot);
    
    return (
      <TimeSlotCell
        key={`${timeSlot}-${professional.id}`}
        timeSlot={timeSlot}
        professional={professional}
        appointment={appointment}
        selectedDate={selectedDate}
        onAddAppointment={handleAddAppointment}
        professionalIndex={professionalIndex}
        totalProfessionals={professionals.length}
        allTimeSlots={displayTimeSlots}
      />
    );
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header fixo com profissionais */}
      <div className="sticky top-0 bg-white border-b-2 border-gray-400 z-20 shadow-sm">
        <div className="grid gap-0 border-l border-r border-gray-400" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          <div className="p-3 border-r border-gray-400 bg-gray-100">
            <div className="text-xs text-muted-foreground font-medium">Horário</div>
          </div>
          {professionals.map((professional, index) => (
            <div key={professional.id} className={`${index < professionals.length - 1 ? 'border-r-2 border-r-gray-400' : ''}`}>
              <ProfessionalHeader professional={professional} />
            </div>
          ))}
        </div>
      </div>

      {/* Grade de horários com scroll */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-0 border-l border-r border-gray-400" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          {displayTimeSlots.map((timeSlot) => (
            <div key={timeSlot} className="contents">
              {/* Coluna de horário */}
              <div className="p-2 border-r border-b-2 border-gray-400 bg-gray-100 text-center sticky left-0 z-10">
                <div className="text-xs text-muted-foreground font-medium">
                  {timeSlot}
                </div>
              </div>
              
              {/* Colunas dos profissionais */}
              {professionals.map((professional, index) => renderTimeSlot(timeSlot, professional, index))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
