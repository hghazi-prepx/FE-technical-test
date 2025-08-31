import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exam {
  examDetails: any;
  questions: any[];
  trainees: any[];
}

interface ExamsState {
  exams: Exam[];
}

const loadExamsFromStorage = (): Exam[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("exams");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const initialState: ExamsState = {
  exams: loadExamsFromStorage(), // ✅ Load on init
};

const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    addExam: (state, action: PayloadAction<Exam>) => {
      state.exams.push(action.payload);
      localStorage.setItem("exams", JSON.stringify(state.exams)); // ✅ Save to storage
    },
    setExams: (state, action: PayloadAction<Exam[]>) => {
      state.exams = action.payload;
      localStorage.setItem("exams", JSON.stringify(state.exams)); // ✅ Save to storage
    },
    loadExams: (state) => {
      state.exams = loadExamsFromStorage(); // ✅ Reload from storage
    },
  },
});

export const { addExam, setExams, loadExams } = examsSlice.actions;
export default examsSlice.reducer;
