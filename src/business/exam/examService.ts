import { Exam, ExamFormData, CreateExamResponse } from './types';
import { ExamType } from './types';

const LOCAL_STORAGE_KEY = 'prepx_exams';

export class ExamService {
  static loadExamsFromStorage(): Exam[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading exams from localStorage:', error);
      return [];
    }
  }

  static saveExamsToStorage(examsData: Exam[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(examsData));
    } catch (error) {
      console.error('Error saving exams to localStorage:', error);
    }
  }

  static createExam(examData: ExamFormData, examId: number): Exam {
    return {
      ...examData,
      ExamID: examId,
      ExamIDText: `EXAM-${examId}`,
      CreatedOn: new Date().toISOString(),
      ModifiedOn: new Date().toISOString(),
      CSTimeOfExam: "",
      CSTimeOfExamDue: "",
    };
  }

  static addExamToStorage(exam: Exam): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = [...existingExams, exam];
    this.saveExamsToStorage(updatedExams);
  }

  static removeExamFromStorage(examId: number): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = existingExams.filter(exam => exam.ExamID !== examId);
    this.saveExamsToStorage(updatedExams);
  }

  static updateExamInStorage(examId: number, updatedData: Partial<Exam>): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = existingExams.map(exam => 
      exam.ExamID === examId 
        ? { ...exam, ...updatedData, ModifiedOn: new Date().toISOString() }
        : exam
    );
    this.saveExamsToStorage(updatedExams);
  }

  static getExamById(examId: string | number): Exam | undefined {
    const exams = this.loadExamsFromStorage();
    const numericId = typeof examId === 'string' ? parseInt(examId, 10) : examId;
    return exams.find(exam => exam.ExamID === numericId);
  }

  static clearAllExams(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  static getAllExams(): Exam[] {
    return this.loadExamsFromStorage();
  }
}
