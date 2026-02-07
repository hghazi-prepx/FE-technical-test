"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Button, Autocomplete } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import { useTheme } from "@mui/material/styles";
import { CornerDownArrowIcon, PlusIcon } from "@/components/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../loading";
import toast from "../Toast/index";
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonPopStyle,
  linkButton,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import {
  assignTraineeForNewExam,
  deleteStudentForNewExam,
  getAvailableTraineeForNewExam,
} from "@/services/newExamFlow/newExamFlowAPI";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";
import { useExamStore } from "@/store/useExamStore";
import { saveExam } from "@/utils/utils";
import { useExamsStore } from "@/store/useExamsStore";
import TraineesTable from "./TraineesTable";
import { StudentData } from "@/types/types";
import { StepThreeData } from "@/types/examStoreTypes";
import { useExamWizardStore } from "@/store/useExamWizardSteps";

const { DEFAULT_PAGE } = PAGINATION;

export default function AssignTrainee() {
  const theme = useTheme();
  const searchRouter = useSearchParams();
  const { setStep } = useExamWizardStore();
  const examId: any = searchRouter.get("exam-id");
  const [openModal, setOpenModal] = useState(false);
  const [openModelForDelete, setOpenModelForDelete] = useState(false);
  const [checkorderBy, setCheckorderBy] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<StudentData[]>();
  const [studentSelectedId, setStudentSelectedId] = useState<any>([]);
  const [deleteText, setDeleteText] = useState("");
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const handleModalClose = () => setOpenModelForDelete(false);
  const [selectedAssignStudentId, setSelectedAssignStudentId] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<StudentData[]>([]);
  const router = useRouter();
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2();

  const { stepThree, stepOne, setStepThree, resetExam } = useExamStore();
  const { exams } = useExamsStore();
  const [selectedStudentData, setSelectedStudentData] =
    useState<StepThreeData>(stepThree);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (examId) {
      const exam = exams.find((e) => e.stepOne.id === examId);
      if (exam && (!stepThree || stepThree.id !== examId)) {
        setIsLoading(true);
        setStepThree(exam.stepThree);
      } else if (exam && stepThree && stepThree.id === examId) {
        setSelectedStudentData(stepThree);
      }
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (timeoutId) {
        console.log("Clearing timeout"); // Debug log
        clearTimeout(timeoutId);
      }
    };
  }, [examId, exams]);
  useEffect(() => {
    if (stepThree) {
      setSelectedStudentData(stepThree);
      setIsLoading(false);
    }
  }, [stepThree]);

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
      setStudentData([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (openModal || openModelForDelete) {
      setAnchorEl(null);
    }
  }, [openModal, openModelForDelete]);

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
            })),
          });
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

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      setSelectedStudents([]);
      setStudentSelectedId([]);
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
        value.splice(i, 1);
        i--;
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
      selectedStudentData.results.forEach((tdata: { id: any }) => {
        newCheckedState[tdata.id] = true;
        allnewCheckedState.push(tdata.id);
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
    setCheckorderBy(key + "" + order);
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
              results: prev.results.filter(
                (student: any) => !finalArray.includes(student.id)
              ),
            };
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
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAssignStudentId("");
  };

  const handleSaveAsDraft = async () => {
    try {
      // 2. Set loading state at the beginning
      setIsLoading(true);

      // 3. Update the Zustand store with the current selected student data
      // Assuming selectedStudentData is the state holding your stepThree data in this component
      setStepThree({
        results: selectedStudentData?.results,
        // Include other properties of stepThree if necessary,
        // e.g., totalPages, totalRecords if part of the structure
        // totalPages: selectedStudentData?.totalPages,
        // totalRecords: selectedStudentData?.totalRecords,
      });

      // 4. Call the updated saveExam function and await its result
      const response = await saveExam({
        status: "draft",
        examId: examId ?? undefined,
      });

      // 5. Handle the response based on success or failure
      if (response.success) {
        console.log("Draft saved successfully:", response.message);
        // 6. Perform actions on successful save
        toast({ type: "success", message: "Draft saved successfully." }); // Show success message
        resetExam(); // Reset the form store
        router.push("/Exam-Management"); // Navigate to the management page
      } else {
        console.error("Failed to save draft:", response.message);
        // 7. Handle failure (e.g., show error message to user)
        toast({
          type: "error",
          message: response.message || "Failed to save draft.",
        });
        // Note: Reset and navigation are typically skipped on error
      }
    } catch (error) {
      // 8. Handle unexpected errors (if saveExam rejects the promise or other errors occur)
      console.error("Unexpected error saving draft:", error);
      toast({
        type: "error",
        message: "An unexpected error occurred while saving the draft.",
      });
    } finally {
      // 9. Ensure loading state is turned off regardless of outcome
      setIsLoading(false);
    }
  };

  const searchItem = (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      setOpenAutocomplete(true);
    } else {
      setOpenAutocomplete(false);
    }
  };

  console.log({ selectedStudentData, stepThree, exams });

  return isLoading ? (
    <Loading />
  ) : (
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

        <TraineesTable
          allChecked={allChecked}
          checkedItems={checkedItems}
          checkorderBy={checkorderBy}
          handleAllChange={handleAllChange}
          handleChange={handleChange}
          handleClick={handleClick}
          handleClose={handleClose}
          handleDeleteSelectedStudent={handleDeleteSelectedStudent}
          handleModalClose={handleModalClose}
          handleOrderBy={handleOrderBy}
          handlePagination={handlePagination}
          open={open}
          openModelForDelete={openModelForDelete}
          page={page}
          rowsPerPage={rowsPerPage}
          selectedAssignStudentId={selectedAssignStudentId}
          selectedCheckboxes={selectedCheckboxes}
          selectedStudentData={selectedStudentData}
          setDeleteText={setDeleteText}
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
                setStep("reviewDetails");
              }}
            >
              Skip for now
            </Button>
            <Button
              sx={{
                ...primaryButon,
              }}
              onClick={() => {
                setStepThree({
                  results: selectedStudentData?.results,
                });
                setStep("reviewDetails");
              }}
            >
              Generate
            </Button>
          </Box>
        </Box>
      </PageContainer>
    </>
  );
}
