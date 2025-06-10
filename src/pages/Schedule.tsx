
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfessionalSchedule from "@/components/ProfessionalSchedule";

// Dados mockados dos profissionais e agendamentos
const professionals = [
  {
    id: 1,
    name: "Maria Silva",
    specialty: "Cabelo e Coloração",
    appointments: [
      {
        id: 1,
        clientName: "Ana Costa",
        service: "Corte Feminino",
        time: "09:00",
        duration: "45 min",
        status: "confirmed" as const
      },
      {
        id: 2,
        clientName: "Beatriz Santos",
        service: "Coloração",
        time: "11:00",
        duration: "2h 30min",
        status: "confirmed" as const
      },
      {
        id: 3,
        clientName: "Carla Oliveira",
        service: "Escova Progressiva",
        time: "14:30",
        duration: "3h",
        status: "pending" as const
      }
    ]
  },
  {
    id: 2,
    name: "João Pereira",
    specialty: "Cortes Masculinos",
    appointments: [
      {
        id: 4,
        clientName: "Pedro Lima",
        service: "Corte Masculino",
        time: "10:00",
        duration: "30 min",
        status: "completed" as const
      },
      {
        id: 5,
        clientName: "Carlos Rocha",
        service: "Barba",
        time: "15:00",
        duration: "20 min",
        status: "confirmed" as const
      }
    ]
  },
  {
    id: 3,
    name: "Fernanda Costa",
    specialty: "Manicure e Pedicure",
    appointments: [
      {
        id: 6,
        clientName: "Lúcia Mendes",
        service: "Manicure",
        time: "08:30",
        duration: "30 min",
        status: "completed" as const
      },
      {
        id: 7,
        clientName: "Sofia Alves",
        service: "Pedicure",
        time: "13:00",
        duration: "45 min",
        status: "confirmed" as const
      },
      {
        id: 8,
        clientName: "Mônica Ribeiro",
        service: "Manicure",
        time: "16:30",
        duration: "30 min",
        status: "pending" as const
      }
    ]
  },
  {
    id: 4,
    name: "Ricardo Martins",
    specialty: "Estética e Sobrancelha",
    appointments: [
      {
        id: 9,
        clientName: "Juliana Ferreira",
        service: "Sobrancelha",
        time: "12:00",
        duration: "20 min",
        status: "confirmed" as const
      }
    ]
  },
  {
    id: 5,
    name: "Camila Rodrigues",
    specialty: "Tratamentos Capilares",
    appointments: []
  }
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Beleza Salon</h1>
            </div>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Voltar ao Site
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Date Navigation */}
        <Card className="mb-8">
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

        {/* Professionals Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <ProfessionalSchedule
              key={professional.id}
              professional={professional}
              selectedDate={selectedDate}
            />
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
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
    </div>
  );
};

export default Schedule;
