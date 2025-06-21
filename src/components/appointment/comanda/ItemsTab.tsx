
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComandaItem } from "@/types/comanda";
import { Pencil, Trash2, Plus } from "lucide-react";

interface ItemsTabProps {
  allItems: ComandaItem[];
  availableServices: any[];
  availableProducts: any[];
  onAddItem: (item: Omit<ComandaItem, 'id' | 'finalPrice'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<ComandaItem>) => void;
  onRemoveItem: (itemId: string) => void;
}

const ItemsTab = ({
  allItems,
  availableServices,
  availableProducts,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}: ItemsTabProps) => {
  const [newItemType, setNewItemType] = useState<'service' | 'product'>('service');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleAddNewItem = () => {
    if (newItemType === 'service') {
      const defaultService = availableServices[0];
      if (defaultService) {
        onAddItem({
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
        onAddItem({
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
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
                      onChange={(e) => onUpdateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
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
                      onChange={(e) => onUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
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
                      onChange={(e) => onUpdateItem(item.id, { discount: parseFloat(e.target.value) || 0 })}
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
                      onClick={() => onRemoveItem(item.id)}
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
  );
};

export default ItemsTab;
