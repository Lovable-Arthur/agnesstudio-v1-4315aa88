
import { useServices } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { calculateServiceEndTime, calculateTotalDuration } from "@/utils/appointmentUtils";
import { AppointmentFormData } from "@/types/appointment";

interface UseAppointmentFormActionsProps {
  selectedProfessionalId: number;
  selectedService: string;
  setSelectedService: (value: string) => void;
  setPrice: (value: string) => void;
  setDuration: (value: number) => void;
  setEndTime: (value: string) => void;
  setSelectedProfessionalId: (value: number) => void;
  startTime: string;
  clientName: string;
  endTime: string;
  duration: number;
  price: string;
  selectedDate: string;
  customLabels: string[];
  observations: string;
  services: any[];
  availableServices: any[];
  onAddAppointment?: (appointmentData: AppointmentFormData) => void;
}

export const useAppointmentFormActions = ({
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
}: UseAppointmentFormActionsProps) => {
  
  const handleServiceChange = (serviceId: string) => {
    const service = availableServices.find(s => s.id.toString() === serviceId);
    if (service) {
      setSelectedService(serviceId);
      setPrice(service.price.toString());
      setDuration(service.duration);
      setEndTime(calculateServiceEndTime(startTime, service.duration));
    }
  };

  const handleProfessionalChange = (professionalId: number) => {
    setSelectedProfessionalId(professionalId);
    setSelectedService("");
    setPrice("");
    setEndTime("");
    setDuration(0);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleStartTimeChange = (time: string) => {
    // This will be handled by the parent component's setStartTime
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
        duration: duration ? `${duration}min` : calculateTotalDuration(startTime, endTime),
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

  return {
    handleServiceChange,
    handleProfessionalChange,
    handleDurationChange,
    handleStartTimeChange,
    handleSave
  };
};
