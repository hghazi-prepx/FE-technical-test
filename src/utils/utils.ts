import { StepOneData } from "@/app/(DashboardLayout)/components/create-acj-exam/types";
import { StepThreeData, StepTwoData, useExamStore } from "@/store/useExamStore";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface DateTimeInput {
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm" (24h) OR "hh:mm" (12h)
  period?: "AM" | "PM"; // اختياري: إذا كان الوقت بصيغة 12h
}

/**
 * Combines a date string, a time string, and an optional period (AM/PM) into a single dayjs object.
 */
export function combineDateAndTimeWithDayjs(
  dateTimeObj: DateTimeInput
): dayjs.Dayjs | null {
  const { date, time, period } = dateTimeObj;

  if (!date || !time) {
    console.error("Invalid input: Missing date or time.", dateTimeObj);
    return null;
  }

  try {
    let dateTimeString: string;
    let format: string;

    if (period) {
      // صيغة 12 ساعة مع AM/PM
      dateTimeString = `${date} ${time} ${period}`;
      format = "YYYY-MM-DD hh:mm A";
    } else {
      // صيغة 24 ساعة
      dateTimeString = `${date} ${time}`;
      format = "YYYY-MM-DD HH:mm";
    }

    const combinedDateTime = dayjs(dateTimeString, format);

    if (!combinedDateTime.isValid()) {
      console.error("Failed to parse date/time.", dateTimeString);
      return null;
    }

    return combinedDateTime;
  } catch (error) {
    console.error("Error combining date and time:", error);
    return null;
  }
}

/**
 * Returns a formatted string from the combined date/time.
 */
export function formatCombinedDateAndTime(
  dateTimeObj: DateTimeInput,
  format: string = ""
): string | null {
  const dayjsObject = combineDateAndTimeWithDayjs(dateTimeObj);

  if (!dayjsObject) return null;

  return format ? dayjsObject.format(format) : dayjsObject.toISOString();
}

export const validateDates = (
  startDate: string,
  startTime: string,
  startPeriod: "AM" | "PM",
  endDate: string,
  endTime: string,
  endPeriod: "AM" | "PM"
) => {
  const start = combineDateAndTimeWithDayjs({
    date: startDate,
    time: startTime,
    period: startPeriod,
  });

  const end = combineDateAndTimeWithDayjs({
    date: endDate,
    time: endTime,
    period: endPeriod,
  });

  const errors: Record<string, string> = {};
  console.log(start.isAfter(end));
  if (start && end && start.isAfter(end)) {
    errors["ExamDueDate"] = "End time must be after start time";
    errors["ExamAvailabilityDate"] = "End time must be after start time";
  } else {
    console.log("helloz alksd");
  }
  return errors;
};

interface ExamData {
  id?: string;
  status: "draft" | "published";
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  createdAt?: string;
  updatedAt?: string;
}

interface SaveExamResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
  };
}
import { v4 as uuid } from "uuid";
import { useExamsStore } from "@/store/useExamsStore";

export const saveExam = ({
  status,
  examId,
}: {
  status: "draft" | "published";
  examId?: string; // for editing
}): Promise<SaveExamResponse> => {
  console.log("Initiating saveExam for examId:", examId, "Status:", status);

  const { stepOne, stepTwo, stepThree } = useExamStore.getState();
  const { addExam, updateExam } = useExamsStore.getState();

  console.log("Data to be saved:", {
    stepOne,
    stepTwo,
    stepThree,
  });

  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 1000) + 500;

    setTimeout(() => {
      try {
        const examDataToSave: ExamData = {
          status,
          stepOne,
          stepTwo,
          stepThree,
          updatedAt: new Date().toISOString(),
        };

        if (examId) {
          // Update existing exam
          console.log(`Updating exam with ID: ${examId}`);
          updateExam(examId, examDataToSave);
          resolve({
            success: true,
            message: `Exam ${examId} updated successfully as ${status}.`,
            data: { id: examId },
          });
        } else {
          const newExamId = uuid();
          console.log(`Creating new exam with ID: ${newExamId}`);
          addExam({
            id: newExamId,
            status,
            stepOne,
            stepTwo,
            stepThree,
            setStepOne: () => {},
            setStepTwo: () => {},
            setStepThree: () => {},
            resetExam: () => {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          resolve({
            success: true,
            message: `New exam created successfully with ID ${newExamId} as ${status}.`,
            data: { id: newExamId },
          });
        }
      } catch (error) {
        console.error("Error during saveExam mock API call:", error);
        resolve({
          success: false,
          message: `Failed to save exam: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      }
    }, delay);
  });
};
