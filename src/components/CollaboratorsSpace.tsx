
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, Calendar, BarChart3, Settings } from "lucide-react";

interface CollaboratorsSpaceProps {
  onLogout: () => void;
}

const CollaboratorsSpace = ({ onLogout }: CollaboratorsSpaceProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Espaço dos Colaboradores</h1>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo, Colaborador!</h2>
            <p className="text-gray-600">Acesse as ferramentas e informações do sistema.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Agenda
                </CardTitle>
                <CardDescription>
                  Gerencie seus agendamentos e horários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Acessar Agenda
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  Clientes
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie informações dos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Clientes
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                  Relatórios
                </CardTitle>
                <CardDescription>
                  Acesse relatórios e estatísticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-gray-500" />
                  Configurações
                </CardTitle>
                <CardDescription>
                  Ajuste suas preferências e configurações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollaboratorsSpace;
