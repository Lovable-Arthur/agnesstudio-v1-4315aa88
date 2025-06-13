
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface EstabelecimentoConfigProps {
  onBack: () => void;
}

const EstabelecimentoConfig = ({ onBack }: EstabelecimentoConfigProps) => {
  return (
    <div className="h-full bg-background p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Configurações
        </Button>
        <h1 className="text-2xl font-bold">Informações do Estabelecimento</h1>
        <p className="text-muted-foreground">Configure o nome, endereço e contato do seu estabelecimento</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados Básicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nome-estabelecimento">Nome do Estabelecimento</Label>
              <Input id="nome-estabelecimento" placeholder="Beleza Salon" />
            </div>
            <div>
              <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
              <Input id="nome-fantasia" placeholder="Beleza Salon" />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" placeholder="00.000.000/0000-00" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" placeholder="São Paulo" />
              </div>
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" placeholder="Rua das Flores, 123" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" placeholder="123" />
              </div>
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" placeholder="Sala 101" />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" placeholder="Centro" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="contato@belezasalon.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="site">Site</Label>
              <Input id="site" placeholder="www.belezasalon.com" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
};

export default EstabelecimentoConfig;
