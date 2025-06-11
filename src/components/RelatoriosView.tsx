
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter,
  Users,
  UserCheck,
  Eye,
  AlertTriangle,
  PieChart,
  Percent
} from "lucide-react";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer } from "recharts";

const RelatoriosView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("hoje");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [compareWithPreviousPeriod, setCompareWithPreviousPeriod] = useState(false);

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
    <div className="h-full bg-background flex flex-col">
      <Tabs defaultValue="dashboard" className="h-full flex flex-col">
        {/* Sub-navigation */}
        <div className="bg-muted/30 border-b px-6">
          <TabsList className="bg-transparent h-auto p-0 gap-0">
            <TabsTrigger 
              value="dashboard"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none bg-primary text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="financeiro"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Financeiro
            </TabsTrigger>
            <TabsTrigger 
              value="lista"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Lista
            </TabsTrigger>
            <TabsTrigger 
              value="mapa"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Mapa de Calor
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="dashboard" className="h-full m-0 p-6">
            <div className="space-y-6">
              
              {/* Filtros */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="w-5 h-5 mr-2" />
                    Selecione o Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <Label>Ano Cliente</Label>
                      <Select defaultValue="qualquer">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="qualquer">Qualquer</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Visualizar por período</Label>
                        <input type="radio" name="periodo" value="periodo" className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Visualizar por mês</Label>
                        <input type="radio" name="periodo" value="mes" className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Visualizar por dia</Label>
                        <input type="radio" name="periodo" value="dia" className="mt-2" defaultChecked />
                      </div>
                    </div>

                    <div>
                      <Label>Data Início</Label>
                      <Input type="date" value="2024-01-23" />
                    </div>

                    <div>
                      <Label>Data Fim</Label>
                      <Input type="date" value="2024-01-23" />
                    </div>

                    <div className="flex gap-2">
                      <Button className="bg-cyan-500 hover:bg-cyan-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Comparar com outro período</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Imprimir Dashboard
                </Button>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dashboard
                </Button>
              </div>

              {/* Cards de Estatísticas */}
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

              {/* Gráficos */}
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

            </div>
          </TabsContent>

          <TabsContent value="financeiro" className="h-full m-0 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualize relatórios financeiros detalhados.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lista" className="h-full m-0 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Relatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lista completa de todos os relatórios disponíveis.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapa" className="h-full m-0 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Calor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualização em mapa de calor dos dados.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default RelatoriosView;
