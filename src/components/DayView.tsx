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

  const getAllAppointmentsForProfessional = (professional: Professional): Appointment[] => {
    const originalAppointments = professional.appointments.filter(apt => apt.date === selectedDate);
    const dayKey = `${selectedDate}-${professional.id}`;
    const savedDayAppointments = savedAppointments[dayKey] || [];
    return [...originalAppointments, ...savedDayAppointments];
  };

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string): Appointment | undefined => {
    const allAppointments = getAllAppointmentsForProfessional(professional);
    const currentSlotMinutes = convertTimeToMinutes(timeSlot);
    
    for (const apt of allAppointments) {
      const appointmentStartMinutes = convertTimeToMinutes(apt.time);
      const durationMatch = apt.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
      
      if (currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes) {
        return apt;
      }
    }
    
    return undefined;
  };

  const isAppointmentStart = (professional: Professional, timeSlot: string): boolean => {
    const allAppointments = getAllAppointmentsForProfessional(professional);
    return allAppointments.some(apt => apt.time === timeSlot);
  };

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

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header fixo com profissionais */}
      <div className="sticky top-0 bg-white border-b-2 border-gray-400 z-20 shadow-sm">
        <div 
          className="grid gap-0 border-l border-r border-gray-400" 
          style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}
        >
          <div className="p-3 border-r border-gray-400 bg-gray-100">
            <div className="text-xs text-muted-foreground font-medium">Horário</div>
          </div>
          {professionals.map((professional, index) => (
            <div 
              key={professional.id} 
              className={index < professionals.length - 1 ? 'border-r-2 border-r-gray-400' : ''}
            >
              <ProfessionalHeader professional={professional} />
            </div>
          ))}
        </div>
      </div>

      {/* Grade de horários com scroll */}
      <div className="flex-1 overflow-auto">
        <div 
          className="grid gap-0 border-l border-r border-gray-400" 
          style={{ 
            gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)`,
            gridTemplateRows: `repeat(${displayTimeSlots.length}, 40px)`
          }}
        >
          {displayTimeSlots.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeSlot}>
              {/* Coluna de horário */}
              <div 
                className="p-2 border-r border-b-2 border-gray-400 bg-gray-100 text-center min-h-[40px] flex items-center justify-center"
                style={{ gridRow: timeIndex + 1 }}
              >
                <div className="text-xs text-muted-foreground font-medium">
                  {timeSlot}
                </div>
              </div>
              
              {/* Colunas dos profissionais */}
              {professionals.map((professional, professionalIndex) => {
                const appointment = getAppointmentForTimeSlot(professional, timeSlot);
                const isStart = isAppointmentStart(professional, timeSlot);
                
                // Só renderizar se não há agendamento ou se é o início do agendamento
                if (appointment && !isStart) {
                  return null;
                }
                
                return (
                  <div
                    key={`${timeSlot}-${professional.id}`}
                    style={{ 
                      gridColumn: professionalIndex + 2,
                      gridRow: timeIndex + 1
                    }}
                  >
                    <TimeSlotCell
                      timeSlot={timeSlot}
                      professional={professional}
                      appointment={appointment}
                      isAppointmentStart={isStart}
                      selectedDate={selectedDate}
                      onAddAppointment={handleAddAppointment}
                      professionalIndex={professionalIndex}
                      totalProfessionals={professionals.length}
                      allTimeSlots={displayTimeSlots}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
