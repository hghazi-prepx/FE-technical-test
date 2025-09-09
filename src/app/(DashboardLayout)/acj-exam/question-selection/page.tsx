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
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
// import { ImageIcon } from "@/components/Icons";
import { useTheme } from "@mui/material/styles";
import {
  CaretupIcon,
  CornerDownArrowIcon,
  PlusIcon,
  PreviewIcon,
} from "@/components/Icons";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import toast from "../../components/Toast/index";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import {
  blueButton,
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonMenuStyle,
  commonPopStyle,
  commonSelectFieldStyle,
  commonTableCardStyle,
  commonTableStyle,
  disableInputStyle,
  fieldLabel,
  linkButton,
  primaryButon,
  secondaryButon,
  stickyColStyle,
  stickyTableHeaderContainerStyle,
} from "@/utils/commonstyles";
import { IconDots } from "@tabler/icons-react";
import QuestionOptions from "@/components/QuestionOptions";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import DeleteModalComponent from "@/components/DeleleModalComponent";
import {
  createQuestionForNewExam,
  deleteQuestionForNewExam,
  getQuestionListForNewExam,
} from "@/services/newExamFlow/newExamFlowAPI";
import { booklet } from "../dropDowns";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction";
import MassImport from "@/components/MassImport";
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

export default function StationManagement() {
  const preQuestionId = window.localStorage.getItem("new-question");
  const theme = useTheme();
  const router = useRouter();
  const searchRouter = useSearchParams();
  const [PrepXID, setPrepXID] = useState(new Date().getTime())
  const examId: any = searchRouter.get("examid");
  const [loading, setLoading] = useState(false);
  const [bookletId, setBookletId] = useState("1");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>();
  const [assignQuestionCount, setAssignQuestionCount] = useState<any>();
  const [defaultSelectedQuestionId, setDefaultSelectedQuestionId] =
    useState<any>();
  const [searchValue, setSearchValue] = useState<any>("");
  const [selectedQuestionData, setSelectedQuestionData] = useState<any>();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [selectedAssignStudentId, setSelectedAssignStudentId] = useState<any>();
  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>();
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<any>([]);
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [selectedAssignQuestionId, setSelectedAssignQuestionId] =
    useState<any>();
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [checkorderBy, setCheckorderBy] = useState<any>("");
  const [orderBy, setOrderBy] = useState<any>("BookletID ASC");
  const [deleteText, setDeleteText] = useState("");
  const [modalPreviewOpen, setmodalPreviewOpen] = useState(false);
  const [previewData, setPreViewData] = useState<any>();
  const [previewQuestionId, setPreviewQuestionId] = useState<any>();
  const [examData, setExamData] = useState<any>();
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [examStations, setExamStations] = useState<any>();
  const [tabValue, setTabValue] = useState("1");
  const [selectedQuestionStatus, setSelectedQuestionStatus] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();

  const { DEFAULT_PAGE } = PAGINATION;

  const isDisabled =
    selectedQuestionData?.results?.filter(
      (question: any) => question.BookletID === `Booklet ${bookletId}`
    ).length >= examData?.ExamBookletsQuestions;

  // const searchItem = (event: any) => {
  //   setSearchValue(event.target.value);
  //   if (event.target.value) {
  //     setOpenAutocomplete(true);
  //   } else {
  //     setOpenAutocomplete(false);
  //   }
  // };

  const searchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value); // Update the search value state
    if (value) {
      setOpenAutocomplete(true);
    } else {
      setOpenAutocomplete(false);
    }
  };

  const getAllSelectedQuestion = async () => {
    setAllChecked(false);
    setIsLoading(true);
    setCheckedItems({});
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      search: "",
      searchedKey: [],
      ascDesc: orderBy,
      ExamID: examId,
    };
    await getQuestionListForNewExam(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedQuestionData(result.data || { results: [] });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const filterOptions: any = createFilterOptions({
    matchFrom: "any",
    limit: 10,
  });


  const handleSaveAsDraft = async () => {
    setIsLoading(true);
    toast({ type: "success", message: "Draft saved successfully." });
    router.push("/Exam-Management");
    setIsLoading(false);
  };

  const bookletHandleChange = async (event: any) => {
    setIsLoading(true);
    setBookletId(event.target.value);
    setSearchValue("");
    setSelectedQuestions([]);
    setOpenAutocomplete(false);
    setSelectedCheckboxes([]);
    getAllSelectedQuestion();
  };

  const updateQuestionStatus = async (questionStatus: any) => {
    const bodyData = {
      ExamQuestionID: selectedAssignQuestionId,
      ExamQuestionStatus: questionStatus == 1 ? 0 : 1,
    };
  };


  const removeKeepInReportQuestion = async (selectedAssignQuestionId: any) => {

    const bodyData = {
      ExamID: examId,
      ExamQuestionID: selectedAssignQuestionId,
    };
    setIsLoading(false);
  };

  const handleAssignQuestion = async () => {
    setIsLoading(true);
    const dataBody = {
      ExamID: examId,
      QuestionID: selectedQuestionIds,
      BookletID: bookletId,
    };
    await createQuestionForNewExam(dataBody)
      .then((result) => {
        if (result?.success) {
          toast({
            type: "success",
            message: "Assigned question successfully.",
          });
          setQuestionData([]);
          setSelectedOptions([]);
          setSelectedQuestionData({
            results: selectedQuestionIds.map((id: any) => ({
              ExamQuestionID: id,
              BookletID: `Booklet ${bookletId}`,
              QuestionID: id,
              CourseTypeName: "ACJ",
              ExamQuestionStatus: 1,
              QuestionTextID: `Question-${id}`,
              QuestionTopicName: "Radiology",
              QuestionTypeFor: "msq",
            }))
          });
          // getAllSelectedQuestion();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => setIsLoading(false));

  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    questionId: any,
    previewId: any,
    questionStatus: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssignQuestionId(questionId);
    setPreviewQuestionId(previewId);
    setSelectedQuestionStatus(questionStatus);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAssignQuestionId("");
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
    setSelectedCheckboxes([]);
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

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      setSelectedQuestions([]);
      setSelectedQuestionIds([]); // Deselecting all students, so empty the array
      setOpenAutocomplete(false);
    }
    const questionIDs = new Set<number>();
    for (let i = 0; i < value.length; i++) {
      const question = value[i];
      if (questionIDs.has(question.QuestionID)) {
        toast({
          type: "error",
          message: `This question has been already selected.`,
        });
        value.splice(i, 1); // Remove the duplicate entry
        i--; // Adjust the index after removal
      } else {
        questionIDs.add(question.QuestionID);
      }
    }
    const selectedQuestionID = value.map(
      (question: any) => question.QuestionID
    );
    setSelectedQuestionIds(selectedQuestionID);
    // setSelectedQuestions(Array.from(questionIDs));
    setSelectedQuestions(value.map((option: any) => option.QuestionID));
    // setOpenAutocomplete(false);
  };

  const handleAllChange = () => {
    // Handle the change event for the "all_check" checkbox
    const newCheckedState: { [key: string]: boolean } = {};
    const allnewCheckedState: string[] = [];

    if (!allChecked) {
      // Set all checkboxes to checked
      selectedQuestionData.results.forEach((tdata: { ExamQuestionID: any }) => {
        newCheckedState[tdata.ExamQuestionID] = true;
        allnewCheckedState.push(tdata.ExamQuestionID);
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

  /**
   * @ Function Name      : handleDeleteStation
   * @ Function Purpose   : Calling API for deleting station
   */
  const handleDeleteSelectedQuestion = async (id?: any) => {
    console.log("id: ", id);
    console.log("selectedCheckboxes: ", selectedCheckboxes);
    let finalArray: any = [];
    if (id) {
      finalArray.push(id);
    } else {
      finalArray = selectedCheckboxes;
    }
    const bodyData = {
      ExamID: examId,
      ExamQuestionID: finalArray,
    };
    await deleteQuestionForNewExam(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedCheckboxes([]);
          setSelectedQuestionData((prev: any) => {
            return {
              results: prev.results.filter((question: any) => !finalArray.includes(question.ExamQuestionID)),
            }
          });
          // getAllSelectedQuestion();
          // getAllSelectQuestion();
          setSelectedQuestions([]);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        setIsLoading(false);
      });
    // }
  };

  const handlePreviewModalOpen = async (questionId: any) => {
    // const defaultValue = "";
    setIsLoading(true);
  };

  const handlePreviewModalClose = () => {
    setmodalPreviewOpen(false);
  };

  const tabHandelChange = (event: React.SyntheticEvent, newValue: any) => {
    setTabValue(newValue);
  };

  const getNewQuestion = async (data: any) => {
    setLoading(true);
    await getQuestionListForNewExam(data)
      .then((result) => {
        if (result?.success) {
          setQuestionData(result?.data?.results);
          setAssignQuestionCount(result?.data?.BooklateTotal);
          setSelectedQuestionIds((prev: any) =>
            Array.from(new Set([...prev, preQuestionId]))
          );
          setDefaultSelectedQuestionId(result?.data?.QuestionID);
          // setOpenAutcomplete(true);
          // setIsLoading(false);
        }
        // setLoading(false);
        setSearchLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        // setLoading(false);
        setSearchLoading(false);
      })
      .finally(() => setLoading(false));
    window.localStorage.removeItem("new-question");
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
      const isXLSXFile =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx");
      if (!isCsvFile && !isXLSXFile) {
        setIsLoading(false);
        toast({
          type: "warning",
          message: "Only CSV Or XLSX file types are allowed.",
        });
        return; // Exit function early if file is not a CSV Or XLSX
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
      formData.append(
        "ExamNumberofQuestions",
        examData?.ExamNumberofQuestions || 1000
      );
      formData.append("ExamCourseType", examData?.ExamCourseType.toUpperCase());
      formData.append("BookletID", bookletId);
    }
  };

  useEffect(() => {
    const getAllSelectQuestion = async () => {
      setSearchLoading(true);
      const bodyData = {
        limit: 10000,
        page: DEFAULT_PAGE,
        search: searchValue,
        searchedKey: [],
        ascDesc: "QuestionCreatedOn DESC",
        ExamID: examId,
        ExamBookletsQuestions: examData?.ExamBookletsQuestions,
        BookletID: bookletId,
        ExamCourseType: examData?.ExamCourseType,
      };

      await getQuestionListForNewExam(bodyData)
        .then((result) => {
          if (result?.success) {
            setQuestionData(result?.data?.results);
            const defaultValue = result?.data?.assignStudent?.map(
              (studentId: any) => studentId
            );
            setDefaultSelectedValue(defaultValue);
            setSelectedAssignStudentId("");
            // setAssignQuestionCount(result?.data?.BooklateTotal);
            // setOpenAutcomplete(true);
            // setIsLoading(false);
          }
          // setLoading(false);
          setSearchLoading(false);
        })
        .catch((error) => {
          console.log("error: ", error);
          // setLoading(false);
          setSearchLoading(false);
        });
    };

    if (searchValue.length > 0) {
      const timeoutId = setTimeout(() => {
        getAllSelectQuestion();
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount or inputValue change
    } else {
      setQuestionData([]); // Clear options when input is less than 3 characters
    }
  }, [searchValue]);

  useEffect(() => {
    getAllSelectedQuestion();
  }, [page, rowsPerPage, orderBy]);

  return (
    <PageContainer title="Question Selection" description="Question Selection">
      <ExamWizardSteps step={1} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Question Selection" items={undefined} />
      <Card sx={commonContentCardStyle}>
        <Grid container spacing={"32px"}>
          <Grid item xs={12} sm={6} md={6}>
            <Stack>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  PrepX ID
                </Typography>
                <CustomTextField
                  id="default-value"
                  variant="outlined"
                  defaultValue="Session ID"
                  placeholder={""}
                  value={PrepXID} // should be unique ID
                  fullWidth
                  disabled
                />
              </Box>
            </Stack>
          </Grid>

          {examData && examData.ExamTypeName === "Mock" && (
            <Grid item xs={12} sm={6} md={6}>
              <Stack>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Booklet*
                  </Typography>
                  <CustomSelect
                    id="standard-select-currency"
                    value={bookletId}
                    onChange={bookletHandleChange}
                    fullWidth
                    variant="outlined"
                    sx={commonSelectFieldStyle}
                    MenuProps={{
                      style: {
                        maxHeight: 350,
                      },
                      PaperProps: {
                        sx: commonDropdownMenuStyle,
                      },
                    }}
                  >
                    {examData?.ExamNumberofBookletsID &&
                      booklet
                        .slice(0, examData?.ExamNumberofBookletsID)
                        ?.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                    {/* {booklet.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))} */}
                  </CustomSelect>
                </Box>
              </Stack>
            </Grid>
          )}

          {/* {selectedQuestionData?.results?.length <= examData?.ExamBookletsQuestions 
           && ( */}
          {/* )
        } */}

          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                border: "1px solid #738A9633",
                borderRadius: "4px",
              }}
              p={"1.5625rem 1.875rem 1.875rem"}
            >
              <Stack direction={"row"} alignItems={"center"} mb={"10px"}>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Search Question
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                gap={"15px"}
                position={"relative"}
                sx={{
                  border: `1px solid ${theme.palette.mode === "dark" ? "transparent" : "#738A9633"
                    }`,
                  borderRadius: "5px",
                  "&:has(input:disabled)": {
                    background: theme.palette.secondary.disableFieldColor,
                  },
                }}
              >
                <>
                  {loading ? (
                    <>Loading...</>
                  ) : (
                    <Autocomplete
                      freeSolo
                      id="checkboxes-tags-demo"
                      loading={searchLoading}
                      multiple
                      options={questionData?.length ? questionData : []}
                      open={openAutocomplete}
                      autoHighlight
                      onBlur={() => {
                        setOpenAutocomplete(false);
                        setSearchValue("");
                      }}
                      getOptionLabel={(option: any) =>
                        option?.QuestionTopicName +
                        " / " +
                        option?.SubTopicName +
                        " / " +
                        option?.QuestionTextID
                      }
                      value={selectedOptions}
                      defaultValue={
                        questionData &&
                        questionData?.find(
                          (option: any) =>
                            defaultSelectedValue?.[0] == option.QuestionID
                        )
                      }
                      renderOption={(props, option, { selected }) => {
                        const isSelected =
                          selectedQuestions &&
                          selectedQuestions.includes(option.QuestionID);
                        return (
                          <li {...props}>
                            <CustomCheckbox
                              style={{ marginRight: 8 }}
                              checked={isSelected}
                              className="c-checkbox"
                              sx={commonCheckboxField}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOptions((prevSelected) =>
                                    prevSelected.filter(
                                      (id) => id !== option.QuestionID
                                    )
                                  );
                                } else {
                                  setSelectedOptions((prevSelected) =>
                                    prevSelected.filter(
                                      (id) => id !== option.QuestionID
                                    )
                                  );
                                }
                              }}
                            />

                            {option.QuestionTopicName +
                              " / " +
                              option.SubTopicName +
                              " / " +
                              option.QuestionTextID}

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
                                handlePreviewModalOpen(option?.QuestionID);
                              }}
                            >
                              Preview
                            </Button>
                          </li>
                        );
                      }}
                      fullWidth
                      onChange={(event, value) => {
                        // setSelectedQuestions(value);
                        studentHandleChange(value);
                        setSelectedOptions(value); // Update selected options
                        // setSearchValue("");
                      }}
                      disabled={isDisabled}
                      renderInput={(params) => (
                        <Tooltip
                          title={
                            selectedQuestionData?.results?.filter(
                              (question: any) =>
                                question.BookletID === `Booklet ${bookletId}`
                            ).length >= examData?.ExamBookletsQuestions
                              ? "Maximum questions reached"
                              : ""
                          }
                          placement="top"
                          arrow
                          sx={{
                            "& .MuiTooltip-tooltip": {
                              fontSize: "18px", // Adjust the font size as needed
                            },
                          }}
                        >
                          <div>
                            <CustomTextField
                              {...params}
                              placeholder="Search by Question ID, Name..."
                              aria-label="Favorites"
                              onChange={searchItem}
                              value={searchValue}
                            />
                          </div>
                        </Tooltip>
                      )}
                      // onClose={() => setOpenAutocomplete(false)}
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
                  )}
                </>
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
                    onClick={() =>
                      selectedQuestionIds?.length > 0
                        ? handleAssignQuestion()
                        : ""
                    }
                  >
                    <PlusIcon />
                    Assign
                  </Button>
                </Box>
              </Stack>
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
                      // className="c-checkbox"
                      inputProps={{
                        "aria-label": "checkbox with default color",
                      }}
                      className="checkbox_style"
                      checked={allChecked}
                      onChange={handleAllChange}
                      sx={commonCheckboxField}
                    />
                    <DropdownTableHeaderAction
                      enable={selectedCheckboxes?.length > 1}
                      text="Remove"
                      handleDelete={() => handleDeleteSelectedQuestion()}
                      length={selectedCheckboxes?.length}
                    />
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "180px",
                    maxWidth: "180px",
                    width: "180px",
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
                    <span>Question ID</span>
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
                        [`& svg path`]: {
                          color: "#67757C",
                        },
                        [`& .sortActiveTitle svg path`]: {
                          color: "#02376D",
                        },
                        [`& svg.arrow-down`]: {
                          scale: "-1",
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
                          className={`${checkorderBy === "StationRankIDASC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() => handleOrderBy("StationRankID", "ASC")}
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
                          className={`${checkorderBy === "StationRankIDDESC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() => handleOrderBy("StationRankID", "DESC")}
                        >
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "320px",
                    maxWidth: "320px",
                    width: "320px",
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
                    <span>Booklet</span>
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
                          color: theme.palette.secondary.textColor,
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
                          className={`${checkorderBy === "BookletIDASC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() => handleOrderBy("BookletID", "ASC")}
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
                          className={`${checkorderBy === "BookletIDDESC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() => handleOrderBy("BookletID", "DESC")}
                        >
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "320px",
                    maxWidth: "320px",
                    width: "320px",
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
                    <span>Course Type</span>
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
                          color: theme.palette.secondary.textColor,
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
                          className={`${checkorderBy === "QuestionTypeForASC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeFor", "ASC")
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
                          className={`${checkorderBy === "QuestionTypeForDESC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeFor", "DESC")
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
                    <span>Topic</span>
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
                          className={`${checkorderBy === "QuestionTypeNameASC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeName", "ASC")
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
                          className={`${checkorderBy === "QuestionTypeNameDESC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeName", "DESC")
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
                    <span>Status</span>
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
                          className={`${checkorderBy === "QuestionTypeNameASC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeName", "ASC")
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
                          className={`${checkorderBy === "QuestionTypeNameDESC"
                            ? "sortActiveTitle"
                            : ""
                            }`}
                          onClick={() =>
                            handleOrderBy("QuestionTypeName", "DESC")
                          }
                        >
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
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
            <TableBody>
              {selectedQuestionData?.results?.map((tdata: any) => (
                <TableRow key={tdata.id}>
                  <TableCell>
                    <Stack direction="row">
                      <Box>
                        <CustomCheckbox
                          //   defaultChecked
                          color="primary"
                          // className="c-checkbox"
                          inputProps={{
                            "aria-label": "checkbox with default color",
                          }}
                          onChange={() => handleChange(tdata.ExamQuestionID)}
                          checked={checkedItems[tdata.ExamQuestionID] || false}
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
                      <Tooltip
                        title={
                          tdata?.ExamQuestionStatus == 1 ? "Active" : "Inactive"
                        }
                      >
                        <Box
                          component="span"
                          sx={{
                            padding: 0,
                            backgroundColor:
                              tdata.ExamQuestionStatus == 1
                                ? "#44D3BB"
                                : "#FC4B6C",
                            marginRight: "10px",
                            borderRadius: "50%",
                            width: "8px",
                            height: "8px",
                            display: "inline-block",
                            lineHeight: 0,
                            cursor: "pointer",
                          }}
                        ></Box>
                      </Tooltip>
                      {tdata.QuestionTextID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={theme.palette.secondary.fieldText}
                      variant="h6"
                      fontWeight={400}
                      fontSize={"14px"}
                    >
                      {tdata.BookletID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={theme.palette.secondary.fieldText}
                      variant="h6"
                      fontWeight={400}
                      fontSize={"14px"}
                    >
                      {tdata.CourseTypeName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={theme.palette.secondary.fieldText}
                      variant="h6"
                      fontWeight={400}
                      fontSize={"14px"}
                    >
                      {tdata.QuestionTopicName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={theme.palette.secondary.fieldText}
                      variant="h6"
                      fontWeight={400}
                      fontSize={"14px"}
                    >
                      {tdata.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                    </Typography>
                  </TableCell>
                  <TableCell className="sticky-col" sx={stickyColStyle}>
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
                              tdata.ExamQuestionID,
                              tdata.QuestionID,
                              tdata.ExamQuestionStatus
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
                          {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
                          <MenuItem
                            onClick={() =>
                              handlePreviewModalOpen(previewQuestionId)
                            }
                          >
                            View
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDeleteSelectedQuestion(
                                selectedAssignQuestionId
                              );
                            }}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              updateQuestionStatus(selectedQuestionStatus)
                            }
                          >
                            Update Status
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              removeKeepInReportQuestion(selectedAssignQuestionId)
                            }
                          >
                            Remove & keep in report
                          </MenuItem>
                          {/* <MenuItem onClick={() => router.push("/audit-trail")}>
                            View Logs
                          </MenuItem>
                          <MenuItem>Reports</MenuItem> */}
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
        <>
          {/* {selectedCheckboxes?.length > 0 && (
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
                onClick={() =>
                  handleDeleteSelectedQuestion(selectedAssignQuestionId)
                }
              >
                Delete
              </Button>
            </Box>
          )} */}
        </>
        <DeleteModalComponent
          open={openModal}
          handleClose={handleModalClose}
          handleChange={(event: any) => setDeleteText(event.target.value)}
          handleClick={() =>
            handleDeleteSelectedQuestion(selectedAssignQuestionId)
          }
        />
        <CustomTablePagination
          totalPageCount={selectedQuestionData?.totalPages}
          totalRecords={selectedQuestionData?.totalRecords}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          handlePagination={handlePagination}
        />
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
              router.push(`/acj-exam/assign-trainee?examid=${examId}`);
            }}
          >
            Skip for now
          </Button>
          <Button
            sx={{
              ...primaryButon,
            }}
            // type="submit"
            onClick={() => {
              router.push(`/acj-exam/assign-trainee?examid=${examId}`);
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Dialog
        open={modalPreviewOpen}
        onClose={handlePreviewModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 1301,
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1400px",
            padding: "15px",
            paddingTop: "30px",
            bgcolor: "#fff",
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
            color: "#000",
          }}
        >
          {/* <CloseIcon /> */}
          <IconX stroke={2} />
        </IconButton>
        <Stack mt={"20px"}>
          <Grid container spacing={"30px"}>
            {previewData?.QuestionCaseStudy && (
              <Grid item md={6}>
                <Stack
                  sx={{
                    p: "30px",
                    background: "#F9FDFF",
                    border: "1px solid #738A9633",
                    borderRadius: "5px",
                  }}
                >
                  <Stack mb={"30px"}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: theme.palette.primary.main,
                        mb: "9px",
                      }}
                    >
                      Case Study
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "#7A878D",
                        "& table": {
                          tableLayout: "fixed",
                        },
                        "& *": {
                          maxWidth: "100% !important",
                          fontSize: "15px",
                          lineHeight: "24px",
                          fontWeight: 400,
                          padding: "0px !important",
                          m: "0px !important",
                        },
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: previewData?.QuestionCaseStudyText
                            ? previewData?.QuestionCaseStudyText
                            : "",
                        }}
                      />
                    </Typography>
                  </Stack>
                  <Stack>
                    <TableContainer>
                      <Table
                        sx={{
                          borderRadius: "4px",
                          border: `1px solid ${theme.palette.mode === "light" ? "#000" : "#FFF"
                            }`,
                          borderCollapse: "collapse",
                          borderSpacing: "0px",
                          fontSize: "12px",
                          tableLayout: "fixed",
                          lineHeight: "14px",
                          background: "#fff",
                          "& tr:nth-child(even) td": {
                            bgcolor: "#C9E3F9",
                          },
                          "& td": {
                            borderRight: `1px solid ${theme.palette.mode === "light" ? "#000" : "#FFF"
                              }`,
                            borderBottom: `1px solid ${theme.palette.mode === "light" ? "#000" : "#FFF"
                              }`,
                            minWidth: "33.3%",
                            width: "33.3%",
                            p: "14px 10px",
                            "&:last-child": {
                              borderRight: "0px",
                            },
                          },
                        }}
                        dangerouslySetInnerHTML={{
                          __html: previewData?.QuestionCaseStudy,
                        }}
                      ></Table>
                    </TableContainer>
                  </Stack>
                  {previewData?.CaseStudyImages?.length > 0 &&
                    previewData?.CaseStudyImages?.map((imageData: any) => (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            width: "fit-content",
                            margin: "10px auto",
                            maxWidth: "100%",
                            "& img": {
                              height: "auto",
                              width: "auto",
                              maxWidth: "100%",
                              objectFit: "contain",
                              gap: "40px",
                            },
                          }}
                        >
                          <Image
                            src={imageData?.CaseStudyImage}
                            alt={"question-preview"}
                            width={363}
                            height={240}
                            style={{
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        </Box>
                      </>
                    ))}
                </Stack>
              </Grid>
            )}
            <Grid
              item
              md={previewData?.QuestionCaseStudy ? 6 : 12}
              mt={"0px !important"}
            >
              <Stack
                sx={{
                  p: "30px",
                  background: "#F9FDFF",
                  border: "1px solid #738A9633",
                  borderRadius: "5px",
                }}
              >
                <QuestionOptions
                  type={previewData?.QuestionTypeFor}
                  primaryImage={previewData?.QuestionImageList?.PrimaryMedia}
                  secondaryImage={
                    previewData?.QuestionImageList?.SecondaryMedia
                  }
                  viewImage={previewData?.QuestionImageList?.AdditionalMedia}
                  tabValue={tabValue}
                  multipleImage={
                    previewData?.QuestionImageList?.AdditionalMedia
                  }
                  questionText={previewData?.QuestionText}
                  questionData={previewData}
                  handleChange={tabHandelChange}
                  caseStudy={previewData?.QuestionCaseStudy ? true : false}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Dialog>
    </PageContainer>
  );
}
