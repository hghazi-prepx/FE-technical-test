// utils/examHandlers.ts

import { AllowedExamTypeSlug, ExamType } from "./CreateExamForm";

export const handleExamTypeChange = ({
  value,
  setFieldValue,
  setExamTypeSlug,
  exampTypeSlugAllowed,
}: {
  value: ExamType | null;
  setFieldValue: (field: string, value: any) => void;
  setExamTypeSlug: (slug?: AllowedExamTypeSlug) => void;
  exampTypeSlugAllowed: AllowedExamTypeSlug[];
}) => {
  if (!value) {
    setFieldValue("ExamTypeID", "");
    setExamTypeSlug(undefined);
    return;
  }

  // Always set ID
  setFieldValue("ExamTypeID", value.ExamTypeID);

  // Determine slug
  const slug = value.ExamTypeSlug;
  const isAllowed = slug && exampTypeSlugAllowed.includes(slug as any);

  setExamTypeSlug(isAllowed ? (slug as AllowedExamTypeSlug) : undefined);

  // Reset fields based on type
  if (slug !== "mock") {
    setFieldValue("ExamMockLocation", "");
    setFieldValue("ExamNumberofBookletsID", null);
    setFieldValue("ExamBookletDuration", 1);
    setFieldValue("ExamBreakDuration", 1);
    setFieldValue("ExamNumberofQuestions", 1);
  }

  if (slug !== "quiz") {
    setFieldValue("ExamSetTimeLimit", 0);
    setFieldValue("ExamTimeLimit", "");
    setFieldValue("ExamTimerMode", "");
    setFieldValue("ExamTimeLimitAction", "");
  }

  if (slug === "mock") {
    setFieldValue("ExamDueDate", "");
    setFieldValue("CSTimeOfExamDue", "11:00");
  }

  if (slug === "self-assessment" || slug === "quiz") {
    setFieldValue("ExamTimerMode", "asynchronous");
  }
};
