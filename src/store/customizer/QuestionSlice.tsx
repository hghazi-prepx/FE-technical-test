import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  ExamQuestionID: string;
  BookletID: string;
  QuestionID: string;
  CourseTypeName: string;
  ExamQuestionStatus: number;
  QuestionTextID: string;
  QuestionTopicName: string;
  QuestionTypeFor: string;
}

interface ExamState {
  selectedQuestions: Question[];
  selectedQuestionIds: string[];
  examId: string | null;
  bookletId: string;
}

// Load initial state from localStorage
const loadState = (): ExamState => {
  try {
    const serializedState = localStorage.getItem("questionState");
    if (serializedState === null) {
      return {
        selectedQuestions: [],
        selectedQuestionIds: [],
        examId: null,
        bookletId: "1",
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      selectedQuestions: [],
      selectedQuestionIds: [],
      examId: null,
      bookletId: "1",
    };
  }
};

const initialState: ExamState = loadState();

const questionsSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setSelectedQuestions: (state, action: PayloadAction<Question[]>) => {
      state.selectedQuestions = action.payload;
      state.selectedQuestionIds = action.payload.map((q) => q.QuestionID);
      // Save to localStorage
      localStorage.setItem("questionState", JSON.stringify(state));
    },
    addSelectedQuestion: (state, action: PayloadAction<Question>) => {
      if (!state.selectedQuestionIds.includes(action.payload.QuestionID)) {
        state.selectedQuestions.push(action.payload);
        state.selectedQuestionIds.push(action.payload.QuestionID);
        localStorage.setItem("questionState", JSON.stringify(state));
      }
    },
    removeSelectedQuestion: (state, action: PayloadAction<string>) => {
      state.selectedQuestions = state.selectedQuestions.filter(
        (q) => q.QuestionID !== action.payload
      );
      state.selectedQuestionIds = state.selectedQuestionIds.filter(
        (id) => id !== action.payload
      );
      localStorage.setItem("questionState", JSON.stringify(state));
    },
    clearSelectedQuestions: (state) => {
      state.selectedQuestions = [];
      state.selectedQuestionIds = [];
      localStorage.setItem("questionState", JSON.stringify(state));
    },
    setExamId: (state, action: PayloadAction<string>) => {
      state.examId = action.payload;
      localStorage.setItem("questionState", JSON.stringify(state));
    },
    setBookletId: (state, action: PayloadAction<string>) => {
      state.bookletId = action.payload;
      localStorage.setItem("questionState", JSON.stringify(state));
    },
  },
});

export const {
  setSelectedQuestions,
  addSelectedQuestion,
  removeSelectedQuestion,
  clearSelectedQuestions,
  setExamId,
  setBookletId,
} = questionsSlice.actions;

export default questionsSlice.reducer;
