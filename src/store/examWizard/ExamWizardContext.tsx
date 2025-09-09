"use client";
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
interface ExamData {
  ExamID?: number;
  ExamIDText?: string;
  ExamName?: string;
  ExamType?: string;
  ExamDate?: string;
  ExamCreatedOn?: string;
  Status?: number;
  [key: string]: any;
}

interface ExamWizardState {
  examData: ExamData;
  selectedQuestions: any[];
  assignedTrainees: any[];
  currentStep: number;
  isDataPersisted: boolean;
}

type ExamWizardAction =
  | { type: 'SET_EXAM_DATA'; payload: Partial<ExamData> }
  | { type: 'SET_SELECTED_QUESTIONS'; payload: any[] }
  | { type: 'SET_ASSIGNED_TRAINEES'; payload: any[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'PERSIST_TO_STORAGE' }
  | { type: 'RESET_WIZARD' }
  | { type: 'LOAD_FROM_STORAGE'; payload: ExamData };

// Initial state
const initialState: ExamWizardState = {
  examData: {},
  selectedQuestions: [],
  assignedTrainees: [],
  currentStep: 0,
  isDataPersisted: false,
};

// Reducer
function examWizardReducer(state: ExamWizardState, action: ExamWizardAction): ExamWizardState {
  switch (action.type) {
    case 'SET_EXAM_DATA':
      return {
        ...state,
        examData: { ...state.examData, ...action.payload },
      };
    case 'SET_SELECTED_QUESTIONS':
      return {
        ...state,
        selectedQuestions: action.payload,
      };
    case 'SET_ASSIGNED_TRAINEES':
      return {
        ...state,
        assignedTrainees: action.payload,
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'PERSIST_TO_STORAGE':
      // Save to localStorage only when explicitly called (final step)
      const completeExamData = {
        ...state.examData,
        selectedQuestions: state.selectedQuestions,
        assignedTrainees: state.assignedTrainees,
        Status: 1, // Mark as published
        PublishedDate: new Date().toISOString(),
        DueDate: state.examData.DueDate || null,
      };
      
      const savedExams = JSON.parse(localStorage.getItem('prepx_exams') || '[]');
      const examIndex = savedExams.findIndex((exam: any) => exam.ExamID === state.examData.ExamID);
      
      if (examIndex >= 0) {
        savedExams[examIndex] = completeExamData;
      } else {
        savedExams.push(completeExamData);
      }
      
      localStorage.setItem('prepx_exams', JSON.stringify(savedExams));
      
      return {
        ...state,
        examData: completeExamData,
        isDataPersisted: true,
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        examData: action.payload,
      };
    case 'RESET_WIZARD':
      return initialState;
    default:
      return state;
  }
}

// Context
interface ExamWizardContextType {
  state: ExamWizardState;
  setExamData: (data: Partial<ExamData>) => void;
  setSelectedQuestions: (questions: any[]) => void;
  setAssignedTrainees: (trainees: any[]) => void;
  setCurrentStep: (step: number) => void;
  persistToStorage: () => void;
  resetWizard: () => void;
  loadFromStorage: (examData: ExamData) => void;
}

const ExamWizardContext = createContext<ExamWizardContextType | undefined>(undefined);

// Provider
interface ExamWizardProviderProps {
  children: ReactNode;
}

export const ExamWizardProvider: React.FC<ExamWizardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(examWizardReducer, initialState);

  const setExamData = (data: Partial<ExamData>) => {
    dispatch({ type: 'SET_EXAM_DATA', payload: data });
  };

  const setSelectedQuestions = (questions: any[]) => {
    dispatch({ type: 'SET_SELECTED_QUESTIONS', payload: questions });
  };

  const setAssignedTrainees = (trainees: any[]) => {
    dispatch({ type: 'SET_ASSIGNED_TRAINEES', payload: trainees });
  };

  const setCurrentStep = (step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const persistToStorage = () => {
    dispatch({ type: 'PERSIST_TO_STORAGE' });
  };

  const resetWizard = () => {
    dispatch({ type: 'RESET_WIZARD' });
  };

  const loadFromStorage = (examData: ExamData) => {
    dispatch({ type: 'LOAD_FROM_STORAGE', payload: examData });
  };

  const value = {
    state,
    setExamData,
    setSelectedQuestions,
    setAssignedTrainees,
    setCurrentStep,
    persistToStorage,
    resetWizard,
    loadFromStorage,
  };

  return (
    <ExamWizardContext.Provider value={value}>
      {children}
    </ExamWizardContext.Provider>
  );
};

// Hook
export const useExamWizard = () => {
  const context = useContext(ExamWizardContext);
  if (context === undefined) {
    throw new Error('useExamWizard must be used within an ExamWizardProvider');
  }
  return context;
};

export default ExamWizardContext;