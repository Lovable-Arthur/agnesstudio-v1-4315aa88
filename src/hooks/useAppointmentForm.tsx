
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
    // Criar agendamento para o serviço principal se existir
    if (selectedService && clientName) {
      const serviceInfo = availableServices.find(s => s.id.toString() === selectedService);
      
      const mainAppointmentData: AppointmentFormData = {
        clientName,
        services: [{
          name: serviceInfo?.name || "",
          startTime,
          endTime,
          price: parseFloat(price),
          professionalId: selectedProfessionalId
        }],
        time: startTime,
        endTime: endTime,
        duration: serviceInfo ? `${serviceInfo.duration}min` : calculateTotalDuration(startTime, endTime),
        status: "confirmed",
        date: selectedDate,
        professionalId: selectedProfessionalId,
        totalPrice: parseFloat(price),
        labels: customLabels,
        observations
      };

      onAddAppointment?.(mainAppointmentData);
    }

    // Criar agendamentos para os serviços adicionais
    const validServices = services.filter(service => service.serviceId && service.professionalId);
    
    validServices.forEach((service) => {
      const serviceInfo = availableServices.find(s => s.id.toString() === service.serviceId);
      
      const appointmentData: AppointmentFormData = {
        clientName,
        services: [{
          name: serviceInfo?.name || "",
          startTime: service.startTime,
          endTime: service.endTime,
          price: parseFloat(service.price),
          professionalId: Number(service.professionalId)
        }],
        time: service.startTime,
        endTime: service.endTime,
        duration: serviceInfo ? `${serviceInfo.duration}min` : calculateTotalDuration(service.startTime, service.endTime),
        status: "confirmed",
        date: selectedDate,
        professionalId: Number(service.professionalId),
        totalPrice: parseFloat(service.price),
        labels: customLabels,
        observations
      };

      onAddAppointment?.(appointmentData);
    });

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
    setEndTime,
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
    handleAddService: () => handleAddService(startTime, endTime),
    handleRemoveService,
    handleRemoveLastService,
    handleUpdateService,
    calculateTotalPrice: () => calculateTotalPrice(price),
    resetForm,
    handleSave,
    isFormValid
  };
};
