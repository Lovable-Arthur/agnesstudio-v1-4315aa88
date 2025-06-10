
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onBookingOpen: () => void;
}

const Header = ({ onBookingOpen }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Beleza Salon</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => window.location.href = '/agenda'} variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Agenda
            </Button>
            <Button onClick={onBookingOpen} className="bg-primary hover:bg-primary/90">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
