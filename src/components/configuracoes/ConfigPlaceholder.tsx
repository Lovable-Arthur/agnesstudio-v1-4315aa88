
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ConfigPlaceholderProps {
  onBack: () => void;
}

const ConfigPlaceholder = ({ onBack }: ConfigPlaceholderProps) => {
  return (
    <div className="h-full bg-background p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
        Voltar para Configurações
      </Button>
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Seção em Desenvolvimento</h2>
        <p className="text-muted-foreground">Esta seção de configuração estará disponível em breve.</p>
      </div>
    </div>
  );
};

export default ConfigPlaceholder;
