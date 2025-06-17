
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
}

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Client) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClientById: (id: string) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
};

// Dados de teste dos clientes
const testClients: Client[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(11) 99999-1111",
    cpf: "123.456.789-01",
    createdAt: "2024-01-01T10:00:00.000Z"
  },
  {
    id: "2", 
    name: "João Santos",
    email: "joao@example.com",
    phone: "(11) 99999-2222",
    cpf: "123.456.789-02",
    createdAt: "2024-01-02T10:00:00.000Z"
  },
  {
    id: "3",
    name: "Ana Paula",
    email: "ana@example.com", 
    phone: "(11) 99999-3333",
    cpf: "123.456.789-03",
    createdAt: "2024-01-03T10:00:00.000Z"
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    email: "carlos@example.com",
    phone: "(11) 99999-4444", 
    cpf: "123.456.789-04",
    createdAt: "2024-01-04T10:00:00.000Z"
  },
  {
    id: "5",
    name: "Fernanda Costa",
    email: "fernanda@example.com",
    phone: "(11) 99999-5555",
    cpf: "123.456.789-05", 
    createdAt: "2024-01-05T10:00:00.000Z"
  },
  {
    id: "6",
    name: "Roberto Lima",
    email: "roberto@example.com",
    phone: "(11) 99999-6666",
    cpf: "123.456.789-06",
    createdAt: "2024-01-06T10:00:00.000Z"
  },
  {
    id: "7",
    name: "Juliana Pereira", 
    email: "juliana@example.com",
    phone: "(11) 99999-7777",
    cpf: "123.456.789-07",
    createdAt: "2024-01-07T10:00:00.000Z"
  },
  {
    id: "8",
    name: "Pedro Henrique",
    email: "pedro@example.com",
    phone: "(11) 99999-8888",
    cpf: "123.456.789-08",
    createdAt: "2024-01-08T10:00:00.000Z"
  },
  {
    id: "9",
    name: "Camila Rodrigues",
    email: "camila@example.com", 
    phone: "(11) 99999-9999",
    cpf: "123.456.789-09",
    createdAt: "2024-01-09T10:00:00.000Z"
  },
  {
    id: "10",
    name: "Marcos Antonio",
    email: "marcos@example.com",
    phone: "(11) 99999-0000",
    cpf: "123.456.789-10", 
    createdAt: "2024-01-10T10:00:00.000Z"
  }
];

interface ClientsProviderProps {
  children: ReactNode;
}

export const ClientsProvider = ({ children }: ClientsProviderProps) => {
  const [clients, setClients] = useState<Client[]>(testClients);

  const addClient = async (client: Client): Promise<void> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setClients(prev => [client, ...prev]);
  };

  const updateClient = async (id: string, updatedClient: Partial<Client>): Promise<void> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updatedClient } : client
    ));
  };

  const deleteClient = async (id: string): Promise<void> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const getClientById = (id: string): Client | undefined => {
    return clients.find(client => client.id === id);
  };

  const value: ClientsContextType = {
    clients,
    addClient,
    updateClient,
    deleteClient,
    getClientById
  };

  return (
    <ClientsContext.Provider value={value}>
      {children}
    </ClientsContext.Provider>
  );
};
