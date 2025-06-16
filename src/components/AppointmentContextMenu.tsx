
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
} from "@/components/ui/dialog";
import { Plus, Clock } from "lucide-react";
import { useServices } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

// Import the new components
import AppointmentFormHeader from "./appointment/AppointmentFormHeader";
import ClientSection from "./appointment/ClientSection";
import DateSection from "./appointment/DateSection";
import ServiceDetailsSection from "./appointment/ServiceDetailsSection";
import LabelsSection from "./appointment/LabelsSection";
import ObservationsSection from "./appointment/ObservationsSection";
import AppointmentFormActions from "./appointment/AppointmentFormActions";

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
  const { professionals } = useProfessionals();
  
  const selectedProfessional = professionals.find(p => p.id === professionalId);
  const availableServices = getServicesByProfessional(professionalId);

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

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleServiceChange = (serviceId: string) => {
    const service = availableServices.find(s => s.id.toString() === serviceId);
    if (service) {
      setSelectedService(serviceId);
      setPrice(service.price.toString());
      
      const startMinutes = convertTimeToMinutes(startTime);
      const endMinutes = startMinutes + service.duration;
      setEndTime(convertMinutesToTime(endMinutes));
    }
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
          <AppointmentFormHeader />

          <div className="space-y-6">
            <ClientSection 
              clientName={clientName} 
              setClientName={setClientName} 
            />

            <DateSection selectedDate={selectedDate} />

            <ServiceDetailsSection
              selectedService={selectedService}
              onServiceChange={handleServiceChange}
              selectedProfessional={selectedProfessional}
              availableServices={availableServices}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              price={price}
              setPrice={setPrice}
            />

            <LabelsSection
              customLabels={customLabels}
              setCustomLabels={setCustomLabels}
              newLabel={newLabel}
              setNewLabel={setNewLabel}
            />

            <ObservationsSection
              observations={observations}
              setObservations={setObservations}
            />

            <AppointmentFormActions
              onCancel={handleCloseDialog}
              onSave={handleSave}
              disabled={!clientName || !selectedService}
              price={price}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentContextMenu;
