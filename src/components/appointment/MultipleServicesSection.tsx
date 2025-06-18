
import React from "react";
import { Service } from "@/contexts/ServicesContext";
import { ServiceItem } from "@/types/appointment";
import ServiceRow from "./ServiceRow";
import ServiceButtons from "./ServiceButtons";

interface MultipleServicesSectionProps {
  services: ServiceItem[];
  availableServices: Service[];
  onAddService: () => void;
  onRemoveService: (serviceId: string) => void;
  onRemoveLastService: () => void;
  onUpdateService: (serviceId: string, field: keyof ServiceItem, value: string) => void;
  canAddService: boolean;
  getDurationForService?: (service: ServiceItem) => string;
}

const MultipleServicesSection = ({
  services,
  availableServices,
  onAddService,
  onRemoveService,
  onRemoveLastService,
  onUpdateService,
  canAddService,
  getDurationForService
}: MultipleServicesSectionProps) => {
  return (
    <div className="space-y-4">
      {services.length > 0 && (
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              availableServices={availableServices}
              onRemoveService={onRemoveService}
              onUpdateService={onUpdateService}
              getDurationForService={getDurationForService}
            />
          ))}
        </div>
      )}

      <ServiceButtons
        servicesCount={services.length}
        onAddService={onAddService}
        onRemoveLastService={onRemoveLastService}
        canAddService={canAddService}
      />
    </div>
  );
};

export default MultipleServicesSection;
