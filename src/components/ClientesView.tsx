
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Link, Settings, Search, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClientesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  // Dados mock dos clientes
  const clientes = [
    {
      id: 1,
      nome: "Priscila Gomes",
      contato: "(21) 97471-2220",
      aniversario: "18 de Agosto",
      genero: "Feminino",
      observacao: ""
    },
    {
      id: 2,
      nome: "Rosiane Coutinha",
      contato: "(21) 99979-2670",
      aniversario: "",
      genero: "Feminino",
      observacao: ""
    },
    {
      id: 3,
      nome: "",
      contato: "(27) 98167-1500",
      aniversario: "",
      genero: "Feminino",
      observacao: ""
    },
    {
      id: 4,
      nome: "Adelina Mãe Ariane",
      contato: "Tel: (27) 98117-0808\nCel: (27) 98117-0808",
      aniversario: "28 de Agosto",
      genero: "Feminino",
      observacao: ""
    },
    {
      id: 5,
      nome: "Adriana Carone",
      contato: "(27) 99581-0077",
      aniversario: "",
      genero: "Feminino",
      observacao: ""
    },
    {
      id: 6,
      nome: "Adriana Castel",
      contato: "(27) 99226-0237",
      aniversario: "",
      genero: "Feminino",
      observacao: ""
    }
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-background flex flex-col">
      <Tabs defaultValue="lista" className="h-full flex flex-col">
        {/* Sub-navigation */}
        <div className="bg-muted/30 border-b px-6">
          <TabsList className="bg-transparent h-auto p-0 gap-0">
            <TabsTrigger 
              value="lista"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none bg-primary text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Lista de Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="avisos"
              className="px-6 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Avisos
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="lista" className="h-full m-0 p-6">
            <div className="space-y-6">
              {/* Header Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Cliente
                  </Button>
                  <Button variant="outline" className="text-gray-600">
                    <Link className="w-4 h-4 mr-2" />
                    Unir cadastros duplicados
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Anamnese
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Prontuário
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Mostrar</span>
                  <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-600">por página</span>
                </div>
                <div className="flex-1" />
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Pesquisar Cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
                          Nome ↓
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
                          Contato ↓
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
                          Aniversário ↓
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
                          Gênero ↓
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
                          Observação ↓
                        </Button>
                      </TableHead>
                      <TableHead className="text-center">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell>
                          <input type="checkbox" className="rounded" />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-500 text-xs">👤</span>
                            </div>
                            <span className="text-blue-600 font-medium">{cliente.nome || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {cliente.contato.split('\n').map((line, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm">{line}</span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-cyan-500 hover:text-cyan-600">
                                  📱
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{cliente.aniversario || "-"}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{cliente.genero}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{cliente.observacao || "-"}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="avisos" className="h-full m-0 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Avisos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configure avisos e notificações para clientes.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ClientesView;
