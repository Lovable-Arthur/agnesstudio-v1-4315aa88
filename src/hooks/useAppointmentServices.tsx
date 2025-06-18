
import { useServices } from "@/contexts/ServicesContext";
import { useServiceManagement } from "./useServiceManagement";
import { useServiceSelection } from "./useServiceSelection";
import { ServiceItem } from "@/types/appointment";

export const useAppointmentServices = (selectedProfessionalId: number) => {
  const { getServicesByProfessional, getActiveServices } = useServices();
  
  const availableServices = selectedProfessionalId 
    ? getServicesByProfessional(selectedProfessionalId)
    : getActiveServices();

  const {
    services,
    addService,
    removeService,
    removeLastService,
    updateService,
    calculateTotalPrice,
    resetServices
  } = useServiceManagement({ selectedProfessionalId });

  const {
    handleServiceChange,
    calculateEndTimeForService,
    getDurationForService
  } = useServiceSelection({ 
    availableServices,
    onServiceUpdate: (serviceId, updates) => {
      console.log('Updating service in useAppointmentServices:', serviceId, updates);
      updateService(serviceId, updates);
      
      if (updates.serviceId) {
        const serviceItem = services.find(s => s.id === serviceId);
        if (serviceItem?.startTime && updates.duration) {
          const duration = parseInt(updates.duration);
          const endTime = calculateEndTimeForService(serviceItem, duration);
          if (endTime) {
            updateService(serviceId, { endTime });
          }
        }
      }
    }
  });

  const handleUpdateService = (serviceId: string, field: keyof ServiceItem, value: string) => {
    console.log('handleUpdateService called:', serviceId, field, value);
    
    if (field === 'serviceId') {
      handleServiceChange(serviceId, value);
    } else {
      updateService(serviceId, { [field]: value });
    }
  };

  const handleAddService = (startTime: string, mainServiceEndTime?: string) => {
    addService(startTime, mainServiceEndTime);
  };

  return {
    services,
    availableServices,
    handleAddService,
    handleRemoveLastService: removeLastService,
    handleUpdateService,
    handleRemoveService: removeService,
    calculateTotalPrice,
    resetServices,
    getDurationForService
  };
};
