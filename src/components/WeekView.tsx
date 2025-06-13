import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Professional, Appointment } from "@/types/calendar";

interface WeekViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const WeekView = ({ selectedDate, professionals }: WeekViewProps) => {
  // Calcular os dias da semana a partir da data selecionada
  const getWeekDays = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return {
        date: day.toISOString().split('T')[0],
        dayName: day.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNumber: day.getDate()
      };
    });
  };

  const weekDays = getWeekDays(selectedDate);

  const getAppointmentsForDay = (date: string) => {
    const dayAppointments: { [key: number]: Appointment[] } = {};
    professionals.forEach(prof => {
      dayAppointments[prof.id] = prof.appointments.filter(apt => apt.date === date);
    });
    return dayAppointments;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header com dias da semana */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="font-medium text-sm text-muted-foreground py-2">
                Profissional
              </div>
              {weekDays.map((day) => (
                <div key={day.date} className="text-center">
                  <div className={`p-2 rounded-lg text-sm font-medium ${
                    day.date === selectedDate ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {day.dayName}
                  </div>
                  <div className="text-xs text-muted-foreground p-1">
                    {day.dayNumber}
                  </div>
                </div>
              ))}
            </div>

            {/* Grade com profissionais e dias */}
            <div className="space-y-2">
              {professionals.map((professional) => (
                <div key={professional.id} className="grid grid-cols-8 gap-2">
                  <div className="flex items-center space-x-2 p-2 border-r">
                    <div className={`w-3 h-3 rounded-full ${professional.color}`}></div>
                    <div>
                      <div className="font-medium text-sm">{professional.name}</div>
                      <div className="text-xs text-muted-foreground">{professional.specialty}</div>
                    </div>
                  </div>
                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsForDay(day.date)[professional.id] || [];
                    return (
                      <div key={day.date} className="border rounded p-2 min-h-[80px] bg-card">
                        <div className="space-y-1">
                          {dayAppointments.map((appointment) => (
                            <div key={appointment.id} className={`p-1 rounded text-xs border ${getStatusColor(appointment.status)}`}>
                              <div className="font-medium truncate">
                                {appointment.time} - {appointment.clientName}
                              </div>
                              <div className="text-xs opacity-75 truncate">
                                {appointment.service}
                              </div>
                            </div>
                          ))}
                          {dayAppointments.length === 0 && (
                            <div className="h-full bg-gray-50 rounded opacity-50 text-center text-xs text-muted-foreground py-2">
                              Sem agendamentos
                            </div>
                          )}
                        </div>
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

export default WeekView;
