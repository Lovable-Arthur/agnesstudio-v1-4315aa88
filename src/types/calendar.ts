
export interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  duration: string;
  status: "agendado" | "confirmado" | "aguardando" | "em-atendimento" | "finalizado" | "pago" | "cancelado" | "faltou";
  date: string;
  labels?: string[];
  observations?: string;
  professionalName?: string;
}

export interface Professional {
  id: number;
  name: string;
  socialName: string;
  cpf: string;
  rg: string;
  birthDate: string;
  color: string;
  agendaInterval: number;
  agendaOrder: number;
  position: string;
  canBeAssistant: boolean;
  specialties: string;
  specialty: string; // mantendo para compatibilidade
  description: string;
  email: string;
  accessLevel: string;
  hasAgenda: boolean;
  showOnlineBooking: boolean;
  avatar?: string;
  appointments: Appointment[];
}
