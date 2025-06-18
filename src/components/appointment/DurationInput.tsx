
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DurationInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DurationInput = ({
  value,
  onChange
}: DurationInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-700">Tempo</Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            console.log('Duration input changed:', e.target.value);
            onChange(e.target.value);
          }}
          className="h-8 pr-8"
          placeholder="0"
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">min</span>
      </div>
    </div>
  );
};

export default DurationInput;
