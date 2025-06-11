
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientesView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gerencie a base de clientes do salão.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientesView;
