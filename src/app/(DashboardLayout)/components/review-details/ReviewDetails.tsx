"use client";
import React, { useState } from "react";
import PageContainer from "../container/PageContainer";
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
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import { useExamStore } from "@/store/useExamStore";
import { formatCombinedDateAndTime, saveExam } from "@/utils/utils";
import toast from "../Toast/index";
import { useExamWizardStore } from "@/store/useExamWizardSteps";
import { ExamQuestion, Trainee } from "@/types/examStoreTypes";

const ReviewDetails = () => {
  const router = useRouter();
  const { setStep, reset } = useExamWizardStore();
  const searchRouter = useSearchParams();
  const theme = useTheme();
  const examId: any = searchRouter.get("exam-id");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { stepOne, stepThree, stepTwo, resetExam } = useExamStore();

  // 1. Make the function async
  const saveExamData = async () => {
    try {
      // 2. Set loading state at the beginning
      setIsLoading(true);

      const response = await saveExam({
        status: "published",
        examId: examId ?? undefined,
      });

      // 4. Handle the response based on success or failure
      if (response.success) {
        console.log("Exam published successfully:", response.message);
        // 5. Perform actions on successful save/publish
        toast({ type: "success", message: "Exam published successfully." }); // Show success message
        resetExam(); // Reset the form store
        router.push("/Exam-Management"); // Navigate to the management page
      } else {
        console.error("Failed to publish exam:", response.message);
        // 6. Handle failure (e.g., show error message to user)
        toast({
          type: "error",
          message: response.message || "Failed to publish exam.",
        });
        // Note: Reset and navigation are typically skipped on error
      }
    } catch (error) {
      // 7. Handle unexpected errors (if saveExam rejects the promise or other errors occur)
      console.error("Unexpected error publishing exam:", error);
      toast({
        type: "error",
        message: "An unexpected error occurred while publishing the exam.",
      });
    } finally {
      // 8. Ensure loading state is turned off regardless of outcome
      setIsLoading(false);
      reset();
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Review Details" items={undefined} />

      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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

                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {stepOne?.ExamName}
                  </TableCell>

                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {stepOne?.ExamTypeID}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {stepOne?.ExamName}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {stepOne?.ExamTypeID}
                  </TableCell>

                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {formatCombinedDateAndTime({
                      date: stepOne.ExamAvailabilityDate,
                      time: stepOne.CSTimeOfExam,
                      period: stepOne?.CSTimeOfExamPeriod,
                    })}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {formatCombinedDateAndTime({
                      date: stepOne.ExamDueDate,
                      time: stepOne.CSTimeOfExamDue,
                      period: stepOne?.CSTimeOfExamDuePeriod,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => setStep("createExam")}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* Trainee block */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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

                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                {stepThree?.results?.map((item: Trainee) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.StudentID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.UserTitleName}
                    </TableCell>

                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {stepOne?.ExamTypeID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.UserEmail || "-"}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.CampusID}
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
                      <Stack
                        gap={"10px"}
                        alignItems={"center"}
                        display={"flex"}
                        direction={"row"}
                        color={theme.palette.primary.main}
                        sx={{
                          "& svg path": {
                            fill: `${theme.palette.primary.main} !important`,
                          },
                        }}
                      >
                        {item.UserRoleTextID || "-"}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => setStep("assignTrainee")}
          >
            <span>Edit Section</span>
          </Button>
        </Stack>
      </Card>

      {/* station details */}
      <Card sx={commonContentCardStyle}>
        <Stack>
          <TableContainer>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                    }}
                  >
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
                {stepTwo?.results.map((item: ExamQuestion) => (
                  <TableRow key={item.QuestionID}>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.QuestionTextID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.BookletID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.CourseTypeName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.QuestionTopicName}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color:
                          theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {item.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack marginTop={"24px"}>
          <Button
            sx={{ ...secondaryButon, width: "fit-content" }}
            onClick={() => setStep("questionData")}
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
          onClick={saveExamData}
        >
          Publish
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default ReviewDetails;
