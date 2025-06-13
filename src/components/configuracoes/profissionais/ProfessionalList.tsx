
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, X, User } from "lucide-react";

interface Professional {
  id: number;
  name: string;
  socialName: string;
  position: string;
  accessLevel: string;
}

interface ProfessionalListProps {
  professionals: Professional[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectProfessional: (professional: Professional) => void;
}

const ProfessionalList = ({ 
  professionals, 
  searchTerm, 
  onSearchChange, 
  onSelectProfessional 
}: ProfessionalListProps) => {
  const filteredProfessionals = professionals.filter(prof => 
    prof.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 space-y-4">
      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Profissional
      </Button>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Pesquisar profissional"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => onSearchChange("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Total: {professionals.length}
      </div>

      <div className="space-y-2">
        {filteredProfessionals.map((professional) => (
          <Card 
            key={professional.id} 
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onSelectProfessional(professional)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{professional.socialName}</div>
                  <div className="text-sm text-muted-foreground">{professional.position}</div>
                </div>
                {professional.accessLevel === "master" && (
                  <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">MASTER</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-blue-500 text-sm cursor-pointer">
        Profissionais excluídos
      </div>
    </div>
  );
};

export default ProfessionalList;
