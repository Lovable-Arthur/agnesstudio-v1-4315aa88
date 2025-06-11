
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AvecPayView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>AvecPay</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gerencie pagamentos através do AvecPay.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvecPayView;
