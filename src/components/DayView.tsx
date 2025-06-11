
import { Card, CardContent } from "@/components/ui/card";
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
  // Gerar horários de 7h às 22h em intervalos de 10 minutos
  const timeSlots = Array.from({ length: 90 }, (_, i) => {
    const totalMinutes = 7 * 60 + i * 10; // Começar às 7:00
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const getAppointmentForTimeSlot = (professional: Professional, timeSlot: string) => {
    return professional.appointments.find(apt => 
      apt.date === selectedDate && apt.time === timeSlot
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500 text-white border-blue-600";
      case "pending":
        return "bg-yellow-500 text-white border-yellow-600";
      case "completed":
        return "bg-green-500 text-white border-green-600";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProfessionalColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-200',
      'bg-green-500': 'bg-green-200', 
      'bg-purple-500': 'bg-purple-200',
      'bg-orange-500': 'bg-orange-200',
      'bg-pink-500': 'bg-pink-200'
    };
    return colorMap[color] || 'bg-gray-200';
  };

  // Filtrar apenas horários principais para exibição (intervalos de 30min)
  const displayTimeSlots = timeSlots.filter((_, index) => index % 3 === 0);

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header com profissionais */}
      <div className="sticky top-0 bg-card border-b z-10">
        <div className="grid gap-0" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
          <div className="p-3 border-r bg-muted">
            <div className="text-xs text-muted-foreground font-medium">Horário</div>
          </div>
          {professionals.map((professional) => (
            <div key={professional.id} className="p-3 border-r last:border-r-0 text-center">
              <div className={`${professional.color} text-white p-2 rounded-lg text-sm font-medium mb-1`}>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span>{professional.name}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {professional.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade de horários */}
      <div className="grid gap-0" style={{ gridTemplateColumns: `80px repeat(${professionals.length}, 1fr)` }}>
        {displayTimeSlots.map((timeSlot, timeIndex) => (
          <>
            {/* Coluna de horário */}
            <div key={`time-${timeSlot}`} className="p-2 border-r border-b bg-muted text-center">
              <div className="text-xs text-muted-foreground font-medium">
                {timeSlot}
              </div>
            </div>
            
            {/* Colunas dos profissionais */}
            {professionals.map((professional, profIndex) => {
              const appointment = getAppointmentForTimeSlot(professional, timeSlot);
              return (
                <div 
                  key={`${timeSlot}-${professional.id}`} 
                  className={`border-r border-b last:border-r-0 min-h-[60px] p-1 ${getProfessionalColor(professional.color)}`}
                >
                  {appointment ? (
                    <div className={`h-full p-2 rounded text-xs border-2 ${getStatusColor(appointment.status)}`}>
                      <div className="font-medium truncate text-white">
                        {appointment.time}
                      </div>
                      <div className="font-semibold truncate text-white">
                        {appointment.clientName}
                      </div>
                      <div className="text-xs opacity-90 truncate">
                        {appointment.service}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full rounded opacity-30 hover:opacity-50 cursor-pointer transition-opacity">
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default DayView;
