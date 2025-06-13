
export interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
  date: string;
}

export interface Professional {
  id: number;
  name: string;
  specialty: string;
  color: string;
  appointments: Appointment[];
}
