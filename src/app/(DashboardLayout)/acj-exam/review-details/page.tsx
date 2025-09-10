"use client"
import PageContainer from "../../components/container/PageContainer"
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb"
import { Button, Card, Stack } from "@mui/material"
import Loading from "../../loading"
import ExamWizardSteps from "@/components/ExamWizardSteps"
import ReviewTable from "./components/ReviewTable"
import TraineeBlock from "./components/TraineeBlock"
import useReviewDetails from "@/hooks/useReviewDetails"
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import StationDetails from "./components/StationDetails"
import useQuestionSelection from "@/hooks/useQuestionSelection"
import useAssignTrainee from "@/hooks/useAssignTrainee"
import useCreateExam from "@/hooks/useCreateExam"
const ReviewDetails = () => {
  const { selectedQuestionData } = useQuestionSelection()
  const { selectedStudentData } = useAssignTrainee()
  const { examDetails } = useCreateExam()
  const { isLoading, examId, router, updateExamDataStatus } = useReviewDetails()

  if (isLoading) {
    return <Loading />
  }
  return (
    <PageContainer title="Review Details" description="Review Details">
      <ExamWizardSteps step={3} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Review Details" items={undefined} />

      <Card sx={commonContentCardStyle}>
        <Stack>
          <ReviewTable data={examDetails} />
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
      <TraineeBlock data={selectedStudentData} />

      {/* station details */}
      <StationDetails data={selectedQuestionData}/>

      <Stack
        display={"flex"}
        direction={"row"}
        gap={"10px"}
        justifyContent={"flex-end"}
      >
        <Button
          sx={{
            ...primaryButon
          }}
          onClick={() => updateExamDataStatus()}
        >
          Publish
        </Button>
      </Stack>
    </PageContainer>
  )
}

export default ReviewDetails
