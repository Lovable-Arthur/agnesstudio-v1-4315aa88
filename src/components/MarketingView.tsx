
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketingView = () => {
  return (
    <div className="h-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gerencie campanhas e estratégias de marketing.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingView;
