
import ProfessionalListView from "./profissionais/ProfessionalListView";

interface ProfissionaisConfigProps {
  onBack: () => void;
}

const ProfissionaisConfig = ({ onBack }: ProfissionaisConfigProps) => {
  return (
    <ProfessionalListView
      onBack={onBack}
      onSelectProfessional={() => {}} // Não usado mais aqui, integrado no componente
    />
  );
};

export default ProfissionaisConfig;
