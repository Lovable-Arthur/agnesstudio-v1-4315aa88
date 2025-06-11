import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users, Filter, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("day");
  const [selectedProfessionals, setSelectedProfessionals] = useState(
    professionals.map(p => p.id)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const toggleProfessional = (professionalId: number) => {
    setSelectedProfessionals(prev => 
      prev.includes(professionalId) 
        ? prev.filter(id => id !== professionalId)
        : [...prev, professionalId]
    );
  };

  const toggleAllProfessionals = () => {
    setSelectedProfessionals(prev => 
      prev.length === professionals.length ? [] : professionals.map(p => p.id)
    );
  };

  const filteredProfessionals = professionals.filter(prof => 
    selectedProfessionals.includes(prof.id) &&
    prof.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const selectedDateString = selectedDate.toISOString().split('T')[0];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-6">
            <Tabs value={currentView} onValueChange={setCurrentView} className="flex items-center">
              <TabsList className="grid grid-cols-4 w-auto">
                <TabsTrigger value="agenda" className="px-4 py-2">Agenda</TabsTrigger>
                <TabsTrigger value="day" className="px-4 py-2">Dia</TabsTrigger>
                <TabsTrigger value="week" className="px-4 py-2">Semana</TabsTrigger>
                <TabsTrigger value="month" className="px-4 py-2">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {getMonthName(selectedDate)}
              </span>
              <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date())}
              className="text-primary"
            >
              Hoje
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r bg-card flex flex-col">
          {/* Mini Calendar */}
          <div className="p-4 border-b">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border-0"
            />
          </div>

          {/* Professionals Filter */}
          <div className="p-4 flex-1 overflow-auto">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm mb-3">Profissionais</h3>
                <Input
                  placeholder="Pesquisar profissional"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-3"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-professionals"
                    checked={selectedProfessionals.length === professionals.length}
                    onCheckedChange={toggleAllProfessionals}
                  />
                  <label
                    htmlFor="all-professionals"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Todos
                  </label>
                </div>
                
                {professionals
                  .filter(prof => prof.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((professional) => (
                  <div key={professional.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`prof-${professional.id}`}
                      checked={selectedProfessionals.includes(professional.id)}
                      onCheckedChange={() => toggleProfessional(professional.id)}
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <div className={`w-3 h-3 rounded-full ${professional.color}`}></div>
                      <label
                        htmlFor={`prof-${professional.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {professional.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Tabs value={currentView} className="h-full">
            <TabsContent value="agenda" className="mt-0 h-full">
              <DayView 
                selectedDate={selectedDateString} 
                professionals={filteredProfessionals}
              />
            </TabsContent>
            
            <TabsContent value="day" className="mt-0 h-full">
              <DayView 
                selectedDate={selectedDateString} 
                professionals={filteredProfessionals}
              />
            </TabsContent>
            
            <TabsContent value="week" className="mt-0 h-full">
              <WeekView 
                selectedDate={selectedDateString} 
                professionals={filteredProfessionals}
              />
            </TabsContent>
            
            <TabsContent value="month" className="mt-0 h-full">
              <MonthView 
                selectedDate={selectedDateString} 
                professionals={filteredProfessionals}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
