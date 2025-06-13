
import { useState, useMemo } from "react";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarSidebar from "./calendar/CalendarSidebar";
import CalendarContent from "./calendar/CalendarContent";
import { formatDate, addDays, getNavigationDelta } from "@/utils/dateUtils";

const CalendarView = () => {
  const { professionals } = useProfessionals();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("day");
  const [selectedProfessionals, setSelectedProfessionals] = useState(
    professionals.map(p => p.id)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const changeDate = (days: number) => {
    const newDate = addDays(selectedDate, days);
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

  // Memoizar profissionais ordenados e filtrados
  const sortedProfessionals = useMemo(() => 
    [...professionals].sort((a, b) => a.agendaOrder - b.agendaOrder),
    [professionals]
  );

  const filteredProfessionals = useMemo(() => 
    sortedProfessionals.filter(prof => 
      selectedProfessionals.includes(prof.id) &&
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      prof.hasAgenda
    ),
    [sortedProfessionals, selectedProfessionals, searchTerm]
  );

  const professionalsList = useMemo(() => 
    sortedProfessionals.filter(p => p.hasAgenda),
    [sortedProfessionals]
  );

  const selectedDateString = formatDate(selectedDate);

  return (
    <div className="h-full flex flex-col bg-background">
      <CalendarHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedDate={selectedDate}
        changeDate={changeDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex flex-1 min-h-0">
        <CalendarSidebar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          professionals={professionalsList}
          selectedProfessionals={selectedProfessionals}
          toggleProfessional={toggleProfessional}
          toggleAllProfessionals={toggleAllProfessionals}
        />

        <CalendarContent
          currentView={currentView}
          selectedDate={selectedDateString}
          filteredProfessionals={filteredProfessionals}
        />
      </div>
    </div>
  );
};

export default CalendarView;
