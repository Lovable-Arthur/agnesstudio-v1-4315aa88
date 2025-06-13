
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: 'cabelo' | 'manicure' | 'estetica' | 'outros';
  active: boolean;
  commission: number;
  allowedProfessionals: number[];
  isPackage: boolean;
  packageServices?: number[];
}

interface ServicesContextType {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  getServicesByCategory: (category: string) => Service[];
  getActiveServices: () => Service[];
  getServicesByProfessional: (professionalId: number) => Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Corte Feminino",
      price: 45,
      duration: 45,
      description: "Corte personalizado com lavagem e escovação",
      category: "cabelo",
      active: true,
      commission: 50,
      allowedProfessionals: [3, 4],
      isPackage: false
    },
    {
      id: 2,
      name: "Coloração",
      price: 120,
      duration: 150,
      description: "Coloração completa com produtos de qualidade",
      category: "cabelo",
      active: true,
      commission: 40,
      allowedProfessionals: [4],
      isPackage: false
    },
    {
      id: 3,
      name: "Escova Progressiva",
      price: 200,
      duration: 180,
      description: "Alisamento natural e duradouro",
      category: "cabelo",
      active: true,
      commission: 45,
      allowedProfessionals: [4],
      isPackage: false
    },
    {
      id: 4,
      name: "Manicure",
      price: 25,
      duration: 30,
      description: "Cuidado completo das unhas das mãos",
      category: "manicure",
      active: true,
      commission: 80,
      allowedProfessionals: [2],
      isPackage: false
    },
    {
      id: 5,
      name: "Pedicure",
      price: 30,
      duration: 45,
      description: "Cuidado completo das unhas dos pés",
      category: "manicure",
      active: true,
      commission: 80,
      allowedProfessionals: [2],
      isPackage: false
    },
    {
      id: 6,
      name: "Sobrancelha",
      price: 20,
      duration: 20,
      description: "Design e limpeza das sobrancelhas",
      category: "estetica",
      active: true,
      commission: 70,
      allowedProfessionals: [2, 4],
      isPackage: false
    },
    {
      id: 7,
      name: "Pé e Mão",
      price: 50,
      duration: 90,
      description: "Combo completo de manicure e pedicure",
      category: "manicure",
      active: true,
      commission: 80,
      allowedProfessionals: [2],
      isPackage: true,
      packageServices: [4, 5]
    }
  ]);

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newId = Math.max(...services.map(s => s.id)) + 1;
    const newService = { ...serviceData, id: newId };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (updatedService: Service) => {
    setServices(prev => 
      prev.map(service => 
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const getServicesByCategory = (category: string) => {
    return services.filter(service => service.category === category && service.active);
  };

  const getActiveServices = () => {
    return services.filter(service => service.active);
  };

  const getServicesByProfessional = (professionalId: number) => {
    return services.filter(service => 
      service.active && service.allowedProfessionals.includes(professionalId)
    );
  };

  return (
    <ServicesContext.Provider value={{
      services,
      addService,
      updateService,
      deleteService,
      getServicesByCategory,
      getActiveServices,
      getServicesByProfessional
    }}>
      {children}
    </ServicesContext.Provider>
  );
};
