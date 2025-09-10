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
import { commonContentCardStyle, secondaryButon } from "@/utils/commonstyles"
import CustomTablePagination from "@/components/CustomPagination"
import useReviewDetails from "@/hooks/useReviewDetails"

function TraineeBlock({ data }: any) {
  const theme = useTheme()
  const {
    iMockExamData,
    examId,
    selectedStudentData,
    router,
    page,
    rowsPerPage,
    handlePagination
  } = useReviewDetails()

  console.log("Students information", data)
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
                    <span>Trainee ID</span>
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
                    <span>Trainee Name</span>
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
                    <span>Exam Type</span>
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
                    <span>Email</span>
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
                    <span>Location</span>
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
                    <span>LMS ID</span>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={10}>
                  <Stack>
                    <Typography variant="h6">
                      Trainee details should go here
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
              {selectedStudentData?.results?.map((item: any, index: any) => (
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
                    {item.UserRoleTextID}
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
                    {item.UserTitleName}
                  </TableCell>
                  {/* <TableCell
                            sx={{
                              paddingLeft: 0,
                              borderBottom: 0,
                              fontSize: "15px",
                              color:
                              theme.palette.mode === "light" ? "#52585D" : "#fff",
                              fontWeight: 400,
                            }}
                          >
                            {item.StudentStatus === 1 ? "Active" : "Incative"}
                          </TableCell> */}
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
                    {iMockExamData?.ExamTypeName}
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
                    {item.UserEmail || "-"}
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
                    {item.CampusName}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: 0,
                      borderBottom: 0,
                      fontSize: "15px",
                      color: theme.palette.secondary.fieldText,
                      fontWeight: 400
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
                          fill: `${theme.palette.primary.main} !important`
                        }
                      }}
                    >
                      {/* <PhoneIcon />{" "} */}
                      {/* <Link
                            sx={{
                              color: theme.palette.primary.main,
                              textDecorationColor: theme.palette.primary.main,
                            }}
                          >
                          </Link> */}
                      {item.LMSOrgDefinedId || "-"}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  )
}

export default TraineeBlock
