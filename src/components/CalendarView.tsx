
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";

// Dados mockados dos profissionais e agendamentos
export const professionals = [
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

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentView, setCurrentView] = useState("day");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(selectedDate + 'T00:00:00');
    currentDate.setDate(currentDate.getDate() + days);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const totalAppointments = professionals.reduce((total, prof) => total + prof.appointments.length, 0);

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Agenda dos Profissionais</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {formatDate(selectedDate)} • {totalAppointments} agendamentos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => changeDate(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Hoje
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => changeDate(1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Views */}
      <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="day">Dia</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mês</TabsTrigger>
        </TabsList>
        
        <TabsContent value="day" className="mt-6">
          <DayView 
            selectedDate={selectedDate} 
            professionals={professionals}
          />
        </TabsContent>
        
        <TabsContent value="week" className="mt-6">
          <WeekView 
            selectedDate={selectedDate} 
            professionals={professionals}
          />
        </TabsContent>
        
        <TabsContent value="month" className="mt-6">
          <MonthView 
            selectedDate={selectedDate} 
            professionals={professionals}
          />
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{totalAppointments}</div>
              <div className="text-sm text-muted-foreground">Total de Agendamentos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {professionals.reduce((total, prof) => 
                  total + prof.appointments.filter(apt => apt.status === "confirmed").length, 0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Confirmados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {professionals.reduce((total, prof) => 
                  total + prof.appointments.filter(apt => apt.status === "pending").length, 0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {professionals.reduce((total, prof) => 
                  total + prof.appointments.filter(apt => apt.status === "completed").length, 0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Concluídos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
