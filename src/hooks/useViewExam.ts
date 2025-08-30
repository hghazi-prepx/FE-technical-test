import { useState, useEffect } from 'react';
import { Exam } from '@/business/exam/types';
import { ExamService } from '@/business/exam/examService';

export interface ViewExamData {
  exam: Exam | null;
  isLoading: boolean;
  error: string | null;
}

export interface ViewExamActions {
  fetchExam: (examId: string) => Promise<void>;
  refreshExam: () => Promise<void>;
}

export const useViewExam = (examId?: string): ViewExamData & ViewExamActions => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExam = async (examIdToFetch: string) => {
    if (!examIdToFetch) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const examData = ExamService.getExamById(examIdToFetch);
      if (examData) {
        setExam(examData);
      } else {
        setError('Exam not found');
      }
    } catch (err) {
      setError('Failed to fetch exam details');
      console.error('Error fetching exam:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshExam = async () => {
    if (examId) {
      await fetchExam(examId);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchExam(examId);
    }
  }, [examId]);

  return {
    exam,
    isLoading,
    error,
    fetchExam,
    refreshExam,
  };
};
