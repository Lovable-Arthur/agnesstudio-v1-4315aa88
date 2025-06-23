
import React from "react";
import { Professional, Appointment } from "@/types/calendar";
import TimeSlotCell from "./TimeSlotCell";

interface TimeGridProps {
  professionals: Professional[];
  displayTimeSlots: string[];
  selectedDate: string;
  getAppointmentsForTimeSlot: (professional: Professional, timeSlot: string) => Appointment[];
  onAddAppointment?: (appointmentData: any) => void;
  onEditAppointment?: (appointment: Appointment) => void;
}

const TimeGrid = ({ 
  professionals, 
  displayTimeSlots, 
  selectedDate,
  getAppointmentsForTimeSlot,
  onAddAppointment,
  onEditAppointment
}: TimeGridProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <div 
        className="grid gap-0 border-l border-r border-gray-400" 
        style={{ 
          gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)`,
          gridTemplateRows: `repeat(${displayTimeSlots.length}, 40px)`
        }}
      >
        {displayTimeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot} className="contents">
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
              const appointments = getAppointmentsForTimeSlot(professional, timeSlot);
              
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
                    appointments={appointments}
                    selectedDate={selectedDate}
                    onAddAppointment={onAddAppointment}
                    onEditAppointment={onEditAppointment}
                    professionalIndex={professionalIndex}
                    totalProfessionals={professionals.length}
                    allTimeSlots={displayTimeSlots}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGrid;
