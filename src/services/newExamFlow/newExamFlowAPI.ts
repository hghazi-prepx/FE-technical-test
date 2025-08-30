import { QuestionsListResponse, traineeListResponse } from "@/mocks";

export const createNewExam = async (data: any) => {
  const uniqueExamID = Date.now() + Math.floor(Math.random() * 1000);

  return {
    code: 200,
    success: true,
    message: "Exam created successfully",
    data: {
      ExamID: uniqueExamID,
      ...data,
    },
    QuesionIndex: null,
  };
};

export const getOneExamForNewExam = async (examId: number | string) => {
  return {
    code: 200,
    success: true,
    message: "Exam fetched successfully",
    data: {
      ExamID: Number(examId) || 10637,
      ExamName: "Sample Exam",
      ExamTypeID: 1,
      ExamCourseType: "NDECC-SJ",
      ExamAvailabilityDate: Date.now(),
      ExamDueDate: Date.now(),
    },
  };
};

export const getQuestionListForNewExam = async (data: any) => {
  return QuestionsListResponse;
};

export const createQuestionForNewExam = async (data: any) => {
  return {
    code: 200,
    success: true,
    message: "Question created successfully",
    data: data,
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/questionSelectCreate`, "POST", data);
};

export const deleteQuestionForNewExam = async (data: any) => {
  return {
    code: 200,
    success: true,
    message: "Question deleted successfully",
    data: data,
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/questionSelectDelete`, "POST", data);
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
    code: 200,
    success: true,
    message: "Student deleted successfully",
    data: data,
  };
  // return fetchApi(`${APIURL}examAFKACJOSCEM/assignStudentDelete`, "POST", data);
};
