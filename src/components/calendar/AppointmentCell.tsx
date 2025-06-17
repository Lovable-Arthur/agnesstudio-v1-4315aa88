
import React from "react";
import { Appointment } from "@/types/calendar";
import { getStatusColor } from "@/utils/styleUtils";

interface AppointmentCellProps {
  appointment: Appointment;
}

const AppointmentCell = ({ appointment }: AppointmentCellProps) => {
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

  return (
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
  );
};

export default AppointmentCell;
