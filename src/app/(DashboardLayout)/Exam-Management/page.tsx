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
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb";

import { PlusIcon } from "@/components/Icons";

import {
  commonTableStyle,
  createDropdownButtonStyle,
} from "@/utils/commonstyles";
import { useRouter } from "next/navigation";
import theme from "@/utils/theme";
import SortableHeader from "@/components/SortableHeader";
import { useDispatch, useSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { loadExams } from "@/store/customizer/examsSlice";
import { formatDate } from "@/helpers/commonFunctions";
import CustomTable, {
  Column,
  TableAction,
} from "../components/shared/CustomTable";

const BCrumb = [{ label: "Exam Management", link: "/Exam-Management" }];

const ImockExam = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const exams = useSelector((state: RootState) => state.exams.exams);
  console.log(exams);
  useEffect(() => {
    dispatch(loadExams());
  }, [dispatch]);
  const examColumns: Column[] = [
    {
      id: "ExamID",
      label: "PrepX ID",
      sortable: true,
      sortKey: "ExamID",
      render: (exam) => exam.examDetails?.ExamID || "-",
    },
    {
      id: "CourseType",
      label: "Course Type",
      sortable: true,
      sortKey: "CourseType",
      render: (exam) => exam.examDetails?.ExamType?.ExamTypeName || "-",
    },
    {
      id: "ExamName",
      label: "Exam Name",
      sortable: true,
      sortKey: "ExamName",
      render: (exam) => exam.examDetails?.ExamName || "-",
    },
    {
      id: "ExamDate",
      label: "Exam Date",
      sortable: true,
      sortKey: "ExamDate",
      render: (exam) =>
        `${formatDate(exam.examDetails?.ExamAvailabilityDate)} ${
          exam.examDetails?.CSTimeOfExam || ""
        }`,
    },
  ];

  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
      <Breadcrumb title="Exam Management" items={BCrumb} />
      <>
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
          </Stack>
        </Card>
        <Stack
          gap={"12px"}
          m={"32px 0 12px"}
          direction={"row"}
          flexWrap={"wrap"}
        >
          <CustomTable columns={examColumns} rows={exams} />
        </Stack>
      </>
    </PageContainer>
  );
};
export default ImockExam;
