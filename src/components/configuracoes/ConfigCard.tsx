
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, LucideIcon } from "lucide-react";

interface ConfigCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
  onClick: () => void;
}

const ConfigCard = ({ icon: Icon, title, description, iconBgColor, iconColor, onClick }: ConfigCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigCard;
