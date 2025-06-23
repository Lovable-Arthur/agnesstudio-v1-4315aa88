import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Professional, Appointment } from "@/types/calendar";
import { formatDate } from "@/utils/dateUtils";
import { getStatusBadgeColor, getStatusLabel } from "@/utils/styleUtils";

interface MonthViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const MonthView = ({ selectedDate, professionals }: MonthViewProps) => {
  const selected = useMemo(() => new Date(selectedDate + 'T00:00:00'), [selectedDate]);

  const getAppointmentsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return professionals.reduce((total, prof) => {
      return total + prof.appointments.filter(apt => apt.date === dateString).length;
    }, 0);
  };

  const getAppointmentsByStatus = (date: Date) => {
    const dateString = formatDate(date);
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

  const getLabelColors = () => {
    const predefinedLabels = [
      { name: "Química", color: "bg-emerald-500" },
      { name: "Preferência", color: "bg-blue-500" },
      { name: "Maquiagem", color: "bg-pink-500" },
      { name: "Nova", color: "bg-purple-500" },
      { name: "Pé e Mão", color: "bg-indigo-500" }
    ];

    const labelColors = [
      "bg-emerald-500",
      "bg-blue-500", 
      "bg-purple-500",
      "bg-pink-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-teal-500"
    ];

    return { labelColors, predefinedLabels };
  };

  const modifiers = useMemo(() => ({
    hasAppointments: (date: Date) => getAppointmentsForDate(date) > 0
  }), [professionals]);

  const modifiersStyles = {
    hasAppointments: {
      fontWeight: 'bold',
      backgroundColor: 'hsl(var(--accent))',
    }
  };

  const renderDayContent = ({ date }: { date: Date }) => {
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
  };

  const renderAppointment = (appointment: Appointment) => {
    const { labelColors, predefinedLabels } = getLabelColors();
    
    return (
      <div key={appointment.id} className="border rounded-lg p-3 text-xs bg-white shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="font-medium mb-1">{appointment.time}</div>
            <div className="text-muted-foreground mb-1">{appointment.clientName}</div>
            <div className="text-muted-foreground text-xs">{appointment.service}</div>
          </div>
          <Badge 
            variant="secondary" 
            className={`${getStatusBadgeColor(appointment.status)} text-xs`}
          >
            {getStatusLabel(appointment.status)}
          </Badge>
        </div>
        {appointment.labels && appointment.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {appointment.labels.slice(0, 2).map((label, index) => {
              const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
              const color = predefinedLabel?.color || labelColors[index % labelColors.length];
              
              return (
                <span
                  key={label}
                  className={`${color} text-white text-[9px] px-2 py-1 rounded-full font-medium inline-block`}
                >
                  {label}
                </span>
              );
            })}
            {appointment.labels.length > 2 && (
              <span className="bg-gray-500 text-white text-[9px] px-2 py-1 rounded-full font-medium">
                +{appointment.labels.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderProfessionalSchedule = (professional: Professional) => {
    const dayAppointments = professional.appointments.filter(
      apt => apt.date === selectedDate
    );
    
    return (
      <div key={professional.id} className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${professional.color}`}></div>
          <span className="font-medium text-sm">{professional.socialName || professional.name}</span>
        </div>
        
        {dayAppointments.length > 0 ? (
          <div className="space-y-2 ml-5">
            {dayAppointments.map(renderAppointment)}
          </div>
        ) : (
          <div className="ml-5 text-xs text-muted-foreground">
            Sem agendamentos
          </div>
        )}
      </div>
    );
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
              DayContent: renderDayContent
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
            {professionals.map(renderProfessionalSchedule)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthView;
