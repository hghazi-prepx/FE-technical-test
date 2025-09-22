"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PageContainer from "../container/PageContainer";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import toast from "../Toast/index";
import { primaryButon, secondaryButon } from "@/utils/commonstyles";
import { getExamTypeList } from "@/services/examType/examTypeAPI";
import { exampTypeSlugAllowed } from "../../acj-exam/constant";
import { saveExam, validateDates } from "@/utils/utils";
import { useExamStore } from "@/store/useExamStore";
import { useRouter, useSearchParams } from "next/navigation";
import { getCourseLmsList } from "@/services/adminCourseDashboard/adminCourseDashboard";
import { useExamsStore } from "@/store/useExamsStore";
import { v4 as uuid } from "uuid";
import ExamDetailsSection from "./ExamDetailsSection";
import ExamTimeSection from "./ExamTimeSection";
import { getValidationSchema } from "./validation";
import { ExamType, StepOneData } from "./types";
import Loading from "@/app/loading";
import { examinationCourse } from "@/types/types";
import { useExamWizardStore } from "@/store/useExamWizardSteps";

export type AllowedExamTypeSlug = (typeof exampTypeSlugAllowed)[number];

const initialStepOne: StepOneData = {
  id: "",
  ExamName: "",
  PrepXExamAFKACJOSCECourse: "",
  ExamTypeID: "",
  Status: 0,
  ShortDescription: "",
  LongDescription: "",
  ExamBookletDuration: 1,
  ExamNumberofBookletsID: "",
  ExamBreakDuration: 1,
  ExamNumberofQuestions: 1,
  ExamSetTimeLimit: false,
  ExamTimeLimit: "1",
  ExamQuizStart: "1",
  ExamTimeLimitExpires: "1",
  ExamAvailabilityDate: "",
  ExamDueDate: "",
  ExamShuffleQuiz: 0,
  ExamPaging: 0,
  ExamNumberofAttempts: "",
  ExamOverallGradeCalculationID: "1",
  ExamEvaluationFeedback: 0,
  ExamPublishedDisplayToLearners: 0,
  ExamAdditionallyID: 0,
  ExamInstructions: "",
  PrepXExamAFKACJOSCECampus: [],
  ExamCourseType: "",
  CSTimeOfExam: "08:00",
  CSTimeOfExamDue: "10:00",
  CSTimeOfExamPeriod: "AM",
  CSTimeOfExamDuePeriod: "AM",
  ExamMockLocation: "",
  LongDescriptionEnabled: false,
};

const CreateExamForm: React.FC = () => {
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam-id");
  const { exams } = useExamsStore();
  const { setStep } = useExamWizardStore();

  const [isUnlimited, setIsUnlimited] = useState(false);
  const [selectedExamCourse, setSelectedExamCourse] = useState<number | null>(
    null
  );
  const [examinationCourse, setExaminationCourse] = useState<
    examinationCourse[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();

  const { setStepOne, setStepTwo, setStepThree, resetExam, stepOne } =
    useExamStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      const exam = exams.find((e) => e.stepOne.id === examId);
      if (exam && (!stepOne || !stepOne.id)) {
        setIsLoading(true);
        setStepOne(exam.stepOne || initialStepOne);
        setStepTwo(exam.stepTwo);
        setStepThree(exam.stepThree);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      }
    } else {
      setStepOne(initialStepOne);
    }
  }, [examId, exams, setStepOne, setStepTwo, setStepThree, resetExam]);

  const theme = useTheme();

  const [examTypeData, setExamTypeData] = useState<ExamType[]>([]);
  const [examTypeSlug, setExamTypeSlug] = useState<
    AllowedExamTypeSlug | undefined
  >(undefined);

  useEffect(() => {
    setExamTypeSlug(
      examTypeData.find((e) => e.ExamTypeID === stepOne.ExamTypeID)
        ?.ExamTypeSlug
    );
  }, [stepOne, examTypeData]);

  useEffect(() => {
    getAllExamTypeList();
  }, []);

  const getAllExamTypeList = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 100000000000000000,
      page: 1,
    };

    try {
      const result: ExamTypeListResponse = await getExamTypeList(bodyData);

      if (result?.success) {
        const filteredData = result.data.results.filter(
          (examType: ExamType) => {
            return (
              examType.ExamTypeSlug &&
              exampTypeSlugAllowed.includes(examType.ExamTypeSlug as any)
            );
          }
        );

        setExamTypeData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching exam types:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeExamCourseDropDown = (value: examinationCourse) => {
    setSelectedExamCourse(value.lmscourseid);
    console.log(value);
    // Update Formik value
    if (value) {
      formikRef.current?.setFieldValue(
        "PrepXExamAFKACJOSCECourse",
        value.lmscourseid
      );
    } else {
      formikRef.current?.setFieldValue("PrepXExamAFKACJOSCECourse", "");
    }
  };

  const validationSchema = React.useMemo(
    () => getValidationSchema(examTypeSlug, isUnlimited),
    [examTypeSlug, isUnlimited]
  );

  const formikRef = React.useRef<FormikProps<StepOneData>>(null);

  const getAllExaminationCourse = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 10000000,
    };
    await getCourseLmsList(bodyData)
      .then((result) => {
        if (result?.success) {
          setExaminationCourse(result?.data?.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllExaminationCourse();
  }, []);

  console.log(formikRef.current?.errors);

  const handleSaveAsDraft = async () => {
    try {
      const formValues = formikRef.current?.values;

      if (!formValues) {
        console.error("Form values are not available.");
        return;
      }

      const id = stepOne?.id ?? uuid();

      setStepOne({
        ...formValues,
        id: id,
      });

      setIsLoading(true);

      const response = await saveExam({
        status: "draft",
        examId: examId ?? undefined,
      });

      if (response.success) {
        toast({ type: "success", message: response.message });
        resetExam();
        router.push("/Exam-Management");
      } else {
        toast({ type: "error", message: response.message });
      }
    } catch (error) {
      console.error("Unexpected error saving draft:", error);

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validate = (values: StepOneData) => {
    let errors: Record<string, string> = {};

    try {
      validationSchema.validateSync(values, {
        abortEarly: false,
        context: {
          examTypeSlug,
          ExamMockLocation: values.ExamMockLocation,
          longDescriptionEnabled: values.LongDescriptionEnabled,
          isUnlimited,
        },
      });
    } catch (err: any) {
      errors = err.inner.reduce((acc: any, error: any) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
    }

    const hasStart =
      values.ExamAvailabilityDate &&
      values.CSTimeOfExam &&
      values.CSTimeOfExamPeriod;

    const hasEnd =
      values.ExamDueDate &&
      values.CSTimeOfExamDue &&
      values.CSTimeOfExamDuePeriod;

    let dateErrors: Record<string, string> = {};

    if (hasStart && hasEnd) {
      dateErrors = validateDates(
        values.ExamAvailabilityDate,
        values.CSTimeOfExam,
        values.CSTimeOfExamPeriod,
        values.ExamDueDate,
        values.CSTimeOfExamDue,
        values.CSTimeOfExamDuePeriod
      );
    }

    return {
      ...errors,
      ...dateErrors,
    };
  };

  return (
    <PageContainer
      title="Situational Judgement Exam Create New Session"
      description="iMock Exam"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ExamWizardSteps step={0} />
        {isLoading ? (
          <Loading />
        ) : (
          <Formik
            innerRef={formikRef}
            initialValues={stepOne || initialStepOne}
            validateOnBlur
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const id = stepOne.id ?? uuid();
              setStepOne({
                ...values,
                id: id,
              });
              setStep("questionData");
            }}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <Box sx={{ p: 3, mx: "auto" }}>
                  <Stack alignItems="center" direction="row">
                    <Stack flex={1}>
                      <Breadcrumb
                        title="Create New Session"
                        items={undefined}
                      />
                    </Stack>
                  </Stack>

                  {/* 🔹 Card 1: Session Information */}
                  <ExamDetailsSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    examTypeData={examTypeData}
                    isLoading={isLoading}
                    examinationCourse={examinationCourse}
                    searchLoading={searchLoading}
                    selectedExamCourse={selectedExamCourse}
                    handleChangeExamCourseDropDown={
                      handleChangeExamCourseDropDown
                    }
                    setExamTypeSlug={setExamTypeSlug}
                    examTypeSlug={examTypeSlug}
                  />

                  {/* 🔹 Card 2: Exam Settings */}
                  <ExamTimeSection
                    errors={errors}
                    examTypeSlug={examTypeSlug}
                    isUnlimited={isUnlimited}
                    setFieldValue={setFieldValue}
                    setIsUnlimited={setIsUnlimited}
                    theme={theme}
                    touched={touched}
                    values={values}
                  />
                  <Box mt={6}>
                    <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
                      <Button
                        sx={{
                          ...secondaryButon,
                          mr: "auto",
                        }}
                        onClick={async () => {
                          await handleSaveAsDraft();
                        }}
                      >
                        Save as Draft
                      </Button>

                      <Button
                        sx={{
                          ...primaryButon,
                        }}
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </LocalizationProvider>
    </PageContainer>
  );
};

export default CreateExamForm;
