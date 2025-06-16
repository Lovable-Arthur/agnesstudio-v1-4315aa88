
import React from "react";
import AppointmentFormHeader from "./AppointmentFormHeader";
import ClientSection from "./ClientSection";
import DateSection from "./DateSection";
import ServiceDetailsSection from "./ServiceDetailsSection";
import MultipleServicesSection from "./MultipleServicesSection";
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
    handleServiceChange,
    handleProfessionalChange,
    handleAddService,
    handleRemoveService,
    calculateTotalPrice,
    resetForm,
    handleSave,
    isFormValid
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
        onCancel={handleCancel}
        onSave={handleSaveAndClose}
        disabled={!isFormValid}
        price={calculateTotalPrice().toString()}
      />
    </div>
  );
};

export default AppointmentForm;
