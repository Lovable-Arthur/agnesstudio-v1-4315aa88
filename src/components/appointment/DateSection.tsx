
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateSectionProps {
  selectedDate: string;
}

const DateSection = ({ selectedDate }: DateSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>Data:</Label>
      <div className="flex items-center gap-2">
        <Input 
          value={new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')} 
          readOnly 
          className="w-32"
        />
        <span className="text-sm text-muted-foreground">Recorrência...</span>
      </div>
    </div>
  );
};

export default DateSection;
