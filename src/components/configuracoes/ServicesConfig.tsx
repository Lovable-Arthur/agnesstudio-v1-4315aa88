
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Plus, Package, Scissors } from "lucide-react";
import ServicesList from "./services/ServicesList";
import ServiceForm from "./services/ServiceForm";
import { useServices, Service } from "@/contexts/ServicesContext";

interface ServicesConfigProps {
  onBack: () => void;
}

const ServicesConfig = ({ onBack }: ServicesConfigProps) => {
  const { services, addService, updateService, deleteService } = useServices();
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = () => {
    setEditingService(null);
    setCurrentView('form');
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setCurrentView('form');
  };

  const handleSaveService = (serviceData: Omit<Service, 'id'>) => {
    if (editingService) {
      updateService({ ...serviceData, id: editingService.id });
    } else {
      addService(serviceData);
    }
    setCurrentView('list');
    setEditingService(null);
  };

  const handleDeleteService = (id: number) => {
    deleteService(id);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingService(null);
  };

  if (currentView === 'form') {
    return (
      <ServiceForm
        service={editingService}
        onSave={handleSaveService}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Configurações
        </Button>
        <span className="text-sm text-muted-foreground">Serviços e Pacotes</span>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <CardTitle>Gerenciar Serviços e Pacotes</CardTitle>
              </div>
              <Button onClick={handleAddService} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Scissors className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Total de Serviços</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {services.filter(s => !s.isPackage && s.active).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Total de Pacotes</p>
                      <p className="text-2xl font-bold text-green-600">
                        {services.filter(s => s.isPackage && s.active).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Receita Média</p>
                      <p className="text-2xl font-bold text-purple-600">
                        R$ {Math.round(services.reduce((acc, s) => acc + s.price, 0) / services.length)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ServicesList
              services={services}
              onEdit={handleEditService}
              onDelete={handleDeleteService}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesConfig;
