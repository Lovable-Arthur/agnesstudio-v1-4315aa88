import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
interface LabelsSectionProps {
  customLabels: string[];
  setCustomLabels: (labels: string[]) => void;
  newLabel: string;
  setNewLabel: (label: string) => void;
}
const LabelsSection = ({
  customLabels,
  setCustomLabels,
  newLabel,
  setNewLabel
}: LabelsSectionProps) => {
  const labelColors = ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500", "bg-red-500", "bg-indigo-500", "bg-teal-500"];
  const predefinedLabels = [{
    name: "Química",
    color: "bg-green-500"
  }, {
    name: "Preferência",
    color: "bg-blue-500"
  }, {
    name: "Maquiagem",
    color: "bg-pink-500"
  }, {
    name: "Nova",
    color: "bg-purple-500"
  }, {
    name: "Pé e Mão",
    color: "bg-indigo-500"
  }];
  const addPredefinedLabel = (label: {
    name: string;
    color: string;
  }) => {
    if (!customLabels.includes(label.name)) {
      setCustomLabels([...customLabels, label.name]);
    }
  };
  const addCustomLabel = () => {
    if (newLabel.trim() && !customLabels.includes(newLabel.trim())) {
      setCustomLabels([...customLabels, newLabel.trim()]);
      setNewLabel("");
    }
  };
  const removeLabel = (labelToRemove: string) => {
    setCustomLabels(customLabels.filter(label => label !== labelToRemove));
  };
  return <>
      <div className="space-y-2">
        <Label>Etiquetas Predefinidas:</Label>
        <div className="flex flex-wrap gap-2">
          {predefinedLabels.map(label => <Button key={label.name} variant="outline" size="sm" onClick={() => addPredefinedLabel(label)} className={`${label.color} text-white hover:opacity-80`}>
              {label.name}
            </Button>)}
        </div>
      </div>

      <div className="space-y-2 my-0 mx-[2px]">
        <Label>Etiqueta Customizada:</Label>
        <div className="flex gap-2">
          <Input placeholder="Digite uma etiqueta personalizada" value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyPress={e => e.key === 'Enter' && addCustomLabel()} />
          <Button onClick={addCustomLabel} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {customLabels.length > 0 && <div className="flex flex-wrap gap-2 mt-2">
            {customLabels.map((label, index) => {
          const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
          const color = predefinedLabel?.color || labelColors[index % labelColors.length];
          return <Badge key={label} className={`${color} text-white flex items-center gap-1`}>
                  {label}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => removeLabel(label)} />
                </Badge>;
        })}
          </div>}
      </div>
    </>;
};
export default LabelsSection;