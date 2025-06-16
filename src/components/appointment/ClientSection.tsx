
import React, { useState } from "react";
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
  "Roberto Lima",
  "Juliana Pereira",
  "Pedro Henrique",
  "Camila Rodrigues",
  "Marcos Antonio"
];

const ClientSection = ({ clientName, setClientName }: ClientSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = testClients.filter(client =>
    client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setClientName(value);
  };

  const handleSelectClient = (selectedClient: string) => {
    setClientName(selectedClient);
    setSearchTerm(selectedClient);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="client">Cliente:</Label>
      <div className="flex gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            id="client"
            placeholder="Digite ou pesquise o nome do cliente"
            value={clientName}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1"
          />
          <Select value={clientName} onValueChange={handleSelectClient}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecionar Cliente" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Pesquisar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
              </div>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  Nenhum cliente encontrado
                </div>
              )}
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
