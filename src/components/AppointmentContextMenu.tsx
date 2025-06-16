
import React, { useState } from "react";
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
import MultipleServicesSection from "./appointment/MultipleServicesSection";
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

interface ServiceItem {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  price: string;
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
  const [services, setServices] = useState<ServiceItem[]>([]);
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
    setServices([]);
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

  const handleAddService = () => {
    if (selectedService) {
      const newService: ServiceItem = {
        id: Date.now().toString(),
        serviceId: selectedService,
        startTime,
        endTime,
        price
      };
      
      setServices(prev => [...prev, newService]);
      
      // Reset fields
      setSelectedService("");
      setStartTime(endTime);
      setEndTime("");
      setPrice("");
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const calculateTotalPrice = () => {
    const servicesTotal = services.reduce((total, service) => total + parseFloat(service.price), 0);
    const currentPrice = price ? parseFloat(price) : 0;
    return servicesTotal + currentPrice;
  };

  const handleSave = () => {
    const allServices = [...services];
    if (selectedService) {
      allServices.push({
        id: Date.now().toString(),
        serviceId: selectedService,
        startTime,
        endTime,
        price
      });
    }

    const appointmentData = {
      clientName,
      services: allServices.map(service => ({
        name: availableServices.find(s => s.id.toString() === service.serviceId)?.name || "",
        startTime: service.startTime,
        endTime: service.endTime,
        price: parseFloat(service.price)
      })),
      time: allServices[0]?.startTime || startTime,
      endTime: allServices[allServices.length - 1]?.endTime || endTime,
      duration: `${convertTimeToMinutes(allServices[allServices.length - 1]?.endTime || endTime) - convertTimeToMinutes(allServices[0]?.startTime || startTime)}min`,
      status: "confirmed" as const,
      date: selectedDate,
      professionalId,
      totalPrice: calculateTotalPrice(),
      labels: customLabels,
      observations
    };

    onAddAppointment?.(appointmentData);
    handleCloseDialog();
  };

  return (
    <>
      <div onClick={handleOpenDialog}>
        {children}
      </div>

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

            <MultipleServicesSection
              services={services}
              availableServices={availableServices}
              onAddService={handleAddService}
              onRemoveService={handleRemoveService}
              canAddService={!!selectedService}
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
              disabled={!clientName || (!selectedService && services.length === 0)}
              price={calculateTotalPrice().toString()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentContextMenu;
