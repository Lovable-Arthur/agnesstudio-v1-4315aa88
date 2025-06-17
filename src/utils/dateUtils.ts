export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getWeekDays = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return {
      date: formatDate(day),
      dayName: day.toLocaleDateString('pt-BR', { weekday: 'short' }),
      dayNumber: day.getDate(),
      isToday: formatDate(day) === formatDate(new Date())
    };
  });
};

export const getTimeSlots = (startHour = 7, endHour = 22, intervalMinutes = 10) => {
  const slots = [];
  const totalMinutes = (endHour - startHour) * 60;
  const slotsCount = Math.floor(totalMinutes / intervalMinutes);
  
  for (let i = 0; i <= slotsCount; i++) {
    const totalMinutes = startHour * 60 + i * intervalMinutes;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  }
  
  return slots;
};

export const getDisplayTimeSlots = (intervalMinutes = 10) => {
  return getTimeSlots(7, 22, intervalMinutes);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getNavigationDelta = (view: string): number => {
  switch (view) {
    case 'day':
    case 'agenda':
      return 1;
    case 'week':
      return 7;
    case 'month':
      return 30;
    default:
      return 1;
  }
};
