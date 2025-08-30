import { ExamFormData, ExamType } from './types';
import { DateTimeUtils } from './dateTimeUtils';
import { AllowedExamTypeSlug } from './examTypes';

interface TimeData {
  hour: string;
  minute: string;
  shift: string;
  date: any;
}

/**
 * Exam data processor for preparing form data for submission
 */
export class ExamDataProcessor {
  /**
   * Prepare exam data for submission
   */
  static prepareExamData(
    formValues: any,
    examType: ExamType | null,
    examCourse: string,
    timeZone: string,
    availabilityTime: TimeData,
    dueTime: TimeData,
    isTimeLimit: boolean
  ): ExamFormData {
    const examData: ExamFormData = {
      ...formValues,
      CountryID: 32,
      TimeZoneID: 248,
      ExamCourseType: examCourse,
      ExamNumberofQuestions: formValues.ExamNumberofQuestions || 1000,
    };

    // Process availability date
    if (!isTimeLimit) {
      examData.ExamTimeLimit = 0;
    }

    const availabilityTimestamp = DateTimeUtils.processTimeAndDate(
      availabilityTime.hour,
      availabilityTime.minute,
      availabilityTime.shift,
      availabilityTime.date,
      timeZone
    );

    if (availabilityTimestamp) {
      examData.ExamAvailabilityDate = availabilityTimestamp;
    }

    // Process due date
    if (formValues.ExamQuizStart === 2) {
      if (availabilityTimestamp) {
        const dueDate = DateTimeUtils.addMinutesToTimestamp(
          availabilityTimestamp,
          formValues.ExamTimeLimit
        );
        examData.ExamDueDate = dueDate;
        examData.ExamNumberofAttempts = "1";
      }
    } else {
      const dueTimestamp = DateTimeUtils.processTimeAndDate(
        dueTime.hour,
        dueTime.minute,
        dueTime.shift,
        dueTime.date,
        timeZone
      );
      
      if (dueTimestamp) {
        examData.ExamDueDate = dueTimestamp;
      }
    }

    // Set mock exam specific values
    if (examType?.ExamTypeSlug === "mock") {
      examData.ExamNumberofAttempts = "1";
    }

    // Clean up unused fields
    return examData;
  }
}
