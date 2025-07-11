
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Professional } from "@/types/calendar";
import { ptBR } from "date-fns/locale";

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
      <div className="p-3 border-b flex-shrink-0">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
          {/* Header do calendário */}
          <div className="bg-red-500 text-white p-2">
            <h3 className="text-sm font-medium text-center">Calendário</h3>
          </div>
          
          {/* Calendário */}
          <div className="p-1">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={ptBR}
              className="rounded-md border-0 w-full"
              classNames={{
                months: "flex flex-col space-y-1",
                month: "space-y-1 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-xs font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-200 rounded text-xs",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground w-full text-center font-normal text-[0.6rem] p-0 flex-1",
                row: "flex w-full",
                cell: "text-center text-xs p-0 relative flex-1 h-6 flex items-center justify-center",
                day: "h-6 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-red-50 rounded text-xs flex items-center justify-center",
                day_selected: "bg-red-500 text-white hover:bg-red-600",
                day_today: "bg-gray-100 text-gray-900",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
              }}
              formatters={{
                formatWeekdayName: (date) => {
                  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
                  return days[date.getDay()];
                }
              }}
            />
          </div>
        </div>
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
                  .filter(prof => {
                    const displayName = prof.socialName || prof.name;
                    return displayName.toLowerCase().includes(searchTerm.toLowerCase());
                  })
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
                        {professional.socialName || professional.name}
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
