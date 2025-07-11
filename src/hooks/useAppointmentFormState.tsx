
import { useState } from "react";

export const useAppointmentFormState = (
  initialTimeSlot: string,
  initialProfessionalId: number
) => {
  const [clientName, setClientName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(initialProfessionalId);
  const [startTime, setStartTime] = useState(initialTimeSlot);
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<"agendado" | "confirmado" | "aguardando" | "em-atendimento" | "finalizado" | "pago" | "cancelado" | "faltou">("agendado");
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [observations, setObservations] = useState("");

  const resetState = () => {
    setClientName("");
    setSelectedService("");
    setSelectedProfessionalId(initialProfessionalId);
    setStartTime(initialTimeSlot);
    setEndTime("");
    setPrice("");
    setDuration(0);
    setStatus("agendado");
    setCustomLabels([]);
    setNewLabel("");
    setObservations("");
  };

  return {
    // State values
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
    status,
    setStatus,
    customLabels,
    setCustomLabels,
    newLabel,
    setNewLabel,
    observations,
    setObservations,
    
    // Actions
    resetState
  };
};
