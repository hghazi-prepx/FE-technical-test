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
import toast from "../../components/Toast/index";
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonPopStyle,
  commonTableCardStyle,
  linkButton,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import {
  assignTraineeForNewExam,
  deleteStudentForNewExam,
  getAssignTraineeListForNewExam,
  getAvailableTraineeForNewExam,
} from "@/services/newExamFlow/newExamFlowAPI";
import CustomTablePagination from "@/components/CustomPagination";
import usePagination2 from "@/hooks/usePagination2";
import { PAGINATION } from "@/utils/Constants";

import { useDispatch, useSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  setSelectedOptions,
  setSelectedStudents,
  setStudentSelectedId,
} from "@/store/customizer/traineeSlice";
import CustomTable, {
  Column,
  TableAction,
} from "../../components/shared/CustomTable";

const { DEFAULT_PAGE } = PAGINATION;
type CheckedItems = {
  [key: string]: boolean;
};
export default function AssignTrainee() {
  const theme = useTheme();
  const searchRouter = useSearchParams();
  const examId: any = searchRouter.get("examid");
  const [openModal, setOpenModal] = useState(false);
  const [openModelForDelete, setOpenModelForDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>();
  const [selectedStudentData, setSelectedStudentData] = useState<any>();
  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>(
    "ExamAssingStudentCreatedOn DESC"
  );

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const handleModalClose = () => setOpenModelForDelete(false);
  const [errorModel, setErrorModel] = useState(false);
  const router = useRouter();
  const { page, rowsPerPage, handlePagination } = usePagination2();
  const dispatch = useDispatch();
  const { selectedOptions, studentSelectedId, selectedStudents } = useSelector(
    (state: RootState) => state.trainee
  );

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
          setSelectedStudentData([]);
          setAnchorEl(null);
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

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);

        setIsLoading(false);
      });
  };

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      dispatch(setSelectedStudents([]));
      dispatch(setStudentSelectedId([]));
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
    dispatch(setStudentSelectedId(studentIDsAndCampusIDs));
    dispatch(setSelectedStudents(value.map((option: any) => option.UserID)));
    dispatch(setSelectedOptions(value));
  };

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
      selectedStudentData.results.forEach((tdata: { id: any }) => {
        newCheckedState[tdata.id] = true;
        allnewCheckedState.push(tdata.id);
      });
    }
    setSelectedCheckboxes(allnewCheckedState);

    setAllChecked(!allChecked);
    setCheckedItems(newCheckedState);
  };

  const handleOrderBy = (key: any, order: any) => {
    const combineKey = key + " " + order;
    setOrderBy(combineKey);
  };

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
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSaveAsDraft = async () => {
    setIsLoading(true);
    toast({ type: "success", message: "Draft saved successfully." });
    router.push("/Exam-Management");
    setIsLoading(false);
  };
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
    getAllSelectedStudent();
  }, [page, rowsPerPage, orderBy]);

  if (isLoading) {
    return <Loading />;
  }

  const columns: Column[] = [
    {
      id: "UserRoleTextID",
      label: "Trainee ID",
      sortable: true,
      sortKey: "StudentIDText",
    },
    {
      id: "UserTitleName",
      label: "Trainee Name",
      sortable: true,
      sortKey: "StudentFirstName",
    },
    {
      id: "CampusName",
      label: "Location",
      sortable: true,
      sortKey: "ActorIDText",
    },
    {
      id: "UserEmail",
      label: "Email",
      sortable: true,
      sortKey: "StudentEmail",
    },
  ];
  const actions: TableAction[] = [
    {
      label: "Remove",
      onClick: (row) => handleDeleteSelectedStudent([row.id]),
    },
  ];
  return (
    <>
      <PageContainer title="Assign Trainees" description="Assign Trainees">
        <ExamWizardSteps step={2} examid={examId} />

        <Card sx={commonContentCardStyle}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Autocomplete
                  freeSolo
                  id="checkboxes-tags-demo"
                  loading={searchLoading}
                  multiple
                  options={studentData?.length ? studentData : []}
                  open={openAutocomplete}
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
                              dispatch(
                                setSelectedOptions(
                                  selectedOptions.filter(
                                    (id: number) => id !== option.UserID
                                  )
                                )
                              );
                            } else {
                              dispatch(
                                setSelectedStudents(
                                  selectedStudents.filter(
                                    (id: number) => id !== option.UserID
                                  )
                                )
                              );
                              dispatch(
                                setSelectedOptions(
                                  selectedOptions.filter(
                                    (id: number) => id !== option.UserID
                                  )
                                )
                              );
                              dispatch(
                                setSelectedOptions(
                                  selectedOptions.filter(
                                    (id: number) => id !== option.UserID
                                  )
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
                          enabled: false,
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
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Card sx={commonTableCardStyle}>
          <CustomTable
            columns={columns}
            rows={selectedStudentData?.results || []}
            onOrderBy={(key, order) => handleOrderBy(key, order)}
            onSelectAll={handleAllChange}
            onSelectOne={(id) => handleChange(id)}
            allChecked={allChecked}
            checkedItems={checkedItems}
            actions={actions}
          />
          <CustomTablePagination
            totalPageCount={selectedStudentData?.totalPages}
            totalRecords={selectedStudentData?.totalRecords}
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
          </Box>
        </Box>
      </PageContainer>
    </>
  );
}
