
export interface ServiceItem {
  id: string;
  serviceId: string;
  professionalId: string;
  startTime: string;
  endTime: string;
  price: string;
  duration?: string;
}

export interface AppointmentFormData {
  clientName: string;
  services: Array<{
    name: string;
    startTime: string;
    endTime: string;
    price: number;
    professionalId: number;
  }>;
  time: string;
  endTime: string;
  duration: string;
  status: "agendado" | "confirmado" | "aguardando" | "em-atendimento" | "finalizado" | "pago" | "cancelado" | "faltou";
  date: string;
  professionalId: number;
  totalPrice: number;
  labels: string[];
  observations: string;
}

export interface UseAppointmentFormProps {
  initialTimeSlot: string;
  initialProfessionalId: number;
  selectedDate: string;
  onAddAppointment?: (appointmentData: AppointmentFormData) => void;
}
