
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Package, Users, Megaphone, BarChart3, Settings } from "lucide-react";
import CalendarView from "@/components/CalendarView";
import FinanceiroView from "@/components/FinanceiroView";
import EstoqueView from "@/components/EstoqueView";
import ClientesView from "@/components/ClientesView";
import MarketingView from "@/components/MarketingView";
import RelatoriosView from "@/components/RelatoriosView";
import ConfiguracoesView from "@/components/ConfiguracoesView";

const Schedule = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Beleza Salon</h1>
            </div>
            <button onClick={() => window.location.href = '/'} className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium">
              Voltar ao Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="agenda" className="h-full flex flex-col">
          <div className="bg-white border-b px-4">
            <TabsList className="grid w-full grid-cols-7 bg-transparent h-auto p-0 gap-0">
              <TabsTrigger 
                value="agenda" 
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <Calendar className="w-5 h-5 mb-1" />
                Agenda
              </TabsTrigger>
              <TabsTrigger 
                value="financeiro"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <DollarSign className="w-5 h-5 mb-1" />
                Financeiro
              </TabsTrigger>
              <TabsTrigger 
                value="estoque"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <Package className="w-5 h-5 mb-1" />
                Estoque
              </TabsTrigger>
              <TabsTrigger 
                value="clientes"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <Users className="w-5 h-5 mb-1" />
                Clientes
              </TabsTrigger>
              <TabsTrigger 
                value="marketing"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <Megaphone className="w-5 h-5 mb-1" />
                Marketing
              </TabsTrigger>
              <TabsTrigger 
                value="relatorios"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <BarChart3 className="w-5 h-5 mb-1" />
                Relatórios
              </TabsTrigger>
              <TabsTrigger 
                value="configuracoes"
                className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
              >
                <Settings className="w-5 h-5 mb-1" />
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="agenda" className="h-full m-0">
              <CalendarView />
            </TabsContent>
            
            <TabsContent value="financeiro" className="h-full m-0">
              <FinanceiroView />
            </TabsContent>
            
            <TabsContent value="estoque" className="h-full m-0">
              <EstoqueView />
            </TabsContent>
            
            <TabsContent value="clientes" className="h-full m-0">
              <ClientesView />
            </TabsContent>
            
            <TabsContent value="marketing" className="h-full m-0">
              <MarketingView />
            </TabsContent>
            
            <TabsContent value="relatorios" className="h-full m-0">
              <RelatoriosView />
            </TabsContent>
            
            <TabsContent value="configuracoes" className="h-full m-0">
              <ConfiguracoesView />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;
