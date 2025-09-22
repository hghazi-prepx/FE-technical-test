import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ExamsStore } from "@/types/examsStoreTypes";


export const useExamsStore = create<ExamsStore>()(
  persist(
    (set, get) => ({
      exams: [],

      addExam: (exam) =>
        set((state) => ({
          exams: [
            ...state.exams,
            {
              ...exam,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateExam: (id, data) =>
        set((state) => ({
          exams: state.exams.map((exam) =>
            exam.stepOne.id === id
              ? { ...exam, ...data, updatedAt: new Date().toISOString() }
              : exam
          ),
        })),

      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((exam) => exam.id !== id),
        })),

      getExamsByStatus: (status) =>
        get().exams.filter((exam) => exam.status === status),

      resetAll: () => set({ exams: [] }),
    }),
    {
      name: "exams-storage", // key for localStorage
    }
  )
);
