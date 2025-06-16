
import { useState } from "react";
import { useServices } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

interface ServiceItem {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  price: string;
}

interface UseAppointmentFormProps {
  initialTimeSlot: string;
  initialProfessionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
}

export const useAppointmentForm = ({
  initialTimeSlot,
  initialProfessionalId,
  selectedDate,
  onAddAppointment
}: UseAppointmentFormProps) => {
  const [clientName, setClientName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(initialProfessionalId);
  const [startTime, setStartTime] = useState(initialTimeSlot);
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [observations, setObservations] = useState("");

  const { getServicesByProfessional } = useServices();
  const { professionals } = useProfessionals();
  
  const selectedProfessional = professionals.find(p => p.id === selectedProfessionalId);
  const availableServices = getServicesByProfessional(selectedProfessionalId);

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

  const handleProfessionalChange = (professionalId: number) => {
    setSelectedProfessionalId(professionalId);
    setSelectedService("");
    setPrice("");
    setEndTime("");
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

  const resetForm = () => {
    setClientName("");
    setSelectedService("");
    setSelectedProfessionalId(initialProfessionalId);
    setStartTime(initialTimeSlot);
    setEndTime("");
    setPrice("");
    setServices([]);
    setCustomLabels([]);
    setNewLabel("");
    setObservations("");
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
      professionalId: selectedProfessionalId,
      totalPrice: calculateTotalPrice(),
      labels: customLabels,
      observations
    };

    onAddAppointment?.(appointmentData);
    return true;
  };

  const isFormValid = !!(clientName && (selectedService || services.length > 0));

  return {
    // State
    clientName,
    setClientName,
    selectedService,
    selectedProfessional,
    selectedProfessionalId,
    startTime,
    setStartTime,
    endTime,
    price,
    setPrice,
    services,
    customLabels,
    setCustomLabels,
    newLabel,
    setNewLabel,
    observations,
    setObservations,
    availableServices,
    
    // Actions
    handleServiceChange,
    handleProfessionalChange,
    handleAddService,
    handleRemoveService,
    calculateTotalPrice,
    resetForm,
    handleSave,
    isFormValid
  };
};
