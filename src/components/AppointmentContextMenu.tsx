
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Calendar, User, Clock } from "lucide-react";
import { useServices } from "@/contexts/ServicesContext";

interface AppointmentContextMenuProps {
  children: React.ReactNode;
  timeSlot: string;
  professionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
}

const AppointmentContextMenu = ({
  children,
  timeSlot,
  professionalId,
  selectedDate,
  onAddAppointment
}: AppointmentContextMenuProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [startTime, setStartTime] = useState(timeSlot);
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [observations, setObservations] = useState("");

  const { getServicesByProfessional } = useServices();
  const availableServices = getServicesByProfessional(professionalId);

  // Cores predefinidas para as etiquetas
  const labelColors = [
    "bg-green-500",
    "bg-blue-500", 
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-teal-500"
  ];

  const predefinedLabels = [
    { name: "Química", color: "bg-green-500" },
    { name: "Preferência", color: "bg-blue-500" },
    { name: "Maquiagem", color: "bg-pink-500" },
    { name: "Nova", color: "bg-purple-500" },
    { name: "Pé e Mão", color: "bg-indigo-500" }
  ];

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setClientName("");
    setSelectedService("");
    setStartTime(timeSlot);
    setEndTime("");
    setPrice("");
    setCustomLabels([]);
    setNewLabel("");
    setObservations("");
  };

  const handleServiceChange = (serviceId: string) => {
    const service = availableServices.find(s => s.id.toString() === serviceId);
    if (service) {
      setSelectedService(serviceId);
      setPrice(service.price.toString());
      
      // Calcular horário de fim baseado na duração
      const startMinutes = convertTimeToMinutes(startTime);
      const endMinutes = startMinutes + service.duration;
      setEndTime(convertMinutesToTime(endMinutes));
    }
  };

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const addPredefinedLabel = (label: { name: string; color: string }) => {
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

  const handleSave = () => {
    const appointmentData = {
      clientName,
      service: availableServices.find(s => s.id.toString() === selectedService)?.name || "",
      time: startTime,
      endTime,
      duration: `${convertTimeToMinutes(endTime) - convertTimeToMinutes(startTime)}min`,
      status: "confirmed" as const,
      date: selectedDate,
      professionalId,
      price: parseFloat(price),
      labels: customLabels,
      observations
    };

    onAddAppointment?.(appointmentData);
    handleCloseDialog();
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem onClick={handleOpenDialog} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {timeSlot}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Novo Agendamento
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="client">Cliente:</Label>
              <div className="flex gap-2">
                <Input
                  id="client"
                  placeholder="Nome do cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  Cadastrar Cliente
                </Button>
              </div>
            </div>

            {/* Data */}
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

            {/* Serviço, Profissional, Tempo, etc. */}
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Serviço</Label>
                <Select value={selectedService} onValueChange={handleServiceChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServices.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Profissional</Label>
                <Input value="Selecionado" readOnly />
              </div>

              <div className="space-y-2">
                <Label>Tempo</Label>
                <Input 
                  value={selectedService ? availableServices.find(s => s.id.toString() === selectedService)?.duration + "min" : ""} 
                  readOnly 
                />
              </div>

              <div className="space-y-2">
                <Label>Início</Label>
                <Input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Fim</Label>
                <Input 
                  type="time" 
                  value={endTime} 
                  readOnly
                />
              </div>
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                className="w-32"
              />
            </div>

            {/* Etiquetas Predefinidas */}
            <div className="space-y-2">
              <Label>Etiquetas Predefinidas:</Label>
              <div className="flex flex-wrap gap-2">
                {predefinedLabels.map((label) => (
                  <Button
                    key={label.name}
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedLabel(label)}
                    className={`${label.color} text-white hover:opacity-80`}
                  >
                    {label.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Etiquetas Customizadas */}
            <div className="space-y-2">
              <Label>Etiqueta Customizada:</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite uma etiqueta personalizada"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomLabel()}
                />
                <Button onClick={addCustomLabel} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Etiquetas Adicionadas */}
              {customLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {customLabels.map((label, index) => {
                    const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
                    const color = predefinedLabel?.color || labelColors[index % labelColors.length];
                    
                    return (
                      <Badge
                        key={label}
                        className={`${color} text-white flex items-center gap-1`}
                      >
                        {label}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:opacity-70" 
                          onClick={() => removeLabel(label)}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Observações */}
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

            {/* Total */}
            <div className="text-right text-lg font-semibold">
              Total (R$): {price || "0,00"}
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!clientName || !selectedService}
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentContextMenu;
