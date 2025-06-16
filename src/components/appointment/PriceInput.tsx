
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PriceInput = ({
  value,
  onChange
}: PriceInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-700">Valor (R$)</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8"
      />
    </div>
  );
};

export default PriceInput;
