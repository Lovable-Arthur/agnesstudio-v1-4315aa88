
import { useState, useCallback } from "react";
import { Service } from "@/contexts/ServicesContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

interface UseServiceSelectionProps {
  availableServices: Service[];
  onServiceUpdate: (serviceId: string, updates: Partial<ServiceItem>) => void;
}

export const useServiceSelection = ({ 
  availableServices, 
  onServiceUpdate 
}: UseServiceSelectionProps) => {
  
  const handleServiceChange = useCallback((serviceId: string, selectedServiceId: string) => {
    console.log('useServiceSelection: handleServiceChange called:', { serviceId, selectedServiceId });
    
    // Buscar o serviço selecionado na lista de serviços disponíveis
    const selectedService = availableServices.find(s => s.id.toString() === selectedServiceId);
    
    if (!selectedService) {
      console.log('useServiceSelection: Service not found in available services:', selectedServiceId);
      console.log('useServiceSelection: Available services:', availableServices.map(s => s.id));
      return;
    }

    console.log('useServiceSelection: Service found:', selectedService.name, 'Duration:', selectedService.duration, 'Price:', selectedService.price);
    
    const updates: Partial<ServiceItem> = {
      serviceId: selectedServiceId,
      price: selectedService.price.toString(),
      duration: selectedService.duration.toString()
    };
    
    console.log('useServiceSelection: Updating service with:', updates);
    onServiceUpdate(serviceId, updates);
  }, [availableServices, onServiceUpdate]);

  const calculateEndTimeForService = useCallback((serviceItem: ServiceItem, duration: number) => {
    if (!serviceItem.startTime || duration <= 0) return "";
    
    const endTime = calculateServiceEndTime(serviceItem.startTime, duration);
    console.log('useServiceSelection: Calculated end time for service:', endTime);
    return endTime;
  }, []);

  const getDurationForService = useCallback((serviceItem: ServiceItem): string => {
    console.log('useServiceSelection: Getting duration for service:', {
      id: serviceItem.id,
      serviceId: serviceItem.serviceId,
      storedDuration: serviceItem.duration
    });
    
    // Prioriza a duração armazenada no serviceItem
    if (serviceItem.duration && serviceItem.duration !== "") {
      console.log('useServiceSelection: Using stored duration:', serviceItem.duration);
      return serviceItem.duration;
    }
    
    // Se não tem duração mas tem serviceId, busca na lista de serviços
    if (serviceItem.serviceId) {
      const selectedService = availableServices.find(s => s.id.toString() === serviceItem.serviceId);
      if (selectedService) {
        console.log('useServiceSelection: Using service default duration:', selectedService.duration);
        return selectedService.duration.toString();
      }
    }
    
    console.log('useServiceSelection: No duration found, returning empty');
    return "";
  }, [availableServices]);

  return {
    handleServiceChange,
    calculateEndTimeForService,
    getDurationForService
  };
};
