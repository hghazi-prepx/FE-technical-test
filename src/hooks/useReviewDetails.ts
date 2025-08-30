import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOneExamForNewExamEdit, updateIMockExamStatus } from '@/services/newExamFlow/newExamFlowAPI';
import { getAssignTraineeListForNewExam } from '@/services/newExamFlow/newExamFlowAPI';
import { getQuestionListForNewExam } from '@/services/newExamFlow/newExamFlowAPI';
import toast from '@/app/(DashboardLayout)/components/Toast/index';
import { PAGINATION } from '@/utils/Constants';

const { DEFAULT_PAGE } = PAGINATION;

export interface ReviewDetailsData {
  examData: any;
  studentData: any;
  questionData: any;
  isLoading: boolean;
  isPublishing: boolean;
  error: string | null;
}

export interface ReviewDetailsActions {
  fetchExamData: () => Promise<void>;
  fetchStudentData: () => Promise<void>;
  fetchQuestionData: () => Promise<void>;
  publishExam: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useReviewDetails = (): ReviewDetailsData & ReviewDetailsActions => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = searchParams.get('examid');

  const [examData, setExamData] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const [questionData, setQuestionData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExamData = useCallback(async () => {
    if (!examId) return;
    
    try {
      setError(null);
      const result = await getOneExamForNewExamEdit(examId);
      if (result?.success) {
        setExamData(result.data);
      } else {
        setError('Failed to fetch exam data');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching exam data');
      console.error('Error fetching exam data:', err);
    }
  }, [examId]);

  const fetchStudentData = useCallback(async () => {
    if (!examId) return;
    
    try {
      setError(null);
      const bodyData = {
        limit: 1000,
        page: DEFAULT_PAGE,
        search: "",
        searchedKey: [],
        ascDesc: "StudentCreatedOn DESC",
        ExamID: examId,
      };
      
      const result = await getAssignTraineeListForNewExam(bodyData);
      if (result?.success) {
        setStudentData({
          results: result.data?.results || [],
          totalPages: result.data?.totalPages || 0,
          totalRecords: result.data?.totalRecords || 0,
        });
      } else {
        setError('Failed to fetch student data');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching student data');
      console.error('Error fetching student data:', err);
    }
  }, [examId]);

  const fetchQuestionData = useCallback(async () => {
    if (!examId) return;
    
    try {
      setError(null);
      const bodyData = {
        limit: 1000,
        page: DEFAULT_PAGE,
        search: "",
        searchedKey: [],
        ascDesc: "QuestionCreatedOn DESC",
        ExamID: examId,
      };
      
      const result = await getQuestionListForNewExam(bodyData);
      if (result?.success) {
        setQuestionData({
          results: result.data?.results || [],
          totalPages: result.data?.totalPages || 0,
          totalRecords: result.data?.totalRecords || 0,
        });
      } else {
        setError('Failed to fetch question data');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching question data');
      console.error('Error fetching question data:', err);
    }
  }, [examId]);

  const publishExam = useCallback(async () => {
    if (!examId) return;
    
    if (questionData.totalRecords === 0) {
      toast({
        type: "error",
        message: "Please select questions for the exam before publishing",
      });
      return;
    }

    try {
      setIsPublishing(true);
      setError(null);
      
      const bodyData = {
        Status: 1,
      };
      
      const result = await updateIMockExamStatus(examId, bodyData);
      if (result?.success) {
        toast({
          type: "success",
          message: "Exam published successfully",
        });
        router.push("/Exam-Management");
      } else {
        setError('Failed to publish exam');
        toast({
          type: "error",
          message: "Failed to publish exam",
        });
      }
    } catch (err: any) {
      setError(err.message || 'Error publishing exam');
      toast({
        type: "error",
        message: "Error publishing exam",
      });
      console.error('Error publishing exam:', err);
    } finally {
      setIsPublishing(false);
    }
  }, [examId, questionData.totalRecords, router]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchExamData(),
        fetchStudentData(),
        fetchQuestionData(),
      ]);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchExamData, fetchStudentData, fetchQuestionData]);

  useEffect(() => {
    if (examId) {
      refreshData();
    }
  }, [examId, refreshData]);

  return {
    examData,
    studentData,
    questionData,
    isLoading,
    isPublishing,
    error,
    fetchExamData,
    fetchStudentData,
    fetchQuestionData,
    publishExam,
    refreshData,
  };
};
