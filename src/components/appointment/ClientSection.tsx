
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ClientSectionProps {
  clientName: string;
  setClientName: (name: string) => void;
}

const ClientSection = ({ clientName, setClientName }: ClientSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="client">Cliente:</Label>
      <div className="flex gap-2">
        <Input
          id="client"
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="sm">
          Cadastrar Cliente
        </Button>
      </div>
    </div>
  );
};

export default ClientSection;
