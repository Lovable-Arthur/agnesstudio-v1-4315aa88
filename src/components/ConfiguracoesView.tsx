import { useState } from "react";
import EstabelecimentoConfig from "./configuracoes/EstabelecimentoConfig";
import AgendamentoConfig from "./configuracoes/AgendamentoConfig";
import NotificacoesConfig from "./configuracoes/NotificacoesConfig";
import ConfigBanner from "./configuracoes/ConfigBanner";
import ConfigGrid from "./configuracoes/ConfigGrid";
import ConfigPlaceholder from "./configuracoes/ConfigPlaceholder";

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

const ConfiguracoesView = () => {
  const [currentSection, setCurrentSection] = useState<ConfigSection>('main');

  const handleSectionClick = (section: ConfigSection) => {
    setCurrentSection(section);
  };

  const handleBackToMain = () => {
    setCurrentSection('main');
  };

  if (currentSection === 'estabelecimento') {
    return <EstabelecimentoConfig onBack={handleBackToMain} />;
  }

  if (currentSection === 'agendamento') {
    return <AgendamentoConfig onBack={handleBackToMain} />;
  }

  if (currentSection === 'notificacoes') {
    return <NotificacoesConfig onBack={handleBackToMain} />;
  }

  // Renderizar seções temporárias para os outros itens
  if (currentSection !== 'main') {
    return <ConfigPlaceholder onBack={handleBackToMain} />;
  }

  return (
    <div className="h-full bg-background p-6">
      <ConfigBanner />
      <ConfigGrid onSectionClick={handleSectionClick} />
    </div>
  );
};

export default ConfiguracoesView;
