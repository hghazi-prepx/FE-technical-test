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
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
  commonFieldLabelStyle,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import { useReviewDetails } from "@/hooks/useReviewDetails";
import LoadingButton from "@/components/ui/LoadingButton";
import { formatExamDate, formatExamDateTime, formatCreatedDate } from "@/utils/dateUtils";
import { getExamTypeNameById } from "@/business/exam/examTypes";
import { useExamManagement } from "@/hooks/useExamManagement";

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

  const { examTypes } = useExamManagement();

  const getStatusChip = (status: number) => {
    return (
      <Chip
        label={status === 1 ? "Active" : "Inactive"}
        color={status === 1 ? "success" : "default"}
        size="small"
      />
    );
  };

  const handleBack = () => {
    router.push("/Exam-Management");
  };

  const handleEdit = () => {
    router.push(`/acj-exam/edit-acj-exam/${examId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <PageContainer title="Review Details" description="Review Details">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button sx={{ ...secondaryButon }} onClick={handleBack}>
          Back to Exam Management
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      <Breadcrumb title="Review Details" items={BCrumb} />

      {examData && (
        <Card sx={commonContentCardStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Exam Details
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button sx={{ ...secondaryButon }} onClick={handleBack}>
                Back
              </Button>
              <Button sx={{ ...primaryButon }} onClick={handleEdit}>
                Edit Exam
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>PrepX ID</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {examData.ExamIDText || `EXAM-${examData.ExamID}`}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Status</Typography>
                {getStatusChip(examData.Status)}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Exam Name</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {examData.ExamName}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Exam Type</Typography>
                <Typography variant="body1">
                  {getExamTypeNameById(examTypes, examData.ExamTypeID)}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Course Type</Typography>
                <Typography variant="body1">
                  {examData.ExamCourseType || "N/A"}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Number of Attempts</Typography>
                <Typography variant="body1">
                  {examData.ExamNumberofAttempts || "Unlimited"}
                </Typography>
              </Stack>
            </Grid>

            {examData.ShortDescription && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography sx={commonFieldLabelStyle}>Short Description</Typography>
                  <Typography variant="body1">
                    {examData.ShortDescription}
                  </Typography>
                </Stack>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Timing Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Availability Date</Typography>
                <Typography variant="body1">
                  {examData.ExamAvailabilityDate 
                    ? formatExamDate(examData.ExamAvailabilityDate)
                    : "Not set"
                  }
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Due Date</Typography>
                <Typography variant="body1">
                  {examData.ExamDueDate 
                    ? formatExamDate(examData.ExamDueDate)
                    : "Not set"
                  }
                </Typography>
              </Stack>
            </Grid>

            {examData.ExamSetTimeLimit === 1 && (
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography sx={commonFieldLabelStyle}>Time Limit</Typography>
                  <Typography variant="body1">
                    {examData.ExamTimeLimit} minutes
                  </Typography>
                </Stack>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Number of Questions</Typography>
                <Typography variant="body1">
                  {examData.ExamNumberofQuestions}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      )}

      {studentData && (
        <Card sx={{ ...commonContentCardStyle, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Trainee Information
          </Typography>
          
          <Stack direction="row" spacing={2} mb={2}>
            <Typography variant="body1">
              <strong>Total Students:</strong> {studentData.totalStudents}
            </Typography>
            <Typography variant="body1">
              <strong>Assigned Students:</strong> {studentData.assignedStudents}
            </Typography>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.students?.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={student.status === "Assigned" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {questionData && (
        <Card sx={{ ...commonContentCardStyle, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Question Information
          </Typography>
          
          <Stack direction="row" spacing={2} mb={2}>
            <Typography variant="body1">
              <strong>Total Questions:</strong> {questionData.totalQuestions}
            </Typography>
            <Typography variant="body1">
              <strong>Assigned Questions:</strong> {questionData.assignedQuestions}
            </Typography>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionData.questions?.map((question: any) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.id}</TableCell>
                    <TableCell>{question.title}</TableCell>
                    <TableCell>{question.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={question.status}
                        color={question.status === "Active" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button sx={{ ...secondaryButon }} onClick={handleBack}>
          Back to Exam Management
        </Button>
        <LoadingButton
          sx={{ ...primaryButon }}
          loading={isPublishing}
          loadingText="Publishing..."
          onClick={publishExam}
        >
          Publish Exam
        </LoadingButton>
      </Box>
    </PageContainer>
  );
};

export default ReviewDetails;
