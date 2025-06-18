import { useState } from "react";
import { useServices } from "@/contexts/ServicesContext";
import { ServiceItem } from "@/types/appointment";
import { calculateServiceEndTime } from "@/utils/appointmentUtils";

export const useAppointmentServices = (selectedProfessionalId: number) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const { getServicesByProfessional, getActiveServices } = useServices();
  
  // Filtrar serviços por profissional quando há um profissional selecionado
  const availableServices = selectedProfessionalId 
    ? getServicesByProfessional(selectedProfessionalId)
    : getActiveServices();

  const handleAddService = (startTime: string, mainServiceEndTime?: string) => {
    // Se já existem serviços, pegar o horário de fim do último serviço
    const lastService = services[services.length - 1];
    let defaultStartTime = startTime;
    
    if (lastService && lastService.endTime) {
      defaultStartTime = lastService.endTime;
    } else if (services.length === 0 && mainServiceEndTime) {
      // Se não há serviços adicionais mas há um serviço principal, usar o fim dele
      defaultStartTime = mainServiceEndTime;
    } else if (services.length === 0) {
      defaultStartTime = startTime;
    }

    const newService: ServiceItem = {
      id: Date.now().toString(),
      serviceId: "",
      professionalId: selectedProfessionalId.toString(),
      startTime: defaultStartTime,
      endTime: "",
      price: "",
      duration: ""
    };
    
    setServices(prev => [...prev, newService]);
  };

  const handleRemoveLastService = () => {
    setServices(prev => prev.slice(0, -1));
  };

  const handleUpdateService = (serviceId: string, field: keyof ServiceItem, value: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    ));

    if (field === 'serviceId') {
      const service = availableServices.find(s => s.id.toString() === value);
      if (service) {
        const serviceItem = services.find(s => s.id === serviceId);
        if (serviceItem && serviceItem.startTime) {
          const endTime = calculateServiceEndTime(serviceItem.startTime, service.duration);
          
          setServices(prev => prev.map(s => 
            s.id === serviceId 
              ? { ...s, endTime, price: service.price.toString(), duration: service.duration.toString() }
              : s
          ));
        }
      }
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const calculateTotalPrice = (mainPrice: string) => {
    const servicesTotal = services.reduce((total, service) => {
      const servicePrice = service.price ? parseFloat(service.price) : 0;
      return total + servicePrice;
    }, 0);
    const currentPrice = mainPrice ? parseFloat(mainPrice) : 0;
    return servicesTotal + currentPrice;
  };

  const resetServices = () => {
    setServices([]);
  };

  return {
    services,
    availableServices,
    handleAddService,
    handleRemoveLastService,
    handleUpdateService,
    handleRemoveService,
    calculateTotalPrice,
    resetServices
  };
};
