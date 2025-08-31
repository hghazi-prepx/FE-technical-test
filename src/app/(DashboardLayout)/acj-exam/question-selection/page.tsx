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
import { useTheme } from "@mui/material/styles";
import { CaretupIcon, CornerDownArrowIcon, PlusIcon } from "@/components/Icons";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "../../components/Toast/index";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import {
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
import { useDispatch, useSelector } from "@/store/hooks";
import {
  removeSelectedQuestion,
  setExamId,
  setSelectedQuestions,
} from "@/store/customizer/QuestionSlice";
import CustomTable, { Column } from "../../components/shared/CustomTable";

export default function StationManagement() {
  const preQuestionId = window.localStorage.getItem("new-question");
  const theme = useTheme();
  const router = useRouter();
  const searchRouter = useSearchParams();
  const [PrepXID, setPrepXID] = useState(new Date().getTime());
  const examId: any = searchRouter.get("examid");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>();
  const [searchValue, setSearchValue] = useState<any>("");
  const dispatch = useDispatch();
  const {
    selectedQuestions,
    examId: reduxExamId,
    bookletId: reduxBookletId,
  } = useSelector((state) => state.questions);
  const [bookletId, setBookletId] = useState(reduxBookletId || "1");
  console.log(selectedQuestions, "selectedQuestions");
  const [selectedQuestionData, setSelectedQuestionData] = useState<any>();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<any>([]);
  type CheckedItems = {
    [key: string]: boolean;
  };
  console.log(selectedQuestionData, "selectedQuestionData");
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalClose = () => setOpenModal(false);
  const [selectedAssignQuestionId, setSelectedAssignQuestionId] =
    useState<any>();
  const [checkorderBy, setCheckorderBy] = useState<any>("");
  const [orderBy, setOrderBy] = useState<any>("BookletID ASC");
  const [deleteText, setDeleteText] = useState("");

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
  useEffect(() => {
    if (reduxBookletId) {
      setBookletId(reduxBookletId);
    }
  }, [reduxBookletId]);
  useEffect(() => {
    if (examId) {
      dispatch(setExamId(examId));
    }
  }, [examId, dispatch]);

  const searchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value); // Update the search value state
    if (value) {
      setOpenAutocomplete(true);
    } else {
      setOpenAutocomplete(false);
    }
  };
  useEffect(() => {
    if (reduxBookletId) {
      setBookletId(reduxBookletId);
    }
  }, [reduxBookletId]);

  useEffect(() => {
    if (examId) {
      dispatch(setExamId(examId));
    }
  }, [examId, dispatch]);

  // Initialize selectedQuestionData from Redux store
  useEffect(() => {
    if (selectedQuestions && selectedQuestions.length > 0) {
      setSelectedOptions(selectedQuestions);
    }
  }, [selectedQuestions]);
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
    const newBookletId = event.target.value;
    setIsLoading(true);
    setBookletId(newBookletId);
    setSearchValue("");
    setSelectedQuestions([]);
    setOpenAutocomplete(false);
    setSelectedCheckboxes([]);
    getAllSelectedQuestion();
    setBookletId(newBookletId);
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
            })),
          });
          const newQuestions = selectedQuestionIds.map((id: any) => ({
            ExamQuestionID: id,
            BookletID: `Booklet ${bookletId}`,
            QuestionID: id,
            CourseTypeName: "ACJ",
            ExamQuestionStatus: 1,
            QuestionTextID: `Question-${id}`,
            QuestionTopicName: "Radiology",
            QuestionTypeFor: "msq",
          }));
          dispatch(setSelectedQuestions(newQuestions));
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

    setSelectedQuestions(value.map((option: any) => option.QuestionID));
  };

  const handleAllChange = () => {
    const newCheckedState: { [key: string]: boolean } = {};
    const allnewCheckedState: string[] = [];

    if (!allChecked) {
      selectedQuestionData.results.forEach((tdata: { ExamQuestionID: any }) => {
        newCheckedState[tdata.ExamQuestionID] = true;
        allnewCheckedState.push(tdata.ExamQuestionID);
      });
    }
    setSelectedCheckboxes(allnewCheckedState);

    setAllChecked(!allChecked);
    setCheckedItems(newCheckedState);
  };
  const handleOrderBy = (key: any, order: any) => {
    const combineKey = key + " " + order;
    setCheckorderBy(key + "" + order);
    setOrderBy(combineKey);
  };

  const handleDeleteSelectedQuestion = async (id?: any) => {
    console.log("id: ", id);
    console.log("selectedCheckboxes: ", selectedCheckboxes);
    let finalArray: any = [];
    dispatch(removeSelectedQuestion(id));
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
              results: prev.results.filter(
                (question: any) => !finalArray.includes(question.ExamQuestionID)
              ),
            };
          });

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
        getAllSelectQuestion();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setQuestionData([]);
    }
  }, [searchValue]);

  useEffect(() => {
    getAllSelectedQuestion();
  }, [page, rowsPerPage, orderBy]);
  const columns: Column[] = [
    {
      id: "QuestionTextID",
      label: "Question ID",
      sortable: true,
      sortKey: "StationRankID",
      render: (row) => (
        <Typography
          color={theme.palette.secondary.fieldText}
          fontWeight={400}
          fontSize="14px"
        >
          <Tooltip title={row.ExamQuestionStatus == 1 ? "Active" : "Inactive"}>
            <Box
              component="span"
              sx={{
                backgroundColor:
                  row.ExamQuestionStatus == 1 ? "#44D3BB" : "#FC4B6C",
                marginRight: "10px",
                borderRadius: "50%",
                width: "8px",
                height: "8px",
                display: "inline-block",
              }}
            />
          </Tooltip>
          {row.QuestionTextID}
        </Typography>
      ),
    },
    { id: "BookletID", label: "Booklet", sortable: true, sortKey: "BookletID" },
    {
      id: "CourseTypeName",
      label: "Course Type",
      sortable: true,
      sortKey: "QuestionTypeFor",
    },
    {
      id: "QuestionTopicName",
      label: "Topic",
      sortable: true,
      sortKey: "QuestionTypeName",
    },
    {
      id: "ExamQuestionStatus",
      label: "Status",
      render: (row) => (row.ExamQuestionStatus == 1 ? "Active" : "Removed"),
    },
  ];
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
                  </CustomSelect>
                </Box>
              </Stack>
            </Grid>
          )}

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
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "transparent" : "#738A9633"
                  }`,
                  borderRadius: "5px",
                  "&:has(input:disabled)": {
                    background: theme.palette.secondary.disableFieldColor,
                  },
                }}
              >
                <>
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
        <CustomTable
          columns={columns}
          rows={selectedQuestionData?.results || []}
          onOrderBy={handleOrderBy}
          onSelectAll={handleAllChange}
          onSelectOne={handleChange}
          allChecked={allChecked}
          checkedItems={checkedItems}
          actions={[
            {
              label: "Delete",
              onClick: (row) =>
                handleDeleteSelectedQuestion(row.ExamQuestionID),
            },
            {
              label: "Update Status",
              onClick: (row) => updateQuestionStatus(row.ExamQuestionStatus),
            },
            {
              label: "Remove & keep in report",
              onClick: (row) => removeKeepInReportQuestion(row.ExamQuestionID),
            },
          ]}
        />
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
    </PageContainer>
  );
}
