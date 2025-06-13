
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Clock, DollarSign, Users, Package } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

interface ServicesListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

const ServicesList = ({ services, onEdit, onDelete }: ServicesListProps) => {
  const { professionals } = useProfessionals();
  const [activeTab, setActiveTab] = useState("todos");

  const getCategoryName = (category: string) => {
    const names = {
      cabelo: "Cabelo",
      manicure: "Manicure/Pedicure", 
      estetica: "Estética",
      outros: "Outros"
    };
    return names[category as keyof typeof names] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cabelo: "bg-blue-100 text-blue-800",
      manicure: "bg-pink-100 text-pink-800",
      estetica: "bg-purple-100 text-purple-800",
      outros: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getProfessionalNames = (allowedProfessionals: number[]) => {
    return professionals
      .filter(prof => allowedProfessionals.includes(prof.id))
      .map(prof => prof.socialName || prof.name)
      .join(", ");
  };

  const getPackageServices = (packageServices?: number[]) => {
    if (!packageServices) return [];
    return services
      .filter(service => packageServices.includes(service.id))
      .map(service => service.name);
  };

  const filteredServices = services.filter(service => {
    if (activeTab === "todos") return true;
    if (activeTab === "servicos") return !service.isPackage;
    if (activeTab === "pacotes") return service.isPackage;
    return service.category === activeTab;
  });

  const renderServiceCard = (service: Service) => (
    <Card key={service.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              {service.isPackage && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Package className="w-3 h-3 mr-1" />
                  Pacote
                </Badge>
              )}
              <Badge className={getCategoryColor(service.category)}>
                {getCategoryName(service.category)}
              </Badge>
              {!service.active && (
                <Badge variant="destructive">Inativo</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(service)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(service.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium">R$ {service.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-purple-600">%</span>
            <span>{service.commission}% comissão</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-orange-600" />
            <span className="text-xs truncate">{getProfessionalNames(service.allowedProfessionals)}</span>
          </div>
        </div>

        {service.isPackage && service.packageServices && service.packageServices.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-1">Serviços inclusos:</p>
            <div className="flex flex-wrap gap-1">
              {getPackageServices(service.packageServices).map((serviceName, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {serviceName}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="pacotes">Pacotes</TabsTrigger>
          <TabsTrigger value="cabelo">Cabelo</TabsTrigger>
          <TabsTrigger value="manicure">Manicure</TabsTrigger>
          <TabsTrigger value="estetica">Estética</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map(renderServiceCard)
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum serviço encontrado nesta categoria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
