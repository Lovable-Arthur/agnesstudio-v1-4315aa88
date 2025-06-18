
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const TimeInput = ({
  label,
  value,
  onChange,
  readOnly = false
}: TimeInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-700">{label}</Label>
      <div className="relative">
        <Input
          type="time"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          className="h-8 pr-8"
        />
        <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default TimeInput;
