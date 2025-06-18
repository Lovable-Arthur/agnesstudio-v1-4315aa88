
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
          className="h-8"
        />
      </div>
    </div>
  );
};

export default TimeInput;
