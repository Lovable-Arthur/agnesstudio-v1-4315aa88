
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
        <Download className="w-4 h-4 mr-2" />
        Imprimir Dashboard
      </Button>
      <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
        <Download className="w-4 h-4 mr-2" />
        Exportar Dashboard
      </Button>
    </div>
  );
};

export default ActionButtons;
