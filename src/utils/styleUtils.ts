export const getStatusColor = (status: string) => {
  switch (status) {
    case "agendado":
      return "bg-teal-500 border-teal-600";
    case "confirmado":
      return "bg-blue-500 border-blue-600";
    case "aguardando":
      return "bg-amber-500 border-amber-600";
    case "em-atendimento":
      return "bg-green-500 border-green-600";
    case "finalizado":
      return "bg-purple-500 border-purple-600";
    case "pago":
      return "bg-red-500 border-red-600";
    case "cancelado":
      return "bg-gray-500 border-gray-600";
    case "faltou":
      return "bg-gray-400 border-gray-500";
    // Manter compatibilidade com status antigos
    case "confirmed":
      return "bg-blue-500 border-blue-600";
    case "pending":
      return "bg-amber-500 border-amber-600";
    case "completed":
      return "bg-purple-500 border-purple-600";
    default:
      return "bg-gray-500 border-gray-600";
  }
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "agendado":
      return "bg-teal-100 text-teal-800 border-teal-200";
    case "confirmado":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "aguardando":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "em-atendimento":
      return "bg-green-100 text-green-800 border-green-200";
    case "finalizado":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "pago":
      return "bg-red-100 text-red-800 border-red-200";
    case "cancelado":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "faltou":
      return "bg-gray-100 text-gray-600 border-gray-200";
    // Manter compatibilidade com status antigos
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "completed":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "agendado":
      return "Agendado";
    case "confirmado":
      return "Confirmado";
    case "aguardando":
      return "Aguardando";
    case "em-atendimento":
      return "Em Atendimento";
    case "finalizado":
      return "Finalizado";
    case "pago":
      return "Pago";
    case "cancelado":
      return "Cancelado";
    case "faltou":
      return "Faltou";
    // Manter compatibilidade com status antigos
    case "confirmed":
      return "Confirmado";
    case "pending":
      return "Pendente";
    case "completed":
      return "Concluído";
    default:
      return status;
  }
};

export const getProfessionalColor = (color: string) => {
  const colorMap: { [key: string]: string } = {
    'bg-blue-500': 'bg-blue-200',
    'bg-green-500': 'bg-green-200', 
    'bg-purple-500': 'bg-purple-200',
    'bg-orange-500': 'bg-orange-200',
    'bg-pink-500': 'bg-pink-200'
  };
  return colorMap[color] || 'bg-gray-200';
};

export const getProfessionalInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('');
};
