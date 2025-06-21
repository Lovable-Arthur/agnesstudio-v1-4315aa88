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
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[98vw]">
        <DialogHeader className="border-b pb-4">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">📦 Itens</TabsTrigger>
            <TabsTrigger value="services">⭐ Serviços</TabsTrigger>
            <TabsTrigger value="products">🛍️ Produtos</TabsTrigger>
            <TabsTrigger value="payments">💳 Pagamentos</TabsTrigger>
          </TabsList>

          <div className="flex-1 flex flex-col">
            <TabsContent value="items" className="flex-1 flex flex-col space-y-4">
              <ItemsTab allItems={allItems} availableServices={availableServices} availableProducts={availableProducts} onAddItem={addItem} onUpdateItem={updateItem} onRemoveItem={removeItem} />
              
              <div className="flex justify-between items-center bg-blue-5 p-4 rounded-lg mx-[110px] my-0 py-px">
                <div>
                  <h3 className="font-semibold text-lg">Total de Itens: {allItems.length}</h3>
                  <p className="text-sm text-gray-600">Valor total da comanda</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">
                    {formatCurrency(calculations.finalTotal)}
                  </p>
                  {calculations.remaining > 0 && <p className="text-sm text-red-600">Restante: {formatCurrency(calculations.remaining)}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="flex-1">
              <ServiceManagement />
            </TabsContent>

            <TabsContent value="products" className="flex-1">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="payments" className="flex-1 flex flex-col space-y-4">
              <PaymentsTab payments={comandaData.payments || []} paymentMethods={paymentMethods} calculations={calculations} onAddPayment={handleAddPayment} onRemovePayment={removePayment} />
              
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">Total de Itens: {allItems.length}</h3>
                  <p className="text-sm text-gray-600">Valor total da comanda</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">
                    {formatCurrency(calculations.finalTotal)}
                  </p>
                  {calculations.remaining > 0 && <p className="text-sm text-red-600">Restante: {formatCurrency(calculations.remaining)}</p>}
                </div>
              </div>
            </TabsContent>
          </div>
          
          <div className="flex justify-between mt-4">
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
        </Tabs>
      </DialogContent>
    </Dialog>;
};
export default ClientComandaDialog;