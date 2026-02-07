"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Card,
  Stack,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb";
import { PlusIcon } from "@/components/Icons";
import {
  commonTableStyle,
  createDropdownButtonStyle,
} from "@/utils/commonstyles";
import { useRouter } from "next/navigation";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useExamsStore } from "@/store/useExamsStore";
import { getCourseLmsList } from "@/services/adminCourseDashboard/adminCourseDashboard";
import { useExamWizardStore } from "@/store/useExamWizardSteps";

const BCrumb = [{ label: "Exam Management", link: "/Exam-Management" }];

const ImockExam = () => {
  const router = useRouter();
  const { exams, deleteExam } = useExamsStore();
  const [examinationCourse, setExaminationCourse] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllExaminationCourse = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 10000000,
      // page: DEFAULT_PAGE,
      // searchedKey: ["CourseTypeSlug"],
      // search: examCourse,
    };
    // await getCourseOfferingList(bodyData)
    await getCourseLmsList(bodyData)
      .then((result) => {
        if (result?.success) {
          setExaminationCourse(result?.data?.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllExaminationCourse();
  }, []);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteExam(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
      {/* breadcrumb */}
      <Breadcrumb title="Exam Management" items={BCrumb} />

      <Card
        sx={{
          padding: 0,
          backgroundColor: "transparent",
          marginBottom: "25px",
          overflow: "visible",
          boxShadow: "none",
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
            onClick={() => {
              useExamWizardStore.getState().reset();
              router.push("/acj-exam");
            }}
            sx={createDropdownButtonStyle}
          >
            <PlusIcon />
            <Typography variant="body3" component={"p"}>
              New
            </Typography>
          </Button>
        </Stack>
      </Card>

      <Stack gap={"12px"} m={"32px 0 12px"} direction={"row"} flexWrap={"wrap"}>
        <Table
          aria-label="exams table"
          sx={{ ...commonTableStyle, tableLayout: "fixed" }}
          className="c-table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>PrepX ID</TableCell>
              <TableCell colSpan={2}>Course Type</TableCell>
              <TableCell colSpan={2}>Exam Name</TableCell>
              <TableCell>Exam Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1">
                    No exams found. Create one!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.stepOne.ExamTypeID || "-"}</TableCell>
                  <TableCell colSpan={2}>
                    {examinationCourse.find(
                      (t) =>
                        t.lmscourseid === exam.stepOne.PrepXExamAFKACJOSCECourse
                    )?.lmscoursename || "-"}
                  </TableCell>
                  <TableCell colSpan={2}>
                    {exam.stepOne.ExamName || "-"}
                  </TableCell>
                  <TableCell>
                    {exam.stepOne.ExamAvailabilityDate || "-"}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={exam.status === "published" ? "green" : "orange"}
                    >
                      {exam.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          useExamWizardStore
                            .getState()
                            .startWizard(exam.stepOne.id);
                          router.push(`/acj-exam?exam-id=${exam.stepOne.id}`);
                        }}
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.15)",
                            backgroundColor: "rgba(33,150,243,0.1)",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => setDeleteTarget(exam.id)}
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.15)",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        aria-labelledby="delete-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            minHeight: "250px",
            padding: "12px",
          },
        }}
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent
          sx={{
            fontSize: "14px",
          }}
        >
          <DialogContentText>
            Are you sure you want to delete this exam? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};
export default ImockExam;
