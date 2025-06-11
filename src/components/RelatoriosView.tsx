
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelatoriosView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Visualize relatórios detalhados do negócio.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosView;
