
import CalendarView from "@/components/CalendarView";

const Schedule = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Beleza Salon</h1>
            </div>
            <button onClick={() => window.location.href = '/'} className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium">
              Voltar ao Site
            </button>
          </div>
        </div>
      </header>

      {/* Calendar View */}
      <div className="flex-1 overflow-hidden">
        <CalendarView />
      </div>
    </div>
  );
};

export default Schedule;
