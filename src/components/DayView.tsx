
import React, { useMemo } from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getDisplayTimeSlots } from "@/utils/dateUtils";
import { getStatusColor, getProfessionalColor, getProfessionalInitials } from "@/utils/styleUtils";
import AppointmentContextMenu from "./AppointmentContextMenu";

interface DayViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const DayView = ({ selectedDate, professionals }: DayViewProps) => {
  const displayTimeSlots = useMemo(() => getDisplayTimeSlots(30), []);

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string): Appointment | undefined => {
    return professional.appointments.find(apt => 
      apt.date === selectedDate && apt.time === timeSlot
    );
  };

  const handleAddAppointment = (appointmentData: any) => {
    console.log("Novo agendamento:", appointmentData);
    // Aqui você pode implementar a lógica para adicionar o agendamento
    // Por exemplo, usando um contexto ou chamando uma API
  };

  const renderProfessionalHeader = (professional: Professional) => (
    <div key={professional.id} className="p-3 border-r last:border-r-0 text-center">
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

  const renderTimeSlot = (timeSlot: string, professional: Professional) => {
    const appointment = getAppointmentForTimeSlot(professional, timeSlot);
    
    return (
      <AppointmentContextMenu
        key={`${timeSlot}-${professional.id}`}
        timeSlot={timeSlot}
        professionalId={professional.id}
        selectedDate={selectedDate}
        onAddAppointment={handleAddAppointment}
      >
        <div 
          className={`border-r border-b last:border-r-0 min-h-[60px] p-1 cursor-pointer hover:bg-gray-50 ${getProfessionalColor(professional.color)}`}
        >
          {appointment ? (
            <div className={`h-full p-2 rounded text-xs border-2 ${getStatusColor(appointment.status)}`}>
              <div className="font-medium truncate text-white">
                {appointment.time}
              </div>
              <div className="font-semibold truncate text-white">
                {appointment.clientName}
              </div>
              <div className="text-xs opacity-90 truncate">
                {appointment.service}
              </div>
            </div>
          ) : (
            <div className="h-full rounded opacity-30 hover:opacity-50 transition-opacity">
            </div>
          )}
        </div>
      </AppointmentContextMenu>
    );
  };

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header com profissionais */}
      <div className="sticky top-0 bg-card border-b z-10">
        <div className="grid gap-0" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          <div className="p-3 border-r bg-muted">
            <div className="text-xs text-muted-foreground font-medium">Horário</div>
          </div>
          {professionals.map(renderProfessionalHeader)}
        </div>
      </div>

      {/* Grade de horários */}
      <div className="grid gap-0" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
        {displayTimeSlots.map((timeSlot) => (
          <React.Fragment key={timeSlot}>
            {/* Coluna de horário */}
            <div className="p-2 border-r border-b bg-muted text-center">
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
  );
};

export default DayView;
