import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Professional, Appointment } from "@/types/calendar";

interface MonthViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const MonthView = ({ selectedDate, professionals }: MonthViewProps) => {
  const selected = new Date(selectedDate + 'T00:00:00');

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return professionals.reduce((total, prof) => {
      return total + prof.appointments.filter(apt => apt.date === dateString).length;
    }, 0);
  };

  const getAppointmentsByStatus = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const stats = { confirmed: 0, pending: 0, completed: 0 };
    
    professionals.forEach(prof => {
      prof.appointments.forEach(apt => {
        if (apt.date === dateString) {
          stats[apt.status]++;
        }
      });
    });
    
    return stats;
  };

  const modifiers = {
    hasAppointments: (date: Date) => getAppointmentsForDate(date) > 0
  };

  const modifiersStyles = {
    hasAppointments: {
      fontWeight: 'bold',
      backgroundColor: 'hsl(var(--accent))',
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Visualização do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selected}
            className="rounded-md border w-full"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            components={{
              DayContent: ({ date }) => {
                const appointmentCount = getAppointmentsForDate(date);
                const stats = getAppointmentsByStatus(date);
                
                return (
                  <div className="relative w-full h-full p-1">
                    <div className="text-center">
                      {date.getDate()}
                    </div>
                    {appointmentCount > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 space-y-0.5">
                        <div className="text-xs text-center font-semibold">
                          {appointmentCount}
                        </div>
                        <div className="flex justify-center space-x-0.5">
                          {stats.confirmed > 0 && (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          )}
                          {stats.pending > 0 && (
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                          )}
                          {stats.completed > 0 && (
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selected.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {professionals.map((professional) => {
              const dayAppointments = professional.appointments.filter(
                apt => apt.date === selectedDate
              );
              
              return (
                <div key={professional.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${professional.color}`}></div>
                    <span className="font-medium text-sm">{professional.name}</span>
                  </div>
                  
                  {dayAppointments.length > 0 ? (
                    <div className="space-y-1 ml-5">
                      {dayAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded p-2 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{appointment.time}</div>
                              <div className="text-muted-foreground">{appointment.clientName}</div>
                              <div className="text-muted-foreground">{appointment.service}</div>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={
                                appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                                appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-blue-100 text-blue-800"
                              }
                            >
                              {appointment.status === "confirmed" && "Confirmado"}
                              {appointment.status === "pending" && "Pendente"}
                              {appointment.status === "completed" && "Concluído"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="ml-5 text-xs text-muted-foreground">
                      Sem agendamentos
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthView;
