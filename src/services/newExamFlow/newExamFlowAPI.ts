import { QuestionsListResponse, traineeListResponse } from "@/mocks";

export const createNewExam = async (data: any) => {
  // Generate a unique exam ID
  const examId = Date.now();
  
  const examData = {
    "ExamID": examId,
    "ExamIDText": `EXAM-${examId}`,
    "ExamCreatedOn": new Date().toISOString(),
    "Status": 0,
    ...data,
  };
  
  // DO NOT save to localStorage here - data will be stored in memory via context
  // localStorage persistence will happen only in the final step
  
  return {
    "code": 200,
    "success": true,
    "message": "Exam created successfully",
    "data": examData,
    "QuesionIndex": null
  };
};

export const getQuestionListForNewExam = async (data: any) => {
  const { limit = 50, offset = 0 } = data || {};
  const startIndex = offset;
  const endIndex = startIndex + limit;
  
  const paginatedResults = QuestionsListResponse.data.results.slice(startIndex, endIndex);
  const totalRecords = QuestionsListResponse.data.results.length;
  const totalPages = Math.ceil(totalRecords / limit);
  
  return {
    ...QuestionsListResponse,
    data: {
      ...QuestionsListResponse.data,
      results: paginatedResults,
      totalRecords,
      totalPages
    }
  };
};


export const createQuestionForNewExam = async (data: any) => {
  return {
    "code": 200,
    "success": true,
    "message": "Question created successfully",
    "data": data
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/questionSelectCreate`, "POST", data);
};



export const deleteQuestionForNewExam = async (data: any) => {
  return {
    "code": 200,
    "success": true,
    "message": "Question deleted successfully",
    "data": data
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/questionSelectDelete`, "POST", data);
};

export const assignTraineeForNewExam = async (data: any) => {
  const { limit = 50, offset = 0 } = data || {};
  const startIndex = offset;
  const endIndex = startIndex + limit;
  
  const paginatedResults = traineeListResponse.data.results.slice(startIndex, endIndex);
  const totalRecords = traineeListResponse.data.results.length;
  const totalPages = Math.ceil(totalRecords / limit);
  
  return {
    ...traineeListResponse,
    data: {
      ...traineeListResponse.data,
      results: paginatedResults,
      totalRecords,
      totalPages
    }
  };
};

export const getAvailableTraineeForNewExam = async (data: any) => {
  const { limit = 50, offset = 0 } = data || {};
  const startIndex = offset;
  const endIndex = startIndex + limit;
  
  const paginatedResults = traineeListResponse.data.results.slice(startIndex, endIndex);
  const totalRecords = traineeListResponse.data.results.length;
  const totalPages = Math.ceil(totalRecords / limit);
  
  return {
    ...traineeListResponse,
    data: {
      ...traineeListResponse.data,
      results: paginatedResults,
      totalRecords,
      totalPages
    }
  };
};

export const getAssignTraineeListForNewExam = async (data: any) => {
  const { limit = 50, offset = 0 } = data || {};
  const startIndex = offset;
  const endIndex = startIndex + limit;
  
  const paginatedResults = traineeListResponse.data.results.slice(startIndex, endIndex);
  const totalRecords = traineeListResponse.data.results.length;
  const totalPages = Math.ceil(totalRecords / limit);
  
  return {
    ...traineeListResponse,
    data: {
      ...traineeListResponse.data,
      results: paginatedResults,
      totalRecords,
      totalPages
    }
  };
};


export const deleteStudentForNewExam = async (data: any) => {
  return {
    "code": 200,
    "success": true,
    "message": "Student deleted successfully",
    "data": data
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/assignStudentDelete`, "POST", data);
};

export const getOneExamForNewExam = async (examId: string, inMemoryData?: any) => {
  console.log('getOneExamForNewExam called with:', { examId, inMemoryData });
  
  // First check if in-memory data is provided (from context)
  if (inMemoryData && Object.keys(inMemoryData).length > 0) {
    console.log('Using in-memory data:', inMemoryData);
    
    // Format the exam data for display
    const formattedExam = {
      ...inMemoryData,
      DueDate: inMemoryData.DueDate || null,
      "ExamID": inMemoryData.ExamID || examId,
      "ExamIDText": inMemoryData.ExamIDText || `EXAM-${examId}`,
      "ExamCreatedOn": inMemoryData.ExamCreatedOn || new Date().toISOString(),
      "ExamDate": inMemoryData.ExamDate || inMemoryData.ExamCreatedOn || new Date().toISOString(),
      "DueDate": inMemoryData.DueDate || null
    };
    
    console.log('Returning formatted in-memory data:', formattedExam);
    
    return {
      "code": 200,
      "success": true,
      "message": "Exam retrieved successfully from memory",
      "data": formattedExam
    };
  }
  
  // Fallback to localStorage for published exams
  const savedExams = JSON.parse(localStorage.getItem('prepx_exams') || '[]');
  const exam = savedExams.find((e: any) => e.ExamID == examId);
  
  if (exam) {
    // Format the exam data for display
    const formattedExam = {
      ...exam,
      "ExamIDText": exam.ExamIDText || `EXAM-${exam.ExamID}`,
      "ExamCreatedOn": exam.ExamCreatedOn || new Date().toISOString(),
      "ExamDate": exam.ExamDate || exam.ExamCreatedOn || new Date().toISOString(),
      "DueDate": exam.DueDate || null
    };
    
    return {
      "code": 200,
      "success": true,
      "message": "Exam retrieved successfully",
      "data": formattedExam
    };
  }
  
  // Return mock data if not found anywhere
  return {
    "code": 200,
    "success": true,
    "message": "Exam retrieved successfully",
    "data": {
      "ExamID": examId,
      "ExamIDText": `EXAM-${examId}`,
      "ExamName": "Sample Exam",
      "ExamType": "Mock",
      "ExamDate": new Date().toISOString(),
      "ExamCreatedOn": new Date().toISOString(),
      "Status": 0
    }
  };
};

export const getOneIMockExamForEdit = async (examId: string) => {
  return getOneExamForNewExam(examId);
};