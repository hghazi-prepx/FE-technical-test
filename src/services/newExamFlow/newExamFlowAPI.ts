import { QuestionsListResponse, traineeListResponse } from "@/mocks";

export const createNewExam = async (data: any) => {
  return {
    code: 200,
    success: true,
    message: "Exam created successfully",
    data: {
      ExamID: 10637,
      ...data,
    },
    QuesionIndex: null,
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
