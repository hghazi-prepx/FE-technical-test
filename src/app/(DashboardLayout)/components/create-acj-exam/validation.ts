import * as yup from "yup";
export const getValidationSchema = (
  examTypeSlug: string | undefined,
  isUnlimited: boolean
) => {
  return yup.object().shape({
    ExamName: yup.string().required("Exam name is required"),
    ExamTypeID: yup.string().required("Exam type is required"),
    PrepXExamAFKACJOSCECourse: yup
      .number()
      .required("Exam course is required")
      .typeError("Course must be a number"),

    ExamMockLocation:
      examTypeSlug === "mock"
        ? yup.string().required("Mock Exam Location is required")
        : yup.string().notRequired(),

    ExamNumberofBookletsID:
      examTypeSlug === "mock"
        ? yup.number().required("Number of booklets is required")
        : yup.number().nullable(true).notRequired(),
    ExamBookletDuration:
      examTypeSlug === "mock"
        ? yup
            .number()
            .required("Booklet duration is required")
            .test(
              "is-greater-than-zero",
              "Booklet duration must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) return true;
                const numValue = Number(value);
                return !isNaN(numValue) && numValue > 0;
              }
            )
        : yup.number().notRequired(),
    ExamBreakDuration:
      examTypeSlug === "mock"
        ? yup.number().required("Break duration is required")
        : yup.number().notRequired(),
    ExamNumberofQuestions:
      examTypeSlug === "mock"
        ? yup
            .number()
            .required("Number of questions is required")
            .test(
              "is-greater-than-zero",
              "Number of questions must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) return true;
                const numValue = Number(value);
                return !isNaN(numValue) && numValue > 0;
              }
            )
        : yup.number().notRequired(),

    ExamSetTimeLimit:
      examTypeSlug === "quiz" ? yup.boolean() : yup.boolean().notRequired(),
    ExamTimeLimit:
      examTypeSlug === "quiz"
        ? yup.string().when("ExamSetTimeLimit", {
            is: true,
            then: (schema) => schema.required("Time limit is required"),
          })
        : yup.string().notRequired(),
    ExamTimerMode:
      examTypeSlug === "quiz"
        ? yup.string().required("Timer mode is required")
        : yup.string().notRequired(),
    ExamTimeLimitAction:
      examTypeSlug === "quiz"
        ? yup.string().required("Expiry action is required")
        : yup.string().notRequired(),

    ExamDueDate: yup
      .string()
      .nullable()
      .when(["ExamTimerMode"], {
        is: (ExamTimerMode: string) => ExamTimerMode === "asynchronous",
        then: (schema) =>
          schema.required("Due Date is required for asynchronous Exams"),
        otherwise: (schema) => schema.notRequired(),
      }),
    ExamNumberofAttempts:
      examTypeSlug !== "mock"
        ? isUnlimited
          ? yup.mixed().nullable().notRequired()
          : yup
              .number()
              .typeError("Number of Attempts must be a number")
              .nullable()
              .required("Number of Attempts is required")
              .positive("Number of Attempts must be greater than 0")
        : yup.mixed().nullable().notRequired(),
    ExamOverallGradeCalculationID:
      examTypeSlug !== "mock"
        ? yup.string().required("Overall grade calculation is required")
        : yup.string().notRequired(),
    ExamEvaluationFeedback:
      examTypeSlug !== "mock"
        ? yup.boolean().required()
        : yup.boolean().notRequired(),

    ExamQuizStart: yup.string().required("Exam start is required"),
    ExamTimeLimitExpires: yup.string().required("Exam expire is required"),

    ExamAvailabilityDate: yup
      .string()
      .required("Exam availability is required"),
    LongDescription: yup
      .string()
      .nullable()
      .when("$longDescriptionEnabled", {
        is: true,
        then: (schema) =>
          schema.required("Long Description is required when enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
};
