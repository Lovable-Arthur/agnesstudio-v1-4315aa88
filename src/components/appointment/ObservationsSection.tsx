
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ObservationsSectionProps {
  observations: string;
  setObservations: (observations: string) => void;
}

const ObservationsSection = ({ observations, setObservations }: ObservationsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>Observações:</Label>
      <Textarea
        placeholder="Adicione observações sobre o agendamento..."
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        rows={3}
      />
      <div className="text-xs text-muted-foreground text-right">
        {observations.length}/255
      </div>
    </div>
  );
};

export default ObservationsSection;
