import { StepOneData } from "@/app/(DashboardLayout)/components/create-acj-exam/types";
import { ExamStore, StepThreeData, StepTwoData } from "@/types/examStoreTypes";
import { create } from "zustand";

const initialStepOne: StepOneData = {
  ExamName: "",
  PrepXExamAFKACJOSCECourse: "",
  ExamTypeID: "",
  Status: 0,
  ShortDescription: "",
  LongDescription: "",
  ExamBookletDuration: 1,
  ExamNumberofBookletsID: "",
  ExamBreakDuration: 1,
  ExamNumberofQuestions: 1,
  ExamSetTimeLimit: 0,
  ExamTimeLimit: 1,
  ExamQuizStart: 1,
  ExamTimeLimitExpires: 1,
  ExamAvailabilityDate: "",
  ExamDueDate: "",
  ExamShuffleQuiz: 0,
  ExamPaging: 0,
  ExamNumberofAttempts: "",
  ExamOverallGradeCalculationID: 1,
  ExamEvaluationFeedback: 0,
  ExamPublishedDisplayToLearners: 0,
  ExamAdditionallyID: 0,
  ExamInstructions: "",
  PrepXExamAFKACJOSCECampus: [],
  ExamCourseType: "",
  CSTimeOfExam: "",
  CSTimeOfExamDue: "",
};

const initialStepTwo: StepTwoData = { results: [] };
const initialStepThree: StepThreeData = { results: [] };

export const useExamStore = create<ExamStore>((set) => ({
  stepOne: initialStepOne,
  stepTwo: initialStepTwo,
  stepThree: initialStepThree,

  setStepOne: (data) =>
    set((state) => ({
      stepOne: { ...state.stepOne, ...data },
    })),

  setStepTwo: (data) =>
    set((state) => ({ stepTwo: { ...state.stepTwo, ...data } })),

  setStepThree: (data) =>
    set((state) => ({ stepThree: { ...state.stepThree, ...data } })),

  resetExam: () =>
    set({
      stepOne: initialStepOne,
      stepTwo: initialStepTwo,
      stepThree: initialStepThree,
    }),
}));
