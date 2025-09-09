"use client";
import React from 'react';
import { ExamWizardProvider } from '@/store/examWizard/ExamWizardContext';

interface LayoutProps {
  children: React.ReactNode;
}

const ExamLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ExamWizardProvider>
      {children}
    </ExamWizardProvider>
  );
};

export default ExamLayout;