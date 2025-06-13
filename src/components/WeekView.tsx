
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Professional, Appointment } from "@/types/calendar";
import { getWeekDays } from "@/utils/dateUtils";
import { getStatusBadgeColor } from "@/utils/styleUtils";

interface WeekViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const WeekView = ({ selectedDate, professionals }: WeekViewProps) => {
  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

  const getAppointmentsForDay = (date: string) => {
    const dayAppointments: { [key: number]: Appointment[] } = {};
    professionals.forEach(prof => {
      dayAppointments[prof.id] = prof.appointments.filter(apt => apt.date === date);
    });
    return dayAppointments;
  };

  const renderDayHeader = (day: typeof weekDays[0]) => (
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
  );

  const renderAppointment = (appointment: Appointment) => (
    <div key={appointment.id} className={`p-1 rounded text-xs border ${getStatusBadgeColor(appointment.status)}`}>
      <div className="font-medium truncate">
        {appointment.time} - {appointment.clientName}
      </div>
      <div className="text-xs opacity-75 truncate">
        {appointment.service}
      </div>
    </div>
  );

  const renderProfessionalRow = (professional: Professional) => (
    <div key={professional.id} className="grid grid-cols-8 gap-2">
      <div className="flex items-center space-x-2 p-2 border-r">
        <div className={`w-3 h-3 rounded-full ${professional.color}`}></div>
        <div>
          <div className="font-medium text-sm truncate">{professional.name}</div>
          <div className="text-xs text-muted-foreground truncate">{professional.specialty}</div>
        </div>
      </div>
      {weekDays.map((day) => {
        const dayAppointments = getAppointmentsForDay(day.date)[professional.id] || [];
        return (
          <div key={day.date} className="border rounded p-2 min-h-[80px] bg-card">
            <div className="space-y-1">
              {dayAppointments.length > 0 ? (
                dayAppointments.map(renderAppointment)
              ) : (
                <div className="h-full bg-gray-50 rounded opacity-50 text-center text-xs text-muted-foreground py-2">
                  Sem agendamentos
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

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
              {weekDays.map(renderDayHeader)}
            </div>

            {/* Grade com profissionais e dias */}
            <div className="space-y-2">
              {professionals.map(renderProfessionalRow)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekView;
