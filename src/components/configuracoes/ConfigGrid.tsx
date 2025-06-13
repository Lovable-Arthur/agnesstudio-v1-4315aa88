
import { 
  Home, 
  Calendar, 
  Package, 
  Users, 
  Percent, 
  DollarSign, 
  Edit, 
  Receipt,
  Bell
} from "lucide-react";
import ConfigCard from "./ConfigCard";

type ConfigSection = 
  | 'main'
  | 'estabelecimento'
  | 'agendamento'
  | 'notificacoes'
  | 'servicos'
  | 'comissoes'
  | 'profissionais'
  | 'estoque'
  | 'financeiro'
  | 'grupos'
  | 'customizacoes'
  | 'nota-fiscal';

interface ConfigGridProps {
  onSectionClick: (section: ConfigSection) => void;
}

const ConfigGrid = ({ onSectionClick }: ConfigGridProps) => {
  const configItems = [
    {
      id: 'estabelecimento' as ConfigSection,
      icon: Home,
      title: "Informações do Estabelecimento",
      description: "Configure o nome, endereço e contato do seu estabelecimento",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 'agendamento' as ConfigSection,
      icon: Calendar,
      title: "Agendamento",
      description: "Configure as regras de agendamento do seu estabelecimento",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 'notificacoes' as ConfigSection,
      icon: Bell,
      title: "Notificações",
      description: "Configure o disparo de sms, e-mail e WhatsApp para os seus clientes",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: 'servicos' as ConfigSection,
      icon: Package,
      title: "Serviços e Pacotes",
      description: "Cadastre e gerencie seus serviços e pacotes",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 'comissoes' as ConfigSection,
      icon: Percent,
      title: "Comissões",
      description: "Defina as regras de comissões do seu estabelecimento",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      id: 'profissionais' as ConfigSection,
      icon: Users,
      title: "Profissionais",
      description: "Cadastre e gerencie informações, comissões e regras de acesso dos seus profissionais",
      iconBgColor: "bg-teal-100",
      iconColor: "text-teal-600"
    },
    {
      id: 'estoque' as ConfigSection,
      icon: Package,
      title: "Estoque",
      description: "Cadastre seus locais de estoque e defina as regras de utilização",
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      id: 'financeiro' as ConfigSection,
      icon: DollarSign,
      title: "Financeiro",
      description: "Configure categorias financeiras, dados bancários e regras de taxas do seu estabelecimento",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 'grupos' as ConfigSection,
      icon: Users,
      title: "Grupos de Acessos",
      description: "Gerencie as regras de acesso dos seus profissionais",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: 'customizacoes' as ConfigSection,
      icon: Edit,
      title: "Customizações",
      description: "Personalize algumas configurações para o seu negócio",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      id: 'nota-fiscal' as ConfigSection,
      icon: Receipt,
      title: "Nota Fiscal",
      description: "Cadastre suas empresas e configure os itens essenciais para emissão de nota fiscal",
      iconBgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {configItems.map((item) => (
        <ConfigCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          description={item.description}
          iconBgColor={item.iconBgColor}
          iconColor={item.iconColor}
          onClick={() => onSectionClick(item.id)}
        />
      ))}
    </div>
  );
};

export default ConfigGrid;
