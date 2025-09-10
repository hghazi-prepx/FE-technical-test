import * as yup from "yup"
import { mockExamSlug } from "../constant"
export const getValidationSchema = (
  examTypeSlug: string | undefined,
  isUnlimited: boolean
) => {
  return yup.object().shape({
    ExamName: yup.string().required("Exam name is required"),
    ExamTypeID: yup.string().required("Exam type is required"),

    PrepXExamAFKACJOSCECourse: yup.number().required("Exam course is required"),
    ExamNumberofBookletsID:
      examTypeSlug == mockExamSlug
        ? yup.number().required("Number of booklets is required")
        : yup.number().notRequired(),
    ExamTimeLimit: yup.string().required("Exam limit is required"),
    ExamQuizStart: yup.string().required("Exam start is required"),
    ExamTimeLimitExpires: yup.string().required("Exam expire is required"),

    ExamOverallGradeCalculationID: yup
      .string()
      .required("Overall grade is required"),

    ExamBookletDuration:
      examTypeSlug == "mock"
        ? yup
            .number()
            .required("Booklet duration is required")
            .test(
              "is-greater-than-zero",
              "Booklet duration must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) {
                  return true
                }
                const numValue = Number(value)
                return numValue > 0
              }
            )
        : yup.number(),

    ExamBreakDuration:
      examTypeSlug == "mock"
        ? yup.number().required("Break duration is required")
        : yup.number(),

    ExamNumberofQuestions:
      examTypeSlug == "mock"
        ? yup
            .number()
            .required("Number of questions is required")
            .test(
              "is-greater-than-zero",
              "Number of questions must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) {
                  return true
                }
                const numValue = Number(value)
                return numValue > 0
              }
            )
        : yup.number(),

    ExamAvailabilityDate: yup.string().required("Exam availability is required")
  })
}
