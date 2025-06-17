
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClients } from "@/contexts/ClientsContext";
import ClientRegistrationModal from "./ClientRegistrationModal";

interface ClientSectionProps {
  clientName: string;
  setClientName: (name: string) => void;
}

const ClientSection = ({ clientName, setClientName }: ClientSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clients } = useClients();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (selectedClient: string) => {
    setClientName(selectedClient);
    setSearchTerm(selectedClient);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClientCreated = (newClientName: string) => {
    setClientName(newClientName);
    setSearchTerm(newClientName);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="client">Cliente:</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Select value={clientName} onValueChange={handleSelectClient}>
              <SelectTrigger>
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
                    <SelectItem key={client.id} value={client.name}>
                      {client.name}
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
          <Button variant="outline" size="sm" onClick={handleOpenModal}>
            Cadastrar Cliente
          </Button>
        </div>
      </div>

      <ClientRegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onClientCreated={handleClientCreated}
      />
    </>
  );
};

export default ClientSection;
