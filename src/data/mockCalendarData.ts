
import { Professional } from "@/types/calendar";

export const mockProfessionals: Professional[] = [
  {
    id: 1,
    name: "Ana Silva",
    socialName: "Ana Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    birthDate: "1990-05-15",
    specialty: "Cabeleireira",
    color: "bg-blue-500",
    agendaInterval: 30,
    agendaOrder: 1,
    position: "Cabeleireira Sênior",
    canBeAssistant: false,
    specialties: "Corte, Coloração, Escova",
    description: "Especialista em cortes modernos e coloração",
    email: "ana@belezasalon.com",
    accessLevel: "professional",
    hasAgenda: true,
    showOnlineBooking: true,
    appointments: [
      {
        id: 1,
        clientName: "Maria José",
        service: "Corte e Escova",
        time: "09:00",
        duration: "1h 30min",
        status: "confirmed",
        date: "2024-01-15"
      },
      {
        id: 2,
        clientName: "João Silva",
        service: "Barba",
        time: "11:00",
        duration: "30min",
        status: "pending",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 2,
    name: "Carlos Santos",
    socialName: "Carlos Santos",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    birthDate: "1985-03-20",
    specialty: "Barbeiro",
    color: "bg-green-500",
    agendaInterval: 20,
    agendaOrder: 2,
    position: "Barbeiro",
    canBeAssistant: false,
    specialties: "Corte Masculino, Barba, Bigode",
    description: "Especialista em cortes masculinos tradicionais e modernos",
    email: "carlos@belezasalon.com",
    accessLevel: "professional",
    hasAgenda: true,
    showOnlineBooking: true,
    appointments: [
      {
        id: 3,
        clientName: "Pedro Oliveira",
        service: "Corte Masculino",
        time: "10:00",
        duration: "45min",
        status: "completed",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 3,
    name: "Fernanda Lima",
    socialName: "Fernanda Lima",
    cpf: "456.789.123-00",
    rg: "45.678.912-3",
    birthDate: "1992-08-10",
    specialty: "Manicure",
    color: "bg-purple-500",
    agendaInterval: 60,
    agendaOrder: 3,
    position: "Manicure e Pedicure",
    canBeAssistant: true,
    specialties: "Manicure, Pedicure, Nail Art",
    description: "Especialista em cuidados com as unhas",
    email: "fernanda@belezasalon.com",
    accessLevel: "professional",
    hasAgenda: true,
    showOnlineBooking: true,
    appointments: [
      {
        id: 4,
        clientName: "Ana Paula",
        service: "Manicure",
        time: "14:00",
        duration: "1h",
        status: "completed",
        date: "2024-01-15"
      },
      {
        id: 5,
        clientName: "Beatriz Costa",
        service: "Pedicure",
        time: "15:30",
        duration: "1h 15min",
        status: "confirmed",
        date: "2024-01-15"
      },
      {
        id: 6,
        clientName: "Carla Mendes",
        service: "Nail Art",
        time: "17:00",
        duration: "2h",
        status: "pending",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 4,
    name: "Roberto Alves",
    socialName: "Roberto Alves",
    cpf: "789.123.456-00",
    rg: "78.912.345-6",
    birthDate: "1988-12-05",
    specialty: "Esteticista",
    color: "bg-orange-500",
    agendaInterval: 45,
    agendaOrder: 4,
    position: "Esteticista",
    canBeAssistant: false,
    specialties: "Limpeza de Pele, Tratamentos Faciais",
    description: "Especialista em tratamentos estéticos faciais",
    email: "roberto@belezasalon.com",
    accessLevel: "professional",
    hasAgenda: true,
    showOnlineBooking: false,
    appointments: [
      {
        id: 7,
        clientName: "Lucia Santos",
        service: "Limpeza de Pele",
        time: "13:00",
        duration: "1h 30min",
        status: "confirmed",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 5,
    name: "Patrícia Rocha",
    socialName: "Patrícia Rocha",
    cpf: "321.654.987-00",
    rg: "32.165.498-7",
    birthDate: "1995-07-22",
    specialty: "Massagista",
    color: "bg-pink-500",
    agendaInterval: 90,
    agendaOrder: 5,
    position: "Massagista",
    canBeAssistant: false,
    specialties: "Massagem Relaxante, Drenagem Linfática",
    description: "Especialista em massagens terapêuticas",
    email: "patricia@belezasalon.com",
    accessLevel: "professional",
    hasAgenda: true,
    showOnlineBooking: true,
    appointments: []
  }
];
