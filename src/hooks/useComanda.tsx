
import { useState, useMemo } from 'react';
import { Comanda, ComandaItem, ComandaPayment, PaymentMethod } from '@/types/comanda';
import { useProfessionals } from '@/contexts/ProfessionalsContext';
import { useServices } from '@/contexts/ServicesContext';
import { useProducts } from '@/contexts/ProductsContext';

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Dinheiro', type: 'cash', icon: '💵' },
  { id: '2', name: 'Cartão', type: 'card', icon: '💳' },
  { id: '3', name: 'PIX', type: 'pix', icon: '📱' },
  { id: '4', name: 'Transferência', type: 'transfer', icon: '🏦' },
];

export const useComanda = (clientName: string) => {
  const { professionals } = useProfessionals();
  const { getActiveServices } = useServices();
  const { getActiveProducts } = useProducts();
  
  const [comandaData, setComandaData] = useState<Partial<Comanda>>({
    clientName,
    date: new Date().toISOString().split('T')[0],
    items: [],
    payments: [],
    status: 'open'
  });

  // Gerar itens da comanda baseados nos agendamentos do cliente
  const generateComandaItems = useMemo(() => {
    const items: ComandaItem[] = [];
    
    professionals.forEach(professional => {
      const clientAppointments = professional.appointments?.filter(apt => apt.clientName === clientName) || [];
      
      clientAppointments.forEach(appointment => {
        const serviceItem: ComandaItem = {
          id: `service-${appointment.id}`,
          type: 'service',
          name: appointment.service,
          professionalId: professional.id,
          professionalName: professional.name,
          quantity: 1,
          unitPrice: 50, // Preço base simulado
          discount: 0,
          finalPrice: 50,
          date: appointment.date,
          time: appointment.time,
          appointmentId: appointment.id
        };
        items.push(serviceItem);
      });
    });

    return items;
  }, [professionals, clientName]);

  const addItem = (item: Omit<ComandaItem, 'id' | 'finalPrice'>) => {
    const newItem: ComandaItem = {
      ...item,
      id: Date.now().toString(),
      finalPrice: item.unitPrice * item.quantity * (1 - item.discount / 100)
    };
    
    setComandaData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const updateItem = (itemId: string, updates: Partial<ComandaItem>) => {
    setComandaData(prev => ({
      ...prev,
      items: prev.items?.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              ...updates,
              finalPrice: (updates.unitPrice || item.unitPrice) * 
                         (updates.quantity || item.quantity) * 
                         (1 - (updates.discount || item.discount) / 100)
            }
          : item
      ) || []
    }));
  };

  const removeItem = (itemId: string) => {
    setComandaData(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId) || []
    }));
  };

  const addPayment = (payment: Omit<ComandaPayment, 'id'>) => {
    const newPayment: ComandaPayment = {
      ...payment,
      id: Date.now().toString()
    };
    
    setComandaData(prev => ({
      ...prev,
      payments: [...(prev.payments || []), newPayment]
    }));
  };

  const removePayment = (paymentId: string) => {
    setComandaData(prev => ({
      ...prev,
      payments: prev.payments?.filter(p => p.id !== paymentId) || []
    }));
  };

  // Cálculos totais
  const calculations = useMemo(() => {
    const items = comandaData.items || [];
    const payments = comandaData.payments || [];
    
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const totalDiscount = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity * item.discount / 100), 0);
    const finalTotal = subtotal - totalDiscount;
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remaining = finalTotal - totalPaid;
    
    return {
      subtotal,
      totalDiscount,
      finalTotal,
      totalPaid,
      remaining
    };
  }, [comandaData]);

  return {
    comandaData,
    setComandaData,
    generateComandaItems,
    addItem,
    updateItem,
    removeItem,
    addPayment,
    removePayment,
    calculations,
    paymentMethods,
    availableServices: getActiveServices(),
    availableProducts: getActiveProducts()
  };
};
