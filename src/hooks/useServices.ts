
import { useState } from "react";

export interface Service {
  id: number;
  name: string;
  commission: number;
  duration: number;
  selected: boolean;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Ampola Com Aplicação", commission: 0, duration: 30, selected: false },
    { id: 2, name: "Aplicação de Tratamento Trago pela cliente", commission: 0, duration: 30, selected: false },
    { id: 3, name: "Baby Liss Extra Longo", commission: 0, duration: 60, selected: false },
    { id: 4, name: "Baby Liss Longo com Mega", commission: 0, duration: 60, selected: false },
    { id: 5, name: "Banho de Gel", commission: 80, duration: 90, selected: true },
    { id: 6, name: "Esmaltação", commission: 80, duration: 30, selected: true },
    { id: 7, name: "Esmaltação gel", commission: 80, duration: 120, selected: true },
    { id: 8, name: "Mão Somente", commission: 80, duration: 60, selected: true },
    { id: 9, name: "Pé e Mão", commission: 80, duration: 90, selected: true },
  ]);

  const handleServiceToggle = (serviceId: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, selected: !s.selected } : s)
    );
  };

  const handleServiceCommissionChange = (serviceId: number, commission: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, commission } : s)
    );
  };

  const handleServiceDurationChange = (serviceId: number, duration: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, duration } : s)
    );
  };

  return {
    services,
    handleServiceToggle,
    handleServiceCommissionChange,
    handleServiceDurationChange
  };
};
