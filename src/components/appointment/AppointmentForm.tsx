
import React from "react";
import AppointmentFormHeader from "./AppointmentFormHeader";
import ClientSection from "./ClientSection";
import DateSection from "./DateSection";
import ServiceDetailsSection from "./ServiceDetailsSection";
import MultipleServicesSection from "./MultipleServicesSection";
import StatusSection from "./StatusSection";
import LabelsSection from "./LabelsSection";
import ObservationsSection from "./ObservationsSection";
import AppointmentFormActions from "./AppointmentFormActions";
import { useAppointmentForm } from "@/hooks/useAppointmentForm";

interface AppointmentFormProps {
  timeSlot: string;
  professionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: any) => void;
  onClose: () => void;
}

const AppointmentForm = ({
  timeSlot,
  professionalId,
  selectedDate,
  onAddAppointment,
  onClose
}: AppointmentFormProps) => {
  const {
    clientName,
    setClientName,
    selectedService,
    selectedProfessional,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    price,
    setPrice,
    duration,
    status,
    setStatus,
    services,
    customLabels,
    setCustomLabels,
    newLabel,
    setNewLabel,
    observations,
    setObservations,
    availableServices,
    handleServiceChange,
    handleProfessionalChange,
    handleDurationChange,
    handleStartTimeChange,
    handleAddService,
    handleRemoveService,
    handleRemoveLastService,
    handleUpdateService,
    calculateTotalPrice,
    resetForm,
    handleSave,
    isFormValid,
    getDurationForService
  } = useAppointmentForm({
    initialTimeSlot: timeSlot,
    initialProfessionalId: professionalId,
    selectedDate,
    onAddAppointment
  });

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSaveAndClose = () => {
    const success = handleSave();
    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "agendado" | "confirmado" | "aguardando" | "em-atendimento" | "finalizado" | "pago" | "cancelado" | "faltou");
  };

  return (
    <div className="space-y-6">
      <AppointmentFormHeader />

      <ClientSection 
        clientName={clientName} 
        setClientName={setClientName} 
      />

      <DateSection selectedDate={selectedDate} />

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

      {/* Seção de Serviços Adicionais - MANTIDA */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Serviços Adicionais</h3>
        <MultipleServicesSection
          services={services}
          availableServices={availableServices}
          onAddService={handleAddService}
          onRemoveService={handleRemoveService}
          onRemoveLastService={handleRemoveLastService}
          onUpdateService={handleUpdateService}
          canAddService={true}
          getDurationForService={getDurationForService}
        />
      </div>

      <StatusSection
        status={status}
        onStatusChange={handleStatusChange}
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
        onSave={handleSaveAndClose}
        disabled={!isFormValid}
        price={calculateTotalPrice().toString()}
      />
    </div>
  );
};

export default AppointmentForm;
