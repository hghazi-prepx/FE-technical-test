
export interface ExamQuestion {
  BookletID: string;
  CourseTypeName: string;
  ExamQuestionID: number;
  ExamQuestionStatus: number;
  QuestionID: number;
  QuestionTextID: string;
  QuestionTopicName: string;
  QuestionTypeFor: string;
}

export interface Trainee {
  id: number;
  StudentID: number;
  CampusID: number;
  ExamID: string;
  UserEmail: string;
  UserFirstName: string;
  UserLastName: number | string;
  UserTitleName: string;
  UserID: number;
  UserIDText: string;
  UserRoleTextID: string;
}

interface StepOneData {
  id: string;
  ExamName: string;
  PrepXExamAFKACJOSCECourse: string;
  ExamTypeID: string;
  Status: number;
  ShortDescription: string;
  LongDescription: string;
  ExamBookletDuration: number;
  ExamNumberofBookletsID: string;
  ExamBreakDuration: number;
  ExamNumberofQuestions: number;
  ExamSetTimeLimit: number;
  ExamTimeLimit: number;
  ExamQuizStart: number;
  ExamTimeLimitExpires: number;
  ExamAvailabilityDate: string;
  ExamDueDate: string;
  ExamShuffleQuiz: number;
  ExamPaging: number;
  ExamNumberofAttempts: string;
  ExamOverallGradeCalculationID: number;
  ExamEvaluationFeedback: number;
  ExamPublishedDisplayToLearners: number;
  ExamAdditionallyID: number;
  ExamInstructions: string;
  PrepXExamAFKACJOSCECampus: string[];
  ExamCourseType: string;
  CSTimeOfExam: string;
  CSTimeOfExamDue: string;
}

export interface StepTwoData {
  results: ExamQuestion[];
}

export interface StepThreeData {
  results: Trainee[];
}

export interface ExamStore {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  setStepOne: (data: Partial<StepOneData>) => void;
  setStepTwo: (data: Partial<StepTwoData>) => void;
  setStepThree: (data: Partial<StepThreeData>) => void;
  resetExam: () => void;
}
