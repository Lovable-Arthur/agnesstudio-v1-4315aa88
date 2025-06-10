
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

const ServiceCard = ({ service, onBook }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-primary">{service.name}</CardTitle>
            <CardDescription className="mt-2">{service.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">4.9</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-primary">{service.price}</div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{service.duration}</span>
          </div>
        </div>
        <Button 
          onClick={onBook} 
          className="w-full bg-primary hover:bg-primary/90"
        >
          Agendar Serviço
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
