
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Professional } from "@/types/calendar";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

interface ProfessionalSelectProps {
  selectedProfessional: Professional | undefined;
  onProfessionalChange: (professionalId: number) => void;
}

const ProfessionalSelect = ({
  selectedProfessional,
  onProfessionalChange
}: ProfessionalSelectProps) => {
  const [professionalSearchTerm, setProfessionalSearchTerm] = useState("");
  const { professionals } = useProfessionals();

  const availableProfessionals = professionals.filter(prof => prof.hasAgenda);
  const filteredProfessionals = availableProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(professionalSearchTerm.toLowerCase()) ||
    (prof.socialName && prof.socialName.toLowerCase().includes(professionalSearchTerm.toLowerCase()))
  );

  const handleSelectProfessional = (professionalId: string) => {
    onProfessionalChange(Number(professionalId));
    const prof = professionals.find(p => p.id === Number(professionalId));
    if (prof) {
      setProfessionalSearchTerm(prof.socialName || prof.name);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-700">Profissional</Label>
      <Select value={selectedProfessional?.id.toString() || ""} onValueChange={handleSelectProfessional}>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="Selecionar" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder="Pesquisar profissional..."
              value={professionalSearchTerm}
              onChange={(e) => setProfessionalSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <SelectItem key={professional.id} value={professional.id.toString()}>
                {professional.socialName || professional.name}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground text-center">
              Nenhum profissional encontrado
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfessionalSelect;
