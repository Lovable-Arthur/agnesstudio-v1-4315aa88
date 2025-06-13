
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Professional } from '@/types/calendar';

interface ProfessionalsContextType {
  professionals: Professional[];
  updateProfessional: (professional: Professional) => void;
  setProfessionals: React.Dispatch<React.SetStateAction<Professional[]>>;
}

const ProfessionalsContext = createContext<ProfessionalsContextType | undefined>(undefined);

export const useProfessionals = () => {
  const context = useContext(ProfessionalsContext);
  if (!context) {
    throw new Error('useProfessionals must be used within a ProfessionalsProvider');
  }
  return context;
};

interface ProfessionalsProviderProps {
  children: ReactNode;
}

export const ProfessionalsProvider = ({ children }: ProfessionalsProviderProps) => {
  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: 1,
      name: "Administrador Master",
      socialName: "Admin",
      cpf: "000.000.000-00",
      rg: "",
      birthDate: "01/01/1980",
      color: "bg-red-500",
      agendaInterval: 15,
      agendaOrder: 0,
      position: "Master",
      canBeAssistant: false,
      specialties: "Administração do Sistema",
      specialty: "Administração",
      description: "Usuário administrador com acesso total ao sistema",
      email: "admin@admin.com",
      accessLevel: "Admin",
      hasAgenda: false,
      showOnlineBooking: false,
      appointments: []
    },
    {
      id: 2,
      name: "Lorena da Silva Rocha",
      socialName: "Lorena",
      cpf: "170.831.567-51",
      rg: "",
      birthDate: "16/03/1993",
      color: "bg-green-500",
      agendaInterval: 10,
      agendaOrder: 1,
      position: "Freelancer",
      canBeAssistant: false,
      specialties: "Manicure e Pedicure",
      specialty: "Manicure e Pedicure",
      description: "",
      email: "Lorenaroxca@gmail.com",
      accessLevel: "Profissionais",
      hasAgenda: true,
      showOnlineBooking: true,
      appointments: [
        {
          id: 1,
          clientName: "Maria Silva",
          service: "Esmaltação",
          time: "09:00",
          duration: "30min",
          status: "confirmed",
          date: "2024-06-13"
        },
        {
          id: 2,
          clientName: "Ana Costa",
          service: "Pé e Mão",
          time: "14:30",
          duration: "90min",
          status: "pending",
          date: "2024-06-13"
        }
      ]
    },
    {
      id: 3,
      name: "Carlos Eduardo Santos",
      socialName: "Carlos",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      birthDate: "15/05/1985",
      color: "bg-blue-500",
      agendaInterval: 15,
      agendaOrder: 2,
      position: "CLT",
      canBeAssistant: true,
      specialties: "Corte e Barba",
      specialty: "Cabelo",
      description: "Especialista em cortes masculinos",
      email: "carlos@salon.com",
      accessLevel: "Profissionais",
      hasAgenda: true,
      showOnlineBooking: true,
      appointments: [
        {
          id: 3,
          clientName: "João Pereira",
          service: "Corte Masculino",
          time: "10:00",
          duration: "45min",
          status: "confirmed",
          date: "2024-06-13"
        }
      ]
    },
    {
      id: 4,
      name: "Fernanda Oliveira",
      socialName: "Fernanda",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      birthDate: "20/08/1990",
      color: "bg-purple-500",
      agendaInterval: 30,
      agendaOrder: 3,
      position: "Sócio",
      canBeAssistant: false,
      specialties: "Coloração e Tratamentos",
      specialty: "Cabelo",
      description: "Especialista em coloração e tratamentos capilares",
      email: "fernanda@salon.com",
      accessLevel: "Gerente",
      hasAgenda: true,
      showOnlineBooking: true,
      appointments: []
    }
  ]);

  const updateProfessional = (updatedProfessional: Professional) => {
    setProfessionals(prev => 
      prev.map(p => p.id === updatedProfessional.id ? updatedProfessional : p)
    );
  };

  return (
    <ProfessionalsContext.Provider value={{ professionals, updateProfessional, setProfessionals }}>
      {children}
    </ProfessionalsContext.Provider>
  );
};
