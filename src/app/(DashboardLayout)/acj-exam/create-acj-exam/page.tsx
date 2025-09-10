"use client"
import { Button, Card, Box, Stack } from "@mui/material"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import Loading from "../../loading"
import CommonPopup from "../../../../utils/commonpopup/index"
import ExamWizardSteps from "@/components/ExamWizardSteps"
import FormFirstSection from "./components/FromFirstSection"
import AvailabilityDates from "./components/AvailabilityDates"
import ExamTime from "./components/ExamTime"
import useCreateExam from "@/hooks/useCreateExam"
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import { mockExamSlug } from "../constant"

export default function CreateIMockExam() {
  const {
    isLoading,
    formik,
    examType,
    handleSaveAsDraft,
    handleModalClose,
    openModal
  } = useCreateExam()
  if (isLoading) {
    return <Loading />
  }

  return (
    <PageContainer
      title="Situational Judgement Exam Create New Session"
      description="iMock Exam"
    >
      {/* breadcrumb */}
      <form onSubmit={formik.handleSubmit}>
        <ExamWizardSteps step={0} />

        <Stack alignItems={"center"} direction={"row"}>
          <Stack flex={1}>
            <Breadcrumb title="Create New Session" items={undefined} />
          </Stack>
        </Stack>
        <FormFirstSection />

        <Card sx={commonContentCardStyle}>
          {/* Availability Dates and Conditions */}
          {examType?.ExamTypeSlug == mockExamSlug && <AvailabilityDates />}
          {/* End Availability Dates and Conditions */}

          <ExamTime />
          {/* Select camps */}
        </Card>
        <Box mt={6}>
          <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
            <Button
              sx={{
                ...secondaryButon,
                mr: "auto"
              }}
              onClick={() => {
                handleSaveAsDraft()
              }}
            >
              Save as Draft
            </Button>

            <Button
              sx={{
                ...primaryButon
              }}
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Box>
      </form>
      <CommonPopup
        open={openModal}
        onClose={handleModalClose}
        url={"/acj-exam"}
      />
    </PageContainer>
  )
}
