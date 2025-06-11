
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const EstoqueView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("todos");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  // Dados de exemplo do estoque
  const stockItems = [
    {
      id: 1,
      produto: "Coloração 7-1- Louro Médio Cinza Do-Ha",
      marca: "Do-Ha",
      categoria: "Uso",
      preco: "0,00",
      estoque: "1 unidades",
      estoqueMinimo: "(!) 23 g(s)",
      codigoInterno: "100"
    },
    {
      id: 2,
      produto: "Absolut Equalizer Algas",
      marca: "Mikarrari",
      categoria: "Uso",
      preco: "130,00",
      estoque: "1 unidades",
      estoqueMinimo: "",
      codigoInterno: ""
    },
    {
      id: 3,
      produto: "Aditivo pro vitamina 300ml-",
      marca: "Maxiline",
      categoria: "Revenda",
      preco: "57,00",
      estoque: "1 unidade(s)",
      estoqueMinimo: "(!) -6 unidade(s)",
      codigoInterno: ""
    },
    {
      id: 4,
      produto: "Aditivo pro vitamina 1L",
      marca: "Maxiline",
      categoria: "Uso",
      preco: "0,00",
      estoque: "500 ml(s)",
      estoqueMinimo: "(!) 201 ml(s)",
      codigoInterno: ""
    },
    {
      id: 5,
      produto: "Ampola V6 Moisture intensif",
      marca: "Senscience",
      categoria: "Uso",
      preco: "65,00",
      estoque: "1 unidades",
      estoqueMinimo: "(!) -79 unidades",
      codigoInterno: "120"
    },
    {
      id: 6,
      produto: "ARCO CARNAVAL",
      marca: "",
      categoria: "Revenda",
      preco: "60,00",
      estoque: "1 unidade(s)",
      estoqueMinimo: "(!) 1 unidade(s)",
      codigoInterno: "120"
    },
    {
      id: 7,
      produto: "Ativador cachos 1 lt",
      marca: "Maxiline",
      categoria: "Uso",
      preco: "0,00",
      estoque: "300 ml(s)",
      estoqueMinimo: "356 ml(s)",
      codigoInterno: ""
    }
  ];

  return (
    <div className="h-full bg-background">
      {/* Sub-abas do Estoque */}
      <Tabs defaultValue="produtos" className="h-full flex flex-col">
        <div className="bg-white border-b px-6">
          <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0 gap-0 max-w-2xl">
            <TabsTrigger 
              value="produtos" 
              className="py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Produtos
            </TabsTrigger>
            <TabsTrigger 
              value="fornecedores"
              className="py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Fornecedores
            </TabsTrigger>
            <TabsTrigger 
              value="pedidos"
              className="py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Pedidos de Compra
            </TabsTrigger>
            <TabsTrigger 
              value="inventario"
              className="py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Inventário
            </TabsTrigger>
            <TabsTrigger 
              value="solicitacoes"
              className="py-3 px-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-none"
            >
              Solicitações de Saída
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="produtos" className="h-full m-0 p-6">
            <div className="h-full flex flex-col space-y-6">
              {/* Botões de ação */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus size={16} />
                  Cadastrar Produto
                </Button>
                <Button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600">
                  <ArrowUp size={16} />
                  Registrar Entrada
                </Button>
                <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-600">
                  <ArrowDown size={16} />
                  Registrar Saída
                </Button>
              </div>

              {/* Local Estoque */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Local Estoque</h3>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="secundario">Secundário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtros e busca */}
              <div className="flex items-center gap-4">
                <Select defaultValue="nome">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nome">Nome</SelectItem>
                    <SelectItem value="categoria">Categoria</SelectItem>
                    <SelectItem value="marca">Marca</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex-1 flex items-center gap-2">
                  <Input 
                    placeholder="Pesquisar produto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                    <Search size={16} />
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Checkbox e controles */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Estoque próximo do fim
                  </label>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span>Mostrar</span>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>por página</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Print</Button>
                  <Button variant="outline" size="sm">Excel</Button>
                  <Button variant="outline" size="sm">PDF</Button>
                  
                  <div className="ml-4">
                    <Input placeholder="Buscar..." className="w-48" />
                  </div>
                </div>
              </div>

              {/* Tabela */}
              <div className="flex-1 border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Produto <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Marca <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Categoria <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Preço <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Estoque Mínimo <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Em Estoque <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted">
                        Código Interno <ArrowDown size={14} className="inline ml-1" />
                      </TableHead>
                      <TableHead>Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.produto}</TableCell>
                        <TableCell>{item.marca}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell>{item.preco}</TableCell>
                        <TableCell>
                          {item.estoqueMinimo.includes('(!)') ? (
                            <span className="text-red-500">{item.estoqueMinimo}</span>
                          ) : (
                            item.estoqueMinimo
                          )}
                        </TableCell>
                        <TableCell>{item.estoque}</TableCell>
                        <TableCell>{item.codigoInterno}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                              <Trash2 size={14} />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                              📋 Histórico
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fornecedores" className="h-full m-0 p-6">
            <div className="text-center text-muted-foreground">
              Área de Fornecedores - Em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="pedidos" className="h-full m-0 p-6">
            <div className="text-center text-muted-foreground">
              Área de Pedidos de Compra - Em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="inventario" className="h-full m-0 p-6">
            <div className="text-center text-muted-foreground">
              Área de Inventário - Em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="solicitacoes" className="h-full m-0 p-6">
            <div className="text-center text-muted-foreground">
              Área de Solicitações de Saída - Em desenvolvimento
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EstoqueView;
