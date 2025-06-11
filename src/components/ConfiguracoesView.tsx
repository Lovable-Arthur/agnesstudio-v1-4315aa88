
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConfiguracoesView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Configure as preferências do sistema.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesView;
