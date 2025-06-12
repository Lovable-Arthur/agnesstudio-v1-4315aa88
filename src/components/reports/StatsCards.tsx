
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, AlertTriangle, TrendingUp } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Clientes Atendidos */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-600 mb-1">Clientes Atendidos</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Clientes Novos */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-green-600 mb-1">Clientes Novos</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Clientes Cancelados */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-600 mb-1">Clientes Cancelados</h3>
              <p className="text-3xl font-bold text-gray-900">223</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </CardContent>
      </Card>

      {/* Como nos conheceram */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-purple-600 mb-1">Como nos conheceram</h3>
              <p className="text-sm text-gray-600">Nenhum registro</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default StatsCards;
