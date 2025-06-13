
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Save, X } from "lucide-react";
import { Service } from "@/contexts/ServicesContext";
import { useProfessionals } from "@/contexts/ProfessionalsContext";
import { useServices } from "@/contexts/ServicesContext";

interface ServiceFormProps {
  service: Service | null;
  onSave: (service: Omit<Service, 'id'>) => void;
  onBack: () => void;
}

const ServiceForm = ({ service, onSave, onBack }: ServiceFormProps) => {
  const { professionals } = useProfessionals();
  const { services } = useServices();
  
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    name: '',
    price: 0,
    duration: 30,
    description: '',
    category: 'outros',
    active: true,
    commission: 50,
    allowedProfessionals: [],
    isPackage: false,
    packageServices: []
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description,
        category: service.category,
        active: service.active,
        commission: service.commission,
        allowedProfessionals: service.allowedProfessionals,
        isPackage: service.isPackage,
        packageServices: service.packageServices || []
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleProfessionalToggle = (professionalId: number) => {
    setFormData(prev => ({
      ...prev,
      allowedProfessionals: prev.allowedProfessionals.includes(professionalId)
        ? prev.allowedProfessionals.filter(id => id !== professionalId)
        : [...prev.allowedProfessionals, professionalId]
    }));
  };

  const handlePackageServiceToggle = (serviceId: number) => {
    setFormData(prev => ({
      ...prev,
      packageServices: prev.packageServices?.includes(serviceId)
        ? prev.packageServices.filter(id => id !== serviceId)
        : [...(prev.packageServices || []), serviceId]
    }));
  };

  const availableServices = services.filter(s => !s.isPackage && s.id !== service?.id);
  const activeProfessionals = professionals.filter(p => p.hasAgenda);

  return (
    <div className="h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Serviços e Pacotes
        </Button>
        <span className="text-sm text-muted-foreground">
          {service ? 'Editar' : 'Novo'} {formData.isPackage ? 'Pacote' : 'Serviço'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {service ? 'Editar' : 'Criar'} {formData.isPackage ? 'Pacote' : 'Serviço'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Service['category'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabelo">Cabelo</SelectItem>
                    <SelectItem value="manicure">Manicure/Pedicure</SelectItem>
                    <SelectItem value="estetica">Estética</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duração (minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  step="5"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commission">Comissão (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.commission}
                  onChange={(e) => setFormData(prev => ({ ...prev, commission: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Serviço ativo</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPackage"
                checked={formData.isPackage}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPackage: checked }))}
              />
              <Label htmlFor="isPackage">Este é um pacote de serviços</Label>
            </div>
          </CardContent>
        </Card>

        {formData.isPackage && (
          <Card>
            <CardHeader>
              <CardTitle>Serviços do Pacote</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableServices.map(availableService => (
                  <div key={availableService.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${availableService.id}`}
                      checked={formData.packageServices?.includes(availableService.id) || false}
                      onCheckedChange={() => handlePackageServiceToggle(availableService.id)}
                    />
                    <Label htmlFor={`service-${availableService.id}`} className="text-sm">
                      {availableService.name} (R$ {availableService.price.toFixed(2)})
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Profissionais Autorizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeProfessionals.map(professional => (
                <div key={professional.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`prof-${professional.id}`}
                    checked={formData.allowedProfessionals.includes(professional.id)}
                    onCheckedChange={() => handleProfessionalToggle(professional.id)}
                  />
                  <Label htmlFor={`prof-${professional.id}`} className="text-sm">
                    {professional.socialName || professional.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Salvar {formData.isPackage ? 'Pacote' : 'Serviço'}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
