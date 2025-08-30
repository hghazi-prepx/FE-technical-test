import { Exam } from '@/business/exam/types';
import { API_ENDPOINTS } from '@/config/endpoints';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getExamById = async (examId: string): Promise<ApiResponse<Exam>> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.EXAMS}/${examId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data,
      message: response.ok ? undefined : 'Failed to fetch exam details'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'An error occurred while fetching exam details'
    };
  }
};