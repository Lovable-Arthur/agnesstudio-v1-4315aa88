
import { useEffect } from "react";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { useAppointmentServices } from "./useAppointmentServices";
import { useAppointmentFormState } from "./useAppointmentFormState";
import { useAppointmentFormActions } from "./useAppointmentFormActions";
import { useAppointmentFormValidation } from "./useAppointmentFormValidation";
import { UseAppointmentFormProps } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

export const useAppointmentForm = ({
  initialTimeSlot,
  initialProfessionalId,
  selectedDate,
  onAddAppointment
}: UseAppointmentFormProps) => {
  const { professionals } = useProfessionals();
  
  const {
    clientName,
    setClientName,
    selectedService,
    setSelectedService,
    selectedProfessionalId,
    setSelectedProfessionalId,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    price,
    setPrice,
    duration,
    setDuration,
    customLabels,
    setCustomLabels,
    newLabel,
    setNewLabel,
    observations,
    setObservations,
    resetState
  } = useAppointmentFormState(initialTimeSlot, initialProfessionalId);

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

  const {
    handleServiceChange,
    handleProfessionalChange,
    handleDurationChange,
    handleStartTimeChange,
    handleSave
  } = useAppointmentFormActions({
    selectedProfessionalId,
    selectedService,
    setSelectedService,
    setPrice,
    setDuration,
    setEndTime,
    setSelectedProfessionalId,
    startTime,
    clientName,
    endTime,
    duration,
    price,
    selectedDate,
    customLabels,
    observations,
    services,
    availableServices,
    onAddAppointment
  });

  const { isFormValid } = useAppointmentFormValidation(clientName, selectedService, services);
  
  const selectedProfessional = professionals.find(p => p.id === selectedProfessionalId);

  // Recalcula o horário de fim quando a duração ou horário de início mudam
  useEffect(() => {
    if (startTime && duration > 0) {
      const newEndTime = calculateServiceEndTime(startTime, duration);
      setEndTime(newEndTime);
    }
  }, [startTime, duration, setEndTime]);

  const resetForm = () => {
    resetState();
    resetServices();
  };

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
    duration,
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
    handleDurationChange,
    handleStartTimeChange: setStartTime,
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
