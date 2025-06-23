
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeColor, getStatusLabel } from "@/utils/styleUtils";

interface StatusSectionProps {
  status: string;
  onStatusChange: (status: string) => void;
}

const StatusSection = ({ status, onStatusChange }: StatusSectionProps) => {
  const statusOptions = [
    "agendado",
    "confirmado", 
    "aguardando",
    "em-atendimento",
    "finalizado",
    "pago",
    "cancelado",
    "faltou"
  ];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Status do Agendamento</Label>
      <div className="flex items-center gap-3">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Selecionar status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((statusOption) => (
              <SelectItem key={statusOption} value={statusOption}>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusBadgeColor(statusOption)}`} variant="outline">
                    {getStatusLabel(statusOption)}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {status && (
          <Badge className={`${getStatusBadgeColor(status)}`} variant="outline">
            {getStatusLabel(status)}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default StatusSection;
