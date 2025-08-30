import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExamService } from '@/business/exam/examService';
import { Exam } from '@/business/exam/types';
import toast from '@/app/(DashboardLayout)/components/Toast';

export interface ReviewDetailsData {
  examData: Exam | null;
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
  const searchParams = useSearchParams();
  const examId = searchParams.get("examid");

  const [examData, setExamData] = useState<Exam | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [questionData, setQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExamData = async () => {
    if (!examId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const exam = ExamService.getExamById(examId);
      if (exam) {
        setExamData(exam);
      } else {
        setError('Exam not found');
      }
    } catch (err) {
      setError('Failed to fetch exam data');
      console.error('Error fetching exam data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentData = async () => {
    if (!examId) return;
    
    try {
      const mockStudentData = {
        totalStudents: 25,
        assignedStudents: 20,
        students: [
          { id: 1, name: "John Doe", email: "john@example.com", status: "Assigned" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Assigned" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Pending" },
        ]
      };
      setStudentData(mockStudentData);
    } catch (err) {
      console.error('Error fetching student data:', err);
    }
  };

  const fetchQuestionData = async () => {
    if (!examId) return;
    
    try {
      const mockQuestionData = {
        totalQuestions: 50,
        assignedQuestions: 45,
        questions: [
          { id: 1, title: "Question 1", type: "Multiple Choice", status: "Active" },
          { id: 2, title: "Question 2", type: "Essay", status: "Active" },
          { id: 3, title: "Question 3", type: "True/False", status: "Inactive" },
        ]
      };
      setQuestionData(mockQuestionData);
    } catch (err) {
      console.error('Error fetching question data:', err);
    }
  };

  const publishExam = async () => {
    if (!examId) return;
    
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        type: "success",
        message: "Exam published successfully!",
      });
      
      await refreshData();
    } catch (err) {
      toast({
        type: "error",
        message: "Failed to publish exam. Please try again.",
      });
      console.error('Error publishing exam:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([
      fetchExamData(),
      fetchStudentData(),
      fetchQuestionData(),
    ]);
  };

  useEffect(() => {
    if (examId) {
      refreshData();
    }
  }, [examId]);

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
