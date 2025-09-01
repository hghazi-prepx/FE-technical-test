import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createQuestionForNewExam, deleteQuestionForNewExam, getQuestionListForNewExam } from '@/services/newExamFlow/newExamFlowAPI';
import toast from '@/app/(DashboardLayout)/components/Toast';

export interface QuestionSelectionData {
  selectedQuestionData: any;
  isLoading: boolean;
  error: string | null;
  searchValue: string;
  selectedQuestionIds: string[];
  checkedItems: Record<string, boolean>;
  allChecked: boolean;
  modalPreviewOpen: boolean;
  previewData: any;
  tabValue: number;
}

export interface QuestionSelectionActions {
  fetchQuestions: () => Promise<void>;
  handleAssignQuestion: () => Promise<void>;
  handleDeleteQuestion: (questionId: string) => Promise<void>;
  handleDeleteSelectedQuestion: () => Promise<void>;
  handleSearch: (value: string) => void;
  handleCheckboxChange: (questionId: string) => void;
  handleAllCheckboxChange: () => void;
  handlePreviewModal: (questionData: any) => void;
  handlePreviewModalClose: () => void;
  handleTabChange: (value: number) => void;
  handleOrderBy: (field: string, order: string) => void;
}

export const useQuestionSelection = (): QuestionSelectionData & QuestionSelectionActions => {
  const searchParams = useSearchParams();
  const examId = searchParams.get("examid");

  const [selectedQuestionData, setSelectedQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [modalPreviewOpen, setModalPreviewOpen] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [tabValue, setTabValue] = useState<number>(0);

  const fetchQuestions = async () => {
    if (!examId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getQuestionListForNewExam(examId);
      if (response?.success) {
        setSelectedQuestionData(response.data);
      } else {
        setError('Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to fetch questions');
      console.error('Error fetching questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignQuestion = async () => {
    if (!examId || selectedQuestionIds.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await createQuestionForNewExam(examId, selectedQuestionIds);
      if (response?.success) {
        toast({
          type: "success",
          message: "Questions assigned successfully.",
        });
        await fetchQuestions();
        setSelectedQuestionIds([]);
        setCheckedItems({});
        setAllChecked(false);
      } else {
        toast({
          type: "error",
          message: "Failed to assign questions.",
        });
      }
    } catch (err) {
      toast({
        type: "error",
        message: "Failed to assign questions.",
      });
      console.error('Error assigning questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!examId) return;
    
    setIsLoading(true);
    try {
      const response = await deleteQuestionForNewExam(examId, questionId);
      if (response?.success) {
        toast({
          type: "success",
          message: "Question deleted successfully.",
        });
        await fetchQuestions();
      } else {
        toast({
          type: "error",
          message: "Failed to delete question.",
        });
      }
    } catch (err) {
      toast({
        type: "error",
        message: "Failed to delete question.",
      });
      console.error('Error deleting question:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSelectedQuestion = async () => {
    if (!examId || selectedQuestionIds.length === 0) return;
    
    setIsLoading(true);
    try {
      const deletePromises = selectedQuestionIds.map(questionId => 
        deleteQuestionForNewExam(examId, questionId)
      );
      
      const responses = await Promise.all(deletePromises);
      const allSuccess = responses.every(response => response?.success);
      
      if (allSuccess) {
        toast({
          type: "success",
          message: "Selected questions deleted successfully.",
        });
        await fetchQuestions();
        setSelectedQuestionIds([]);
        setCheckedItems({});
        setAllChecked(false);
      } else {
        toast({
          type: "error",
          message: "Failed to delete some questions.",
        });
      }
    } catch (err) {
      toast({
        type: "error",
        message: "Failed to delete questions.",
      });
      console.error('Error deleting questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCheckboxChange = (questionId: string) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[questionId] = !newCheckedItems[questionId];
    setCheckedItems(newCheckedItems);
    
    const newSelectedIds = Object.keys(newCheckedItems).filter(id => newCheckedItems[id]);
    setSelectedQuestionIds(newSelectedIds);
    
    const allChecked = selectedQuestionData?.results?.every((question: any) => 
      newCheckedItems[question.ExamQuestionID]
    );
    setAllChecked(allChecked || false);
  };

  const handleAllCheckboxChange = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    
    const newCheckedItems: Record<string, boolean> = {};
    const newSelectedIds: string[] = [];
    
    selectedQuestionData?.results?.forEach((question: any) => {
      newCheckedItems[question.ExamQuestionID] = newAllChecked;
      if (newAllChecked) {
        newSelectedIds.push(question.ExamQuestionID);
      }
    });
    
    setCheckedItems(newCheckedItems);
    setSelectedQuestionIds(newSelectedIds);
  };

  const handlePreviewModal = (questionData: any) => {
    setPreviewData(questionData);
    setModalPreviewOpen(true);
  };

  const handlePreviewModalClose = () => {
    setModalPreviewOpen(false);
    setPreviewData(null);
  };

  const handleTabChange = (value: number) => {
    setTabValue(value);
  };

  const handleOrderBy = (field: string, order: string) => {
    // Implement sorting logic here
    console.log('Sorting by:', field, order);
  };

  useEffect(() => {
    if (examId) {
      fetchQuestions();
    }
  }, [examId]);

  return {
    selectedQuestionData,
    isLoading,
    error,
    searchValue,
    selectedQuestionIds,
    checkedItems,
    allChecked,
    modalPreviewOpen,
    previewData,
    tabValue,
    fetchQuestions,
    handleAssignQuestion,
    handleDeleteQuestion,
    handleDeleteSelectedQuestion,
    handleSearch,
    handleCheckboxChange,
    handleAllCheckboxChange,
    handlePreviewModal,
    handlePreviewModalClose,
    handleTabChange,
    handleOrderBy,
  };
};
