
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedDate: Date;
  changeDate: (days: number) => void;
  setSelectedDate: (date: Date) => void;
}

const CalendarHeader = ({ 
  currentView, 
  setCurrentView, 
  selectedDate, 
  changeDate, 
  setSelectedDate 
}: CalendarHeaderProps) => {
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="border-b bg-card flex-shrink-0">
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
  );
};

export default CalendarHeader;
