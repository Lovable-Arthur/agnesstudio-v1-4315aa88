
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, PieChart, Percent } from "lucide-react";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Pie } from "recharts";

const ChartsSection = () => {
  // Dados simulados para os gráficos
  const faixaEtariaData = [
    { name: "18-25", value: 30, color: "#8B5CF6" },
    { name: "26-35", value: 40, color: "#10B981" },
    { name: "36-45", value: 20, color: "#F59E0B" },
    { name: "46-60", value: 10, color: "#EF4444" }
  ];

  const clientesPorSexoData = [
    { name: "Feminino", value: 85, color: "#06B6D4" },
    { name: "Masculino", value: 10, color: "#3B82F6" },
    { name: "Não informado", value: 5, color: "#6B7280" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <BarChart3 className="w-5 h-5 mr-2" />
            Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum registro</p>
          </div>
        </CardContent>
      </Card>

      {/* Melhores Clientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <Users className="w-5 h-5 mr-2" />
            Melhores Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum registro</p>
          </div>
        </CardContent>
      </Card>

      {/* Faixa Etária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <PieChart className="w-5 h-5 mr-2" />
            Faixa etária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={faixaEtariaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {faixaEtariaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-4">
              {faixaEtariaData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.value}% {item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clientes por sexo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <Percent className="w-5 h-5 mr-2" />
            Clientes por sexo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={clientesPorSexoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {clientesPorSexoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-4">
              {clientesPorSexoData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.value}% {item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-lg font-semibold">Bairro</p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Total</span>
                <span>432</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ChartsSection;
