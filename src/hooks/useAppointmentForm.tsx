
import { useState } from "react";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { useAppointmentServices } from "./useAppointmentServices";
import { UseAppointmentFormProps, AppointmentFormData } from "@/types/appointment";
import { calculateServiceEndTime, calculateTotalDuration } from "@/utils/appointmentUtils";

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
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [observations, setObservations] = useState("");

  const { professionals } = useProfessionals();
  const {
    services,
    availableServices,
    handleAddService,
    handleRemoveLastService,
    handleUpdateService,
    handleRemoveService,
    calculateTotalPrice,
    resetServices
  } = useAppointmentServices(selectedProfessionalId);
  
  const selectedProfessional = professionals.find(p => p.id === selectedProfessionalId);

  const handleServiceChange = (serviceId: string) => {
    const service = availableServices.find(s => s.id.toString() === serviceId);
    if (service) {
      setSelectedService(serviceId);
      setPrice(service.price.toString());
      setEndTime(calculateServiceEndTime(startTime, service.duration));
    }
  };

  const handleProfessionalChange = (professionalId: number) => {
    setSelectedProfessionalId(professionalId);
    setSelectedService("");
    setPrice("");
    setEndTime("");
  };

  const resetForm = () => {
    setClientName("");
    setSelectedService("");
    setSelectedProfessionalId(initialProfessionalId);
    setStartTime(initialTimeSlot);
    setEndTime("");
    setPrice("");
    resetServices();
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
        professionalId: selectedProfessionalId.toString(),
        startTime,
        endTime,
        price
      });
    }

    const validServices = allServices.filter(service => service.serviceId);

    const appointmentData: AppointmentFormData = {
      clientName,
      services: validServices.map(service => ({
        name: availableServices.find(s => s.id.toString() === service.serviceId)?.name || "",
        startTime: service.startTime,
        endTime: service.endTime,
        price: parseFloat(service.price),
        professionalId: Number(service.professionalId) || selectedProfessionalId
      })),
      time: validServices[0]?.startTime || startTime,
      endTime: validServices[validServices.length - 1]?.endTime || endTime,
      duration: calculateTotalDuration(
        validServices[0]?.startTime || startTime,
        validServices[validServices.length - 1]?.endTime || endTime
      ),
      status: "confirmed",
      date: selectedDate,
      professionalId: selectedProfessionalId,
      totalPrice: calculateTotalPrice(price),
      labels: customLabels,
      observations
    };

    onAddAppointment?.(appointmentData);
    return true;
  };

  const isFormValid = !!(clientName && (selectedService || services.some(s => s.serviceId)));

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
    handleAddService: () => handleAddService(startTime),
    handleRemoveService,
    handleRemoveLastService,
    handleUpdateService,
    calculateTotalPrice: () => calculateTotalPrice(price),
    resetForm,
    handleSave,
    isFormValid
  };
};
