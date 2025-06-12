
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Eye } from "lucide-react";

const FilterSection = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Filter className="w-5 h-5 mr-2" />
          Selecione o Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <Label>Ano Cliente</Label>
            <Select defaultValue="qualquer">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualquer">Qualquer</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs">Visualizar por período</Label>
              <input type="radio" name="periodo" value="periodo" className="mt-2" />
            </div>
            <div>
              <Label className="text-xs">Visualizar por mês</Label>
              <input type="radio" name="periodo" value="mes" className="mt-2" />
            </div>
            <div>
              <Label className="text-xs">Visualizar por dia</Label>
              <input type="radio" name="periodo" value="dia" className="mt-2" defaultChecked />
            </div>
          </div>

          <div>
            <Label>Data Início</Label>
            <Input type="date" value="2024-01-23" />
          </div>

          <div>
            <Label>Data Fim</Label>
            <Input type="date" value="2024-01-23" />
          </div>

          <div className="flex gap-2">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Comparar com outro período</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
