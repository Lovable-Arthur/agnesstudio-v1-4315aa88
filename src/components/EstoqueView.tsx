
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EstoqueView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gerencie o estoque de produtos do salão.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoqueView;
