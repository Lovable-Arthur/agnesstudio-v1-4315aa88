
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinanceiroView = () => {
  return (
    <div className="h-full bg-background">
      <Tabs defaultValue="caixas-abertos" className="h-full flex flex-col">
        <div className="bg-muted/30 border-b px-4">
          <TabsList className="h-auto p-0 bg-transparent gap-0">
            <TabsTrigger 
              value="caixas-abertos"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Caixas Abertos
            </TabsTrigger>
            <TabsTrigger 
              value="historico-caixas"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Histórico de Caixas
            </TabsTrigger>
            <TabsTrigger 
              value="comandas-abertas"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Comandas Abertas
            </TabsTrigger>
            <TabsTrigger 
              value="comandas-finalizadas"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Comandas Finalizadas
            </TabsTrigger>
            <TabsTrigger 
              value="comissoes"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Comissões
            </TabsTrigger>
            <TabsTrigger 
              value="entradas-saidas"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Entradas e Saídas
            </TabsTrigger>
            <TabsTrigger 
              value="notas-fiscais"
              className="px-4 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Notas Fiscais
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <TabsContent value="caixas-abertos" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Caixas Abertos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gerencie os caixas atualmente abertos no salão.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico-caixas" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Caixas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualize o histórico completo de caixas fechados.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comandas-abertas" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Comandas Abertas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Acompanhe as comandas atualmente em aberto.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comandas-finalizadas" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Comandas Finalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Consulte o histórico de comandas finalizadas.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comissoes" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Comissões</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gerencie as comissões dos profissionais.</p>
                <div className="mt-4">
                  <button 
                    onClick={() => window.location.href = '/comissoes'}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Ir para Comissões Completas
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entradas-saidas" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Entradas e Saídas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Controle o fluxo de entradas e saídas financeiras.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notas-fiscais" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Notas Fiscais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gerencie as notas fiscais emitidas.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FinanceiroView;
