
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
  date: string;
}

interface Professional {
  id: number;
  name: string;
  specialty: string;
  color: string;
  appointments: Appointment[];
}

interface DayViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const DayView = ({ selectedDate, professionals }: DayViewProps) => {
  // Gerar horários de 8h às 20h
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string) => {
    return professional.appointments.find(apt => 
      apt.date === selectedDate && apt.time === timeSlot
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização do Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header com nomes dos profissionais */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              <div className="font-medium text-sm text-muted-foreground py-2">
                Horário
              </div>
              {professionals.map((professional) => (
                <div key={professional.id} className="text-center">
                  <div className={`${professional.color} text-white p-2 rounded-t-lg text-sm font-medium`}>
                    {professional.name}
                  </div>
                  <div className="text-xs text-muted-foreground p-1 bg-muted rounded-b-lg">
                    {professional.specialty}
                  </div>
                </div>
              ))}
            </div>

            {/* Grade de horários */}
            <div className="space-y-1">
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="grid grid-cols-6 gap-2">
                  <div className="text-sm text-muted-foreground py-3 px-2 border-r">
                    {timeSlot}
                  </div>
                  {professionals.map((professional) => {
                    const appointment = getAppointmentForTimeSlot(professional, timeSlot);
                    return (
                      <div key={professional.id} className="border rounded p-1 min-h-[60px] bg-card">
                        {appointment ? (
                          <div className="h-full">
                            <div className={`p-2 rounded text-xs border ${getStatusColor(appointment.status)}`}>
                              <div className="font-medium truncate">
                                {appointment.clientName}
                              </div>
                              <div className="text-xs opacity-75 truncate">
                                {appointment.service}
                              </div>
                              <div className="text-xs opacity-75">
                                {appointment.duration}
                              </div>
                              <Badge className={`mt-1 text-xs ${getStatusColor(appointment.status)}`} variant="secondary">
                                {appointment.status === "confirmed" && "Confirmado"}
                                {appointment.status === "pending" && "Pendente"}
                                {appointment.status === "completed" && "Concluído"}
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full bg-gray-50 rounded opacity-50"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayView;
