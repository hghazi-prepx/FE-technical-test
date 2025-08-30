export interface ExamType {
  ExamTypeID: number;
  ExamTypeTextID: string;
  ExamTypeName: string;
  ExamTypeSlug: string | null;
  ExamTypeDesc: string;
  ExamTypeDefaultStation: number;
  ExamTypeDefaultWaitStation: number;
  ExamTypeStatus: number;
  ExamTypeDeleted: number;
  ExamTypeCreatedOn: string;
  ExamTypeModifiedOn: string;
  ExamTypeCreatedBy: number;
  ExamTypeModifiedBy: number | null;
}

export interface ExamTypeListResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    results: ExamType[];
  };
}

export interface ExamTypeListParams {
  limit: number;
  page: number;
}

export interface Exam {
  ExamID?: number;
  ExamIDText?: string;
  ExamName: string;
  ExamTypeID: string;
  ExamTypeSlug?: string;
  ExamTypeName?: string;
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
  ExamAvailabilityDate: string | number;
  ExamDueDate: string | number;
  ExamShuffleQuiz: number;
  ExamPaging: number;
  ExamNumberofAttempts: string;
  ExamOverallGradeCalculationID: number;
  ExamEvaluationFeedback: number;
  ExamPublishedDisplayToLearners: number;
  ExamAdditionallyID: number;
  ExamInstructions: string;
  PrepXExamAFKACJOSCECampus: number[];
  ExamCourseType: string;
  CSTimeOfExam: string;
  CSTimeOfExamDue: string;
  CountryID: number;
  TimeZoneID: number;
  CourseTypeName?: string;
  CourseTypeSlug?: string;
  DateOfExamination?: number;
  CreatedOn?: string;
  ModifiedOn?: string;
  CreatedBy?: number;
  ModifiedBy?: number;
}

export interface ExamFormData extends Omit<Exam, 'ExamID' | 'ExamIDText' | 'CreatedOn' | 'ModifiedOn' | 'CreatedBy' | 'ModifiedBy' | 'CSTimeOfExam' | 'CSTimeOfExamDue'> {
  PrepXExamAFKACJOSCECourse: string;
}

export interface CreateExamResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    ExamID: number;
  };
}
