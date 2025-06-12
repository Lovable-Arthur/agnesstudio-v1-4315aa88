
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterSection from "./reports/FilterSection";
import ActionButtons from "./reports/ActionButtons";
import StatsCards from "./reports/StatsCards";
import ChartsSection from "./reports/ChartsSection";

const RelatoriosView = () => {
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
              <FilterSection />

              {/* Botões de Ação */}
              <ActionButtons />

              {/* Cards de Estatísticas */}
              <StatsCards />

              {/* Gráficos */}
              <ChartsSection />

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
