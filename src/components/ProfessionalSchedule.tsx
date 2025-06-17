
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
  labels?: string[];
  observations?: string;
}

interface Professional {
  id: number;
  name: string;
  specialty: string;
  appointments: Appointment[];
}

interface ProfessionalScheduleProps {
  professional: Professional;
  selectedDate: string;
}

const ProfessionalSchedule = ({ professional, selectedDate }: ProfessionalScheduleProps) => {
  const getStatusColor = (status: string) => {
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

  const getLabelColors = () => {
    const predefinedLabels = [
      { name: "Química", color: "bg-emerald-500" },
      { name: "Preferência", color: "bg-blue-500" },
      { name: "Maquiagem", color: "bg-pink-500" },
      { name: "Nova", color: "bg-purple-500" },
      { name: "Pé e Mão", color: "bg-indigo-500" }
    ];

    const labelColors = [
      "bg-emerald-500",
      "bg-blue-500", 
      "bg-purple-500",
      "bg-pink-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-teal-500"
    ];

    return { labelColors, predefinedLabels };
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5 text-primary" />
          {professional.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{professional.specialty}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {professional.appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum agendamento para hoje</p>
          </div>
        ) : (
          professional.appointments.map((appointment) => {
            const { labelColors, predefinedLabels } = getLabelColors();
            
            return (
              <div
                key={appointment.id}
                className="border rounded-lg p-3 bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{appointment.clientName}</h4>
                    <p className="text-xs text-muted-foreground">{appointment.service}</p>
                  </div>
                  <Badge className={getStatusColor(appointment.status)} variant="secondary">
                    {appointment.status === "confirmed" && "Confirmado"}
                    {appointment.status === "pending" && "Pendente"}
                    {appointment.status === "completed" && "Concluído"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {appointment.time}
                  </div>
                  <div>
                    Duração: {appointment.duration}
                  </div>
                </div>
                {appointment.labels && appointment.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {appointment.labels.map((label, index) => {
                      const predefinedLabel = predefinedLabels.find(pl => pl.name === label);
                      const color = predefinedLabel?.color || labelColors[index % labelColors.length];
                      
                      return (
                        <span
                          key={label}
                          className={`${color} text-white text-xs px-2 py-1 rounded-full font-medium inline-block`}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default ProfessionalSchedule;
