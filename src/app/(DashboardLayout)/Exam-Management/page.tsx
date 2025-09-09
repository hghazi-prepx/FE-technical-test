"use client";
import React, { useState, useEffect } from "react";
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
import moment from "moment";

import { PlusIcon } from "@/components/Icons";
import { createDropdownButtonStyle, commonTableStyle } from "@/utils/commonstyles";
import { useRouter } from "next/navigation";
import SortableHeader from "@/components/SortableHeader";

const BCrumb = [
  { label: "Exam Management", link: "/Exam-Management" },
];

/**
 * @ Function Name      : ImockExam
 * @ Function Purpose   : Creating exam component
 */
const ImockExam = () => {
  const router = useRouter();
  const [iMockExamData, setIMockExamData] = useState<any[]>([]);

  useEffect(() => {
     const storedExams = localStorage.getItem('prepx_exams');
     if (storedExams) {
       setIMockExamData(JSON.parse(storedExams));
     }
   }, []);

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
                  <SortableHeader
                    field="PrepX ID"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "160px",
                    maxWidth: "160px",
                    width: "160px",
                  }}
                >
                  <SortableHeader
                    field="Course Type"
                  />
                </TableCell>

                <TableCell
                  sx={{
                    minWidth: "360px",
                    maxWidth: "360px",
                    width: "360px",
                  }}
                >
                  <SortableHeader
                    field="Exam Name"
                  />

                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "160px",
                    maxWidth: "160px",
                    width: "160px",
                  }}
                >
                  <SortableHeader
                    field="Exam Date"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iMockExamData.length > 0 ? (
                 iMockExamData.map((exam, index) => (
                   <TableRow key={index}>
                     <TableCell>{exam.ExamIDText || `EXAM-${exam.ExamID}`}</TableCell>
                     <TableCell>{exam.ExamType || 'Mock Exam'}</TableCell>
                     <TableCell>{exam.ExamName}</TableCell>
                     <TableCell>
                       {exam.ExamDate ? moment(exam.ExamDate).format('DD/MM/YYYY') : 'N/A'}
                     </TableCell>
                   </TableRow>
                 ))
               ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    style={{ paddingTop: "16px", paddingBottom: "16px" }}
                  >
                    <Typography variant="body1">No exams found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Stack>
      </>
    </PageContainer>
  );
};
export default ImockExam;
