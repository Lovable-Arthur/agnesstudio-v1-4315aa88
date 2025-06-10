
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommissionSettings from "@/components/CommissionSettings";
import CommissionReports from "@/components/CommissionReports";
import CommissionPayments from "@/components/CommissionPayments";

const Commissions = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Beleza Salon - Comissões</h1>
            </div>
            <button onClick={() => window.location.href = '/'} className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium">
              Voltar ao Site
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <CommissionSettings />
          </TabsContent>
          
          <TabsContent value="reports">
            <CommissionReports />
          </TabsContent>
          
          <TabsContent value="payments">
            <CommissionPayments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Commissions;
