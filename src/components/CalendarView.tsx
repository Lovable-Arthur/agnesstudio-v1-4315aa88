
import { useState } from "react";
import { professionals } from "@/data/mockCalendarData";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarSidebar from "./calendar/CalendarSidebar";
import CalendarContent from "./calendar/CalendarContent";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("day");
  const [selectedProfessionals, setSelectedProfessionals] = useState(
    professionals.map(p => p.id)
  );
  const [searchTerm, setSearchTerm] = useState("");

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

  const selectedDateString = selectedDate.toISOString().split('T')[0];

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
          professionals={professionals}
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
