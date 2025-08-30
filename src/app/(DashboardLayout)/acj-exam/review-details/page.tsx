"use client";
import React from "react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import {
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Alert,
  Box,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import { useReviewDetails } from "@/hooks/useReviewDetails";
import LoadingButton from "@/components/ui/LoadingButton";
import { formatExamDate, formatExamDateTime, formatCreatedDate } from "@/utils/dateUtils";

const { DEFAULT_PAGE } = PAGINATION;

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/Exam-Management",
    title: "Assessment Module",
  },
  {
    title: "Exam Management",
  },
];

const ReviewDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const examId = searchParams.get("examid");

  const {
    examData,
    studentData,
    questionData,
    isLoading,
    isPublishing,
    error,
    publishExam,
  } = useReviewDetails();

  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1,
  } = usePagination2();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <PageContainer title="Review Details" description="Review Details">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      <Breadcrumb title="Review Details" items={undefined} />

      {/* Exam Details Section */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="exam details table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>PrepX ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Number</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Name</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Created</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Date and Time of Exam</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Due Date and Time</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {examData?.ExamIDText || '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {examData?.ExamIDText || '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {examData?.ExamName || '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {examData?.ExamTypeName || '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {formatCreatedDate(examData?.CreatedOn)}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {formatExamDateTime(examData?.ExamAvailabilityDate)}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {formatExamDateTime(examData?.ExamDueDate)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

      {/* Trainee Section */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="trainee details table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Trainee ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Trainee Name</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Exam Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Email</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Location</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>LMS ID</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData?.results?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box textAlign="center" py={2}>
                        <Typography variant="body1" color="text.secondary">
                          No trainees assigned to this exam
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  studentData?.results?.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.UserRoleTextID || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.UserTitleName || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {examData?.ExamTypeName || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.UserEmail || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.CampusName || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.secondary.fieldText,
                          fontWeight: 400,
                        }}
                      >
                        {item.LMSOrgDefinedId || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <CustomTablePagination
              totalPageCount={studentData?.totalPages}
              totalRecords={studentData?.totalRecords}
              currentPage={page}
              rowsPerPage={rowsPerPage}
              handlePagination={handlePagination}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => router.push(`/acj-exam/assign-trainee?examid=${examId}`)}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Question Section */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="question details table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Question ID</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Booklet</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Course Type</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Topic</span>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 0, borderBottom: 0 }}>
                    <Typography
                      color={theme.palette.primary.main}
                      variant="h6"
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      component={"p"}
                      fontWeight={400}
                    >
                      <span>Status</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionData?.results?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box textAlign="center" py={2}>
                        <Typography variant="body1" color="text.secondary">
                          No questions assigned to this exam
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  questionData?.results?.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.QuestionTextID || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.BookletID || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.CourseTypeName || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.QuestionTopicName || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.ExamQuestionStatus === 1 ? "Active" : "Removed"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <CustomTablePagination
              totalPageCount={questionData?.totalPages}
              totalRecords={questionData?.totalRecords}
              currentPage={page1}
              rowsPerPage={rowsPerPage1}
              handlePagination={handlePagination1}
            />
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => router.push(`/acj-exam/question-selection?examid=${examId}`)}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Action Buttons */}
      <Stack
        display={"flex"}
        direction={"row"}
        gap={"10px"}
        justifyContent={"flex-end"}
        mt={3}
      >
        <LoadingButton
          sx={{ ...primaryButon }}
          onClick={publishExam}
          loading={isPublishing}
          loadingText="Publishing..."
        >
          Publish
        </LoadingButton>
      </Stack>
    </PageContainer>
  );
};

export default ReviewDetails;
