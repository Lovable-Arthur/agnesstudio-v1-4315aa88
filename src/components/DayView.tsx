
import React, { useMemo, useState } from "react";
import { Professional, Appointment } from "@/types/calendar";
import { getDisplayTimeSlots } from "@/utils/dateUtils";
import { convertTimeToMinutes } from "@/utils/appointmentUtils";
import DayViewHeader from "./calendar/DayViewHeader";
import TimeGrid from "./calendar/TimeGrid";
import EditAppointmentDialog from "./appointment/EditAppointmentDialog";
import { useAppointmentManager } from "@/hooks/useAppointmentManager";

interface DayViewProps {
  selectedDate: string;
  professionals: Professional[];
}

const DayView = ({ selectedDate, professionals }: DayViewProps) => {
  const displayTimeSlots = useMemo(() => getDisplayTimeSlots(10), []);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);

  const {
    savedAppointments,
    updatedAppointments,
    handleAddAppointment,
    handleUpdateAppointment
  } = useAppointmentManager();

  const getAllAppointmentsForProfessional = (professional: Professional): Appointment[] => {
    const originalAppointments = professional.appointments.filter(apt => apt.date === selectedDate).map(apt => {
      return updatedAppointments[apt.id] || apt;
    });
    const dayKey = `${selectedDate}-${professional.id}`;
    const savedDayAppointments = savedAppointments[dayKey] || [];
    return [...originalAppointments, ...savedDayAppointments];
  };

  const getAppointmentsForTimeSlot = (professional: Professional, timeSlot: string): Appointment[] => {
    const allAppointments = getAllAppointmentsForProfessional(professional);
    const currentSlotMinutes = convertTimeToMinutes(timeSlot);
    const overlappingAppointments: Appointment[] = [];
    
    for (const apt of allAppointments) {
      const appointmentStartMinutes = convertTimeToMinutes(apt.time);
      const durationMatch = apt.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      const appointmentEndMinutes = appointmentStartMinutes + durationMinutes;
      
      if (currentSlotMinutes >= appointmentStartMinutes && currentSlotMinutes < appointmentEndMinutes) {
        overlappingAppointments.push(apt);
      }
    }
    
    return overlappingAppointments;
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setAppointmentToEdit(appointment);
    setEditDialogOpen(true);
  };

  const handleUpdateAppointmentWithDialog = (updatedAppointmentData: any) => {
    handleUpdateAppointment(updatedAppointmentData);
    setEditDialogOpen(false);
    setAppointmentToEdit(null);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <DayViewHeader professionals={professionals} />

      <TimeGrid
        professionals={professionals}
        displayTimeSlots={displayTimeSlots}
        selectedDate={selectedDate}
        getAppointmentsForTimeSlot={getAppointmentsForTimeSlot}
        onAddAppointment={handleAddAppointment}
        onEditAppointment={handleEditAppointment}
      />

      <EditAppointmentDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setAppointmentToEdit(null);
        }}
        appointment={appointmentToEdit}
        onUpdateAppointment={handleUpdateAppointmentWithDialog}
      />
    </div>
  );
};

export default DayView;
