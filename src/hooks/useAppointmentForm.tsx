
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
  
  const formState = useAppointmentFormState(initialTimeSlot, initialProfessionalId);
  const appointmentServices = useAppointmentServices(formState.selectedProfessionalId);
  
  const {
    handleServiceChange,
    handleProfessionalChange,
    handleDurationChange,
    handleStartTimeChange,
    handleSave
  } = useAppointmentFormActions({
    ...formState,
    ...appointmentServices,
    selectedDate,
    onAddAppointment
  });

  const { isFormValid } = useAppointmentFormValidation(
    formState.clientName, 
    formState.selectedService, 
    appointmentServices.services
  );
  
  const selectedProfessional = professionals.find(p => p.id === formState.selectedProfessionalId);

  useEffect(() => {
    if (formState.startTime && formState.duration > 0) {
      const newEndTime = calculateServiceEndTime(formState.startTime, formState.duration);
      formState.setEndTime(newEndTime);
    }
  }, [formState.startTime, formState.duration, formState.setEndTime]);

  const resetForm = () => {
    formState.resetState();
    appointmentServices.resetServices();
  };

  return {
    ...formState,
    ...appointmentServices,
    selectedProfessional,
    handleServiceChange,
    handleProfessionalChange,
    handleDurationChange,
    handleStartTimeChange: formState.setStartTime,
    handleAddService: () => appointmentServices.handleAddService(formState.startTime, formState.endTime),
    calculateTotalPrice: () => appointmentServices.calculateTotalPrice(formState.price),
    resetForm,
    handleSave,
    isFormValid
  };
};
