
import React from "react";
import { Appointment, Professional } from "@/types/calendar";
import { getProfessionalColor } from "@/utils/styleUtils";

interface OngoingAppointmentCellProps {
  appointments: Appointment[];
  professional: Professional;
  shouldHaveRightBorder: boolean;
}

const OngoingAppointmentCell = ({
  appointments,
  professional,
  shouldHaveRightBorder
}: OngoingAppointmentCellProps) => {
  return (
    <div 
      className={`border-b-2 border-b-gray-400 cursor-pointer ${
        shouldHaveRightBorder ? 'border-r-2 border-r-gray-400' : 'border-r border-gray-400'
      }`}
      style={{
        height: '40px',
        minHeight: '40px',
        display: 'flex'
      }}
    >
      {appointments.map((appointment, index) => {
        const width = 100 / appointments.length;
        
        return (
          <div 
            key={`${appointment.id}-ongoing`}
            className={`${getProfessionalColor(professional.color)}`}
            style={{
              width: `${width}%`,
              height: '100%',
              flexShrink: 0
            }}
          >
            {/* Continuação do agendamento - sem conteúdo visual */}
          </div>
        );
      })}
    </div>
  );
};

export default OngoingAppointmentCell;
