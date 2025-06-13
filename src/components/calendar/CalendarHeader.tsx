
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, getNavigationDelta } from "@/utils/dateUtils";

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
  const getDisplayText = (date: Date, view: string) => {
    switch (view) {
      case 'month':
        return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekEnd = addDays(weekStart, 6);
        return `${weekStart.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${weekEnd.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
      default:
        return date.toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long',
          year: 'numeric' 
        });
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const delta = getNavigationDelta(currentView);
    changeDate(direction === 'next' ? delta : -delta);
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
            <Button variant="outline" size="sm" onClick={() => handleNavigation('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[200px] text-center">
              {getDisplayText(selectedDate, currentView)}
            </span>
            <Button variant="outline" size="sm" onClick={() => handleNavigation('next')}>
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
