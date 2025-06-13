
import { usePendingChanges } from "@/hooks/usePendingChanges";
import ProfessionalDetailView from "./profissionais/ProfessionalDetailView";
import ProfessionalListView from "./profissionais/ProfessionalListView";

interface ProfissionaisConfigProps {
  onBack: () => void;
}

const ProfissionaisConfig = ({ onBack }: ProfissionaisConfigProps) => {
  const {
    selectedProfessional,
    pendingChanges,
    hasUnsavedChanges,
    handleUpdateProfessional,
    handleSaveAllChanges,
    handleDiscardChanges,
    handleSelectProfessional,
    clearSelection
  } = usePendingChanges();

  if (selectedProfessional && pendingChanges) {
    return (
      <ProfessionalDetailView
        professional={selectedProfessional}
        pendingChanges={pendingChanges}
        hasUnsavedChanges={hasUnsavedChanges}
        onUpdate={handleUpdateProfessional}
        onSave={handleSaveAllChanges}
        onDiscard={handleDiscardChanges}
        onBack={clearSelection}
      />
    );
  }

  return (
    <ProfessionalListView
      onBack={onBack}
      onSelectProfessional={handleSelectProfessional}
    />
  );
};

export default ProfissionaisConfig;
