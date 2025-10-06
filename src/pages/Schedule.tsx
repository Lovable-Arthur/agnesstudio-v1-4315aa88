
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Package, Users, Megaphone, BarChart3, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import CalendarView from "@/components/CalendarView";
import FinanceiroView from "@/components/FinanceiroView";
import EstoqueView from "@/components/EstoqueView";
import ClientesView from "@/components/ClientesView";
import MarketingView from "@/components/MarketingView";
import RelatoriosView from "@/components/RelatoriosView";
import ConfiguracoesView from "@/components/ConfiguracoesView";

const Schedule = () => {
  const navigate = useNavigate();
  const { logout, user, profile } = useAuth();

  // Nível de acesso baseado no usuário logado
  const userAccessLevel = profile?.accessLevel || "Professional";
  const isRestrictedUser = userAccessLevel === "Professional";

  const handleLogout = () => {
    logout();
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  // Abas permitidas baseadas no nível de acesso
  const allowedTabs = isRestrictedUser 
    ? ['agenda', 'clientes'] 
    : ['agenda', 'financeiro', 'estoque', 'clientes', 'marketing', 'relatorios', 'configuracoes'];

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
            <div className="flex items-center space-x-3">
              {profile && (
                <span className="text-sm text-muted-foreground">
                  {profile.fullName || profile.email} ({userAccessLevel})
                  {profile.professionalId && ` - ID: ${profile.professionalId}`}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToSite}
              >
                Voltar ao Site
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="flex-1 min-h-0">
        <Tabs defaultValue="agenda" className="h-full flex flex-col">
          <div className="bg-white border-b px-4 flex-shrink-0">
            <TabsList className="grid w-full bg-transparent h-auto p-0 gap-0" style={{ gridTemplateColumns: `repeat(${allowedTabs.length}, 1fr)` }}>
              {allowedTabs.includes('agenda') && (
                <TabsTrigger 
                  value="agenda" 
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <Calendar className="w-5 h-5 mb-1" />
                  Agenda
                </TabsTrigger>
              )}
              {allowedTabs.includes('financeiro') && (
                <TabsTrigger 
                  value="financeiro"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <DollarSign className="w-5 h-5 mb-1" />
                  Financeiro
                </TabsTrigger>
              )}
              {allowedTabs.includes('estoque') && (
                <TabsTrigger 
                  value="estoque"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <Package className="w-5 h-5 mb-1" />
                  Estoque
                </TabsTrigger>
              )}
              {allowedTabs.includes('clientes') && (
                <TabsTrigger 
                  value="clientes"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <Users className="w-5 h-5 mb-1" />
                  Clientes
                </TabsTrigger>
              )}
              {allowedTabs.includes('marketing') && (
                <TabsTrigger 
                  value="marketing"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <Megaphone className="w-5 h-5 mb-1" />
                  Marketing
                </TabsTrigger>
              )}
              {allowedTabs.includes('relatorios') && (
                <TabsTrigger 
                  value="relatorios"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <BarChart3 className="w-5 h-5 mb-1" />
                  Relatórios
                </TabsTrigger>
              )}
              {allowedTabs.includes('configuracoes') && (
                <TabsTrigger 
                  value="configuracoes"
                  className="flex flex-col items-center py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
                >
                  <Settings className="w-5 h-5 mb-1" />
                  Configurações
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="flex-1 min-h-0">
            <TabsContent value="agenda" className="h-full m-0">
              <CalendarView />
            </TabsContent>
            
            {allowedTabs.includes('financeiro') && (
              <TabsContent value="financeiro" className="h-full m-0">
                <ScrollArea className="h-full">
                  <FinanceiroView />
                </ScrollArea>
              </TabsContent>
            )}
            
            {allowedTabs.includes('estoque') && (
              <TabsContent value="estoque" className="h-full m-0">
                <ScrollArea className="h-full">
                  <EstoqueView />
                </ScrollArea>
              </TabsContent>
            )}
            
            <TabsContent value="clientes" className="h-full m-0">
              <ScrollArea className="h-full">
                <ClientesView />
              </ScrollArea>
            </TabsContent>
            
            {allowedTabs.includes('marketing') && (
              <TabsContent value="marketing" className="h-full m-0">
                <ScrollArea className="h-full">
                  <MarketingView />
                </ScrollArea>
              </TabsContent>
            )}
            
            {allowedTabs.includes('relatorios') && (
              <TabsContent value="relatorios" className="h-full m-0">
                <ScrollArea className="h-full">
                  <RelatoriosView />
                </ScrollArea>
              </TabsContent>
            )}
            
            {allowedTabs.includes('configuracoes') && (
              <TabsContent value="configuracoes" className="h-full m-0">
                <ScrollArea className="h-full">
                  <ConfiguracoesView />
                </ScrollArea>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;
