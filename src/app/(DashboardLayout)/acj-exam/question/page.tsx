"use client";
import React from "react";

import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Link,
} from "@mui/material";
import { iMockExamQustionTableData, TableType } from "./questionTableData";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";

import {
  DeleteModalGraphic,
  EditIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/Icons";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { IconRefresh, IconUpload, IconX } from "@tabler/icons-react";

import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
const assetstable: TableType[] = iMockExamQustionTableData;
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "#",
    title: "Exam",
  },
  {
    to: "/Exam-Management",
    title: "iMock Exam",
  },
  {
    title: "Question",
  },
];

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 3,
  [`& .delete-modal-graphic`]: { marginRight: "15px" },
};

export default function ImockExamQuestion() {
  const theme = useTheme();

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <PageContainer title="iMock Exam" description="iMock Exam">
      {/* breadcrumb */}
      <Breadcrumb title="iMock Exam" items={BCrumb} />
      <Card
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          marginBottom: "25px",
          overflow: "visible",
        }}
      >
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          position={"relative"}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <CustomTextField
              id=""
              variant="outlined"
              fullWidth
              placeholder={"Search Question"}
              //   onChange={(event: any) => setSearch(event?.target.value)}
              //   value={search != null ? search : ""}
              //   onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
              sx={{
                maxWidth: "100%",
              }}
            />
          </Box>
          <Button
            component={Link}
            href="/Exam-Management/question"
            sx={{
              borderRadius: "6px",
              color: theme.palette.mode === "light" ? "#FFF" : "#000",
              display: "flex",
              gap: "6px",
              padding: "4px 18px",
            }}
          >
            <PlusIcon />
            <span>New</span>
          </Button>
          <Button
            sx={{
              borderRadius: "6px",
              color: "#000",
              padding: "6px 0",
              minWidth: "48px",
              background: "transparent",
              "&:hover": {
                color: "#000",
                backgroundColor: "#EEE",
              },
            }}
          >
            <IconUpload />
          </Button>
          <Button
            sx={{
              borderRadius: "50%",
              color: "#000",
              padding: "5px",
              width: "42px",
              height: "42px",
              minWidth: "42px",
              backgroundColor: "#EEE",
              "&:hover": {
                color: "#000",
                backgroundColor: "#EEE",
              },
            }}
          >
            <IconRefresh />
          </Button>
        </Stack>
      </Card>

      <BlankCard>
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "24px" }}>
                  <Typography variant="h6" fontWeight={600}></Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Question ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Question Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Question
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Station
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"#67757C"}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assetstable.map((tdata) => (
                <TableRow key={tdata.id}>
                  <TableCell>
                    <Stack direction="row">
                      <Box>
                        <CustomCheckbox
                          //   defaultChecked
                          color="primary"
                          inputProps={{
                            "aria-label": "checkbox with default color",
                          }}
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      <Box
                        component="span"
                        sx={{
                          padding: 0,
                          backgroundColor:
                            tdata.active === true ? "#A5DAD1" : "#fc4b6c",
                          marginRight: "8px",
                          borderRadius: "50%",
                          width: "9px",
                          height: "9px",
                          display: "inline-block",
                          lineHeight: 0,
                        }}
                      />{" "}
                      {tdata.questionId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.questionType}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.questionText}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#99ABB4"
                      variant="h6"
                      fontWeight={400}
                      fontSize={"15px"}
                    >
                      {tdata.station}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link href="#" color="#000">
                        <EyeIcon />
                      </Link>
                      <Link href="#" color="#000">
                        <EditIcon />
                      </Link>
                      <Link href="#" color="#FC4B6C" onClick={handleModalOpen}>
                        <TrashIcon />
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={styleModal}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Button
              onClick={handleModalClose}
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
                borderRadius: "5px",
                color: "#fff",
                padding: "3px",
                width: "22px",
                height: "22px",
                minWidth: "0",
                lineHeight: "1",
                textAlign: "center",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <IconX size={"1rem"} />
            </Button>
            <DeleteModalGraphic className="delete-modal-graphic" />
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h3"
              color={theme.palette.primary.main}
              textAlign={"center"}
              mt={2}
            >
              Delete File
            </Typography>
            <Typography
              id="modal-modal-description"
              textAlign={"center"}
              sx={{ mt: 1, opacity: ".7", fontSize: "15px" }}
            >
              Are You sure You want to delete.
            </Typography>
            <Box
              p={"20px 25px 5px"}
              display={"flex"}
              gap={"12px"}
              justifyContent={"center"}
            >
              <Button
                sx={{
                  borderRadius: "5px",
                  color: "#67757C",
                  backgroundColor: "#99ABB433",
                  padding: "7px 25px",
                  minWidth: "90px",
                  "&:hover": {
                    color: "#67757C",
                    backgroundColor: `#99ABB433`,
                  },
                }}
              >
                No
              </Button>
              <Button
                sx={{
                  borderRadius: "5px",
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                  padding: "7px 25px",
                  minWidth: "90px",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
      </BlankCard>
    </PageContainer>
  );
}
