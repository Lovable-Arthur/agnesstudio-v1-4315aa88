
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientSectionProps {
  clientName: string;
  setClientName: (name: string) => void;
}

const testClients = [
  "Maria Silva",
  "João Santos",
  "Ana Paula",
  "Carlos Oliveira",
  "Fernanda Costa",
  "Roberto Lima"
];

const ClientSection = ({ clientName, setClientName }: ClientSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="client">Cliente:</Label>
      <div className="flex gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            id="client"
            placeholder="Nome do cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="flex-1"
          />
          <Select value={clientName} onValueChange={setClientName}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Clientes" />
            </SelectTrigger>
            <SelectContent>
              {testClients.map((client) => (
                <SelectItem key={client} value={client}>
                  {client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          Cadastrar Cliente
        </Button>
      </div>
    </div>
  );
};

export default ClientSection;
