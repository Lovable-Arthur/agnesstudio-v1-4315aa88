
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useComanda } from "@/hooks/useComanda";
import { ComandaItem } from "@/types/comanda";
import { getStatusColor } from "@/utils/styleUtils";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

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
  const [newItemType, setNewItemType] = useState<'service' | 'product'>('service');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  // Combinar itens gerados automaticamente com itens adicionais
  const allItems = [
    ...generateComandaItems,
    ...(comandaData.items || [])
  ];

  const getComandaNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const handleAddNewItem = () => {
    if (newItemType === 'service') {
      const defaultService = availableServices[0];
      if (defaultService) {
        addItem({
          type: 'service',
          name: defaultService.name,
          quantity: 1,
          unitPrice: defaultService.price,
          discount: 0,
          date: new Date().toISOString().split('T')[0]
        });
      }
    } else {
      const defaultProduct = availableProducts[0];
      if (defaultProduct) {
        addItem({
          type: 'product',
          name: defaultProduct.name,
          quantity: 1,
          unitPrice: defaultProduct.price,
          discount: 0,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  const handleAddPayment = () => {
    const remaining = calculations.remaining;
    if (remaining > 0) {
      addPayment({
        methodId: paymentMethods[0].id,
        amount: remaining,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'completed'
      });
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">📦 Itens</TabsTrigger>
            <TabsTrigger value="services">⭐ Serviços</TabsTrigger>
            <TabsTrigger value="products">🛍️ Produtos</TabsTrigger>
            <TabsTrigger value="payments">💳 Pagamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Todos os Itens</h3>
                <div className="flex gap-2">
                  <Select value={newItemType} onValueChange={(value: 'service' | 'product') => setNewItemType(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Serviço</SelectItem>
                      <SelectItem value="product">Produto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddNewItem} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[50vh]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Item</TableHead>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Qtd.</TableHead>
                      <TableHead>Valor Unit.</TableHead>
                      <TableHead>Desc. (%)</TableHead>
                      <TableHead>Final</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allItems.map((item, index) => (
                      <TableRow key={`${item.id}-${index}`} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.type === 'service' ? 'default' : 'secondary'}>
                              {item.type === 'service' ? '⭐' : '📦'}
                            </Badge>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{item.professionalName || 'N/A'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{formatDate(item.date)}</span>
                        </TableCell>
                        <TableCell>
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                              className="w-16 h-8"
                            />
                          ) : (
                            <span className="text-sm">{item.quantity}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                              className="w-20 h-8"
                            />
                          ) : (
                            <span className="text-sm">{formatCurrency(item.unitPrice)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              value={item.discount}
                              onChange={(e) => updateItem(item.id, { discount: parseFloat(e.target.value) || 0 })}
                              className="w-16 h-8"
                            />
                          ) : (
                            <span className="text-sm">{item.discount}%</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">{formatCurrency(item.finalPrice)}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-blue-600"
                              onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-red-600"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="text-center py-8 text-gray-500">
              <h3 className="text-lg font-semibold mb-2">Gerenciar Serviços</h3>
              <p>Funcionalidade de gerenciamento de serviços será implementada aqui.</p>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="text-center py-8 text-gray-500">
              <h3 className="text-lg font-semibold mb-2">Gerenciar Produtos</h3>
              <p>Funcionalidade de gerenciamento de produtos será implementada aqui.</p>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Pagamentos</h3>
                <Button onClick={handleAddPayment} size="sm" disabled={calculations.remaining <= 0}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pagamento
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Subtotal</Label>
                  <p className="text-lg font-semibold">{formatCurrency(calculations.subtotal)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Desconto Total</Label>
                  <p className="text-lg font-semibold text-red-600">-{formatCurrency(calculations.totalDiscount)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Final</Label>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(calculations.finalTotal)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Restante</Label>
                  <p className={`text-xl font-bold ${calculations.remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(calculations.remaining)}
                  </p>
                </div>
              </div>

              <ScrollArea className="h-[40vh]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Método</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(comandaData.payments || []).map((payment) => {
                      const method = paymentMethods.find(m => m.id === payment.methodId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{method?.icon}</span>
                              <span>{method?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-green-600">{formatCurrency(payment.amount)}</span>
                          </TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{payment.time}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status === 'completed' ? 'Pago' : 
                               payment.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-red-600"
                              onClick={() => removePayment(payment.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientComandaDialog;
