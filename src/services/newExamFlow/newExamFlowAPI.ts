import { QuestionsListResponse, traineeListResponse } from "@/mocks";
import { ExamFormData, CreateExamResponse } from "@/business/exam/types";

export const createNewExam = async (data: ExamFormData): Promise<CreateExamResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    "code": 200,
    "success": true,
    "message": "Exam created successfully",
    "data": {
      "ExamID": Math.floor(Math.random() * 10000) + 10000, // Generate random ID for testing
    }
  };
};

export const getOneExamForNewExamEdit = async (examId: string) => {
  // Mock implementation
  return {
    success: true,
    data: {
      ExamID: examId,
      ExamName: "Sample Exam",
      ExamTypeID: "32",
      ExamTypeSlug: "mock",
      Status: 1,
      PrepXExamAFKACJOSCECourse: "ACJ",
      ExamSetTimeLimit: 1,
      ExamShuffleQuiz: 0,
      ExamPaging: 0,
      ExamNumberofAttempts: "",
      ExamOverallGradeCalculationID: 1,
      ExamEvaluationFeedback: 0,
      ExamPublishedDisplayToLearners: 0,
      ExamAdditionallyID: 0,
      ExamInstructions: "",
      ExamTimeLimit: 60,
      ExamNumberofQuestions: 100,
      ExamBookletDuration: 60,
      ExamBreakDuration: 15,
      ExamNumberofBookletsID: "1",
      ExamQuizStart: 1,
      ExamTimeLimitExpires: 1,
      ExamAvailabilityDate: new Date().getTime(),
      ExamDueDate: new Date().getTime() + 3600000,
      ShortDescription: "Sample exam description",
      LongDescription: "Sample long description",
      CountryID: 32,
      TimeZoneID: 248,
      ExamCourseType: "ACJ",
      PrepXExamAFKACJOSCECampus: [
        {
          ExamCampusDateTime: new Date().getTime(),
          CountryID: 32,
          CampusID: 1,
          CountryWiseTimeZoneID: 248,
        }
      ],
    }
  };
};

export const updateExamData = async (examId: string, data: any) => {
  // Mock implementation
  return {
    success: true,
    message: "Exam updated successfully"
  };
};

export const getOneExamForNewExam = async (examId: string) => {
  // Mock implementation
  return {
    success: true,
    data: {
      ExamID: examId,
      ExamName: "Sample Exam",
      ExamTypeID: "32",
      Status: 1,
    }
  };
};

export const getOneIMockExamForEdit = async (examId: string) => {
  // Mock implementation
  return {
    success: true,
    data: {
      ExamID: examId,
      ExamName: "Sample Exam",
      ExamTypeID: "32",
      Status: 1,
      StationsNumber: 5,
      WaitStation: 1,
    }
  };
};

export const getQuestionListForNewExam = async (data: any) => {
  return {
    ...QuestionsListResponse,
    data: {
      ...QuestionsListResponse.data,
      assignStudent: []
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
};

export const deleteQuestionForNewExam = async (data: any) => {
  return {
    "code": 200,
    "success": true,
    "message": "Question deleted successfully",
    "data": data
  };
};

export const assignTraineeForNewExam = async (data: any) => {
    return traineeListResponse;
};

export const getAvailableTraineeForNewExam = async (data: any) => {
  return traineeListResponse;
};

export const getAssignTraineeListForNewExam = async (data: any) => {
  return traineeListResponse;
};

export const deleteStudentForNewExam = async (data: any) => {
  return {
    "code": 200,
    "success": true,
    "message": "Student deleted successfully",
    "data": data
  };
};

export const getIMockExamList = async (data: any) => {
  // Mock implementation
  return {
    success: true,
    data: {
      results: []
    }
  };
};

export const updateIMockExamStatus = async (examId: string, data: any) => {
  // Mock implementation
  return {
    success: true,
    message: "Exam status updated successfully"
  };
};