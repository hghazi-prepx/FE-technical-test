"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import {
  Button,
  Card,
  CardContent,
  Link,
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
import { PhoneIcon } from "@/components/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import { stationList } from "../stations";
import {
  commonContentCardStyle,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import useLocalStorage from "@/hooks/useLocalStorage";
import { PAGINATION } from "@/utils/Constants";
import toast from "../../components/Toast/index";

const { DEFAULT_TOTAL_PAGE, DEFAULT_PAGE } = PAGINATION;

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

const timezones = [
  {
    id: "1",
    label: "EST",
  },
  {
    id: "2",
    label: "GMT",
  },
  {
    id: "3",
    label: "PST",
  },
];

// get iMock exam by Id

const ReviewDetails = () => {
  // alert("ReviewDetails");
  const router = useRouter();
  const searchRouter = useSearchParams();
  const theme = useTheme();
  const examId: any = searchRouter.get("examid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [iMockExamData] = useState<any>();
  const [selectedStudentData, setSelectedStudentData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0,
  });

  const [selectedQuestionData, setSelectedQuestionData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0,
  });
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();
  const localUserTimeZone = "America/Toronto";

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1,
  } = usePagination2();

  const [exams] = useLocalStorage<any[]>("exams", []);

  const foundExam = React.useMemo(() => {
    if (!examId || !exams?.length) return undefined;
    const idNum = Number(examId);
    return exams.find(
      (e: any) => String(e?.ExamID) === String(examId) || e?.ExamID === idNum
    );
  }, [exams, examId]);

  useEffect(() => {
    if (foundExam?.trainees) {
      const trainees = foundExam.trainees;
      const itemsPerPage = rowsPerPage;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedResults = trainees.slice(startIndex, endIndex);

      setSelectedStudentData({
        results: paginatedResults,
        totalPages: Math.ceil(trainees.length / itemsPerPage),
        totalRecords: trainees.length,
      });
    } else {
      setSelectedStudentData({
        results: [],
        totalPages: 0,
        totalRecords: 0,
      });
    }
  }, [foundExam, page, rowsPerPage]);

  // Load questions from localStorage
  useEffect(() => {
    if (foundExam?.questions) {
      const questions = foundExam.questions;
      const itemsPerPage = rowsPerPage1;
      const startIndex = (page1 - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedResults = questions.slice(startIndex, endIndex);

      setSelectedQuestionData({
        results: paginatedResults,
        totalPages: Math.ceil(questions.length / itemsPerPage),
        totalRecords: questions.length,
      });
    } else {
      setSelectedQuestionData({
        results: [],
        totalPages: 0,
        totalRecords: 0,
      });
    }
  }, [foundExam, page1, rowsPerPage1]);

  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage1 = (event: unknown, newPage: number) => {
    setPage1(newPage);
  };

  const countTotalAddedTrainee = (id: any) => {
    let count = 0;
    selectedStudentData?.forEach((item: any) => {
      if (item.CampusID == id) {
        count++;
      }
    });
    return count;
  };

  const getTimeZone = (TimeZoneID: any) => {
    const zone = timezones?.find(
      (timeZoneData: any) => timeZoneData.id == TimeZoneID
    );
    return zone?.label;
    // setTimeZone(zone)
  };

  const getStationNameById = (id: any) => {
    const stationData = stationList?.find(
      (stationData: any) => stationData.value == id
    );
    return stationData?.label;
  };

  const updateExamDataStatus = async () => {
    if (selectedQuestionData.totalRecords == 0) {
      toast({
        type: "error",
        message: "Please select a Question for the exam",
      });
      return;
    }
    try {
      setIsLoading(true);
      // let detailsArray: any = [];
      // detailsArray = selectedStudentData?.map((data: any, index: any) => ({
      //   LocationID: data?.CampusID,
      //   StudentID: data?.StudentID,
      //   ExamID: data?.ExamID,
      //   CampusOrderNumber: index + 1,
      //   StudentTextID: data?.StudentIDText,
      // }));

      const bodyData = {
        Status: 1,
      };
      // const reviewBody = {
      //   ExamID: examId,
      //   examReviewDetails: detailsArray,
      // };
      // const reviewData = await createExamReviewDetail(reviewBody);
      // In this local-storage backed view, publishing is not wired to API.
      // Simulate success and navigate back.
      router.push("/Exam-Management");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error);
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
                      <span>Exam Created</span>
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
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.ExamID ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.ExamNumber ?? foundExam?.ExamID ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.ExamName ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.ExamTypeName ?? foundExam?.ExamTypeID ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.CreatedOn ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.StartDateTime ?? foundExam?.ExamDateTime ?? "-"}
                  </TableCell>
                  <TableCell
                    sx={{ paddingLeft: 0, borderBottom: 0, fontSize: "15px" }}
                  >
                    {foundExam?.EndDateTime ?? foundExam?.DueDateTime ?? "-"}
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

                  {/* <TableCell
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
                    </TableCell> */}
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
                {/* <TableRow>
                  <TableCell colSpan={10}>
                    <Stack>
                      <Typography variant="h6">
                        Trainee details should go here
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow> */}
                {selectedStudentData?.results?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Stack alignItems="center" py={3}>
                        <Typography variant="h6" color="textSecondary">
                          No trainees assigned to this exam
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedStudentData?.results?.map((item: any, index: any) => (
                    <TableRow key={index}>
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
                        {item.UserRoleTextID || item.UserIDText || "-"}
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
                        {item.UserTitleName ||
                          `${item.UserFirstName} ${item.UserLastName}` ||
                          "-"}
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
                        {foundExam?.ExamTypeName ||
                          foundExam?.ExamTypeID ||
                          "-"}
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
                        {item.CampusName || "-"}
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
                          {item.LMSOrgDefinedId || item.UserID || "-"}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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

      <Stack
        display={"flex"}
        direction={"row"}
        gap={"10px"}
        justifyContent={"flex-end"}
      >
        {/* {iMockExamData?.Status != 1 && ( */}
        <Button
          sx={{
            ...primaryButon,
          }}
          onClick={() => updateExamDataStatus()}
        >
          Publish
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default ReviewDetails;
