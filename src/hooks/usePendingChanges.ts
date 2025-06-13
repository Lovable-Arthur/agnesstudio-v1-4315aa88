
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Professional } from "@/types/calendar";
import { useProfessionals } from "@/contexts/ProfessionalsContext";

export const usePendingChanges = () => {
  const { professionals, updateProfessional } = useProfessionals();
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Professional | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update selected professional when professionals list changes
  useEffect(() => {
    if (selectedProfessional && !hasUnsavedChanges) {
      const updatedProfessional = professionals.find(p => p.id === selectedProfessional.id);
      if (updatedProfessional) {
        setSelectedProfessional(updatedProfessional);
        setPendingChanges(updatedProfessional);
      }
    }
  }, [professionals, selectedProfessional, hasUnsavedChanges]);

  const handleUpdateProfessional = (updatedProfessional: Professional) => {
    setPendingChanges(updatedProfessional);
    setHasUnsavedChanges(true);
  };

  const handleSaveAllChanges = () => {
    if (pendingChanges) {
      updateProfessional(pendingChanges);
      setSelectedProfessional(pendingChanges);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Alterações salvas",
        description: "As informações foram atualizadas automaticamente na agenda.",
      });
    }
  };

  const handleDiscardChanges = () => {
    if (selectedProfessional) {
      setPendingChanges(selectedProfessional);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Alterações descartadas",
        description: "As alterações foram descartadas e os dados originais foram restaurados.",
      });
    }
  };

  const handleSelectProfessional = (professional: Professional) => {
    if (hasUnsavedChanges) {
      toast({
        title: "Alterações não salvas",
        description: "Você tem alterações não salvas. Salve ou descarte antes de selecionar outro profissional.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedProfessional(professional);
    setPendingChanges(professional);
    setHasUnsavedChanges(false);
  };

  const clearSelection = () => {
    if (hasUnsavedChanges) {
      toast({
        title: "Alterações não salvas",
        description: "Você tem alterações não salvas. Salve ou descarte antes de voltar.",
        variant: "destructive",
      });
      return;
    }
    setSelectedProfessional(null);
  };

  return {
    selectedProfessional,
    pendingChanges,
    hasUnsavedChanges,
    handleUpdateProfessional,
    handleSaveAllChanges,
    handleDiscardChanges,
    handleSelectProfessional,
    clearSelection
  };
};
