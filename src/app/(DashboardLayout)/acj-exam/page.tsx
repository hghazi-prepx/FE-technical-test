"use client";
import React, { useEffect, useState } from "react";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import {
  DarkSearchIcon
} from "@/components/Icons";
import {
  Box,
  Button,
  Card,
  Stack,
  Tooltip
} from "@mui/material";
import {
  IconRefresh
} from "@tabler/icons-react";
import CustomTextField from "../components/forms/theme-elements/CustomTextField";
import Breadcrumb from "../layout/shared/breadcrumb/Breadcrumb";

import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import Loading from "../loading";

import { getIMockExamList } from "@/services/newExamFlow/newExamFlowAPI";
import toast from "../components/Toast/index";
// Removed permission import - authentication removed

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  { to: "/", title: "Assessment Module" },
  {
    title: "Exam Management",
  },
];

const afkExamList = [
  {
    id: "Exam-0001",
    courseType: "NDECC-SJ",
    cycle: "Cycle 1",
    examName: "SJ Mock Exam 1",
    examType: "Mock Exam",
    examDate: "2024-05-15",
    duration: "150mins",
    status: "Completed",
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

/**
 * @ Function Name      : ImockExam
 * @ Function Purpose   : Creating exam component
 */
export default function ImockExam() {
  const theme = useTheme();
  const router = useRouter();
  const [hasFocus, setFocus] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iMockExamData, setIMockExamData] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [page, setPage] = React.useState(0);
  const [searchedKey, setSearchKey] = useState<any>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [deleteSingleIMockExam, setDeleteSingleIMockExam] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>("CreatedOn DESC");
  const [checkorderBy, setCheckorderBy] = useState<any>("");
  const [exportData, setExportData] = useState<any>("");
  const [search, setSearch] = useState<string | null>(null);
  const [showStudent, setShowStudent] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  // Authentication removed
  const [selectedExamId, setSelectedExamId] = useState();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const email = null;
  const [deleteText, setDeleteText] = useState("");

  const [allChecked, setAllChecked] = useState<boolean>(false);
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  let parsedResponse: any; // Adjust the type as needed based on your JSON structure
  const [permissionArray, setPermissionArray]: any = useState([]);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    examId: any
  ) => {
    setSelectedExamId(examId);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Authentication removed - show all modules
    setShowQuestion(true);
    setShowStudent(true);
  }, []);

  // Mock user data since authentication is removed
  const UserCampusID = 1;
  const roleId = 1;

  const handleCopyLink = (examid: any) => {
    const tvLinkUrl = `https://prep-admin.20.151.93.85.sslip.io/auth/tv-timer?examid=${examid}`; // Replace with your TV link URL
    navigator.clipboard
      .writeText(tvLinkUrl)
      .then(() => {
        setAnchorEl(null);
        toast({ type: "success", message: "TV Link has been copied to your clipboard." });
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
    handleClose();
  };

  /**
   * @ Function Name      : getAllIMockExam
   * @ Function Purpose   : Calling to get all exam list
   */
  const getAllIMockExam = async () => {
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      ascDesc: orderBy,
      searchedKey: searchedKey != null ? searchedKey : [],
      search: search != null ? search : "",
      CampusID: roleId === 1 ? UserCampusID : "",
    };

  };

  /**
   * @ Function Name      : checkPermissions
   * @ Function Purpose   : Check permission for student and questions module
   */
  /* const checkPermissions = () => {
    // Check if the parsedResponse and its properties are not null or undefined
    if (parsedResponse && parsedResponse.role_permissions) {
      // Use some() to check if any module has the code "question"
      const hasQuestionModule = parsedResponse.role_permissions.some(
        (module: any) => module.code === "question"
      );
      // Use some() to check if any module has the code "assign-student"
      const hasAssignStudentModule = parsedResponse.role_permissions.some(
        (module: any) => module.code === "assign-student"
      );

      // Update the state based on the presence of the modules
      setShowQuestion(hasQuestionModule);
      setShowStudent(hasAssignStudentModule);
    }
  }; */

  /**
   * @ Function Name      : getSearchedIMockExam
   * @ Function Purpose   : Calling to get all searched exam list
   */
  const getSearchedIMockExam = async () => {
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      ascDesc: orderBy,
      searchedKey: searchedKey != null ? searchedKey : [],
      search: search != null ? search : "",
      CampusID: roleId === 1 ? UserCampusID : "",
    };
    await getIMockExamList(bodyData)
      .then((result) => {
        setAllChecked(false);
        setCheckedItems({});
        if (result?.success) {
          setIMockExamData(result?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const getIMockExamForExport = async () => {
    const bodyData = {
      limit: 100000000000,
      page: page,
      ascDesc: orderBy,
      searchedKey: searchedKey != null ? searchedKey : [],
      search: search != null ? search : "",
    };
    await getIMockExamList(bodyData)
      .then((result) => {
        setAllChecked(false);
        setCheckedItems({});
        if (result?.success) {
          setExportData(result?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

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
   * @ Function Name      : handleChange
   * @ Function Purpose   : Set searched key like first name, last name etc
   */
  const handleChange = (value: any) => {
    // Check if the checkbox value is already in the array
    const index = selectedCheckboxes.indexOf(value);
    setCheckedItems((prevState) => ({
      ...prevState,
      [value]: !prevState[value as keyof typeof prevState],
    }));

    if (index === -1) {
      // If not, add it to the array
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setAllChecked(false);
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckboxes];
      updatedCheckboxes.splice(index, 1);
      setSelectedCheckboxes(updatedCheckboxes);
    }
  };

  const handleAllChange = () => {
    // Handle the change event for the "all_check" checkbox
    const newCheckedState: { [key: string]: boolean } = {};
    const allnewCheckedState: string[] = [];

    if (!allChecked) {
      // Set all checkboxes to checked
      iMockExamData?.results.forEach((tdata: { ExamID: any }) => {
        newCheckedState[tdata.ExamID] = true;
        allnewCheckedState.push(tdata.ExamID);
        //selectedCheckboxes([...selectedCheckboxes, tdata.QuestionID]);
      });
    }
    setSelectedCheckboxes(allnewCheckedState);

    setAllChecked(!allChecked);
    setCheckedItems(newCheckedState);
  };

  /**
   * @ Function Name      : handleOrderBy
   * @ Function Purpose   : Handle filters ascending and descending order
   */
  const handleOrderBy = (key: any, order: any) => {
    const combineKey = key + " " + order;
    setCheckorderBy(key + "" + order);
    setOrderBy(combineKey);
  };




  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
      {/* breadcrumb */}
      <Breadcrumb title="Exam Listing" items={BCrumb} />
      <Card
        sx={{
          padding: 3,
          backgroundColor: theme.palette.primary.contrastText,
          marginBottom: "25px",
          overflow: "visible",
          boxShadow: "none",
          border: `1px solid ${theme.palette.mode === "dark" ? "transparent" : "#738A9633"
            }`,
          borderRadius: "5px",
        }}
      >
        <Stack
          direction="row"
          gap={"32px"}
          justifyContent="space-between"
          position={"relative"}
        >
          <Box
            sx={{
              flexGrow: 1,
              position: "relative",
              "& svg": {
                position: "absolute",
                left: "10px",
                top: "11px",
              },
            }}
          >
            <CustomTextField
              id=""
              type="search"
              variant="outlined"
              fullWidth
              placeholder={"Search Exam Listing..."}
              onChange={(event: any) => setSearch(event?.target.value)}
              value={search != null ? search : ""}
              onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
              // onChange={(event: any) => setSearch(event.target.value)}
              sx={{
                maxWidth: "100%",
                "& input": {
                  p: "11px 12px 11px 40px",
                },
                "& + svg path": {
                  stroke: theme.palette.secondary.iconColor,
                },
              }}
              className="search--field"
            />
            <DarkSearchIcon />
          </Box>
          <Tooltip
            title="Refresh"
            placement="bottom"
            slotProps={{
              tooltip: {
                sx: {
                  p: "10px 15px",
                  backgroundColor: "#ffff",
                  mt: "0px !important",
                  border: "1px solid #E6E6E6",
                  fontSize: "15px",
                  color: "#99ABB4",
                  fontWeight: 400,
                },
              },
            }}
          >
            <Button
              sx={{
                borderRadius: "6px",
                color: "#000",
                padding: "5px",
                width: "42px",
                height: "42px",
                minWidth: "42px",
                backgroundColor: "transparent",
                "&:hover": {
                  color: "#000",
                  backgroundColor: theme.palette.secondary.hoverBg,
                },
                "& svg path": {
                  stroke: theme.palette.secondary.iconColor,
                },
              }}
              onClick={() => getAllIMockExam()}
            >
              <IconRefresh />
            </Button>
          </Tooltip>
        </Stack>
      </Card>
    </PageContainer>
  );
}
