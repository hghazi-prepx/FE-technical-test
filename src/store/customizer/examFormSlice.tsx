import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExamType {
  ExamTypeID: number;
  ExamTypeTextID: string;
  ExamTypeName: string;
  ExamTypeSlug: string;
  ExamTypeDesc: string;
  ExamTypeDefaultStation: number;
  ExamTypeDefaultWaitStation: number;
  ExamTypeStatus: number;
  ExamTypeDeleted: number;
  ExamTypeCreatedOn: string; // ISO date string
  ExamTypeModifiedOn: string; // ISO date string or null
  ExamTypeCreatedBy: number;
  ExamTypeModifiedBy: number | null;
}

interface SelectedExamCourse {
  lmscourseid: number;
  lmscoursename: string;
  Identifier: number;
}

interface ExamFormData {
  ExamID: number;
  ExamName: string;
  PrepXExamAFKACJOSCECourse: number[];
  CSTimeOfExam: string | null;
  CSTimeOfExamDue: string | null;
  ExamTypeID: number;
  Status: number;
  SelectedExamCourse: SelectedExamCourse;
  ShortDescription: string;
  LongDescription: string;
  ExamBookletDuration: number;
  ExamNumberofBookletsID: number;
  ExamBreakDuration: number;
  ExamNumberofQuestions: number;
  ExamSetTimeLimit: number;
  ExamTimeLimit: number;
  ExamQuizStart: number;
  ExamTimeLimitExpires: number;
  ExamAvailabilityDate: number; // timestamp
  ExamDueDate: number; // timestamp
  ExamShuffleQuiz: number;
  ExamPaging: number;
  ExamNumberofAttempts: string;
  ExamOverallGradeCalculationID: number;
  ExamEvaluationFeedback: number;
  ExamPublishedDisplayToLearners: number;
  ExamAdditionallyID: number;
  ExamInstructions: string;
  PrepXExamAFKACJOSCECampus: any[]; // empty array in example
  ExamCourseType: null;
  ExamType: ExamType;
  CountryID: number;
  TimeZoneID: number;
}

interface ExamFormState {
  formData: ExamFormData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamFormState = {
  formData: null,
  isLoading: false,
  error: null,
};

// Load initial state from localStorage if available
if (typeof window !== "undefined") {
  const savedData = localStorage.getItem("examFormData");
  if (savedData) {
    try {
      initialState.formData = JSON.parse(savedData);
    } catch (error) {
      console.error("Error parsing saved form data:", error);
    }
  }
}

export const examFormSlice = createSlice({
  name: "examForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<ExamFormData>) => {
      state.formData = action.payload;
      state.error = null;

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("examFormData", JSON.stringify(action.payload));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
          state.error = "Failed to save data locally";
        }
      }
    },
    updateFormData: (state, action: PayloadAction<Partial<ExamFormData>>) => {
      if (state.formData) {
        state.formData = { ...state.formData, ...action.payload };
      } else {
        state.formData = action.payload as ExamFormData;
      }
      state.error = null;
    },

    clearFormData: (state) => {
      state.formData = null;

      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("examFormData");
      }
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setFormData, clearFormData, setError, updateFormData } =
  examFormSlice.actions;

export default examFormSlice.reducer;
