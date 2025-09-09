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
import { PAGINATION } from "@/utils/Constants";
import toast from "../../components/Toast/index";
import { getOneExamForNewExam } from "@/services/newExamFlow/newExamFlowAPI";
import moment from "moment";
import { useExamWizard } from "@/store/examWizard/ExamWizardContext";

const { DEFAULT_TOTAL_PAGE, DEFAULT_PAGE } = PAGINATION;

// Mock function to simulate updating exam status
const updateIMockExamStatus = async (examId: string, bodyData: any) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: "Exam status updated successfully",
    data: {
      ExamID: examId,
      ...bodyData
    }
  };
};

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

const ReviewDetails = () => {
  const router = useRouter();
  const searchRouter = useSearchParams();
  const theme = useTheme();
  const examId: any = searchRouter.get("examid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [iMockExamData, setIMockExamData] = useState<any>();
  const { state } = useExamWizard();
  const [selectedStudentData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const [selectedQuestionData] = useState<any>({ results: [], totalPages: 0, totalRecords: 0 });
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } = usePagination2();
  const localUserTimeZone = 'America/Toronto';

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1,
  } = usePagination2();

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
   * @ Function Name      : handleChangeRowsPerPage1
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  /**
   * @ Function Name      : handleChangePage1
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
  };

  const getStationNameById = (id: any) => {
    const stationData = stationList?.find(
      (stationData: any) => stationData.value == id
    );
    return stationData?.label;
  };

  const getExamData = async () => {
    if (!examId) return;
    
    console.log('Review Details - examId:', examId);
    console.log('Review Details - context state:', state);
    console.log('Review Details - examData from context:', state.examData);
    
    setIsLoading(true);
    try {
      // Pass the current exam data from context to the API function
      const result = await getOneExamForNewExam(examId, state.examData);
      console.log('Review Details - API result:', result);
      if (result?.success) {
        setIMockExamData(result.data);
        console.log('Review Details - Set iMockExamData to:', result.data);
      }
    } catch (error) {
      console.log("Error fetching exam data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExamData();
  }, [examId]);

  const updateExamDataStatus = async () => {
    try {
      setIsLoading(true);
      
      const bodyData = {
        Status: 1,
      };
      
      const result = await updateIMockExamStatus(examId, bodyData);
      if (result?.success) {
        // Save exam to localStorage when published
        const savedExams = JSON.parse(localStorage.getItem('prepx_exams') || '[]');
        const examIndex = savedExams.findIndex((exam: any) => exam.ExamID == examId);
        
        const updatedExamData = {
          ...iMockExamData,
          Status: 1,
          PublishedDate: new Date().toISOString(),
          ExamIDText: iMockExamData?.ExamIDText || `EXAM-${examId}`,
        };
        
        if (examIndex >= 0) {
          // Update existing exam
          savedExams[examIndex] = updatedExamData;
        } else {
          // Add new exam
          savedExams.push(updatedExamData);
        }
        
        localStorage.setItem('prepx_exams', JSON.stringify(savedExams));
        
        toast({
          type: "success",
          message: "Exam published successfully!",
        });
        
        router.push("/Exam-Management");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
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
                {iMockExamData ? (
                  <TableRow>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamIDText || iMockExamData?.ExamID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamIDText || iMockExamData?.ExamID}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamTypeName || iMockExamData?.ExamType}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamCreatedOn ? moment(iMockExamData.ExamCreatedOn).format("MMM-DD-YYYY") : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.ExamDate ? moment(iMockExamData.ExamDate).format("MMM-DD-YYYY hh:mm A") : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        borderBottom: 0,
                        fontSize: "15px",
                        color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                        fontWeight: 400,
                      }}
                    >
                      {iMockExamData?.DueDate ? moment(iMockExamData.DueDate).format("MMM-DD-YYYY hh:mm A") : "N/A"}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Stack>
                        <Typography variant="h6">Loading exam details...</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
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
                {selectedStudentData?.results?.length > 0 ? (
                  selectedStudentData?.results?.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.UserRoleTextID}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.UserEmail || '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
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
                          {item.LMSOrgDefinedId || '-'}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Stack>
                        <Typography variant="h6">Trainee details should go here</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
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

      {/* Question details */}
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
                {selectedQuestionData?.results?.length > 0 ? (
                  selectedQuestionData?.results.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                          borderBottom: 0,
                          fontSize: "15px",
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
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
                          color: theme.palette.mode === "light" ? "#52585D" : "#fff",
                          fontWeight: 400,
                        }}
                      >
                        {item.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Stack>
                        <Typography variant="h6">Question details should go here</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
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