
export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-500 text-white border-blue-600";
    case "pending":
      return "bg-yellow-500 text-white border-yellow-600";
    case "completed":
      return "bg-green-500 text-white border-green-600";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
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
