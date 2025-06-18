
import { useState, useCallback } from "react";
import { ServiceItem } from "@/types/appointment";

interface UseServiceManagementProps {
  selectedProfessionalId: number;
}

export const useServiceManagement = ({ selectedProfessionalId }: UseServiceManagementProps) => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  const createNewService = useCallback((startTime: string, mainServiceEndTime?: string): ServiceItem => {
    const lastService = services[services.length - 1];
    let defaultStartTime = startTime;
    
    if (lastService?.endTime) {
      defaultStartTime = lastService.endTime;
    } else if (services.length === 0 && mainServiceEndTime) {
      defaultStartTime = mainServiceEndTime;
    }

    return {
      id: Date.now().toString(),
      serviceId: "",
      professionalId: selectedProfessionalId.toString(),
      startTime: defaultStartTime,
      endTime: "",
      price: "",
      duration: ""
    };
  }, [services, selectedProfessionalId]);

  const addService = useCallback((startTime: string, mainServiceEndTime?: string) => {
    const newService = createNewService(startTime, mainServiceEndTime);
    setServices(prev => [...prev, newService]);
  }, [createNewService]);

  const removeService = useCallback((serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  }, []);

  const removeLastService = useCallback(() => {
    setServices(prev => prev.slice(0, -1));
  }, []);

  const updateService = useCallback((serviceId: string, updates: Partial<ServiceItem>) => {
    console.log('Updating service:', serviceId, 'updates:', updates);
    
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, ...updates }
        : service
    ));
  }, []);

  const calculateTotalPrice = useCallback((mainPrice: string): number => {
    const servicesTotal = services.reduce((total, service) => {
      const servicePrice = service.price ? parseFloat(service.price) : 0;
      return total + servicePrice;
    }, 0);
    
    const currentPrice = mainPrice ? parseFloat(mainPrice) : 0;
    return servicesTotal + currentPrice;
  }, [services]);

  const resetServices = useCallback(() => {
    setServices([]);
  }, []);

  return {
    services,
    addService,
    removeService,
    removeLastService,
    updateService,
    calculateTotalPrice,
    resetServices
  };
};
