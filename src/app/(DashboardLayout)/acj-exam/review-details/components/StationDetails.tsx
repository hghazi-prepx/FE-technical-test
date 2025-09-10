"use client"
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
  useTheme
} from "@mui/material"
import CustomTablePagination from "@/components/CustomPagination"
import { commonContentCardStyle, secondaryButon } from "@/utils/commonstyles"
import useReviewDetails from "@/hooks/useReviewDetails"

function StationDetails({ data }: any) {
  const theme = useTheme()
  const {
    examId,
    selectedQuestionData,
    router,
    page1,
    rowsPerPage1,
    handlePagination1
  } = useReviewDetails()

  console.log("Questions information", data)

  return (
    <Card sx={commonContentCardStyle}>
      <Stack>
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap"
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    paddingLeft: 0,
                    borderBottom: 0
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
                    borderBottom: 0
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
                    borderBottom: 0
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
                    borderBottom: 0
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
                    borderBottom: 0
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
              <TableRow>
                <TableCell colSpan={10}>
                  <Stack>
                    <Typography variant="h6">
                      Question details should go here
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
              {selectedQuestionData?.results.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color:
                        theme.palette.mode === "light" ? "#52585D" : "#fff",
                      fontWeight: 400
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
                      fontWeight: 400
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
                      fontWeight: 400
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
                      fontWeight: 400
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
                      fontWeight: 400
                    }}
                  >
                    {item.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  )
}

export default StationDetails
