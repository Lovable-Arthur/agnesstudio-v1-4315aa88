
export const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const convertMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const calculateServiceEndTime = (startTime: string, duration: number): string => {
  const startMinutes = convertTimeToMinutes(startTime);
  const endMinutes = startMinutes + duration;
  return convertMinutesToTime(endMinutes);
};

export const calculateTotalDuration = (startTime: string, endTime: string): string => {
  const durationMinutes = convertTimeToMinutes(endTime) - convertTimeToMinutes(startTime);
  return `${durationMinutes}min`;
};
