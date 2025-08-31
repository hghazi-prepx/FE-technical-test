"use client";
import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import { Button, Card, Stack, TableContainer, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import toast from "../../components/Toast/index";
import { useDispatch, useSelector } from "@/store/hooks";
import moment from "moment";
import { RootState } from "@/store/store";
import { useExamAPI } from "@/hooks/useExamAPI";
import { addExam } from "@/store/customizer/examsSlice";
import { formatDate } from "@/helpers/commonFunctions";
import { clearSelectedQuestions } from "@/store/customizer/QuestionSlice";
import { resetTrainees } from "@/store/customizer/traineeSlice";
import { clearFormData } from "@/store/customizer/examFormSlice";
import Loading from "@/app/loading";
import CustomTable, { Column } from "../../components/shared/CustomTable";
const ReviewDetails = () => {
  const router = useRouter();
  const searchRouter = useSearchParams();
  const theme = useTheme();
  const examId: any = searchRouter.get("examid");
  const { updateExamData } = useExamAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData: iMockExamData } = useSelector((state) => state.examForm);
  const { selectedQuestions } = useSelector((state) => state.questions);
  const { selectedOptions } = useSelector((state: RootState) => state.trainee);
  const dispatch = useDispatch();
  const [selectedStudentData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0,
  });
  const [selectedQuestionData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0,
  });
  const { page, rowsPerPage, handlePagination } = usePagination2();
  const localUserTimeZone = "America/Toronto";

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1,
  } = usePagination2();

  const updateExamDataStatus = async () => {
    if (selectedQuestions.length == 0) {
      toast({
        type: "error",
        message: "Please select a Question for the exam",
      });
      return;
    }
    try {
      setIsLoading(true);

      const bodyData = {
        ...iMockExamData,
        Status: 1,
      };

      const result = await updateExamData(bodyData);
      if (result?.success) {
        const newExam = {
          examDetails: iMockExamData,
          questions: selectedQuestions,
          trainees: selectedOptions,
        };

        dispatch(addExam(newExam));
        dispatch(clearSelectedQuestions());
        dispatch(resetTrainees());
        dispatch(clearFormData());
        router.push("/Exam-Management");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  const traineeColumns: Column[] = [
    {
      id: "UserRoleTextID",
      label: "Trainee ID",
      sortable: true,
      sortKey: "StudentIDText",
    },
    {
      id: "UserTitleName",
      label: "Trainee Name",
      sortable: true,
      sortKey: "StudentFirstName",
    },
    {
      id: "ExamTypeName",
      label: "Exam Type",
      render: () => iMockExamData?.ExamType?.ExamTypeName || "-", // 👈 قيمة خاصة مش موجودة مباشرة في item
    },
    {
      id: "UserEmail",
      label: "Email",
      sortable: true,
      sortKey: "StudentEmail",
      render: (row) => row.UserEmail || "-",
    },
    {
      id: "CampusName",
      label: "Location",
      sortable: true,
      sortKey: "CampusName",
    },
    {
      id: "LMSOrgDefinedId",
      label: "LMS ID",
      render: (row) => (
        <Stack
          gap={"10px"}
          alignItems={"center"}
          direction={"row"}
          color={theme.palette.primary.main}
          sx={{
            "& svg path": {
              fill: `${theme.palette.primary.main} !important`,
            },
          }}
        >
          {row.LMSOrgDefinedId || "-"}
        </Stack>
      ),
    },
  ];
  const examColumns: Column[] = [
    {
      id: "ExamID",
      label: "PrepX ID",
    },
    {
      id: "ExamNumber",
      label: "Exam Number",
      render: (row) => row.ExamID, // 👈 أنت كنت حاط نفس الـ ExamID هنا
    },
    {
      id: "ExamName",
      label: "Exam Name",
    },
    {
      id: "ExamTypeName",
      label: "Exam Type",
      render: (row) => row.ExamType?.ExamTypeName || "-",
    },
    {
      id: "ExamCreated",
      label: "Exam Created",
      render: (row) =>
        row.ExamType?.ExamTypeCreatedOn
          ? moment(row.ExamType.ExamTypeCreatedOn).format("MM-DD-YYYY")
          : "-",
    },
    {
      id: "ExamAvailabilityDate",
      label: "Date and Time of Exam",
      render: (row) =>
        row.ExamAvailabilityDate
          ? `${formatDate(row.ExamAvailabilityDate.toString(), {
              timezone: localUserTimeZone,
            })} ${row.CSTimeOfExam || ""}`
          : "-",
    },
    {
      id: "ExamDueDate",
      label: "Due Date and Time",
      render: (row) =>
        row.ExamDueDate
          ? `${formatDate(row.ExamDueDate.toString(), {
              timezone: localUserTimeZone,
            })} ${row.CSTimeOfExamDue || ""}`
          : "-",
    },
  ];
  const questionColumns: Column[] = [
    {
      id: "QuestionTextID",
      label: "Question ID",
    },
    {
      id: "BookletID",
      label: "Booklet",
    },
    {
      id: "CourseTypeName",
      label: "Course Type",
    },
    {
      id: "QuestionTopicName",
      label: "Topic",
    },
    {
      id: "ExamQuestionStatus",
      label: "Status",
      render: (row) => (row.ExamQuestionStatus == 1 ? "Active" : "Removed"),
    },
  ];
  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Review Details" items={undefined} />

      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <CustomTable
              columns={examColumns}
              rows={iMockExamData ? [iMockExamData] : []}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => router.push(`/acj-exam/edit-acj-exam/${examId}`)}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Trainee block */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <CustomTable
              columns={traineeColumns}
              rows={selectedOptions || []}
            />
            <CustomTablePagination
              totalPageCount={selectedStudentData?.totalPages}
              totalRecords={selectedStudentData?.totalRecords}
              currentPage={page}
              rowsPerPage={rowsPerPage}
              handlePagination={handlePagination}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() =>
              router.push(`/acj-exam/assign-trainee?examid=${examId}`)
            }
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* station details */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <CustomTable
              columns={questionColumns}
              rows={selectedQuestions || []}
            />

            <CustomTablePagination
              totalPageCount={selectedQuestionData?.totalPages}
              totalRecords={selectedQuestionData?.totalRecords}
              currentPage={page1}
              rowsPerPage={rowsPerPage1}
              handlePagination={handlePagination1}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() =>
              router.push(`/acj-exam/question-selection?examid=${examId}`)
            }
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>
      <Stack
        display={"flex"}
        direction={"row"}
        gap={"10px"}
        justifyContent={"flex-end"}
      >
        <Button
          sx={{
            ...primaryButon,
          }}
          onClick={() => updateExamDataStatus()}
        >
          Publish
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default ReviewDetails;
