import {
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

function ReviewTable({ data }: any) {
  const theme = useTheme()
  console.log("Exam information", data)
  return (
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
                <span>PrepX ID</span>
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
                <span>Exam Number</span>
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
                <span>Exam Name</span>
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
                <span>Exam Created</span>
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
                <span>Date and Time of Exam</span>
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
                <span>Due Date and Time</span>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell colSpan={10}>
              <Stack>
                <Typography variant="h6">
                  Exam details should go here
                </Typography>
              </Stack>
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
                       {iMockExamData?.ExamIDText}
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
                       {iMockExamData?.ExamIDText}
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
                       {iMockExamData?.ExamName}
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
                       {iMockExamData?.ExamTypeName}
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
                       {iMockExamData?.CreatedOn
                         ? moment(iMockExamData?.CreatedOn).format("MM-DD-YYYY")
                         : ""}
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
                       {iMockExamData?.ExamAvailabilityDate
                         ? moment
                           .tz(iMockExamData?.ExamAvailabilityDate, localUserTimeZone)
                           .format("YYYY-MM-DD hh:mm A z") : "-"}
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
                       {iMockExamData?.ExamDueDate
                         ? moment
                           .tz(iMockExamData?.ExamDueDate, localUserTimeZone)
                           .format("YYYY-MM-DD hh:mm A z") : "-"}
                     </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReviewTable
