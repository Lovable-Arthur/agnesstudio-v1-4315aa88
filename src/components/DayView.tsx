
import React, { useMemo, useState } from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getDisplayTimeSlots } from "@/utils/dateUtils";
import { getStatusColor, getProfessionalColor, getProfessionalInitials } from "@/utils/styleUtils";
import { Badge } from "@/components/ui/badge";
import AppointmentContextMenu from "./AppointmentContextMenu";

interface DayViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const DayView = ({ selectedDate, professionals }: DayViewProps) => {
  const displayTimeSlots = useMemo(() => getDisplayTimeSlots(30), []);
  const [savedAppointments, setSavedAppointments] = useState<{ [key: string]: Appointment[] }>({});

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string): Appointment | undefined => {
    // Primeiro, verifica os agendamentos originais do profissional
    const originalAppointment = professional.appointments.find(apt => 
      apt.date === selectedDate && apt.time === timeSlot
    );
    
    if (originalAppointment) return originalAppointment;

    // Depois, verifica os agendamentos salvos dinamicamente
    const dayKey = `${selectedDate}-${professional.id}`;
    const dayAppointments = savedAppointments[dayKey] || [];
    return dayAppointments.find(apt => apt.time === timeSlot);
  };

  const handleAddAppointment = (appointmentData: any) => {
    console.log("Novo agendamento:", appointmentData);
    
    // Criar agendamentos para cada serviço
    appointmentData.services.forEach((service: any, index: number) => {
      // Calcular duração com verificação de tipos
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
        time: service.startTime,
        duration: calculatedDuration,
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

  const renderProfessionalHeader = (professional: Professional) => (
    <div key={professional.id} className="p-3 border-r border-gray-400 last:border-r-0 text-center bg-white">
      <div className={`${professional.color} text-white p-2 rounded-lg text-sm font-medium mb-1`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">
              {getProfessionalInitials(professional.socialName || professional.name)}
            </span>
          </div>
          <span className="truncate">{professional.socialName || professional.name}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground truncate">
        {professional.specialty}
      </div>
    </div>
  );

  const getLabelColors = () => {
    const predefinedLabels = [
      { name: "Química", color: "bg-emerald-500" },
      { name: "Preferência", color: "bg-blue-500" },
      { name: "Maquiagem", color: "bg-pink-500" },
      { name: "Nova", color: "bg-purple-500" },
      { name: "Pé e Mão", color: "bg-indigo-500" }
    ];

    const labelColors = [
      "bg-emerald-500",
      "bg-blue-500", 
      "bg-purple-500",
      "bg-pink-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-teal-500"
    ];

    return { labelColors, predefinedLabels };
  };

  const renderTimeSlot = (timeSlot: string, professional: Professional) => {
    const appointment = getAppointmentForTimeSlot(professional, timeSlot);
    const { labelColors, predefinedLabels } = getLabelColors();
    
    return (
      <AppointmentContextMenu
        key={`${timeSlot}-${professional.id}`}
        timeSlot={timeSlot}
        professionalId={professional.id}
        selectedDate={selectedDate}
        onAddAppointment={handleAddAppointment}
      >
        <div 
          className={`border-r border-b border-gray-400 last:border-r-0 min-h-[60px] p-1 cursor-pointer hover:bg-gray-100 ${
            appointment ? getProfessionalColor(professional.color) : 'bg-white'
          }`}
        >
          {appointment ? (
            <div className={`h-full p-2 rounded text-xs border-2 ${getStatusColor(appointment.status)}`}>
              <div className="font-medium truncate text-white mb-1">
                {appointment.time}
              </div>
              <div className="font-semibold truncate text-white mb-1">
                {appointment.clientName}
              </div>
              <div className="text-xs opacity-90 truncate mb-2">
                {appointment.service}
              </div>
              {appointment.labels && appointment.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {appointment.labels.slice(0, 3).map((label, index) => {
                    const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
                    const color = predefinedLabel?.color || labelColors[index % labelColors.length];
                    
                    return (
                      <span
                        key={label}
                        className={`${color} text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium inline-block`}
                      >
                        {label}
                      </span>
                    );
                  })}
                  {appointment.labels.length > 3 && (
                    <span className="bg-gray-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                      +{appointment.labels.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full rounded transition-opacity flex items-center justify-center">
              {/* Célula vazia de planilha */}
            </div>
          )}
        </div>
      </AppointmentContextMenu>
    );
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header fixo com profissionais */}
      <div className="sticky top-0 bg-white border-b border-gray-400 z-20 shadow-sm">
        <div className="grid gap-0" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          <div className="p-3 border-r border-gray-400 bg-gray-100">
            <div className="text-xs text-muted-foreground font-medium">Horário</div>
          </div>
          {professionals.map(renderProfessionalHeader)}
        </div>
      </div>

      {/* Grade de horários com scroll */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-0 border-l border-gray-400" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          {displayTimeSlots.map((timeSlot) => (
            <React.Fragment key={timeSlot}>
              {/* Coluna de horário */}
              <div className="p-2 border-r border-b border-gray-400 bg-gray-100 text-center sticky left-0 z-10">
                <div className="text-xs text-muted-foreground font-medium">
                  {timeSlot}
                </div>
              </div>
              
              {/* Colunas dos profissionais */}
              {professionals.map((professional) => renderTimeSlot(timeSlot, professional))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
