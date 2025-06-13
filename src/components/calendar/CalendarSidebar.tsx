
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Professional } from "@/types/calendar";

interface CalendarSidebarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  professionals: Professional[];
  selectedProfessionals: number[];
  toggleProfessional: (id: number) => void;
  toggleAllProfessionals: () => void;
}

const CalendarSidebar = ({
  selectedDate,
  setSelectedDate,
  searchTerm,
  setSearchTerm,
  professionals,
  selectedProfessionals,
  toggleProfessional,
  toggleAllProfessionals
}: CalendarSidebarProps) => {
  return (
    <div className="w-64 border-r bg-card flex flex-col">
      {/* Mini Calendar */}
      <div className="p-4 border-b flex-shrink-0">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border-0"
        />
      </div>

      {/* Professionals Filter */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4">
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default CalendarSidebar;
