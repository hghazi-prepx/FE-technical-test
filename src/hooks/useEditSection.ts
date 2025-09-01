import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Exam } from '@/business/exam/types';

export interface EditSectionData {
  currentStep: number;
  formData: Partial<Exam>;
  isEditing: boolean;
  isLoading: boolean;
}

export interface EditSectionActions {
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<Exam>) => void;
  startEditing: () => void;
  stopEditing: () => void;
  handleNext: (nextStep: number) => void;
  handleBack: (prevStep: number) => void;
  saveFormData: () => Promise<void>;
  resetFormData: () => void;
}

export const useEditSection = (initialExamData?: Exam): EditSectionData & EditSectionActions => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<Exam>>(initialExamData || {});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateFormData = useCallback((data: Partial<Exam>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleNext = useCallback((nextStep: number) => {
    setCurrentStep(nextStep);
  }, []);

  const handleBack = useCallback((prevStep: number) => {
    setCurrentStep(prevStep);
  }, []);

  const saveFormData = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data saved:', formData);
    } catch (error) {
      console.error('Error saving form data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const resetFormData = useCallback(() => {
    setFormData(initialExamData || {});
    setCurrentStep(0);
    setIsEditing(false);
  }, [initialExamData]);

  return {
    currentStep,
    formData,
    isEditing,
    isLoading,
    setCurrentStep,
    updateFormData,
    startEditing,
    stopEditing,
    handleNext,
    handleBack,
    saveFormData,
    resetFormData,
  };
};
