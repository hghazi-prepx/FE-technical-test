import { useState, useEffect, useCallback } from 'react';
import { Exam, ExamType, ExamFormData, CreateExamResponse } from '@/business/exam/types';
import { createNewExam } from '@/services/newExamFlow/newExamFlowAPI';
import { getExamTypeList } from '@/services/examType/examTypeAPI';
import { ExamService } from '@/business/exam/examService';
import { PAGINATION } from '@/utils/Constants';

const { DEFAULT_PAGE } = PAGINATION;

/**
 * Custom hook for exam management
 */
export const useExamManagement = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize exams from localStorage
  useEffect(() => {
    const storedExams = ExamService.loadExamsFromStorage();
    setExams(storedExams);
  }, []);

  // Fetch exam types
  const fetchExamTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const bodyData = {
        limit: 100000000000000000,
        page: DEFAULT_PAGE,
      };
      
      const result = await getExamTypeList(bodyData);
      
      if (result?.success) {
        setExamTypes(result.data.results);
      }
    } catch (err) {
      setError('Failed to fetch exam types');
      console.error('Error fetching exam types:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new exam
  const createExam = useCallback(async (examData: ExamFormData): Promise<CreateExamResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await createNewExam(examData);
      
      if (result?.success) {
        // Create and add the new exam to localStorage
        const newExam = ExamService.createExam(examData, result.data.ExamID);
        ExamService.addExamToStorage(newExam);
        
        // Update local state
        setExams(prev => [...prev, newExam]);
        
        return result;
      }
      
      return null;
    } catch (err) {
      setError('Failed to create exam');
      console.error('Error creating exam:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete exam
  const deleteExam = useCallback((examId: number) => {
    ExamService.removeExamFromStorage(examId);
    setExams(prev => prev.filter(exam => exam.ExamID !== examId));
  }, []);

  // Update exam
  const updateExam = useCallback((examId: number, updatedData: Partial<Exam>) => {
    ExamService.updateExamInStorage(examId, updatedData);
    setExams(prev => prev.map(exam => 
      exam.ExamID === examId 
        ? { ...exam, ...updatedData, ModifiedOn: new Date().toISOString() }
        : exam
    ));
  }, []);

  // Get exam by ID
  const getExamById = useCallback((examId: number): Exam | undefined => {
    return exams.find(exam => exam.ExamID === examId);
  }, [exams]);

  // Clear all exams (for testing)
  const clearAllExams = useCallback(() => {
    ExamService.clearAllExams();
    setExams([]);
  }, []);

  return {
    exams,
    examTypes,
    isLoading,
    error,
    createExam,
    deleteExam,
    updateExam,
    getExamById,
    fetchExamTypes,
    clearAllExams,
  };
};
