
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComandaPayment, PaymentMethod } from "@/types/comanda";
import { getStatusColor } from "@/utils/styleUtils";
import { Trash2, Plus } from "lucide-react";

interface PaymentsTabProps {
  payments: ComandaPayment[];
  paymentMethods: PaymentMethod[];
  calculations: {
    subtotal: number;
    totalDiscount: number;
    finalTotal: number;
    totalPaid: number;
    remaining: number;
  };
  onAddPayment: () => void;
  onRemovePayment: (paymentId: string) => void;
}

const PaymentsTab = ({
  payments,
  paymentMethods,
  calculations,
  onAddPayment,
  onRemovePayment
}: PaymentsTabProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pagamentos</h3>
        <Button onClick={onAddPayment} size="sm" disabled={calculations.remaining <= 0}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Pagamento
        </Button>
      </div>

      {/* Resumo dos cálculos */}
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

      {/* Tabela de pagamentos com scroll */}
      <div className="flex-1 border rounded-lg">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
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
              {payments.map((payment) => {
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
                        onClick={() => onRemovePayment(payment.id)}
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
    </div>
  );
};

export default PaymentsTab;
