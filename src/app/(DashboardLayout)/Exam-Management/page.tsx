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
  Tooltip,
  Chip,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb";
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from "@/components/Icons";
import {
  commonTableStyle,
  createDropdownButtonStyle,
} from "@/utils/commonstyles";
import { useRouter } from "next/navigation";
import theme from "@/utils/theme";
import SortableHeader from "@/components/SortableHeader";
import { useExamManagement } from "@/hooks/useExamManagement";
import { DateTimeUtils } from "@/business/exam/dateTimeUtils";
import { getExamTypeNameById } from "@/business/exam/examTypes";
import { Exam } from "@/business/exam/types";
import DeleteModalComponent from "@/components/DeleleModalComponent";
import toast from "../components/Toast";

const BCrumb = [
  { label: "Exam Management", link: "/Exam-Management" },
];

const ImockExam = () => {
  const router = useRouter();
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const {
    exams,
    examTypes,
    isLoading,
    error,
    deleteExam,
    fetchExamTypes,
    clearAllExams,
  } = useExamManagement();

  useEffect(() => {
    fetchExamTypes();
  }, [fetchExamTypes]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedExams = [...exams].sort((a, b) => {
    let aValue: any = a[sortField as keyof Exam];
    let bValue: any = b[sortField as keyof Exam];

    if (sortField === "ExamName") {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    } else if (sortField === "ExamAvailabilityDate" || sortField === "ExamDueDate") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleDeleteExam = (exam: Exam) => {
    setSelectedExam(exam);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedExam?.ExamID) {
      deleteExam(selectedExam.ExamID);
      toast({
        type: "success",
        message: "Exam deleted successfully.",
      });
    }
    setDeleteModalOpen(false);
    setSelectedExam(null);
  };

  const handleEditExam = (exam: Exam) => {
    router.push(`/acj-exam/edit-acj-exam/${exam.ExamID}`);
  };

  const handleViewExam = (exam: Exam) => {
    router.push(`/acj-exam/view-exam/${exam.ExamID}`);
  };

  const getStatusChip = (status: number) => {
    return (
      <Chip
        label={status === 1 ? "Active" : "Inactive"}
        color={status === 1 ? "success" : "default"}
        size="small"
      />
    );
  };

  if (isLoading) {
    return (
      <PageContainer title="Exam Listing" description="Exam Listing">
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Exam Listing" description="Exam Listing">
        <Typography color="error">{error}</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
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
            onClick={() => router.push("/acj-exam/create-acj-exam")}
            sx={createDropdownButtonStyle}
          >
            <PlusIcon />
            <Typography variant="body3" component={"p"}>
              New
            </Typography>
          </Button>
          
          {exams.length > 0 && (
            <Button
              onClick={clearAllExams}
              sx={{
                borderRadius: "6px",
                color: theme.palette.error.main,
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: "transparent",
                padding: "8px 25px",
                minWidth: "150px",
                border: `1px solid ${theme.palette.error.main}`,
                "&:hover": {
                  backgroundColor: theme.palette.error.main,
                  color: "white",
                },
              }}
            >
              Clear All (Testing)
            </Button>
          )}
        </Stack>
      </Card>
      
      <Stack
        gap={"12px"}
        m={"32px 0 12px"}
        direction={"row"}
        flexWrap={"wrap"}
      >
        <Table
          aria-label="simple table"
          sx={{ ...commonTableStyle, tableLayout: "fixed" }}
          className="c-table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  minWidth: "180px",
                  maxWidth: "180px",
                  width: "180px",
                }}
              >
                <SortableHeader field="PrepX ID" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px",
                }}
              >
                <SortableHeader field="Course Type" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "360px",
                  maxWidth: "360px",
                  width: "360px",
                }}
              >
                <SortableHeader field="Exam Name" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px",
                }}
              >
                <SortableHeader field="Exam Type" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px",
                }}
              >
                <SortableHeader field="Availability Date" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  width: "100px",
                }}
              >
                <SortableHeader field="Status" />
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "120px",
                  maxWidth: "120px",
                  width: "120px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedExams.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  style={{ paddingTop: "16px", paddingBottom: "16px" }}
                >
                  <Typography variant="body1">
                    No exams found. Create your first exam to get started!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedExams.map((exam) => (
                <TableRow key={exam.ExamID}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {exam.ExamIDText || `EXAM-${exam.ExamID}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {exam.PrepXExamAFKACJOSCECourse || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {exam.ExamName}
                    </Typography>
                    {exam.ShortDescription && (
                      <Typography variant="caption" color="textSecondary">
                        {exam.ShortDescription}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {getExamTypeNameById(examTypes, exam.ExamTypeID)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {exam.ExamAvailabilityDate 
                        ? DateTimeUtils.formatExamDate(exam.ExamAvailabilityDate)
                        : "Not set"
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(exam.Status)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Exam">
                        <IconButton
                          size="small"
                          onClick={() => handleViewExam(exam)}
                        >
                          <EyeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Exam">
                        <IconButton
                          size="small"
                          onClick={() => handleEditExam(exam)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Exam">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteExam(exam)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <TrashIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Stack>

      <DeleteModalComponent
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleChange={() => {}}
        handleClick={confirmDelete}
      />
    </PageContainer>
  );
};

export default ImockExam;
