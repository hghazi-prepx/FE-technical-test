"use client";
import React from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { CaretupIcon } from "@/components/Icons";
import LoadingButton from "@/components/ui/LoadingButton";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Loading from "../../../loading";
import { useViewExam } from "@/hooks/useViewExam";
import { useExamManagement } from "@/hooks/useExamManagement";
import { DateTimeUtils } from "@/business/exam/dateTimeUtils";
import { getExamTypeNameById } from "@/business/exam/examTypes";
import {
  commonContentCardStyle,
  commonFieldLabelStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/Exam-Management",
    title: "Exam Management",
  },
  {
    title: "View Exam",
  },
];

export default function ViewExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const { exam, isLoading, error } = useViewExam(examId);
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

  if (error || !exam) {
    return (
      <PageContainer title="View Exam" description="View Exam Details">
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error || "Exam not found"}
          </Typography>
                           <LoadingButton
                   sx={{ ...secondaryButon, mt: 2 }}
                   onClick={handleBack}
                 >
                   <CaretupIcon style={{ transform: 'rotate(90deg)' }} />
                   Back to Exam Management
                 </LoadingButton>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="View Exam" description="View Exam Details">
      <Box sx={{ mb: 3 }}>
        <Breadcrumb title="View Exam" items={BCrumb} />
      </Box>

      <Card sx={commonContentCardStyle}>
        <Grid container spacing={3}>
          {/* Header with Actions */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight={600}>
                Exam Details
              </Typography>
              <Stack direction="row" spacing={2}>
                                 <LoadingButton
                   sx={{ ...secondaryButon }}
                   onClick={handleBack}
                 >
                   <CaretupIcon style={{ transform: 'rotate(90deg)' }} />
                   Back
                 </LoadingButton>
                <LoadingButton
                  sx={{ ...primaryButon }}
                  onClick={handleEdit}
                >
                  Edit Exam
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>PrepX ID</Typography>
              <Typography variant="body1" fontWeight={500}>
                {exam.ExamIDText || `EXAM-${exam.ExamID}`}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Status</Typography>
              {getStatusChip(exam.Status)}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Exam Name</Typography>
              <Typography variant="body1" fontWeight={500}>
                {exam.ExamName}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Exam Type</Typography>
              <Typography variant="body1">
                {getExamTypeNameById(examTypes, exam.ExamTypeID)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Course Type</Typography>
              <Typography variant="body1">
                {exam.ExamCourseType || "N/A"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Number of Attempts</Typography>
              <Typography variant="body1">
                {exam.ExamNumberofAttempts || "Unlimited"}
              </Typography>
            </Stack>
          </Grid>

          {exam.ShortDescription && (
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Short Description</Typography>
                <Typography variant="body1">
                  {exam.ShortDescription}
                </Typography>
              </Stack>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Timing Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Timing Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Availability Date</Typography>
              <Typography variant="body1">
                {exam.ExamAvailabilityDate 
                  ? DateTimeUtils.formatExamDate(exam.ExamAvailabilityDate)
                  : "Not set"
                }
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Due Date</Typography>
              <Typography variant="body1">
                {exam.ExamDueDate 
                  ? DateTimeUtils.formatExamDate(exam.ExamDueDate)
                  : "Not set"
                }
              </Typography>
            </Stack>
          </Grid>

          {exam.ExamSetTimeLimit === 1 && (
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography sx={commonFieldLabelStyle}>Time Limit</Typography>
                <Typography variant="body1">
                  {exam.ExamTimeLimit} minutes
                </Typography>
              </Stack>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Number of Questions</Typography>
              <Typography variant="body1">
                {exam.ExamNumberofQuestions}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Configuration
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Overall Grade Calculation</Typography>
              <Typography variant="body1">
                {exam.ExamOverallGradeCalculationID === 1 ? "Highest Attempt" :
                 exam.ExamOverallGradeCalculationID === 2 ? "Average of All Attempts" :
                 exam.ExamOverallGradeCalculationID === 3 ? "Last Attempt" : "N/A"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Auto Publish Results</Typography>
              <Typography variant="body1">
                {exam.ExamEvaluationFeedback === 1 ? "Yes" : "No"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Shuffle Quiz</Typography>
              <Typography variant="body1">
                {exam.ExamShuffleQuiz === 1 ? "Yes" : "No"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Paging</Typography>
              <Typography variant="body1">
                {exam.ExamPaging === 1 ? "Yes" : "No"}
              </Typography>
            </Stack>
          </Grid>

          {exam.ExamInstructions && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Instructions
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {exam.ExamInstructions}
                </Typography>
              </Grid>
            </>
          )}

          {/* Created Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Created Date</Typography>
              <Typography variant="body1">
                {exam.CreatedOn 
                  ? DateTimeUtils.formatCreatedDate(exam.CreatedOn)
                  : "N/A"
                }
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography sx={commonFieldLabelStyle}>Last Modified</Typography>
              <Typography variant="body1">
                {exam.UpdatedOn 
                  ? DateTimeUtils.formatCreatedDate(exam.UpdatedOn)
                  : "N/A"
                }
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </PageContainer>
  );
}
