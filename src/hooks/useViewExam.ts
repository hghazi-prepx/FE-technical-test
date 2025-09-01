import { useState, useEffect } from 'react';
import { Exam } from '@/business/exam/types';
import { getExamById } from '@/services/api/exam'; // Assuming this is your API service

export interface ViewExamState {
  exam: Exam | null;
  isLoading: boolean;
  error: string | null;
}

export function useViewExam(examId: string) {
  const [state, setState] = useState<ViewExamState>({
    exam: null,
    isLoading: true,
    error: null
  });

  const fetchExam = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await getExamById(examId);
      
      if (response.success) {
        setState({
          exam: response.data,
          isLoading: false,
          error: null
        });
      } else {
        setState({
          exam: null,
          isLoading: false,
          error: response.message || 'Failed to fetch exam details'
        });
      }
    } catch (error) {
      setState({
        exam: null,
        isLoading: false,
        error: 'An error occurred while fetching exam details'
      });
    }
  };

  const refreshExam = () => fetchExam();

  useEffect(() => {
    if (examId) {
      fetchExam();
    }
  }, [examId]);

  return {
    ...state,
    refreshExam
  };
}
