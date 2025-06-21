
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useComanda } from "@/hooks/useComanda";
import { Eye } from "lucide-react";
import ItemsTab from "./comanda/ItemsTab";
import PaymentsTab from "./comanda/PaymentsTab";
import ServiceManagement from "./comanda/ServiceManagement";
import ProductManagement from "./comanda/ProductManagement";

interface ClientComandaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
}

const ClientComandaDialog = ({
  isOpen,
  onClose,
  clientName
}: ClientComandaDialogProps) => {
  const {
    comandaData,
    generateComandaItems,
    addItem,
    updateItem,
    removeItem,
    addPayment,
    removePayment,
    calculations,
    paymentMethods,
    availableServices,
    availableProducts
  } = useComanda(clientName);
  const [activeTab, setActiveTab] = useState("items");

  // Combinar itens gerados automaticamente com itens adicionais
  const allItems = [...generateComandaItems, ...(comandaData.items || [])];
  
  const getComandaNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };
  
  const handleAddPayment = () => {
    const remaining = calculations.remaining;
    if (remaining > 0) {
      addPayment({
        methodId: paymentMethods[0].id,
        amount: remaining,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'completed'
      });
    }
  };
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[98vw] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header fixo */}
          <DialogHeader className="border-b p-6 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <DialogTitle className="text-xl font-bold text-blue-700">
                    Comanda #{getComandaNumber()}
                  </DialogTitle>
                  <DialogDescription>
                    Cliente: {clientName}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm text-gray-600">Data: {formatDate(new Date().toISOString().split('T')[0])}</span>
                </div>
              </div>
              <Button onClick={onClose} variant="ghost" size="sm">
                ✕
              </Button>
            </div>
          </DialogHeader>

          {/* Área de conteúdo com scroll */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 mx-6 mt-4">
                <TabsTrigger value="items">📦 Itens</TabsTrigger>
                <TabsTrigger value="services">⭐ Serviços</TabsTrigger>
                <TabsTrigger value="products">🛍️ Produtos</TabsTrigger>
                <TabsTrigger value="payments">💳 Pagamentos</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden px-6">
                <TabsContent value="items" className="h-full flex flex-col space-y-4 mt-4">
                  <div className="flex-1 overflow-hidden">
                    <ItemsTab 
                      allItems={allItems} 
                      availableServices={availableServices} 
                      availableProducts={availableProducts} 
                      onAddItem={addItem} 
                      onUpdateItem={updateItem} 
                      onRemoveItem={removeItem} 
                    />
                  </div>
                  
                  {/* Total fixo na parte inferior */}
                  <div className="bg-blue-50 p-4 rounded-lg border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">Total de Itens: {allItems.length}</h3>
                        <p className="text-sm text-gray-600">Valor total da comanda</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-700">
                          {formatCurrency(calculations.finalTotal)}
                        </p>
                        {calculations.remaining > 0 && (
                          <p className="text-sm text-red-600">Restante: {formatCurrency(calculations.remaining)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="h-full mt-4">
                  <ServiceManagement />
                </TabsContent>

                <TabsContent value="products" className="h-full mt-4">
                  <ProductManagement />
                </TabsContent>

                <TabsContent value="payments" className="h-full flex flex-col space-y-4 mt-4">
                  <div className="flex-1 overflow-hidden">
                    <PaymentsTab 
                      payments={comandaData.payments || []} 
                      paymentMethods={paymentMethods} 
                      calculations={calculations} 
                      onAddPayment={handleAddPayment} 
                      onRemovePayment={removePayment} 
                    />
                  </div>
                  
                  {/* Total fixo na parte inferior */}
                  <div className="bg-blue-50 p-4 rounded-lg border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">Total de Itens: {allItems.length}</h3>
                        <p className="text-sm text-gray-600">Valor total da comanda</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-700">
                          {formatCurrency(calculations.finalTotal)}
                        </p>
                        {calculations.remaining > 0 && (
                          <p className="text-sm text-red-600">Restante: {formatCurrency(calculations.remaining)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Footer fixo */}
          <div className="border-t p-6 bg-white">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  🔄 Atualizar Comanda
                </Button>
                <Button variant="outline" size="sm">
                  🖨️ Imprimir
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Confirmar
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">
                  Finalizar Comanda
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientComandaDialog;
