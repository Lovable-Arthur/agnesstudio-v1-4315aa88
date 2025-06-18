
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
    const selectedService = availableServices.find(s => s.id.toString() === selectedServiceId);
    
    if (!selectedService) {
      console.log('Service not found:', selectedServiceId);
      return;
    }

    console.log('Service selected:', selectedService.name, 'Duration:', selectedService.duration);
    
    const updates: Partial<ServiceItem> = {
      serviceId: selectedServiceId,
      price: selectedService.price.toString(),
      duration: selectedService.duration.toString()
    };
    
    onServiceUpdate(serviceId, updates);
  }, [availableServices, onServiceUpdate]);

  const calculateEndTimeForService = useCallback((serviceItem: ServiceItem, duration: number) => {
    if (!serviceItem.startTime || duration <= 0) return "";
    
    const endTime = calculateServiceEndTime(serviceItem.startTime, duration);
    console.log('Calculated end time for service:', endTime);
    return endTime;
  }, []);

  const getDurationForService = useCallback((serviceItem: ServiceItem): string => {
    console.log('Getting duration for service:', serviceItem.id, 'stored:', serviceItem.duration, 'serviceId:', serviceItem.serviceId);
    
    // Prioriza a duração armazenada no serviceItem
    if (serviceItem.duration) {
      console.log('Using stored duration:', serviceItem.duration);
      return serviceItem.duration;
    }
    
    // Se não tem duração mas tem serviceId, busca na lista de serviços
    if (serviceItem.serviceId) {
      const selectedService = availableServices.find(s => s.id.toString() === serviceItem.serviceId);
      if (selectedService) {
        console.log('Using service default duration:', selectedService.duration);
        return selectedService.duration.toString();
      }
    }
    
    console.log('No duration found, returning empty');
    return "";
  }, [availableServices]);

  return {
    handleServiceChange,
    calculateEndTimeForService,
    getDurationForService
  };
};
