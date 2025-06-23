import React, { useState, useEffect } from "react";
import { Appointment } from "@/types/calendar";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { useServices } from "@/contexts/ServicesContext";
import AppointmentFormHeader from "./AppointmentFormHeader";
import ClientSection from "./ClientSection";
import DateSection from "./DateSection";
import ServiceDetailsSection from "./ServiceDetailsSection";
import StatusSection from "./StatusSection";
import LabelsSection from "./LabelsSection";
import ObservationsSection from "./ObservationsSection";
import AppointmentFormActions from "./AppointmentFormActions";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

interface EditAppointmentFormProps {
  appointment: Appointment;
  onUpdateAppointment?: (appointmentData: any) => void;
  onClose: () => void;
}

const EditAppointmentForm = ({
  appointment,
  onUpdateAppointment,
  onClose
}: EditAppointmentFormProps) => {
  const { professionals } = useProfessionals();
  const { getActiveServices } = useServices();

  // Estados do formulário baseados no agendamento existente
  const [clientName, setClientName] = useState(appointment.clientName);
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(2); // Default para Lorena
  const [startTime, setStartTime] = useState(appointment.time);
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("0");
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState(appointment.status);
  const [customLabels, setCustomLabels] = useState<string[]>(appointment.labels || []);
  const [newLabel, setNewLabel] = useState("");
  const [observations, setObservations] = useState(appointment.observations || "");

  const availableServices = getActiveServices();
  const selectedProfessional = professionals.find(p => p.id === selectedProfessionalId);

  // Inicializar dados baseados no agendamento existente
  useEffect(() => {
    // Buscar o serviço pelo nome
    const service = availableServices.find(s => s.name === appointment.service);
    if (service) {
      setSelectedService(service.id.toString());
      setPrice(service.price.toString());
      setDuration(service.duration);
    }

    // Calcular end time baseado na duração do agendamento
    const durationMatch = appointment.duration.match(/(\d+)/);
    const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    setDuration(durationMinutes);
    
    const calculatedEndTime = calculateServiceEndTime(appointment.time, durationMinutes);
    setEndTime(calculatedEndTime);
  }, [appointment, availableServices]);

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
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    if (startTime) {
      setEndTime(calculateServiceEndTime(startTime, newDuration));
    }
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    if (duration > 0) {
      setEndTime(calculateServiceEndTime(time, duration));
    }
  };

  const handleSave = () => {
    const updatedAppointment = {
      ...appointment,
      clientName,
      service: availableServices.find(s => s.id.toString() === selectedService)?.name || appointment.service,
      time: startTime,
      duration: `${duration}min`,
      status,
      labels: customLabels,
      observations
    };

    console.log("Agendamento atualizado:", updatedAppointment);
    onUpdateAppointment?.(updatedAppointment);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const isFormValid = clientName.trim() !== "" && selectedService !== "";

  return (
    <div className="space-y-6">
      <AppointmentFormHeader />

      <ClientSection 
        clientName={clientName} 
        setClientName={setClientName} 
      />

      <DateSection selectedDate={appointment.date} />

      <ServiceDetailsSection
        selectedService={selectedService}
        onServiceChange={handleServiceChange}
        selectedProfessional={selectedProfessional}
        onProfessionalChange={handleProfessionalChange}
        availableServices={availableServices}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        price={price}
        setPrice={setPrice}
        duration={duration}
        onDurationChange={handleDurationChange}
        onStartTimeChange={handleStartTimeChange}
      />

      <StatusSection
        status={status}
        onStatusChange={setStatus}
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
        onCancel={handleCancel}
        onSave={handleSave}
        disabled={!isFormValid}
        price={price}
      />
    </div>
  );
};

export default EditAppointmentForm;
