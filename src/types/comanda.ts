
export interface ComandaItem {
  id: string;
  type: 'service' | 'product';
  name: string;
  professionalId?: number;
  professionalName?: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  finalPrice: number;
  date: string;
  time?: string;
  appointmentId?: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'pix' | 'transfer';
  icon: string;
}

export interface ComandaPayment {
  id: string;
  methodId: string;
  amount: number;
  date: string;
  time: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Comanda {
  id: string;
  number: number;
  clientName: string;
  date: string;
  items: ComandaItem[];
  payments: ComandaPayment[];
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  status: 'open' | 'closed' | 'cancelled';
  observations?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  active: boolean;
}
