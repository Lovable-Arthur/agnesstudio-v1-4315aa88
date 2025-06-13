
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Professional } from "@/types/calendar";
import DayView from "../DayView";
import WeekView from "../WeekView";
import MonthView from "../MonthView";

interface CalendarContentProps {
  currentView: string;
  selectedDate: string;
  filteredProfessionals: Professional[];
}

const CalendarContent = ({ currentView, selectedDate, filteredProfessionals }: CalendarContentProps) => {
  return (
    <div className="flex-1 min-h-0">
      <Tabs value={currentView} className="h-full flex flex-col">
        <TabsContent value="agenda" className="flex-1 min-h-0 m-0">
          <ScrollArea className="h-full">
            <DayView 
              selectedDate={selectedDate} 
              professionals={filteredProfessionals}
            />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="day" className="flex-1 min-h-0 m-0">
          <ScrollArea className="h-full">
            <DayView 
              selectedDate={selectedDate} 
              professionals={filteredProfessionals}
            />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="week" className="flex-1 min-h-0 m-0">
          <ScrollArea className="h-full">
            <WeekView 
              selectedDate={selectedDate} 
              professionals={filteredProfessionals}
            />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="month" className="flex-1 min-h-0 m-0">
          <ScrollArea className="h-full">
            <MonthView 
              selectedDate={selectedDate} 
              professionals={filteredProfessionals}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarContent;
