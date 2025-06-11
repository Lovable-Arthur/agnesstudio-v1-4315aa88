
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  Package, 
  Users, 
  Percent, 
  DollarSign, 
  Edit, 
  Receipt,
  Bell,
  ChevronRight
} from "lucide-react";

const ConfiguracoesView = () => {
  return (
    <div className="h-full bg-background p-6">
      {/* Banner de Dicas de Segurança */}
      <div className="mb-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Dicas de segurança e antifraude</h2>
            <p className="text-purple-100">A segurança dos seus dados importa pra gente</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Indicadores de slide */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Grid de Configurações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Informações do Estabelecimento */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Informações do Estabelecimento</h3>
                <p className="text-sm text-gray-600 mb-3">Configure o nome, endereço e contato do seu estabelecimento</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agendamento */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Agendamento</h3>
                <p className="text-sm text-gray-600 mb-3">Configure as regras de agendamento do seu estabelecimento</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Notificações</h3>
                <p className="text-sm text-gray-600 mb-3">Configure o disparo de sms, e-mail e WhatsApp para os seus clientes</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Serviços e Pacotes */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Serviços e Pacotes</h3>
                <p className="text-sm text-gray-600 mb-3">Cadastre e gerencie seus serviços e pacotes</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comissões */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Percent className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Comissões</h3>
                <p className="text-sm text-gray-600 mb-3">Defina as regras de comissões do seu estabelecimento</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profissionais */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Profissionais</h3>
                <p className="text-sm text-gray-600 mb-3">Cadastre e gerencie informações, comissões e regras de acesso dos seus profissionais</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estoque */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Estoque</h3>
                <p className="text-sm text-gray-600 mb-3">Cadastre seus locais de estoque e defina as regras de utilização</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financeiro */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Financeiro</h3>
                <p className="text-sm text-gray-600 mb-3">Configure categorias financeiras, dados bancários e regras de taxas do seu estabelecimento</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grupos de Acessos */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Grupos de Acessos</h3>
                <p className="text-sm text-gray-600 mb-3">Gerencie as regras de acesso dos seus profissionais</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customizações */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Edit className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Customizações</h3>
                <p className="text-sm text-gray-600 mb-3">Personalize algumas configurações para o seu negócio</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nota Fiscal */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Receipt className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Nota Fiscal</h3>
                <p className="text-sm text-gray-600 mb-3">Cadastre suas empresas e configure os itens essenciais para emissão de nota fiscal</p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ConfiguracoesView;
