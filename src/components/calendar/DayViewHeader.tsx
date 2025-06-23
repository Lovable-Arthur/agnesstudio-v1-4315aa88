
import React from "react";
import { Professional } from "@/types/calendar";
import ProfessionalHeader from "./ProfessionalHeader";

interface DayViewHeaderProps {
  professionals: Professional[];
}

const DayViewHeader = ({ professionals }: DayViewHeaderProps) => {
  return (
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
  );
};

export default DayViewHeader;
