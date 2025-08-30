import * as yup from 'yup';
import { AllowedExamTypeSlug } from './examTypes';

/**
 * Form validation schemas for exam creation
 */
export class ExamFormValidation {
  /**
   * Get validation schema based on exam type and unlimited attempts setting
   */
  static getValidationSchema(
    examTypeSlug: string | null | undefined,
    isUnlimited: boolean
  ): yup.ObjectSchema<any> {
    return yup.object().shape({
      ExamName: yup.string().required("Exam name is required"),
      ExamTypeID: yup.string().required("Exam type is required"),
      PrepXExamAFKACJOSCECourse: yup
        .number()
        .required("Exam course is required"),
      ExamNumberofBookletsID:
        examTypeSlug === "mock"
          ? yup.number().required("Number of booklets is required")
          : yup.number().notRequired(),
      ExamTimeLimit: yup.string().required("Exam limit is required"),
      ExamQuizStart: yup.string().required("Exam start is required"),
      ExamTimeLimitExpires: yup.string().required("Exam expire is required"),
      ExamOverallGradeCalculationID: yup
        .string()
        .required("Overall grade is required"),
      ExamBookletDuration:
        examTypeSlug === "mock"
          ? yup
            .number()
            .required("Booklet duration is required")
            .test(
              "is-greater-than-zero",
              "Booklet duration must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) {
                  return true;
                }
                const numValue = Number(value);
                return numValue > 0;
              }
            )
          : yup.number(),
      ExamBreakDuration:
        examTypeSlug === "mock"
          ? yup.number().required("Break duration is required")
          : yup.number().notRequired(),
    });
  }

  /**
   * Validate form fields
   */
  static validateFormFields(
    values: any,
    rows: any[],
    examType: any
  ): boolean {
    // Add any additional validation logic here
    return true;
  }
}
