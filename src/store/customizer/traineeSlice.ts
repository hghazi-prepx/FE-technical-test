// store/traineeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TraineeState {
  selectedOptions: any[];
  studentSelectedId: any[];
  selectedStudents: number[];
}

const initialState: TraineeState = {
  selectedOptions: [],
  studentSelectedId: [],
  selectedStudents: [],
};

const traineeSlice = createSlice({
  name: "trainee",
  initialState,
  reducers: {
    setSelectedOptions: (state, action: PayloadAction<any[]>) => {
      state.selectedOptions = action.payload;
    },
    setStudentSelectedId: (state, action: PayloadAction<any[]>) => {
      state.studentSelectedId = action.payload;
    },
    setSelectedStudents: (state, action: PayloadAction<number[]>) => {
      state.selectedStudents = action.payload;
    },
    resetTrainees: (state) => {
      state.selectedOptions = [];
      state.studentSelectedId = [];
      state.selectedStudents = [];
    },
  },
});

export const {
  setSelectedOptions,
  setStudentSelectedId,
  setSelectedStudents,
  resetTrainees,
} = traineeSlice.actions;

export default traineeSlice.reducer;
