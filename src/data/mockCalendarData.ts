
import { Professional } from "@/types/calendar";

export const professionals: Professional[] = [
  {
    id: 1,
    name: "Maria Silva",
    specialty: "Cabelo e Coloração",
    color: "bg-blue-500",
    appointments: [
      {
        id: 1,
        clientName: "Ana Costa",
        service: "Corte Feminino",
        time: "09:00",
        duration: "45 min",
        status: "confirmed" as const,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: 2,
        clientName: "Beatriz Santos",
        service: "Coloração",
        time: "11:00",
        duration: "2h 30min",
        status: "confirmed" as const,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: 3,
        clientName: "Carla Oliveira",
        service: "Escova Progressiva",
        time: "14:30",
        duration: "3h",
        status: "pending" as const,
        date: new Date().toISOString().split('T')[0]
      }
    ]
  },
  {
    id: 2,
    name: "João Pereira",
    specialty: "Cortes Masculinos",
    color: "bg-green-500",
    appointments: [
      {
        id: 4,
        clientName: "Pedro Lima",
        service: "Corte Masculino",
        time: "10:00",
        duration: "30 min",
        status: "completed" as const,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: 5,
        clientName: "Carlos Rocha",
        service: "Barba",
        time: "15:00",
        duration: "20 min",
        status: "confirmed" as const,
        date: new Date().toISOString().split('T')[0]
      }
    ]
  },
  {
    id: 3,
    name: "Fernanda Costa",
    specialty: "Manicure e Pedicure",
    color: "bg-purple-500",
    appointments: [
      {
        id: 6,
        clientName: "Lúcia Mendes",
        service: "Manicure",
        time: "08:30",
        duration: "30 min",
        status: "completed" as const,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: 7,
        clientName: "Sofia Alves",
        service: "Pedicure",
        time: "13:00",
        duration: "45 min",
        status: "confirmed" as const,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: 8,
        clientName: "Mônica Ribeiro",
        service: "Manicure",
        time: "16:30",
        duration: "30 min",
        status: "pending" as const,
        date: new Date().toISOString().split('T')[0]
      }
    ]
  },
  {
    id: 4,
    name: "Ricardo Martins",
    specialty: "Estética e Sobrancelha",
    color: "bg-orange-500",
    appointments: [
      {
        id: 9,
        clientName: "Juliana Ferreira",
        service: "Sobrancelha",
        time: "12:00",
        duration: "20 min",
        status: "confirmed" as const,
        date: new Date().toISOString().split('T')[0]
      }
    ]
  },
  {
    id: 5,
    name: "Camila Rodrigues",
    specialty: "Tratamentos Capilares",
    color: "bg-pink-500",
    appointments: []
  }
];
