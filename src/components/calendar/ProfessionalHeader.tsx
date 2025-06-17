
import React from "react";
import { Professional } from "@/types/calendar";
import { getProfessionalInitials } from "@/utils/styleUtils";

interface ProfessionalHeaderProps {
  professional: Professional;
}

const ProfessionalHeader = ({ professional }: ProfessionalHeaderProps) => (
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

export default ProfessionalHeader;
