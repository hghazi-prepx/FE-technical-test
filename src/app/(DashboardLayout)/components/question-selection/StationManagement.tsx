"use client";
import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Button,
  MenuItem,
  Autocomplete,
  TableContainer,
  IconButton,
  Tooltip,
  Dialog,
  Table,
} from "@mui/material";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import { useTheme } from "@mui/material/styles";
import { CornerDownArrowIcon, PlusIcon } from "@/components/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import toast from "../Toast/index";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonPopStyle,
  commonSelectFieldStyle,
  linkButton,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import {
  createQuestionForNewExam,
  deleteQuestionForNewExam,
  getQuestionListForNewExam,
} from "@/services/newExamFlow/newExamFlowAPI";
import { booklet } from "../../acj-exam/dropDowns";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import { useExamStore } from "@/store/useExamStore";
import { saveExam } from "@/utils/utils";
import { useExamsStore } from "@/store/useExamsStore";
import QuestionsTable from "./QuestionsTable";
import { Question } from "@/types/types";
import { useHandlePageRefresh } from "@/hooks/useHandleRefreshPage";
import { useExamWizardStore } from "@/store/useExamWizardSteps";

export default function StationManagement() {
  const theme = useTheme();
  const router = useRouter();
  const { setStep } = useExamWizardStore();
  const searchRouter = useSearchParams();
  const examId: any = searchRouter.get("exam-id");
  const [loading, setLoading] = useState(false);
  // useHandlePageRefresh(examId);

  const [bookletId, setBookletId] = useState("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<Question[]>();
  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedAssignQuestionId, setSelectedAssignQuestionId] =
    useState<any>();
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [checkorderBy, setCheckorderBy] = useState<string>("");
  const [modalPreviewOpen, setmodalPreviewOpen] = useState(false);
  const [previewData, setPreViewData] = useState<any>();
  const [previewQuestionId, setPreviewQuestionId] = useState<any>();
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [selectedQuestionStatus, setSelectedQuestionStatus] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();

  const { setStepTwo, stepTwo, stepOne, resetExam } = useExamStore();
  const { exams } = useExamsStore();
  const [selectedQuestionData, setSelectedQuestionData] =
    useState<any>(stepTwo);
  const [PrepXID, setPrepXID] = useState(stepOne.id);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (examId) {
      const exam = exams.find((e) => e.stepOne?.id === examId);
      console.log("Found exam in store:", exam);

      if (exam && exam.stepOne?.id === examId) {
        setIsLoading(true);
        if (exam.stepOne?.id) {
          setPrepXID(exam.stepOne.id);
        }

        setSelectedQuestionData(exam.stepTwo);
        setStepTwo(exam.stepTwo);

        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else if (exam && stepTwo && stepTwo.id === examId) {
        if (exam.stepOne?.id) {
          setPrepXID(exam.stepOne.id);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };
  }, [examId, exams, stepOne, setIsLoading]);

  const { DEFAULT_PAGE } = PAGINATION;
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
        ExamBookletsQuestions: stepOne?.ExamNumberofQuestions,
        BookletID: bookletId,
        ExamCourseType: stepOne?.ExamCourseType,
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
    setCheckedItems({});
  };

  const handleSaveAsDraft = async () => {
    try {
      setIsLoading(true);

      setStepTwo({
        results: selectedQuestionData?.results,
      });

      const response = await saveExam({
        status: "draft",
        examId: examId ?? undefined,
      });

      if (response.success) {
        console.log("Draft saved successfully:", response.message);
        toast({ type: "success", message: "Draft saved successfully." });
        resetExam();
        router.push("/Exam-Management");
      } else {
        console.error("Failed to save draft:", response.message);
        toast({
          type: "error",
          message: response.message || "Failed to save draft.",
        });
      }
    } catch (error) {
      console.error("Unexpected error saving draft:", error);
      toast({
        type: "error",
        message: "An unexpected error occurred while saving the draft.",
      });
    } finally {
      setIsLoading(false);
    }
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
          getAllSelectedQuestion();
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
  const handleOrderBy = (key: string, order: string) => {
    setCheckorderBy(key + "" + order);
  };
  /**
   * @ Function Name      : handleDeleteStation
   * @ Function Purpose   : Calling API for deleting station
   */
  const handleDeleteSelectedQuestion = async (id?: any) => {
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
              results: prev.results.filter(
                (question: any) => !finalArray.includes(question.ExamQuestionID)
              ),
            };
          });
          setSelectedQuestions([]);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setIsLoading(false);
        handleClose();
      });
    // }
  };
  const handlePreviewModalOpen = async (questionId: any) => {
    console.log(questionId);
    const question = selectedQuestionData?.results.find(
      (ques) => ques.QuestionID === questionId
    );
    console.log(question);
    if (question) {
      setPreViewData(question);
      setmodalPreviewOpen(true);
    }
  };
  const handlePreviewModalClose = () => {
    setmodalPreviewOpen(false);
  };

  console.log({ selectedQuestionData, stepTwo, exams });

  return isLoading ? (
    <Loading />
  ) : (
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

          {stepOne && stepOne.ExamTypeID === "mock" && (
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
                    {stepOne?.ExamNumberofBookletsID &&
                      booklet
                        .slice(0, stepOne?.ExamNumberofBookletsID)
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
                        studentHandleChange(value);
                        setSelectedOptions(value); // Update selected options
                      }}
                      renderInput={(params) => (
                        <Tooltip
                          title={
                            selectedQuestionData?.results?.filter(
                              (question: any) =>
                                question.BookletID === `Booklet ${bookletId}`
                            ).length >= stepOne?.ExamNumberofQuestions
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

      <QuestionsTable
        allChecked={allChecked}
        checkedItems={checkedItems}
        checkorderBy={checkorderBy}
        handleAllChange={handleAllChange}
        handleChange={handleChange}
        handleClick={handleClick}
        handleClose={handleClose}
        handleDeleteSelectedQuestion={handleDeleteSelectedQuestion}
        handleOrderBy={handleOrderBy}
        handlePagination={handlePagination}
        handlePreviewModalOpen={handlePreviewModalOpen}
        open={open}
        page={page}
        previewQuestionId={previewQuestionId}
        rowsPerPage={rowsPerPage}
        selectedAssignQuestionId={selectedAssignQuestionId}
        selectedCheckboxes={selectedCheckboxes}
        setPreViewData={setPreViewData}
        selectedQuestionData={selectedQuestionData}
        theme={theme}
      />
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
            onClick={async () => {
              await handleSaveAsDraft();
            }}
          >
            Save as Draft
          </Button>

          <Button
            sx={{
              ...linkButton,
            }}
            onClick={() => {
              setStep("assignTrainee");
            }}
          >
            Skip for now
          </Button>
          <Button
            sx={{
              ...primaryButon,
            }}
            onClick={() => {
              setStepTwo({
                results: selectedQuestionData?.results,
              });
              setStep("assignTrainee");
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
          <IconX stroke={2} />
        </IconButton>
        <Stack m={"20px"}>
          <Grid item flexDirection={"column"} container spacing={"30px"}>
            <Typography m={"32px"} fontSize={"32px"}>
              {previewData?.QuestionTextID}
            </Typography>
            <Typography m={"32px"} fontWeight={"500"} fontSize={"18px"}>
              Data of the question should be displayed here
            </Typography>
          </Grid>
        </Stack>
      </Dialog>
    </PageContainer>
  );
}
