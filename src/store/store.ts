import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import examFormSlice from "./customizer/examFormSlice";
import questionsSlice from "./customizer/QuestionSlice";
// Import your reducer
import CustomizerReducer from "./customizer/CustomizerSlice";
import traineeReducer from "./customizer/traineeSlice";
import examsSlice from "./customizer/examsSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["customizer"],
};

const persistedReducer = persistReducer(persistConfig, CustomizerReducer);

function loadState() {
  try {
    const serialized = localStorage.getItem("traineeState");
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
}

function saveState(state: any) {
  try {
    const serialized = JSON.stringify(state.trainee);
    localStorage.setItem("traineeState", serialized);
  } catch {}
}
export const store = configureStore({
  reducer: {
    customizer: persistedReducer,
    examForm: examFormSlice,
    questions: questionsSlice,
    trainee: traineeReducer,
    exams: examsSlice,
  },
  preloadedState: {
    trainee: loadState(),
  },
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
  saveState(store.getState());
});
export const persistor = persistStore(store);

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
