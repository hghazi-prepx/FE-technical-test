import { Exam, ExamFormData, CreateExamResponse } from './types';
import { ExamType } from './types';

const LOCAL_STORAGE_KEY = 'prepx_exams';

/**
 * Exam Service - Handles all exam-related business logic
 */
export class ExamService {
  /**
   * Load exams from localStorage
   */
  static loadExamsFromStorage(): Exam[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading exams from localStorage:', error);
      return [];
    }
  }

  /**
   * Save exams to localStorage
   */
  static saveExamsToStorage(examsData: Exam[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(examsData));
    } catch (error) {
      console.error('Error saving exams to localStorage:', error);
    }
  }

  /**
   * Create a new exam
   */
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

  /**
   * Add exam to storage
   */
  static addExamToStorage(exam: Exam): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = [...existingExams, exam];
    this.saveExamsToStorage(updatedExams);
  }

  /**
   * Remove exam from storage
   */
  static removeExamFromStorage(examId: number): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = existingExams.filter(exam => exam.ExamID !== examId);
    this.saveExamsToStorage(updatedExams);
  }

  /**
   * Update exam in storage
   */
  static updateExamInStorage(examId: number, updatedData: Partial<Exam>): void {
    const existingExams = this.loadExamsFromStorage();
    const updatedExams = existingExams.map(exam => 
      exam.ExamID === examId 
        ? { ...exam, ...updatedData, ModifiedOn: new Date().toISOString() }
        : exam
    );
    this.saveExamsToStorage(updatedExams);
  }

  /**
   * Get exam by ID from storage
   */
  static getExamById(examId: number): Exam | undefined {
    const exams = this.loadExamsFromStorage();
    return exams.find(exam => exam.ExamID === examId);
  }

  /**
   * Clear all exams from storage (for testing)
   */
  static clearAllExams(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  /**
   * Get all exams from storage
   */
  static getAllExams(): Exam[] {
    return this.loadExamsFromStorage();
  }
}
