"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  MenuItem,
  Autocomplete,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  IconButton,
  Menu,
  Tooltip,
  Dialog,
  DialogContent,
} from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import { useTheme } from "@mui/material/styles";
import { CaretupIcon, CornerDownArrowIcon, PlusIcon } from "@/components/Icons";
import { IconDotsVertical } from "@tabler/icons-react";
import CustomModal from "@/components/CustomModal";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import toast from "../../components/Toast/index";
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonMenuStyle,
  commonPopStyle,
  commonTableCardStyle,
  commonTableStyle,
  linkButton,
  primaryButon,
  secondaryButon,
  stickyTableHeaderContainerStyle,
} from "@/utils/commonstyles";
import { IconX, IconDots } from "@tabler/icons-react";
import Image from "next/image";
import moment from "moment";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import DeleteModalComponent from "@/components/DeleleModalComponent";
import {
  assignTraineeForNewExam,
  deleteStudentForNewExam,
  getAssignTraineeListForNewExam,
  getAvailableTraineeForNewExam,
  getOneExamForNewExam,
  getOneIMockExamForEdit,
} from "@/services/newExamFlow/newExamFlowAPI";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import MassImport from "@/components/MassImport";
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction";

const { DEFAULT_PAGE } = PAGINATION;

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

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 460,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: { xs: 3, lg: 4, xl: 5 },
  [`& .delete-modal-graphic`]: { marginRight: "15px" },
};

export default function AssignTrainee() {
  const theme = useTheme();
  const searchRouter = useSearchParams();
  const examId: any = searchRouter.get("examid");
  const [openModal, setOpenModal] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [openModelForDelete, setOpenModelForDelete] = useState(false);
  const [checkorderBy, setCheckorderBy] = useState<any>("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>();
  const [studentSelectedId, setStudentSelectedId] = useState<any>([]);
  const [notFoundStudent, setNotFoundStudent] = useState<any>();
  const [selectedStudentData, setSelectedStudentData] = useState<any>();
  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>();

  const [orderBy, setOrderBy] = useState<any>(
    "ExamAssingStudentCreatedOn DESC"
  );
  const [deleteText, setDeleteText] = useState("");
  const [locationList, setLocationList] = useState<any>();
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const handleModalOpen = () => setOpenModelForDelete(true);
  const handleModalClose = () => setOpenModelForDelete(false);
  const handleLocationModelOpen = () => setLocationModel(true);
  const handleLocationModelClose = () => setLocationModel(false);
  const [selectedAssignStudentId, setSelectedAssignStudentId] = useState<any>();
  const [modalPreviewOpen, setmodalPreviewOpen] = useState(false);
  const [traineeData, setTraineeData] = useState<any>();
  const [previewStudentId, setPreviewStudentId] = useState<any>();
  const [errorModel, setErrorModel] = useState(false);
  const [iMockExamData, setIMockExamData] = useState<any>();
  const [assignCount, setAssignCount] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const router = useRouter();
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();
  const [examData, setExamData] = useState<any>();

  const getAllSelectedStudent = async () => {
    setIsLoading(true);
    setAllChecked(false);
    setCheckedItems({});
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      search: "",
      searchedKey: [],
      ascDesc: orderBy,
      ExamID: examId,
    };
    await getAssignTraineeListForNewExam(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedStudentData(result.data || { results: [] });
          setAnchorEl(null);
          setSelectedAssignStudentId("");
          // setOpenAutcomplete(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const handleAssignStudent = async () => {
    setIsLoading(true);
    const dataBody = {
      ExamID: examId,
      StudentList: studentSelectedId,
    };
    await assignTraineeForNewExam(dataBody)
      .then((result) => {
        if (result?.success) {

          toast({
            type: "success",
            message: "Assigned trainees successfully.",
          });
          // getAvailableStudentList();
          setSelectedStudentData({
            results: studentSelectedId.map((student: any) => ({
              id: student.StudentID,
              StudentID: student.StudentID,
              CampusID: student.CampusID,
              ExamID: examId,
              UserEmail: "test@test.com",
              UserFirstName: "test trainee",
              UserLastName: student.StudentID,
              UserTitleName: `test trainee ${student.StudentID}`,
              UserID: student.StudentID,
              UserIDText: `User-${student.StudentID}`,
              UserRoleTextID: `Trainee-${student.StudentID}`,
            }))
          });
          // getAllSelectedStudent();
          setStudentSelectedId([]);
          setSelectedOptions([]);
        }
        // setLoading(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        // setLoading(false);
        setIsLoading(false);
      });
  };

  /**
   * @ Function Name      : handleFileUpload
   * @ Function Purpose   : Function for upload file
   */
  const handleFileUpload = async (files: FileList | null) => {
    if (files && files.length > 0) {
      setIsLoading(true);
      // Assuming you want to store the uploaded files in state
      const fileList = Array.from(files);

      // Take the first file directly
      const file = files[0];

      // Check if the file is a CSV by MIME type or file extension
      const isCsvFile = file.type === "text/csv" || file.name.endsWith(".csv");

      if (!isCsvFile) {
        setIsLoading(false);
        toast({ type: "warning", message: "Only CSV file types are allowed." });
        return; // Exit function early if file is not a CSV
      }

      const totalSizeMB = fileList.reduce((total, file) => {
        return total + file.size / (1024 * 1024); // Convert file size to MB and add to total
      }, 0);

      if (totalSizeMB > 5) {
        setIsLoading(false);
        toast({ type: "warning", message: "Max file upload size is 5MB." });
        return; // Exit function early if file size exceeds limit
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("ExamID", examId);
    }
  };

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      setSelectedStudents([]);
      setStudentSelectedId([]); // Deselecting all students, so empty the array
      setOpenAutocomplete(false);
    }
    const studentIDs = new Set<number>();

    for (let i = 0; i < value.length; i++) {
      const student = value[i];
      if (studentIDs.has(student.UserID)) {
        toast({
          type: "error",
          message: `This trainee has been already selected.`,
        });
        value.splice(i, 1); // Remove the duplicate entry
        i--; // Adjust the index after removal
      } else {
        studentIDs.add(student.UserID);
      }
    }
    const studentIDsAndCampusIDs = value.map((student: any) => ({
      StudentID: student.UserID,
      CampusID: student.CampusID ? student.CampusID : 0,
    }));
    setStudentSelectedId(studentIDsAndCampusIDs);
    setSelectedStudents(value.map((option: any) => option.UserID));
    // setOpenAutocomplete(false);
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
    // setSelectedCheckboxes([]);
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
    debugger;
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
      selectedStudentData.results.forEach(
        (tdata: { id: any }) => {
          newCheckedState[tdata.id] = true;
          allnewCheckedState.push(tdata.id);
          //selectedCheckboxes([...selectedCheckboxes, tdata.QuestionID]);
        }
      );
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

  /**
   * @ Function Name      : handleDeleteStation
   * @ Function Purpose   : Calling API for deleting station
   */
  const handleDeleteSelectedStudent = async (id: any) => {
    let finalArray: any = [];
    if (id) {
      finalArray.push(id);
    } else {
      finalArray = selectedCheckboxes;
    }
    const bodyData = {
      ExamID: examId,
      id: finalArray,
    };
    await deleteStudentForNewExam(bodyData)
      .then((result) => {
        debugger;
        if (result?.success) {
          setSelectedCheckboxes([]);
          setSelectedStudentData((prev: any) => {
            return {
              results: prev.results.filter((student: any) => !finalArray.includes(student.id))
            }
          });
          setSelectedStudents([]);
          handleModalClose();
        } else {
          handleModalClose();
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        handleModalClose();
        setIsLoading(false);
      });
    // }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: any,
    StudentID: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssignStudentId(id);
    setPreviewStudentId(StudentID);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAssignStudentId("");
  };
  const [location, setLocation] = React.useState("");

  const locationhandleChange = (event: any, id: any) => {
    setSelectedAssignStudentId(id);
    setLocation(event.target.value);
    handleLocationModelOpen();
  };

  /**
   * @ Function Name      : getAllLocation
   * @ Function Purpose   : Calling to get all location list
   */
  const getAllLocation = async () => {
    // setIsLoading(true);
    // setAllChecked(false);
    // setCheckedItems({});
    // const bodyData = {
    //   limit: 5,
    //   page: 0,
    // };
  };

  const getExamData = async () => {
    setIsLoading(true);
    return await getOneExamForNewExam(examId)
      .then((result) => {
        if (result?.success) {
          setExamData(result?.data);
          setIsLoading(false);
          return result?.data;
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };
  const handleSaveAsDraft = async () => {
    setIsLoading(true);
    toast({ type: "success", message: "Draft saved successfully." });
    router.push("/Exam-Management");
    setIsLoading(false);
  };


  const getIMockExam = async () => {
    try {
      const result = await getOneIMockExamForEdit(examId);
      if (result?.success) {
        setIMockExamData(result?.data);
        setAssignCount(
          result?.data?.StationsNumber + result?.data?.WaitStation
        );
      }
    } catch (error) {
      // Handle error, such as displaying an error message or logging the error
      console.error("Error fetching iMock exam:", error);
    } finally {
    }
  };

  const handlePreviewModalClose = () => {
    setmodalPreviewOpen(false);
  };


  // const filterOptions: any = createFilterOptions({
  //   matchFrom: "any",
  //   limit: 10,
  // });

  useEffect(() => {
    const getAvailableStudentList = async () => {
      setSearchLoading(true);
      const bodyData = {
        limit: 100000,
        page: DEFAULT_PAGE,
        search: searchValue,
        searchedKey: [],
        ascDesc: "UserCreatedOn DESC",
        ExamID: examId,
      };
      await getAvailableTraineeForNewExam(bodyData)
        .then((result) => {
          if (result?.success) {
            setStudentData(result?.data?.results);
            const defaultValue = result?.data?.assignStudent?.map(
              (studentId: any) => studentId
            );
            setDefaultSelectedValue(defaultValue);
            setSelectedAssignStudentId("");
          }
          setSearchLoading(false);
        })
        .catch((error) => {
          console.log("error: ", error);
          setSearchLoading(false);
        });
    };

    if (searchValue.length > 0) {
      const timeoutId = setTimeout(() => {
        getAvailableStudentList();
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount or inputValue change
    } else {
      setStudentData([]); // Clear options when input is less than 3 characters
    }
  }, [searchValue]);

  useEffect(() => {
    if (openModal || openModelForDelete) {
      setAnchorEl(null);
    }
  }, [openModal, openModelForDelete]);

  const searchItem = (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      setOpenAutocomplete(true);
    } else {
      setOpenAutocomplete(false);
    }
  };

  useEffect(() => {
    // getAvailableStudentList();
    // getAllLocation();
    getIMockExam();
    getExamData();
  }, [examId]);

  useEffect(() => {
    getAllSelectedStudent();
  }, [page, rowsPerPage, orderBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageContainer title="Assign Trainees" description="Assign Trainees">
        <ExamWizardSteps step={2} examid={examId} />
        {/* breadcrumb */}
        <Card sx={commonContentCardStyle}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                {/* {studentData ? ( */}
                <Autocomplete
                  freeSolo
                  id="checkboxes-tags-demo"
                  // filterOptions={filterOptions}
                  loading={searchLoading}
                  multiple
                  options={studentData?.length ? studentData : []}
                  open={openAutocomplete}
                  // inputValue={searchValue}
                  onBlur={() => {
                    setOpenAutocomplete(false), setSearchValue("");
                  }}
                  getOptionLabel={(option: any) =>
                    option?.UserFirstName +
                    " " +
                    option?.UserLastName +
                    " / " +
                    option?.UserRoleTextID
                  }
                  defaultValue={
                    studentData &&
                    studentData?.find(
                      (option: any) =>
                        defaultSelectedValue?.[0] == option?.UserID
                    )
                  }
                  value={selectedOptions}
                  renderOption={(props, option, { selected }) => {
                    const isSelected =
                      selectedStudents &&
                      selectedStudents.includes(option.UserID);
                    return (
                      <li {...props}>
                        <CustomCheckbox
                          style={{ marginRight: 8 }}
                          checked={isSelected}
                          className="c-checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              // setSelectedStudents((prevSelected) => [
                              //   ...prevSelected,
                              //   option.UserID,
                              // ]);
                              setSelectedOptions((prevSelected) =>
                                prevSelected.filter(
                                  (id) => id !== option.UserID
                                )
                              );
                            } else {
                              setSelectedStudents((prevSelected) =>
                                prevSelected.filter(
                                  (id) => id !== option.UserID
                                )
                              );
                              setSelectedOptions((prevSelected) =>
                                prevSelected.filter(
                                  (id) => id !== option.UserID
                                )
                              );
                            }
                          }}
                          sx={commonCheckboxField}
                        />
                        {option?.UserFirstName +
                          " " +
                          option?.UserLastName +
                          " / " +
                          option?.UserRoleTextID}
                        <Button
                          type="submit"
                          size="small"
                          sx={{
                            borderRadius: "4px",
                            color: "#fff",
                            backgroundColor: theme.palette.secondary.main,
                            padding: "5px 10px",
                            marginLeft: "auto",
                            "&:hover": {
                              color: "#fff",
                              backgroundColor: theme.palette.secondary.main,
                            },
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenAutocomplete(false);
                          }}
                        >
                          Preview
                        </Button>
                      </li>
                    );
                  }}
                  fullWidth
                  onChange={(event, value) => {
                    studentHandleChange(value);
                    setSelectedOptions(value);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Search by name, Trainee ID...( type test to see mock data )"
                      aria-label="Search"
                      onChange={searchItem}
                      value={searchValue}
                    />
                  )}
                  popupIcon={<CornerDownArrowIcon />}
                  componentsProps={{
                    popper: {
                      sx: commonPopStyle,
                      modifiers: [
                        {
                          name: "flip",
                          enabled: false, // Disable flipping to other sides
                        },
                      ],
                    },
                  }}
                  sx={{
                    ...commonAutocompleteStyle,
                    "& .MuiAutocomplete-inputRoot": {
                      pr: "120px",
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "115px !important",
                    },
                  }}
                />
                {/* ) : (
                    "Loading..."
                  )} */}
                {/* {selectedStudentData?.totalRecords != assignCount ? ( */}
                <Box
                  display={"flex"}
                  gap={"12px"}
                  justifyContent={"left"}
                  position={"relative"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "6px",
                  }}
                >
                  <Button
                    sx={{
                      ...primaryButon,
                      height: "38px",
                      p: "9px 16px",
                      zIndex: "10",
                      "&:disabled": {
                        opacity: 0.8,
                      },
                      "& svg": {
                        mr: "2px",
                        width: "16px",
                      },
                    }}
                    disabled={selectedStudents && selectedStudents.length == 0}
                    onClick={() =>
                      studentSelectedId ? handleAssignStudent() : ""
                    }
                  >
                    <PlusIcon />
                    Assign
                  </Button>
                </Box>
                {/* ) : (
                    <Box
                      display={"flex"}
                      gap={"12px"}
                      justifyContent={"left"}
                      marginTop={"25px"}
                    >
                      <Button
                        sx={primaryButon}
                        onClick={() =>
                          toast({
                            type: "error",
                            message: "Sorry, you cannot assign more trainee than the number of stations.",
                          })
                        }
                      >
                        Assign Trainee
                      </Button>
                    </Box>
                  )} */}
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Card sx={commonTableCardStyle}>
          <TableContainer sx={stickyTableHeaderContainerStyle}>
            <Table
              aria-label="simple table"
              sx={{ ...commonTableStyle, tableLayout: "fixed" }}
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "57px",
                      minWidth: "160px",
                      maxWidth: "160px",
                      paddingRight: "0px !important",
                    }}
                  >
                    <Stack direction="row">
                      <CustomCheckbox
                        //   defaultChecked
                        color="primary"
                        inputProps={{
                          "aria-label": "checkbox with default color",
                        }}
                        // className="c-checkbox"
                        className="checkbox_style"
                        checked={allChecked}
                        onChange={handleAllChange}
                        sx={commonCheckboxField}
                      />
                      <DropdownTableHeaderAction
                        handleDelete={() =>
                          handleDeleteSelectedStudent(selectedAssignStudentId)
                        }
                        enable={selectedCheckboxes?.length > 1}
                        length={selectedCheckboxes?.length}
                        text="Remove"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "160px",
                      maxWidth: "160px",
                      width: "160px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      color={theme.palette.primary.main}
                      fontSize={"15px"}
                      fontWeight={500}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>Trainee ID</span>
                      <Box
                        component={"span"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        gap={"1px"}
                        color={theme.palette.primary.main}
                        sx={{
                          [`& svg`]: {
                            width: "8px",
                            height: "6px",
                            cursor: "pointer",
                          },
                          [`& svg.arrow-down`]: {
                            scale: "-1",
                          },
                          [`& svg path`]: {
                            color: theme.palette.secondary.fieldText,
                          },
                          [`& .sortActiveTitle svg path`]: {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title="ASC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentIDTextASC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() =>
                              handleOrderBy("StudentIDText", "ASC")
                            }
                          >
                            <CaretupIcon />
                          </span>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title="DESC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentIDTextDESC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() =>
                              handleOrderBy("StudentIDText", "DESC")
                            }
                          >
                            <CaretupIcon className="arrow-down" />
                          </span>
                        </Tooltip>
                      </Box>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "160px",
                      maxWidth: "160px",
                      width: "160px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      color={theme.palette.primary.main}
                      fontSize={"15px"}
                      fontWeight={500}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>Trainee Name</span>
                      <Box
                        component={"span"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        gap={"1px"}
                        color={theme.palette.primary.main}
                        sx={{
                          [`& svg`]: {
                            width: "8px",
                            height: "6px",
                            cursor: "pointer",
                          },
                          [`& svg.arrow-down`]: {
                            scale: "-1",
                          },
                          [`& svg path`]: {
                            color: theme.palette.secondary.fieldText,
                          },
                          [`& .sortActiveTitle svg path`]: {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title="ASC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentFirstNameASC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() =>
                              handleOrderBy("StudentFirstName", "ASC")
                            }
                          >
                            <CaretupIcon />
                          </span>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title="DESC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentFirstNameDESC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() =>
                              handleOrderBy("StudentFirstName", "DESC")
                            }
                          >
                            <CaretupIcon className="arrow-down" />
                          </span>
                        </Tooltip>
                      </Box>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "240px",
                      maxWidth: "240px",
                      width: "240px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      color={theme.palette.primary.main}
                      fontSize={"15px"}
                      fontWeight={500}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>Location</span>
                      <Box
                        component={"span"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        gap={"1px"}
                        color={theme.palette.primary.main}
                        sx={{
                          [`& svg`]: {
                            width: "8px",
                            height: "6px",
                            cursor: "pointer",
                          },
                          [`& svg.arrow-down`]: {
                            scale: "-1",
                          },
                          [`& svg path`]: {
                            color: theme.palette.secondary.fieldText,
                          },
                          [`& .sortActiveTitle svg path`]: {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title="ASC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "ActorIDTextASC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() => handleOrderBy("ActorIDText", "ASC")}
                          >
                            <CaretupIcon />
                          </span>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title="DESC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "ActorIDTextDESC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() => handleOrderBy("ActorIDText", "DESC")}
                          >
                            <CaretupIcon className="arrow-down" />
                          </span>
                        </Tooltip>
                      </Box>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "640px",
                      maxWidth: "640px",
                      width: "640px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      color={theme.palette.primary.main}
                      fontSize={"15px"}
                      fontWeight={500}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>Email</span>
                      <Box
                        component={"span"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        gap={"1px"}
                        color={theme.palette.primary.main}
                        sx={{
                          [`& svg`]: {
                            width: "8px",
                            height: "6px",
                            cursor: "pointer",
                          },
                          [`& svg.arrow-down`]: {
                            scale: "-1",
                          },
                          [`& svg path`]: {
                            color: theme.palette.secondary.fieldText,
                          },
                          [`& .sortActiveTitle svg path`]: {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title="ASC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentEmailASC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() => handleOrderBy("StudentEmail", "ASC")}
                          >
                            <CaretupIcon />
                          </span>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title="DESC"
                          style={{
                            height: "6px",
                            lineHeight: 0,
                          }}
                        >
                          <span
                            className={`${checkorderBy === "StudentEmailDESC"
                              ? "sortActiveTitle"
                              : ""
                              }`}
                            onClick={() =>
                              handleOrderBy("StudentEmail", "DESC")
                            }
                          >
                            <CaretupIcon className="arrow-down" />
                          </span>
                        </Tooltip>
                      </Box>
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                      <Typography
                        component={"span"}
                        color={theme.palette.primary.main}
                        fontSize={"15px"}
                        fontWeight={500}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>Delay Exam Status</span>
                        <Box
                          component={"span"}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          gap={"1px"}
                          color={theme.palette.primary.main}
                          sx={{
                            [`& svg`]: {
                              width: "8px",
                              height: "6px",
                              cursor: "pointer",
                            },
                            [`& svg.arrow-down`]: {
                              scale: "-1",
                            },
                            [`& svg path`]: {
                              color: theme.palette.secondary.fieldText,
                            },
                            [`& .sortActiveTitle svg path`]: {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <Tooltip
                            placement="top"
                            title="ASC"
                            style={{
                              height: "6px",
                              lineHeight: 0,
                            }}
                          >
                            <span
                              className={`${
                                checkorderBy === "StudentEmailASC"
                                  ? "sortActiveTitle"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOrderBy("StudentEmail", "ASC")
                              }
                            >
                              <CaretupIcon />
                            </span>
                          </Tooltip>
                          <Tooltip
                            placement="top"
                            title="DESC"
                            style={{
                              height: "6px",
                              lineHeight: 0,
                            }}
                          >
                            <span
                              className={`${
                                checkorderBy === "StudentEmailDESC"
                                  ? "sortActiveTitle"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOrderBy("StudentEmail", "DESC")
                              }
                            >
                              <CaretupIcon className="arrow-down" />
                            </span>
                          </Tooltip>
                        </Box>
                      </Typography>
                    </TableCell> */}
                  <TableCell>
                    <Typography
                      component={"span"}
                      color={theme.palette.primary.main}
                      fontSize={"15px"}
                      fontWeight={500}
                    >
                      &nbsp;
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <colgroup>
                <col width={"57px"} />
                <col width={"160px"} />
                <col width={"200px"} />
                <col width={"380px"} />
                <col width={"600px"} />
                <col width={"50px"} />
              </colgroup>
              <TableBody>
                {selectedStudentData?.results?.map((tdata: any, index: number) => (
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
                            // className="c-checkbox"
                            onChange={() =>
                              handleChange(tdata.id)
                            }
                            checked={
                              checkedItems[tdata.id] || false
                            }
                            className="checkbox_style"
                            sx={commonCheckboxField}
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={theme.palette.secondary.fieldText}
                        variant="h6"
                        fontWeight={400}
                        fontSize={"14px"}
                      >
                        {/* <Box
                            component="span"
                            sx={{
                              padding: 0,
                              backgroundColor: theme.palette.secondary.main,
                              marginRight: "5px",
                              borderRadius: "50%",
                              width: "10px",
                              height: "10px",
                              display: "inline-block",
                              lineHeight: 0,
                              cursor: "pointer",
                            }}
                          ></Box>{" "} */}
                        {tdata.UserRoleTextID}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={theme.palette.secondary.fieldText}
                        variant="h6"
                        fontWeight={400}
                        fontSize={"14px"}
                      >
                        {tdata.UserTitleName}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                        <CustomSelect
                          id="standard-select-currency"
                          value={tdata?.CampusID}
                          onChange={(event: any) => {
                            locationhandleChange(
                              event,
                              tdata.id
                            );
                          }}
                          variant="outlined"
                          sx={{
                            color: "#52585D",
                            fontWeight: 400,
                            fontSize: "15px",
                            borderRadius: "4px",
                            maxWidth: 160,
                            minWidth: 160,
                          }}
                        >
                          {locationList?.map((option: any) => (
                            <MenuItem
                              key={option.CampusID}
                              value={option.CampusID}
                            >
                              {option.CampusName}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </TableCell> */}
                    <TableCell>
                      <Typography
                        color={theme.palette.secondary.fieldText}
                        variant="h6"
                        fontWeight={400}
                        fontSize={"14px"}
                      >
                        {tdata.CampusName}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        minWidth: "640px",
                        maxWidth: "640px !important",
                        width: "640px",
                      }}
                    >
                      <Typography
                        color={theme.palette.secondary.fieldText}
                        variant="h6"
                        fontWeight={400}
                        fontSize={"14px"}
                      >
                        {tdata.UserEmail}
                      </Typography>
                    </TableCell>
                    <TableCell
                      className="sticky-col"
                      width={"30px"}
                      sx={{
                        background:
                          theme.palette.mode === "light" ? "#fff" : "#232527",
                      }}
                    >
                      {selectedCheckboxes?.length <= 1 ? (
                        <>
                          <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) =>
                              handleClick(
                                e,
                                tdata.id,
                                tdata.StudentID
                              )
                            }
                            sx={{
                              transform: "rotate(90deg)",
                            }}
                            className="menu_dots"
                          >
                            <IconDotsVertical width={18} />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            sx={{
                              ...commonMenuStyle,
                            }}
                            transformOrigin={{
                              horizontal: "center",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "center",
                              vertical: "bottom",
                            }}
                          >
                            <MenuItem
                              onClick={() =>
                                handleDeleteSelectedStudent(
                                  selectedAssignStudentId
                                )
                              }
                            >
                              Remove
                            </MenuItem>

                          </Menu>
                        </>
                      ) : (
                        <>
                          <IconButton disabled className="menu_dots">
                            <IconDots width={20} />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <>
            {selectedCheckboxes?.length > 0 && (
              <Box
                px={3.3}
                py={1.5}
                sx={{
                  borderTop: "1px solid #e5eaef",
                }}
              >
                <Button
                  sx={{
                    borderRadius: "5px",
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 25px",
                    minWidth: "110px",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  type="submit"
                  onClick={() =>
                    handleDeleteSelectedStudent(selectedAssignStudentId)
                  }
                >
                  Delete
                </Button>
              </Box>
            )}
          </> */}
          <DeleteModalComponent
            open={openModelForDelete}
            handleClose={handleModalClose}
            handleChange={(event: any) => setDeleteText(event.target.value)}
            handleClick={() =>
              handleDeleteSelectedStudent(selectedAssignStudentId)
            }
          />
          <CustomModal open={errorModel} handleClose={handleLocationModelClose}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: "24px",
                lineHeight: "36px",
                color: "#02376D",
                fontWeight: 600,
              }}
            >
              Error!
            </Typography>
            <Typography
              sx={{ fontSize: "14px", lineHeight: "24px", color: "#455A64" }}
            >
              There are less questions and students assigned compared to the
              number of stations.
            </Typography>
            <Stack
              display={"flex"}
              direction={"row"}
              gap={"10px"}
              justifyContent={"center"}
              marginTop={"20px"}
            >
              <Button
                sx={{
                  ...primaryButon,
                  p: "9px 20px",
                  color: theme.palette.mode === "light" ? "#FFF" : "#000",
                }}
              >
                Go Back
              </Button>
            </Stack>
          </CustomModal>
          <CustomTablePagination
            totalPageCount={selectedStudentData?.totalPages}
            totalRecords={selectedStudentData?.totalRecords}
            currentPage={page}
            rowsPerPage={rowsPerPage}
            handlePagination={handlePagination}
          />
          {/* <Box
              display={"flex"}
              gap={"12px"}
              justifyContent={"left"}
              marginTop={"20px"}
            ></Box> */}
        </Card>
        <Box mt={6}>
          <Box
            display={"flex"}
            gap={"20px"}
            justifyContent={"left"}
            alignItems={"center"}
          >
            <Button
              sx={{
                ...secondaryButon,
                mr: "auto",
              }}
              onClick={() => {
                // router.push(`/acj-exam/review-details?examid=${examId}`);
                handleSaveAsDraft();
              }}
            >
              Save as Draft
            </Button>

            <Button
              sx={{
                ...linkButton,
              }}
              onClick={() => {
                router.push(`/acj-exam/review-details?examid=${examId}`);
              }}
            >
              Skip for now
            </Button>
            <Button
              sx={{
                ...primaryButon,
              }}
              onClick={() => {
                router.push(`/acj-exam/review-details?examid=${examId}`);
              }}
            >
              Generate
            </Button>
            {/* <Button
              sx={{
                borderRadius: "6px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: theme.palette.primary.main,
                padding: "8px 25px",
                minWidth: "150px",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                },
              }}
              type="submit"
              onClick={() => {
                router.push("/imock-exam/review-details");
              }}
            >
              Next
            </Button> */}
          </Box>
        </Box>
        <Dialog
          open={modalPreviewOpen}
          onClose={handlePreviewModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "1400px",
              padding: "15px",
              paddingTop: "30px",
              bgcolor: theme.palette.background.light,
            },
            "& .MuiTabPanel-root": {
              // marginTop:"15px"
            },
          }}
          className="q-modal"
        >
          <IconButton
            aria-label="close"
            onClick={handlePreviewModalClose}
            sx={{
              position: "absolute",
              right: 7,
              top: 3,
              color: "#ccc",
            }}
          >
            {/* <CloseIcon /> */}
            <IconX stroke={2} />
          </IconButton>
          <DialogContent
            sx={{
              p: 0,
            }}
          >
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
              >
                Trainee Profile Picture
              </Typography>
              <Grid container spacing={3} mb={"24px"}>
                <Grid item xs={12} md={12}>
                  <Box textAlign="center" lineHeight={0} sx={{
                    '& img': {
                      borderRadius: "50%",
                      objectFit: "cover"
                    }
                  }}>
                    <Image
                      src={
                        traineeData?.StudentMedia
                          ? traineeData?.StudentMedia
                          : `/images/profile-img.svg`
                      }
                      width={300}
                      height={300}
                      alt="Trainee image"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Student Profile
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      PrepX ID
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentIDText}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Status
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentStatus == 1 ? "Active" : "Inactive"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      First Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentFirstName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Middle Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMiddleName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Last Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentLastName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Preferred Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPreferredName}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Contact Info & Bio
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentEmail}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Phone Number
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPhoneNumber}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Assigned Date
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentAssignedDate
                        ? moment(traineeData?.StudentAssignedDate).format(
                          "YYYY-MM-DD"
                        )
                        : "-"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      End Date
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentEndDate
                        ? moment(traineeData?.StudentEndDate).format(
                          "YYYY-MM-DD"
                        )
                        : "-"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Residential Address
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Country
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentCountryName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 1
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentResidentialAddress}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 2
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentAddressLine2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      City
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentCity}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Province
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentProvince}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Postal Code
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPostalCode}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Mailing Address
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Country
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingCountryName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 1
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingResidentialAddress}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 2
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingAddressLine2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      City
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingCity}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Province
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingProvince}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Postal Code
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingPostalCode}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  );
}
