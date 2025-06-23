
import React from "react";
import { Appointment } from "@/types/calendar";
import { getStatusColor } from "@/utils/styleUtils";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeColor, getStatusLabel } from "@/utils/styleUtils";

interface AppointmentCellProps {
  appointment: Appointment;
  onEditAppointment?: (appointment: Appointment) => void;
  isCompact?: boolean;
}

const AppointmentCell = ({ appointment, onEditAppointment, isCompact = false }: AppointmentCellProps) => {
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

  const { labelColors, predefinedLabels } = getLabelColors();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditAppointment?.(appointment);
  };

  return (
    <div 
      className={`h-full ${isCompact ? 'p-1' : 'p-2'} rounded text-xs border-2 cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(appointment.status)}`}
      onClick={handleClick}
    >
      <div className={`flex items-center justify-between ${isCompact ? 'mb-0.5' : 'mb-1'}`}>
        <div className={`font-medium truncate text-white ${isCompact ? 'text-[9px]' : ''}`}>
          {appointment.time}
        </div>
        {!isCompact && (
          <Badge 
            className={`${getStatusBadgeColor(appointment.status)} text-[8px] px-1 py-0`} 
            variant="outline"
          >
            {getStatusLabel(appointment.status)}
          </Badge>
        )}
      </div>
      <div className={`font-semibold truncate text-white ${isCompact ? 'mb-0.5 text-[9px]' : 'mb-1'}`}>
        {appointment.clientName}
      </div>
      <div className={`text-xs opacity-90 truncate ${isCompact ? 'mb-1 text-[8px]' : 'mb-2'}`}>
        {appointment.service}
      </div>
      {appointment.labels && appointment.labels.length > 0 && !isCompact && (
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
      {appointment.labels && appointment.labels.length > 0 && isCompact && (
        <div className="flex flex-wrap gap-0.5">
          {appointment.labels.slice(0, 1).map((label, index) => {
            const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
            const color = predefinedLabel?.color || labelColors[index % labelColors.length];
            
            return (
              <span
                key={label}
                className={`${color} text-white text-[7px] px-1 py-0.5 rounded-full font-medium inline-block`}
              >
                {label}
              </span>
            );
          })}
          {appointment.labels.length > 1 && (
            <span className="bg-gray-600 text-white text-[7px] px-1 py-0.5 rounded-full font-medium">
              +{appointment.labels.length - 1}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCell;
