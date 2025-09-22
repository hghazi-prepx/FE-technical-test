export type ExamTypeSlug = "mock" | "quiz" | "self-assessment" | string;
export interface ExamType {
  ExamTypeID: number;
  ExamTypeTextID: string;
  ExamTypeName: string;
  ExamTypeSlug: string | null;
  ExamTypeDesc: string;
  ExamTypeStatus: number;
  ExamTypeDeleted: number;
}

export interface ExamTypeListResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    results: ExamType[];
    totalRecords: number;
    totalPages: number;
  };
  QuesionIndex: any;
}
export interface StepOneData {
  id: string;
  ExamName: string;
  ExamTypeID: string;
  PrepXExamAFKACJOSCECourse: string | number;
  Status: number;
  ShortDescription: string;
  LongDescription: string;
  LongDescriptionEnabled: boolean; // <-- Controls visibility & validation
  ExamNumberofBookletsID: string;
  ExamTimeLimit: string;
  ExamQuizStart: string;
  ExamTimeLimitExpires: string;
  ExamOverallGradeCalculationID: string;
  ExamBookletDuration: number;
  ExamBreakDuration: number;
  ExamNumberofQuestions: number;
  ExamSetTimeLimit: boolean;
  ExamAvailabilityDate: string;
  ExamDueDate: string;
  ExamShuffleQuiz: 0 | 1;
  ExamPaging: 0 | 1;
  ExamNumberofAttempts: string;
  ExamEvaluationFeedback: 0 | 1;
  ExamPublishedDisplayToLearners: 0 | 1;
  ExamAdditionallyID: number;
  ExamInstructions: string;
  PrepXExamAFKACJOSCECampus: string[];
  ExamCourseType: string;
  CSTimeOfExam: string;
  CSTimeOfExamDue: string;
  CSTimeOfExamDuePeriod: string;
  CSTimeOfExamPeriod: string;
  ExamMockLocation: string;
  ExamTimerMode: string;
}