"use client"
import { Button, Typography, Card, Stack } from "@mui/material"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb"
import { PlusIcon } from "@/components/Icons"
import { createDropdownButtonStyle } from "@/utils/commonstyles"
import { useRouter } from "next/navigation"
import { ExamType } from "@/types/exam.type"
import GenericTable from "@/components/GenericTable"
import { examColumns } from "./examColumns"
import useExam from "@/hooks/useExam"
const BCrumb = [{ label: "Exam Management", link: "/Exam-Management" }]

/**
 * @ Function Name      : ImockExam
 * @ Function Purpose   : Creating exam component
 */
const ImockExam = () => {
  const router = useRouter()
  const { iMockExamData } = useExam()
  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
      {/* breadcrumb */}
      <Breadcrumb title="Exam Management" items={BCrumb} />
      <>
        <Card
          sx={{
            padding: 0,
            backgroundColor: "transparent",
            marginBottom: "25px",
            overflow: "visible",
            boxShadow: "none"
          }}
        >
          <Stack
            direction="row"
            justifyContent={{ lg: "space-between", xs: "flex-start" }}
            position={"relative"}
            gap={{ lg: 3, xs: 2 }}
            flexWrap={{ md: "nowrap", xs: "wrap" }}
          >
            <Button
              id="basic-button"
              onClick={() => router.push("/acj-exam/create-acj-exam")}
              sx={createDropdownButtonStyle}
            >
              <PlusIcon />
              <Typography variant="body3" component={"p"}>
                New
              </Typography>
            </Button>
          </Stack>
        </Card>
        <Stack
          gap={"12px"}
          m={"32px 0 12px"}
          direction={"row"}
          flexWrap={"wrap"}
        >
          <GenericTable<ExamType> columns={examColumns} data={iMockExamData} />
        </Stack>
      </>
    </PageContainer>
  )
}
export default ImockExam
