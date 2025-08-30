import { ExamTypeListResponse } from "@/mocks/ExamTypeList";
import { ExamType, ExamTypeListParams, ExamTypeListResponse as BusinessExamTypeListResponse } from "@/business/exam/types";
import { filterAllowedExamTypes } from "@/business/exam/examTypes";

export const getExamTypeList = async (params: ExamTypeListParams): Promise<BusinessExamTypeListResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const mockResponse = ExamTypeListResponse;
  
  // Filter to only allowed exam types
  const filteredResults = filterAllowedExamTypes(mockResponse.data.results);
  
  return {
    ...mockResponse,
    data: {
      results: filteredResults
    }
  };
};