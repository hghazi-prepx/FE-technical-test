"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ExamWizardStep =
  | "createExam"
  | "questionData"
  | "assignTrainee"
  | "reviewDetails";

interface ExamWizardState {
  step: ExamWizardStep;
  examId?: string;
  setStep: (step: ExamWizardStep) => void;
  setExamId: (id: string) => void;
  startWizard: (examId: string) => void;
  reset: () => void;
}

export const useExamWizardStore = create<ExamWizardState>()(
  persist(
    (set) => ({
      step: "createExam",
      examId: undefined,
      setStep: (step) => set({ step }),
      setExamId: (id) => set({ examId: id }),
      reset: () => set({ step: "createExam", examId: undefined }),
      startWizard: (examId: string) => set({ step: "createExam", examId }),
    }),
    {
      name: "exam-wizard",
    }
  )
);
