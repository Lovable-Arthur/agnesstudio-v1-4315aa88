
export const useAppointmentFormValidation = (
  clientName: string,
  selectedService: string,
  services: any[]
) => {
  const isFormValid = !!(clientName && (selectedService || services.some(s => s.serviceId)));

  return {
    isFormValid
  };
};
