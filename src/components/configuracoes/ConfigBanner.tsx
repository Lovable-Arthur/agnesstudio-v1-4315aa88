
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ConfigBanner = () => {
  return (
    <div className="mb-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Dicas de segurança e antifraude</h2>
          <p className="text-purple-100">A segurança dos seus dados importa pra gente</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Indicadores de slide */}
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default ConfigBanner;
