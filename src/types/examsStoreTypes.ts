import { ExamStore } from "./examStoreTypes";

// Extend your exam structure to include ID + status
export interface StoredExam extends ExamStore {
  id: string; // unique identifier (e.g., uuid or backend ID)
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface ExamsStore {
  exams: StoredExam[];
  addExam: (exam: StoredExam) => void;
  updateExam: (id: string, data: Partial<StoredExam>) => void;
  deleteExam: (id: string) => void;
  getExamsByStatus: (status: "draft" | "published") => StoredExam[];
  resetAll: () => void;
}
