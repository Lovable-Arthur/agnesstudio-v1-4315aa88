
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CommissionSettings from "@/components/CommissionSettings";
import CommissionReports from "@/components/CommissionReports";
import CommissionPayments from "@/components/CommissionPayments";

const Commissions = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleBackToSite = () => {
    navigate('/');
  };

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
            <div className="flex items-center space-x-3">
              {user && (
                <span className="text-sm text-muted-foreground">
                  {user.email}
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
