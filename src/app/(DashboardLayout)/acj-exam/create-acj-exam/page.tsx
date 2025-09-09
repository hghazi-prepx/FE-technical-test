"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Button,
  Card,
  Box,
  Stack,
  Grid,
  Select,
  Popover,
  CardContent,
  MenuItem,
  FormHelperText,
  Typography,
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Radio,
  RadioGroup,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useTheme } from "@mui/material/styles";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  IconDots,
  IconDotsVertical,
  IconTrashFilled,
} from "@tabler/icons-react";
import { getExamTypeList } from "../../../../services/examType/examTypeAPI";
import { useFormik } from "formik";
import * as yup from "yup";
import { Autocomplete } from "@mui/material";
import CustomCheckbox from "../../components/forms/theme-elements/CustomCheckbox";
import moment from "moment-timezone";
import toast from "../../components/Toast";
import Loading from "../../loading";
import { useRouter, useSearchParams } from "next/navigation";
import CommonPopup from "../../../../utils/commonpopup/index";
import React from "react";
import { countries } from "../countryName";
import {
  CaretupIcon,
  CornerDownArrowIcon,
  PlusIcon,
  StepFiveIcon,
  StepFourIcon,
  StepOneIcon,
  StepThreeIcon,
  StepTwoIcon,
  ThrashIcon,
  TrashIcon,
} from "@/components/Icons";
import {
  calenderTextField,
  checkboxLabelStyle,
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonDatepickerStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonPopStyle,
  commonSelectFieldStyle,
  disableInputStyle,
  fieldLabel,
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import {
  timezones,
  booklet,
  courseCycle,
  attemptAllow,
  gradeCalculation,
  additionallyDropDown,
  pagingData,
} from "../dropDowns";
import { getCampusList } from "@/services/station/stationAPI";
import { createNewExam } from "../../../../services/newExamFlow/newExamFlowAPI";
import { bgcolor, width } from "@mui/system";
import {
  exampTypeSlugAllowed,
  mockExamSlug,
  quizzExamSlug,
  selfAssessmentExamSlug,
} from "../constant";
import {
  getCourseLmsList,
  getImportInLmscourse,
} from "@/services/adminCourseDashboard/adminCourseDashboard";
import { PAGINATION } from "@/utils/Constants";

const { DEFAULT_PAGE } = PAGINATION;

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/Exam-Management",
    title: "Exam Management",
  },
  {
    title: "Create New Session",
  },
];

const MockexamLocationTypeData = [
  { selectid: 2, title: "On Site" },
  { selectid: 1, title: "Online" },
];

export default function CreateIMockExam() {
  const searchRouter = useSearchParams();
  const examCourse: any = searchRouter.get("examcourse");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState("10");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedShift, setSelectedShift] = useState("AM");
  const [dateValue2, setDateValue2] = useState<Dayjs | null>(null);
  const [start, setStart] = useState<any | null>("10:00 AM");

  const [selectedHourDue, setSelectedHourDue] = useState("10");
  const [selectedMinuteDue, setSelectedMinuteDue] = useState("00");
  const [selectedShiftDue, setSelectedShiftDue] = useState("AM");
  const [dateValue2Due, setDateValue2Due] = useState<Dayjs | null>(null);
  const [startDue, setStartDue] = useState<any | null>("10:00 AM");
  const [numberOfQuestionError, setNumberOfQuestionError] = useState<any>(false);
  const [examType, setExamType] = useState<any>();
  const [examTypeData, setExamTypeData] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [isShuffleQuiz, setIsShuffleQuiz] = useState<any>(false);
  const [numberOfAttempt, setNumberOfAttempt] = useState<any>();
  const [numberOfPaging, setNumberOfPaging] = useState<any>();
  const [isTimeLimit, setIsTimeLimit] = useState<any>(false);
  const [selectedExamCourse, setSelectedExamCourse] = useState<any>(null);
  const [availabilityDateValue, setAvailabilityDateValue] =
    React.useState<Dayjs | null>(null);
  const [dueDateValue, setDueDateValue] = React.useState<Dayjs | null>(null);
  const [timeDropDownData, setTimeDropDownData] = useState<any>([]);
  const [selectedCheckBoxIndex, setSelectedCheckBoxIndex] = useState<any>([]);
  const [globalDateTime, setGlobalDateTime] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<any>(false);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>();
  const open = Boolean(anchorEl);
  const id = open ? "time-popover" : undefined;
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const availabilityFieldRef = useRef<HTMLDivElement | null>(null);
  const dueFieldRef = useRef<HTMLDivElement | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [anchorElForStartTime, setAnchorElForStartTime] =
    useState<HTMLElement | null>(null);
  const [anchorElForDueTime, setAnchorElForDueTime] = useState<any>(false);

  const [startHour, setStartHour] = useState<any>("");
  const [startMinute, setStartMinute] = useState<any>("");
  const [startampm, setStartampm] = useState<any>("");
  const [dueHour, setDueHour] = useState<any>("");
  const [dueMinute, setDueMinute] = useState<any>("");
  const [dueampm, setDueampm] = useState<any>("");
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<any>(null);

  const [countryName, setCountryName] = useState("");
  const [timeZone, setTimeZone] = useState("America/Toronto");
  const [isStartTimePopoverOpen, setIsStartTimePopoverOpen] = useState(false);
  const [isDueTimePopoverOpen, setIsDueTimePopoverOpen] = useState(false);
  const [mockOnlineAutoPublish, setMockOnlineAutoPublish] = useState<any>(false);
  const [isEvolution, setIsEvolution] = useState<any>();
  type CheckedItems = {
    [key: string]: boolean;
  };
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const minutes = Array.from({ length: 60 / 5 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const ampm = ["AM", "PM"];

  const availabilityTimeChange = (type: string, value: string | number) => {
    switch (type) {
      case "hour":
        setStartHour(value);
        break;
      case "minute":
        setStartMinute(value);
        break;
      case "ampm":
        setStartampm(value);
        setIsStartTimePopoverOpen(false);
        break;
      default:
        break;
    }
  };

  const dueTimeChange = (type: string, value: string | number) => {
    switch (type) {
      case "hour":
        setDueHour(value);
        break;
      case "minute":
        setDueMinute(value);
        break;
      case "ampm":
        setDueampm(value);
        setIsDueTimePopoverOpen(false);
        break;
      default:
        break;
    }
  };

  const handleTimeChange = (
    key: string,
    value: string | number,
    rowId: string
  ) => {
    setRows((prevRows: any) => {
      const updatedRows = prevRows.map((row: any) => {
        if (row.id === rowId) {
          const newTime = { ...row.selectedTime, [key]: value };
          if (newTime.hour && newTime.minute && newTime.ampm) {
            const selectedTimeStr = `${newTime.hour}:${newTime.minute} ${newTime.ampm}`;
            const newDateTime = addSelectedTimeToTimestamp(
              selectedTimeStr,
              globalDateTime
            );
            return {
              ...row,
              selectedTime: newTime,
              ExamCampusDateTime: newDateTime,
            };
          }
          return { ...row, selectedTime: newTime };
        }
        return row;
      });
      return updatedRows;
    });

    if (key === "ampm") {
      handleClose(rowId);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: event.currentTarget }));
    setOpenPopoverId(rowId);
  };

  const availabilityClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForStartTime(event.currentTarget);
    setIsStartTimePopoverOpen(true);
    // setOpenPopover(true);
  };

  const handleClose = (rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: null }));
    setOpenPopoverId(null);
  };

  const availabilityClose = () => {
    // setAnchorEl((prev) => ({ ...prev, [rowId]: null }));
    // setOpenPopover(null);
    setIsStartTimePopoverOpen(false);
    setAnchorElForStartTime(null);
  };

  const dueClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForDueTime(event.currentTarget);
    setIsDueTimePopoverOpen(true);
  };

  const dueClose = () => {
    setIsDueTimePopoverOpen(false);
    setAnchorElForDueTime(null);
  };

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [countryData, setCountryData] = useState<any>();
  const [locationData, setLocationData] = useState<any>();
  const [examinationCourse, setExaminationCourse] = useState<any>([]);
  const [originalCountryData, setOriginalCountryData] = useState<any>([]);
  const [bookletValue, setBookletValue] = useState<any>("");
  const [isUnlimited, setIsUnlimited] = useState<any>(false);
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([]);
  const [selectedGrade, setSelectedGrade] = useState(gradeCalculation[0].id);
  const [filteredTimeZones, setFilteredTimeZone] = useState<any>([]);
  // const [selectedTimeZone, setSelectedTimeZone] = useState<any>();
  const [rows, setRows] = useState<any>([
    {
      id: uuidv4(),
      ExamCampusDateTime: null,
      CountryID: 0,
      CampusID: 0,
      CountryWiseTimeZoneID: 0,
      timezones: [],
      selectedTime: { hour: "", minute: "", ampm: "" },
    }, //TimeZoneID: 0,
  ]);
  const [locationDate, setLocationDate] = useState<number | null>(null);
  const handleModalClose = () => setOpenModal(false);
  const router = useRouter();
  const theme = useTheme();

  const getValidationSchema = (
    examTypeSlug: string | undefined,
    isUnlimited: boolean
  ) => {
    return yup.object().shape({
      ExamName: yup.string().required("Exam name is required"),
      ExamTypeID: yup.string().required("Exam type is required"),
      // CountryID:
      //   examTypeSlug != mockExamSlug
      //     ? yup.number().required("Coutry is required")
      //     : yup.number().notRequired(),
      // TimeZoneID:
      //   examTypeSlug != mockExamSlug
      //     ? yup.string().required("Timezone is required")
      //     : yup.string().notRequired(),
      PrepXExamAFKACJOSCECourse: yup
        .number()
        .required("Exam course is required"),
      ExamNumberofBookletsID:
        examTypeSlug == mockExamSlug
          ? yup.number().required("Number of booklets is required")
          : yup.number().notRequired(),
      ExamTimeLimit: yup.string().required("Exam limit is required"),
      ExamQuizStart: yup.string().required("Exam start is required"),
      ExamTimeLimitExpires: yup.string().required("Exam expire is required"),
      // ExamNumberofAttempts: isUnlimited
      //   ? yup.string().notRequired()
      //   : ExamQuizStart == mockExamSlug
      //     ? yup
      //       .string()
      //       .test(
      //         "is-one-attempt",
      //         "Only 1 attempt is allowed for mock exams",
      //         (value) => value === "1"
      //       )
      //     : yup
      //       .string()
      //       .test(
      //         "is-positive-integer",
      //         "Number of attempts must be a positive integer",
      //         (value) => {
      //           const numValue = Number(value);
      //           return numValue > 0 && Number.isInteger(numValue);
      //         }
      //       ),
      ExamOverallGradeCalculationID: yup
        .string()
        .required("Overall grade is required"),

      ExamBookletDuration:
        examTypeSlug == "mock"
          ? yup
            .number()
            .required("Booklet duration is required")
            .test(
              "is-greater-than-zero",
              "Booklet duration must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) {
                  return true;
                }
                const numValue = Number(value);
                return numValue > 0;
              }
            )
          : yup.number(),

      ExamBreakDuration:
        examTypeSlug == "mock"
          ? yup.number().required("Break duration is required")
          : // .test(
          //   "is-greater-than-zero",
          //   "Number of questions must be greater than 0",
          //   (value): boolean => {
          //     if (value === undefined || value === null) {
          //       return true; // Required validation will handle empty cases
          //     }
          //     const numValue = Number(value);
          //     return numValue > 0;
          //   }
          // )
          yup.number(),

      ExamNumberofQuestions:
        examTypeSlug == "mock"
          ? yup
            .number()
            .required("Number of questions is required")
            .test(
              "is-greater-than-zero",
              "Number of questions must be greater than 0",
              (value): boolean => {
                if (value === undefined || value === null) {
                  return true;
                }
                const numValue = Number(value);
                return numValue > 0;
              }
            )
          : yup.number(),

      ExamAvailabilityDate: yup
        .string()
        .required("Exam availability is required"),

      // ExamDueDate:
      //   examTypeSlug != "mock" || examTypeSlug == undefined
      //     ? yup.string().required("Exam due is required")
      //     : yup.string(),
    });
  };

  const validateFields = (values: any, rows: any, examType: any) => {
    if (examType?.ExamTypeSlug === mockExamSlug) {
      for (const item of rows) {
        for (const key in item) {
          if (
            item[key] == null ||
            item[key] === "" ||
            item[key] == undefined ||
            item[key] == 0
          ) {
            toast({
              type: "error",
              message: `Please fill out all of the mandatory fields.`,
            });
            return false; // Exit validation, return false to stop the process
          }
        }
        if (
          !item.selectedTime.hour ||
          !item.selectedTime.minute ||
          !item.selectedTime.ampm
        ) {
          toast({
            type: "error",
            message: `Please complete the time selection for all rows.`,
          });
          return false;
        }
      }
    }

    values.ExamNumberofQuestions = values.ExamNumberofQuestions || 1000;

    values.PrepXExamAFKACJOSCECampus = rows.map((item: any) => {
      const { selectedTime, locations, timezones, id, ...rest } = item;
      return rest;
    });

    values.ExamCourseType = examCourse;

    if (examType?.ExamTypeSlug === mockExamSlug) {
      values.ExamAvailabilityDate = locationDate;
      values.ExamDueDate = locationDate;
    } else if (values.ExamAvailabilityDate === "") {
      values.ExamAvailabilityDate = availabilityDateValue?.valueOf();
      values.ExamDueDate = dueDateValue?.valueOf();
    }

    if (examType?.ExamTypeSlug !== mockExamSlug) {
      if (startHour && startMinute && startampm && availabilityDateValue) {
        const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true);
        let hour = startHour;
        if (startampm === "PM" && hour < 12) {
          hour += 12;
        } else if (startampm === "AM" && hour === 12) {
          hour = 0;
        }
        const localDate = date.tz(timeZone).startOf("day");
        localDate.hour(hour);
        localDate.minute(startMinute);
        localDate.second(0);
        const updatedTimestamp = localDate.valueOf();
        values.ExamAvailabilityDate = updatedTimestamp;
      }

      if (dueHour && dueMinute && dueampm && dueDateValue) {
        const date = moment(dueDateValue.valueOf()).tz(timeZone, true);
        let hour = dueHour;
        if (dueampm === "PM" && hour < 12) {
          hour += 12;
        } else if (dueampm === "AM" && hour === 12) {
          hour = 0;
        }
        const localDate = date.tz(timeZone).startOf("day");
        localDate.hour(hour);
        localDate.minute(dueMinute);
        localDate.second(0);

        const updatedTimestamp = localDate.valueOf();
        values.ExamDueDate = updatedTimestamp;
      }
      // values.CountryID = selectedCountry1;
      //values.TimeZoneID = selectedTimeZone.CountryWiseTimeZoneID;

      values.CountryID = 32;
      values.TimeZoneID = 248;
    }
    return true;
  };

  const formik = useFormik({
    initialValues: {
      ExamName: "",
      PrepXExamAFKACJOSCECourse: "",
      ExamTypeID: "",
      Status: 0,
      ShortDescription: "",
      LongDescription: "",
      ExamBookletDuration: 1,
      ExamNumberofBookletsID: "",
      ExamBreakDuration: 1,
      ExamNumberofQuestions: 1,
      ExamSetTimeLimit: 0,
      ExamTimeLimit: 1,
      ExamQuizStart: 1,
      ExamTimeLimitExpires: 1,
      ExamAvailabilityDate: "",
      ExamDueDate: null,
      ExamShuffleQuiz: 0,
      ExamPaging: 0,
      ExamNumberofAttempts: "",
      ExamOverallGradeCalculationID: 1,
      ExamEvaluationFeedback: 0,
      ExamPublishedDisplayToLearners: 0,
      ExamAdditionallyID: 0,
      ExamInstructions: "",
      PrepXExamAFKACJOSCECampus: [],
      ExamCourseType: "",
      CSTimeOfExam: "",
      CSTimeOfExamDue: "",
      // CountryID: "",
      // TimeZoneID: "",
    },
    // validationSchema,
    validationSchema: getValidationSchema(examType?.ExamTypeSlug, isUnlimited),
    onSubmit: async (values: any) => {
      if (numberOfQuestionError) {
        return;
      }
      setIsLoading(true);
      if (!isTimeLimit) {
        values.ExamTimeLimit = 0;
      }

      // const isValid = validateFields(values, rows, examType);
      // if (!isValid) {
      //   setIsLoading(false);
      //   return; // Exit if validation fails
      // }
      values.CountryID = 32;
      values.TimeZoneID = 248;
      values.ExamCourseType = examCourse;
      values.ExamNumberofQuestions = values.ExamNumberofQuestions || 1000;

      // if (startHour && startMinute && startampm && availabilityDateValue) {
      //   const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true);
      //   let hour = startHour;
      //   if (startampm === "PM" && hour < 12) {
      //     hour += 12;
      //   } else if (startampm === "AM" && hour === 12) {
      //     hour = 0;
      //   }

      //   if (!availabilityDateValue || !moment.tz.zone(timeZone)) {
      //     console.log("Invalid date or time zone");
      //   } else {
      //     const date = moment(availabilityDateValue.valueOf()).tz(
      //       timeZone,
      //       true
      //     );
      //     console.log("format time zone");
      //     console.log(date.format()); // Should output a valid date string
      //   }

      //   console.log("============date", date);

      //   const localDate = date.tz(timeZone).startOf("day");
      //   localDate.hour(hour);
      //   localDate.minute(startMinute);
      //   localDate.second(0);
      //   const updatedTimestamp = localDate.valueOf();
      //   console.log("updatedTimestamp", updatedTimestamp);
      //   values.ExamAvailabilityDate = updatedTimestamp;
      // }

      //if (selectedHour && selectedMinute && selectedShift && dateValue2) {
      if (selectedHour && selectedMinute && selectedShift && availabilityDateValue) {
        // Set the timezone correctly and clone the dateValue2 to avoid mutating it
        //const date = moment(dateValue2.valueOf()).tz(timeZone, true);
        const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true);
        // Adjust hour based on the AM/PM shift
        let hour = +selectedHour;
        if (selectedShift === "PM" && hour < 12) {
          hour += 12; // Convert PM hours to 24-hour format
        } else if (selectedShift === "AM" && hour === 12) {
          hour = 0; // Handle midnight as 0 hour in 24-hour format
        }

        // Set the time correctly based on the adjusted hour and minute
        const localDate = date.clone().tz(timeZone, true); // Clone the date object with timezone

        localDate.set({
          hour: hour,
          minute: +selectedMinute,
          second: 0,
        });
        const updatedTimestamp = localDate.valueOf();
        values.ExamAvailabilityDate = updatedTimestamp;
      }

      try {
        if (values.ExamQuizStart == 2) {
          //delete values.CountryID;
          //  delete values.TimeZoneID;

          const MomentExamAvailabilityDate = moment(
            values.ExamAvailabilityDate
          );
          let Edd = MomentExamAvailabilityDate.add(
            values.ExamTimeLimit,
            "minutes"
          );
          values.ExamNumberofAttempts = 1;

          values.ExamDueDate = Edd.valueOf();
        } else {
          // if (dueHour && dueMinute && dueampm && dueDateValue) {
          //   const date = moment(dueDateValue.valueOf()).tz(timeZone, true);
          //   let hour = dueHour;
          //   if (dueampm === "PM" && hour < 12) {
          //     hour += 12;
          //   } else if (dueampm === "AM" && hour === 12) {
          //     hour = 0;
          //   }
          //   const localDate = date.tz(timeZone).startOf("day");
          //   localDate.hour(hour);
          //   localDate.minute(dueMinute);
          //   localDate.second(0);

          //   const updatedTimestamp = localDate.valueOf();
          //   values.ExamDueDate = updatedTimestamp;
          // }

          if (selectedHourDue && selectedMinuteDue && selectedShiftDue && dueDateValue) {
            // Set the timezone correctly and clone the dateValue2 to avoid mutating it
            const date = moment(dueDateValue.valueOf()).tz(timeZone, true);
            // Adjust hour based on the AM/PM shift
            let hour = +selectedHourDue;
            if (selectedShiftDue === "PM" && hour < 12) {
              hour += 12; // Convert PM hours to 24-hour format
            } else if (selectedShiftDue === "AM" && hour === 12) {
              hour = 0; // Handle midnight as 0 hour in 24-hour format
            }

            // Set the time correctly based on the adjusted hour and minute
            const localDate = date.clone().tz(timeZone, true); // Clone the date object with timezone

            localDate.set({
              hour: hour,
              minute: +selectedMinuteDue,
              second: 0,
            });
            const updatedTimestamp = localDate.valueOf();
            values.ExamDueDate = updatedTimestamp;
          }
        }

        delete values.CSTimeOfExam;
        delete values.CSTimeOfExamDue;

        if (examType?.ExamTypeSlug === mockExamSlug) {
          values.ExamNumberofAttempts = 1;
        }

        // Ensure DueDate is a valid timestamp or null
        if (typeof values.ExamDueDate !== 'number') {
          values.ExamDueDate = null;
        }

        const result = await createNewExam(values);
        console.log("createNewExam result: ", result);
        if (result?.success) {
          debugger;
          toast({
            type: "success",
            message: "Exam has been created successfully.",
          });
          router.push(
            `/acj-exam/question-selection?examid=${result?.data?.ExamID}`
          );
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        toast({
          type: "error",
          message: "Sorry, something went wrong. Please try again.",
        });
        setIsLoading(false);
        console.log("error: ", error);
      }
    },
  });

  //Calling to get exam type list API
  const getAllExamTypeList = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE,
    };
    await getExamTypeList(bodyData)
      .then((result) => {
        if (result?.success) {
          const filteredData = result.data?.results.filter((examType: any) =>
            exampTypeSlugAllowed.includes(examType.ExamTypeSlug)
          );

          setExamTypeData(filteredData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        // setIsLoading(false);
      });
  };

  const populateOptions = (start: any, end: any) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <MenuItem key={i} value={i < 10 ? "0" + i : i}>
          {i < 10 ? "0" + i : i}
        </MenuItem>
      );
    }
    return options;
  };

  const handleMinuteChange = (event: any) => {
    setSelectedMinute(event.target.value);
    setStart(selectedHour + ":" + event.target.value + " " + selectedShift);
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + event.target.value + " " + selectedShift
    );
  };

  const handleShiftChange = (event: any) => {
    setSelectedShift(event.target.value);
    setStart(selectedHour + ":" + selectedMinute + " " + event.target.value);
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + selectedMinute + " " + event.target.value
    );
  };

  const handleHourChange = (event: any) => {
    setSelectedHour(event.target.value);
    setStart(event.target.value + ":" + selectedMinute + " " + selectedShift);
    formik.setFieldValue(
      "CSTimeOfExam",
      event.target.value + ":" + selectedMinute + " " + selectedShift
    );
  };

  const handleMinuteChangeDue = (event: any) => {
    setSelectedMinuteDue(event.target.value);
    setStartDue(selectedHourDue + ":" + event.target.value + " " + selectedShiftDue);
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + event.target.value + " " + selectedShiftDue
    );
  };

  const handleShiftChangeDue = (event: any) => {
    setSelectedShiftDue(event.target.value);
    setStartDue(selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value);
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value
    );
  };

  const handleHourChangeDue = (event: any) => {
    setSelectedHourDue(event.target.value);
    setStartDue(event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue);
    formik.setFieldValue(
      "CSTimeOfExamDue",
      event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue
    );
  };

  const handleSetUnlimited = (event: any) => {
    setIsUnlimited(event.target.checked);
    formik.setFieldValue("ExamNumberofAttempts", "");
    if (event.target.checked == true) {
      formik.setErrors({
        ...formik.errors,
        ExamNumberofAttempts: "", // Clear the error for this field
      });
    }
  };

  /**
   * @ Function Name      : getAllLocation getCourseCycleList
   * @ Function Purpose   : getting locations details
   */
  const getAllLocation = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE,
    };
    await getCampusList(bodyData)
      .then((result) => {
        if (result?.success) {
          setLocationData(result?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  /**
   * @ Function Name      : getAllExaminationCycle
   * @ Function Purpose   : getting examination cycle details
   */
  const getAllExaminationCourse = async () => {
    setIsLoading(true);
    const bodyData = {
      limit: 10000000,
      page: DEFAULT_PAGE,
      // searchedKey: ["CourseTypeSlug"],
      // search: examCourse,
    };
    // await getCourseOfferingList(bodyData)
    await getCourseLmsList(bodyData)
      .then((result) => {
        if (result?.success) {
          setExaminationCourse(result?.data?.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(false);
      });
  };

  const addRow = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        id: uuidv4(),
        ExamCampusDateTime: "",
        // TimeZoneID: 0,
        CountryID: 0,
        CampusID: 0,
        CountryWiseTimeZoneID: 0,
        timezones: [],
        selectedTime: { hour: "", minute: "", ampm: "" },
      },
    ]);
  };

  const handleDynamicTableInputChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setRows(
      rows?.map((row: any, i: number) =>
        i == index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleDateChangeForLocation = (date: any) => {
    const adjustedDate = date
      ? date.hour(12).minute(0).second(0).millisecond(0)
      : null;
    setLocationDate(adjustedDate ? adjustedDate.valueOf() : null);
    setGlobalDateTime(adjustedDate ? adjustedDate.valueOf() : null);

    setRows(
      rows.map((row: any, i: number) => {
        const newDateTime = addSelectedTimeToTimestamp(
          `${row.selectedTime.hour}:${row.selectedTime.minute} ${row.selectedTime.ampm}`,
          adjustedDate ? adjustedDate.valueOf() : null
        );
        return { ...row, ExamCampusDateTime: newDateTime };
      })
    );
  };

  const deleteRow = (indexes: any) => {
    if (rows.length == 1 && indexes.length > 0) {
      toast({
        type: "error",
        message: `At least one exam location is required to create this exam.`,
      });
      return;
    }
    setRows((prevRows: any) =>
      prevRows.filter((row: any, i: number) => !indexes.includes(i))
    );
    setSelectedCheckBoxIndex([]);
    setCheckedItems({});
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 1; hour <= 24; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const formattedTime = hour === 24 ? "12:00 AM" : `${hour12}:00 ${period}`;
      timeOptions.push(formattedTime);
    }
    setTimeDropDownData(timeOptions);
  };

  const addSelectedTimeToTimestamp = (
    selectedTime: any,
    baseDate: number | null
  ) => {
    // Parse the selected time
    const [time, period] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    let convertedHours = hours;
    // Convert to 24-hour format
    if (period === "PM" && convertedHours !== 12) {
      convertedHours += 12;
    }
    if (period === "AM" && convertedHours === 12) {
      convertedHours = 0;
    }

    // Create a moment object from the existing timestamp in UTC mode
    let date = moment.utc(baseDate || new Date());

    // Set the hours and minutes based on selected time
    date.hour(convertedHours).minute(minutes).second(0).millisecond(0);
    return date.valueOf();
  };

  const handleCheckBoxChange = (index: any) => {
    // Check if the checkbox value is already in the array
    const isIndex = selectedCheckBoxIndex?.indexOf(index);
    setCheckedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index as keyof typeof prevState],
    }));

    if (isIndex == -1) {
      // If not, add it to the array
      setSelectedCheckBoxIndex([...selectedCheckBoxIndex, index]);
    } else {
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckBoxIndex];
      updatedCheckboxes.splice(isIndex, 1);
      setSelectedCheckBoxIndex(updatedCheckboxes);
    }
  };

  const countryHandleChangeManage = (event: any) => {
    const selectedCountryID = event.target.value;
    formik.setFieldValue("CountryID", selectedCountryID);
    const selectedCountry = originalCountryData.find(
      (country: any) => country.CountryID === selectedCountryID
    );
    if (selectedCountry) {
      const filteredTimezones = originalCountryData
        .filter((country: any) => country.CountryID === selectedCountryID)
        .map((country: any) => ({
          CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
          Timezone: country.Timezone,
          GoogleTimezone: country.GoogleTimezone,
        }));
      setFilteredTimeZone(filteredTimezones);
      setSelectedCountry1(event.target.value);
      setCountryName(selectedCountry?.CountryName);
      // setSelectedCountry1(selectedCountry);
      // setSelectedRowId(event.target.id);
    }
  };

  const TimeZoneHandleSelected = (event: any) => {
    setSelectedTimeZone(event.target.value);
    setTimeZone(event.target.value.Timezone);
    formik.setFieldValue(
      "TimeZoneID",
      event.target.value.CountryWiseTimeZoneID
    );
    // setSelectedRowId(event.target.id);
  };
  // Handle change for exam type
  const handleChangeDropDown = (event: any) => {
    setExamType(event);
    setMockOnlineAutoPublish(false);
    if (event?.ExamTypeSlug === mockExamSlug) {
      setIsTimeLimit(true);
      setIsUnlimited(false);
      formik.setFieldValue("ExamSetTimeLimit", 1);
      formik.setFieldValue("ExamNumberofBookletsID", "");
      formik.setFieldValue("ExamQuizStart", 2);
      formik.setFieldValue("ExamTimeLimitExpires", 1);
      formik.setFieldValue("ExamBreakDuration", 1);
      setNumberOfPaging(1);
      formik.setFieldValue("ExamPaging", 1);
      setNumberOfAttempt(1);
      formik.setFieldValue("ExamAdditionallyID", 1);
      formik.setFieldValue("ExamNumberofAttempts", 1);
      formik.setFieldValue("ExamOverallGradeCalculationID", 4);
      formik.setFieldValue("ExamTimeLimit", 0);
      formik.setFieldValue("ExamBookletDuration", 1);
      formik.setFieldValue("ExamNumberofQuestions", 1);
      formik.setFieldValue("ExamEvaluationFeedback", 0);
      setIsEvolution(0);
    }
    if (event?.ExamTypeSlug === selfAssessmentExamSlug) {
      setIsTimeLimit(false);
      setIsUnlimited(false);
      formik.setFieldValue("ExamSetTimeLimit", 0);
      formik.setFieldValue("ExamBookletDuration", 0);
      formik.setFieldValue("ExamNumberofBookletsID", 1);
      formik.setFieldValue("ExamBreakDuration", 0);
      formik.setFieldValue("ExamTimeLimit", 0);
      formik.setFieldValue("ExamQuizStart", 0);
      formik.setFieldValue("ExamTimeLimitExpires", 0);
      formik.setFieldValue("ExamNumberofAttempts", "");
      formik.setFieldValue("ExamAdditionallyID", 1);
      formik.setFieldValue("ExamOverallGradeCalculationID", 1);
      setNumberOfPaging(1);
      formik.setFieldValue("ExamPaging", 1);
      setNumberOfAttempt(0);
      formik.setFieldValue("ExamNumberofQuestions", 0);
      formik.setFieldValue("ExamEvaluationFeedback", 0);
      setIsEvolution(0);
    }
    if (event?.ExamTypeSlug == quizzExamSlug) {
      setIsTimeLimit(false);
      setIsUnlimited(false);
      // formik.setFieldValue("ExamSetTimeLimit", 1);
      formik.setFieldValue("ExamNumberofAttempts", "");
      formik.setFieldValue("ExamQuizStart", 1);
      formik.setFieldValue("ExamTimeLimit", 1);
      formik.setFieldValue("ExamNumberofBookletsID", 1);
      formik.setFieldValue("ExamPaging", 1);
      formik.setFieldValue("ExamTimeLimitExpires", 0);
      formik.setFieldValue("ExamAdditionallyID", 1);
      formik.setFieldValue("ExamOverallGradeCalculationID", 1);
      formik.setFieldValue("ExamBookletDuration", 0);
      formik.setFieldValue("ExamNumberofQuestions", 0);
      formik.setFieldValue("ExamEvaluationFeedback", 0);
      setIsEvolution(0);
    }

    formik.setFieldValue("ExamTypeID", event?.ExamTypeID);
  };

  const handleChangeDropDownLocationTypeData = (event: any, prop: any) => {
    if (event?.target?.value == 1) {
      // setIsTimeLimit(true);
      // setIsUnlimited(false);
      formik.setFieldValue("ExamSetTimeLimit", 1);
      formik.setFieldValue("ExamNumberofAttempts", "");
      formik.setFieldValue("ExamQuizStart", 1);
      // formik.setFieldValue("ExamTimeLimit", 1);
      // formik.setFieldValue("ExamNumberofBookletsID", 1);
      formik.setFieldValue("ExamPaging", 1);
      // formik.setFieldValue("ExamTimeLimitExpires", 0);
      formik.setFieldValue("ExamAdditionallyID", 1);
      formik.setFieldValue("ExamOverallGradeCalculationID", 1);
      // formik.setFieldValue("ExamBookletDuration", 0);
      // formik.setFieldValue("ExamNumberofQuestions", 0);
      formik.setFieldValue("ExamEvaluationFeedback", 0);
      setMockOnlineAutoPublish(true);
      setIsEvolution(0);
    } else if (event?.target?.value == 2) {
      setIsTimeLimit(true);
      setIsUnlimited(false);
      formik.setFieldValue("ExamSetTimeLimit", 1);
      formik.setFieldValue("ExamNumberofBookletsID", "");
      formik.setFieldValue("ExamQuizStart", 2);
      formik.setFieldValue("ExamTimeLimitExpires", 1);
      formik.setFieldValue("ExamBreakDuration", 1);
      setNumberOfPaging(1);
      formik.setFieldValue("ExamPaging", 1);
      setNumberOfAttempt(1);
      formik.setFieldValue("ExamAdditionallyID", 1);
      formik.setFieldValue("ExamNumberofAttempts", 1);
      formik.setFieldValue("ExamOverallGradeCalculationID", 4);
      formik.setFieldValue("ExamTimeLimit", 0);
      formik.setFieldValue("ExamBookletDuration", 1);
      formik.setFieldValue("ExamNumberofQuestions", 1);
      formik.setFieldValue("ExamEvaluationFeedback", 0);
      setMockOnlineAutoPublish(false);
      setIsEvolution(0);
    }
  };

  const handleSaveAsDraft = async () => {
    const errors = await formik.validateForm();
    formik.setTouched(
      Object.keys(formik.values).reduce((acc: any, key: any) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    if (Object.keys(errors).length > 0) {
      return; // Exit if there are validation errors
    }
    const draftValues = { ...formik.values };
    // const isValid = validateFields(draftValues, rows, examType);
    // if (!isValid) return; // If validation fails, stop execution
    try {
      // const result = await createNewExam(draftValues);
      const result = {
        success: true,
      };
      if (result?.success) {
        toast({ type: "success", message: "Draft saved successfully." });
        router.push("/Exam-Management");
      } else {
        toast({ type: "error", message: "Failed to save draft" });
      }
    } catch (error) {
      toast({
        type: "error",
        message:
          "Sorry, something went wrong while saving the draft. Please try again.",
      });
      console.error("Error saving draft:", error);
    }
  };
  // Handle change country dropdown
  const countryHandleChange = (event: any, index: any) => {
    const selectedCountryID = event.target.value;
    handleDynamicTableInputChange(
      index,
      "CountryID",
      selectedCountryID ? selectedCountryID : null
    );
    const selectedCountry = originalCountryData.find(
      (country: any) => country.CountryID === selectedCountryID
    );

    if (selectedCountry) {
      const filteredTimezones = originalCountryData
        .filter((country: any) => country.CountryID === selectedCountryID)
        .map((country: any) => ({
          CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
          Timezone: country.Timezone,
          GoogleTimezone: country.GoogleTimezone,
        }));

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, timezones: filteredTimezones };
          }
          return row;
        })
      );

      const alreadySelectedCampuses = rows
        .filter((_: any, rowIndex: any) => rowIndex !== index) // Exclude the current row
        .map((row: any) => row.CampusID) // Get all selected CampusIDs
        .filter((campusID: any) => campusID !== 0); // Remove any unselected campuses (value 0)

      const filteredLocations = locationData.filter(
        (location: any) =>
          location.CountryID === selectedCountryID &&
          !alreadySelectedCampuses.includes(location.CampusID) // Filter out already selected campuses
      );

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: filteredLocations };
          }
          return row;
        })
      );
    } else {
      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: locationData };
          }
          return row;
        })
      );
    }
  };

  //Handle Timezone dropdown
  const timezoneHandleChange = async (event: any, index: any) => {
    const selectedOption = event.target.value; // Access the selected option object

    handleDynamicTableInputChange(
      index,
      "CountryWiseTimeZoneID",
      selectedOption ? selectedOption : null
    );
  };

  // Handle change country dropdown
  const campusHandleChange = (event: any, index: any) => {
    const selectedCampusID = event?.target.value ? event?.target.value : null;
    handleDynamicTableInputChange(index, "CampusID", selectedCampusID);
    setSelectedCampuses((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = selectedCampusID;
      return updatedSelected;
    });

    setRows((prevRows: any) =>
      prevRows.map((row: any, rowIndex: any) => {
        const alreadySelectedCampuses = prevRows
          .filter((_: any, i: any) => i !== rowIndex)
          .map((r: any) => r.CampusID)
          .filter((id: number) => id !== 0);

        const filteredLocations = locationData.filter(
          (location: any) =>
            location.CountryID === row.CountryID &&
            !alreadySelectedCampuses.includes(location.CampusID)
        );

        return {
          ...row,
          locations: filteredLocations,
        };
      })
    );
  };

  // Handle change for exam type
  // const handleChangeExamCycleDropDown = (event: any) => {
  //   setExamCycle(event.target.value);
  //   formik.setFieldValue("ExamCycleID", event.target.value);
  // };

  const handleChangeExamCourseDropDown = (value: any) => {
    let createCourseArray = value ? [value] : [];
    if (!createCourseArray || createCourseArray.length == 0) {
      setSelectedExamCourse([]); // Deselecting all students, so empty the array
      // setOpenAutocomplete(false);
    } else {
      const selectedCourseIds: any = createCourseArray?.map(
        (course: any) => course
      );
      setSelectedExamCourse(selectedCourseIds?.[0]);
      console.log('selectedCourseIds?.lmscourseid: ', [selectedCourseIds?.[0]?.lmscourseid]);
      formik.setFieldValue("PrepXExamAFKACJOSCECourse", [selectedCourseIds?.[0]?.lmscourseid]);

      // setOpenAutocomplete(false);
    }
  };

  // Handle change for long description check box
  const handleChangeCheckBox = (event: any) => {
    setCheckBoxChecked(event.target.checked);
    if (!event.target.checked) {
      formik.setFieldValue("LongDescription", "");
    }
  };

  // Handle change
  const handleAvailabilityDateChange = (newValue: Dayjs | null) => {
    setAvailabilityDateValue(newValue);
    setDateValue2(newValue);
    formik.setFieldValue("ExamAvailabilityDate", newValue?.valueOf());
  };
  // Handle change
  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDateValue(newValue);
    setDateValue2Due(newValue);
    formik.setFieldValue("ExamDueDate", newValue?.valueOf());
    // if (newValue) {
    //   const endOfDay = newValue.endOf("day"); // Sets the time to 11:59:59 pm
    //   setDueDateValue(endOfDay);
    //   formik.setFieldValue("ExamDueDate", endOfDay.valueOf());
    // }
  };

  const quizStart = (value: any) => {
    if (examType?.ExamTypeSlug === quizzExamSlug && value == 2) {
      formik.setFieldValue("ExamTimeLimitExpires", 1);
    }
    formik.setFieldValue("ExamQuizStart", value);
  };

  const examTimeExpire = (value: any) => {
    formik.setFieldValue("ExamTimeLimitExpires", value);
  };

  const handleShuffleQuiz = (event: any) => {
    if (event.target.checked) {
      formik.setFieldValue("ExamPaging", 1);
      // formik.setFieldValue("ExamNumberofAttempts", 1);
      // setNumberOfAttempt(1);
      setNumberOfPaging(1);
    }
    setIsShuffleQuiz(event.target.checked ? 1 : 0);
    formik.setFieldValue("ExamShuffleQuiz", event.target.checked ? 1 : 0);
  };
  const handleSetTimeLimit = (event: any) => {
    setIsTimeLimit(event.target.checked);
    formik.setFieldValue("ExamSetTimeLimit", event.target.checked ? 1 : 0);
    formik.setFieldValue("ExamQuizStart", event.target.checked ? 1 : 0);
    formik.setFieldValue("ExamTimeLimitExpires", event.target.checked ? 1 : 0);
    formik.setFieldValue("ExamTimeLimit", 1);
    if (!event.target.checked) {
      formik.setFieldValue("ExamBookletDuration", 0);
      formik.setFieldValue("ExamBreakDuration", 0);
      formik.setFieldValue("ExamTimeLimit", 0);
      formik.setFieldValue("ExamQuizStart", 0);
      formik.setFieldValue("ExamTimeLimitExpires", 0);
    }
  };

  const calculateTimeLimit = () => {
    const totalDuration =
      formik.values.ExamBookletDuration *
      parseInt(formik.values.ExamNumberofBookletsID);
    const finalValue = totalDuration + Number(formik.values.ExamBreakDuration);
    formik.setFieldValue("ExamTimeLimit", finalValue);
  };

  // Handle change
  const handleNumberOfAttempt = (event: any, prop: any) => {
    setNumberOfAttempt(event?.target?.value);
    formik.setFieldValue("ExamNumberofAttempts", event.target.value);
  };

  // Handle change
  const handleNumberOfPaging = (event: any, prop: any) => {
    setNumberOfPaging(event?.target?.value);
    formik.setFieldValue("ExamPaging", event.target.value);
  };

  // Handle change
  const handleGradeDropDown = (event: any, prop: any) => {
    setSelectedGrade(event.target.value);
    formik.setFieldValue("ExamOverallGradeCalculationID", event.target.value);
  };

  // Handle change
  const handleAdditionally = (event: any, prop: any) => {
    formik.setFieldValue("ExamAdditionallyID", event.target.value);
  };

  const handleExamFeedBack = (event: any) => {
    formik.setFieldValue(
      "ExamEvaluationFeedback",
      event.target.checked ? 1 : 0
    );
  };

  const handleDisplayLerners = (event: any) => {
    formik.setFieldValue(
      "ExamPublishedDisplayToLearners",
      event.target.checked ? 1 : 0
    );
  };

  const bookletHandleChange = (value: any) => {
    setBookletValue(value?.id);
    formik.setFieldValue("ExamNumberofBookletsID", value?.id);
  };

  useEffect(() => {
    if (
      // added or condition so when any of the value changes it will recalculate
      examType &&
      examType?.ExamTypeSlug == mockExamSlug &&
      formik.values.ExamBookletDuration &&
      formik.values.ExamNumberofBookletsID &&
      formik.values.ExamBreakDuration != null
    ) {
      calculateTimeLimit();
    }
  }, [
    formik.values.ExamBookletDuration,
    formik.values.ExamNumberofBookletsID,
    formik.values.ExamBreakDuration,
  ]);

  useEffect(() => {
    getAllExamTypeList();
    generateTimeOptions();
    getAllLocation();
  }, []);

  useEffect(() => {
    getAllExaminationCourse();
  }, [examCourse]);

  useEffect(() => {
    const filteredTimezones = originalCountryData
      .filter((country: any) => country.CountryID === selectedCountry1)
      .map((country: any) => ({
        CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
        Timezone: country.Timezone,
        GoogleTimezone: country.GoogleTimezone,
      }));
    setFilteredTimeZone(filteredTimezones);
  }, [selectedCountry1]);

  useEffect(() => {
    if (formik.values.ExamNumberofBookletsID == 1) {
      formik.setFieldValue("ExamBreakDuration", 0);
    }
  }, [formik.values.ExamNumberofBookletsID]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer
      title="Situational Judgement Exam Create New Session"
      description="iMock Exam"
    >
      {/* breadcrumb */}
      <form onSubmit={formik.handleSubmit}>
        <ExamWizardSteps step={0} />

        <Stack alignItems={"center"} direction={"row"}>
          <Stack flex={1}>
            {" "}
            <Breadcrumb title="Create New Session" items={undefined} />
          </Stack>
        </Stack>
        <Card sx={commonContentCardStyle}>
          <Grid container spacing={"32px"}>
            <Grid item xs={6} md={6}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    PrepX ID
                  </Typography>
                  <CustomTextField
                    id=""
                    variant="outlined"
                    fullWidth
                    placeholder={"Exam - xxxx"}
                    name="PrepX_G_id"
                    disabled
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Examination Name
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <CustomTextField
                    id=""
                    variant="outlined"
                    fullWidth
                    placeholder={"Examination Name"}
                    name="ExamName"
                    value={formik.values.ExamName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ExamName && Boolean(formik.errors.ExamName)
                    }
                    helperText={
                      formik.touched.ExamName && formik.errors.ExamName
                    }
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Examination Type
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <Autocomplete
                    // loading={searchLoading}
                    id="country-select-demo"
                    fullWidth
                    options={examTypeData ? examTypeData : []}
                    value={examType}
                    autoHighlight
                    getOptionLabel={(option: any) => option.ExamTypeName}
                    renderOption={(props, option, { selected }) => (
                      <li {...props} key={option.ExamTypeID}>
                        {option.ExamTypeName}
                      </li>
                    )}
                    onChange={(event, value) => {
                      handleChangeDropDown(value);
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        placeholder="Select your exam type..."
                        aria-label="Select your exam type"
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
                    sx={commonAutocompleteStyle}
                  />
                  {/* <CustomSelect
                    id="standard-select-currency"
                    value={examType}
                    onChange={handleChangeDropDown}
                    fullWidth
                    renderInput={(params: any) => (
                      <CustomTextField
                        {...params}
                        placeholder="Select Your Location"
                        aria-label="Select-Your-Location"
                      />
                    )}
                    displayEmpty
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
                    <MenuItem defaultValue="" disabled>
                     Select your exam type
                    </MenuItem>
                    {examTypeData?.map((option: any) => (
                      <MenuItem
                        key={option.ExamTypeID}
                        value={option}
                        data-station={option.ExamTypeDefaultStation}
                        data-waitstation={option.ExamTypeDefaultWaitStation}
                      >
                        {option.ExamTypeName}
                      </MenuItem>
                    ))}
                  </CustomSelect> */}
                  {formik.touched.ExamTypeID && formik.errors.ExamTypeID && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {typeof formik.errors.ExamTypeID === "string"
                        ? formik.errors.ExamTypeID
                        : "An error occurred"}
                    </FormHelperText>
                  )}
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={6} md={6}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Select Course
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <Autocomplete
                    loading={searchLoading}
                    id="country-select-demo"
                    fullWidth
                    options={examinationCourse || []} // Ensure options are always an array
                    value={selectedExamCourse ?? null} // Ensure value is null when undefined
                    autoHighlight
                    getOptionLabel={(option: any) => (option?.lmscoursename ? option.lmscoursename : "")} // Handle undefined case
                    renderOption={(props, option) => (
                      <li {...props} key={option?.ID ?? Math.random()}>
                        {option?.lmscoursename ?? ""}
                      </li>
                    )}
                    onChange={(event, value) => {
                      handleChangeExamCourseDropDown(value ?? null); // Ensure value is null when cleared
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        placeholder="Select Your Course..."
                        aria-label="Select Your Course"
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
                    sx={commonAutocompleteStyle}
                  />
                  {/* <CustomSelect
                      id="standard-select-currency"
                      value={examCycle}
                      onChange={handleChangeExamCycleDropDown}
                      fullWidth
                      renderInput={(params: any) => (
                        <CustomTextField
                          {...params}
                          placeholder="Select Your Location"
                          aria-label="Select-Your-Location"
                        />
                      )}
                      sx={{
                        [`& .MuiChip-filled`]: {
                          padding: "0",
                          fontWeight: 500,
                          fontSize: "14px",
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                        [`& .MuiAutocomplete-inputRoot`]: {
                          padding: "5px 10px",
                          // backgroundColor: "rgba(0, 255, 0, 1)",
                        },
                        "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset":
                          {
                            border:
                              "1px solid rgba(115, 138, 150, 0.5) !important",
                          },
                      }}
                      MenuProps={{
                        style: {
                          maxHeight: 400,
                        },
                      }}
                    >
                      <MenuItem defaultValue="" disabled>
                        Select Type
                      </MenuItem>
                      {examinationCycle?.map((option: any) => (
                        <MenuItem
                          key={option.CourseCycleID}
                          value={option.CourseCycleID}
                        >
                          {option.CourseCycleNumber}
                        </MenuItem>
                      ))}
                    </CustomSelect> */}
                  {formik.touched.PrepXExamAFKACJOSCECourse &&
                    formik.errors.PrepXExamAFKACJOSCECourse && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {typeof formik.errors.PrepXExamAFKACJOSCECourse ===
                          "string"
                          ? formik.errors.PrepXExamAFKACJOSCECourse
                          : "An error occurred"}
                      </FormHelperText>
                    )}
                </Box>
              </Stack>
            </Grid>
            {isTimeLimit == true && examType?.ExamTypeSlug == mockExamSlug ? (
              <Grid item xs={12} md={6}>
                <Stack>
                  <Box>
                    <Typography
                      variant="paragraph3"
                      component={"p"}
                      sx={commonFieldLabelStyle}
                    >
                      Mock Exam Location
                    </Typography>
                    <CustomSelect
                      id="standard-select-currency"
                      value={formik.values.ExamQuizStart}
                      onChange={handleChangeDropDownLocationTypeData}
                      fullWidth
                      renderInput={(params: any) => (
                        <CustomTextField
                          {...params}
                          placeholder="Select Your Location"
                          aria-label="Select-Your-Location"
                        />
                      )}
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
                      {MockexamLocationTypeData?.map((option: any) => (
                        <MenuItem key={option.selectid} value={option.selectid}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Box>
                </Stack>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12} md={12}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Short Description{" "}
                    {/* <span style={{ color: "#FC4B6C" }}>*</span> */}
                  </Typography>
                  <CustomTextField
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    name="ShortDescription"
                    value={formik.values.ShortDescription}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack>
                <Box>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={checkBoxChecked}
                        onChange={handleChangeCheckBox}
                        sx={commonCheckboxField}
                      />
                    }
                    label="Long Description"
                    sx={checkboxLabelStyle}
                  />
                  {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                    examType?.ExamTypeSlug == quizzExamSlug ||
                    examType?.ExamTypeSlug == mockExamSlug) &&
                    checkBoxChecked && (
                      <CustomTextField
                        id="outlined-multiline-static2"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        disabled={!checkBoxChecked}
                        name="LongDescription"
                        value={formik.values.LongDescription}
                        onChange={formik.handleChange}
                      />
                    )}
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card sx={commonContentCardStyle}>
          {/* Availability Dates and Conditions */}
          {examType?.ExamTypeSlug == mockExamSlug && (
            <Grid container spacing={"32px"} marginTop={"2px"}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">
                  Availability Dates and Conditions
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack>
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CustomFormLabel
                      htmlFor="activeStatus"
                      sx={{
                        ...fieldLabel,
                        color: theme.palette.secondary.fieldText,
                      }}
                    >
                      Booklet Duration (min)
                      <span style={{ color: "#FC4B6C" }}>*</span>
                    </CustomFormLabel>

                    <CustomTextField
                      id=""
                      variant="outlined"
                      fullWidth
                      placeholder={""}
                      disabled={!isTimeLimit}
                      name="ExamBookletDuration"
                      value={formik.values.ExamBookletDuration}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Allow only positive numbers
                        if (/^[1-9]\d*$/.test(value) || value === "") {
                          formik.handleChange(e);
                        }
                      }}
                      sx={{
                        ...disableInputStyle,
                        backgroundColor: "transparent !important",
                        "& .Mui-disabled fieldset": {
                          backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                          border: `${theme.palette.secondary.disableFieldColor} !important`,
                        },
                      }}
                    />
                    {formik.touched.ExamBookletDuration &&
                      formik.errors.ExamBookletDuration && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {formik.errors.ExamBookletDuration as string}
                        </FormHelperText>
                      )}
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack>
                  <Box>
                    <CustomFormLabel
                      htmlFor=""
                      sx={{
                        ...fieldLabel,
                        color: theme.palette.secondary.fieldText,
                      }}
                    >
                      Number of Booklets
                      <span style={{ color: "#FC4B6C" }}>*</span>
                    </CustomFormLabel>
                    <Autocomplete
                      id="checkboxes-tags-demo"
                      options={booklet}
                      // disableCloseOnSelect
                      getOptionLabel={(option: any) => option.label}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>{option.label}</li>
                      )}
                      fullWidth
                      onChange={(event, value) => {
                        // bookletHandleChange(value);
                        formik.setFieldValue(
                          "ExamNumberofBookletsID",
                          value?.id || ""
                        );
                        if (value?.id == "1") {
                          formik.setFieldValue("ExamBreakDuration", "0");
                        } else {
                          formik.setFieldValue("ExamBreakDuration", "1");
                          formik.setFieldValue("ExamNumberofQuestions", "");
                        }
                      }}
                      renderInput={(params: any) => (
                        <CustomTextField
                          {...params}
                          placeholder="Select Your Booklet"
                          aria-label="Select-Your-Booklet"
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
                      sx={commonAutocompleteStyle}
                    />
                  </Box>
                  {formik.touched.ExamNumberofBookletsID &&
                    formik.errors.ExamNumberofBookletsID && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {typeof formik.errors.ExamNumberofBookletsID ===
                          "string"
                          ? formik.errors.ExamNumberofBookletsID
                          : "An error occurred"}
                      </FormHelperText>
                    )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomFormLabel
                  htmlFor=""
                  sx={{
                    marginTop: "0",
                    color: theme.palette.secondary.fieldText,
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Break Duration (min)
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={""}
                  name="ExamBreakDuration"
                  disabled={
                    !isTimeLimit ||
                    bookletValue == 1 ||
                    formik.values.ExamNumberofBookletsID == 1
                  }
                  value={formik.values.ExamBreakDuration}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    // Allow only positive numbers
                    if (/^[1-9]\d*$/.test(value) || value === "") {
                      formik.handleChange(e);
                    }
                  }}
                  sx={{
                    ...disableInputStyle,
                    backgroundColor: "transparent !important",
                    "& .Mui-disabled fieldset": {
                      backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                      border: `${theme.palette.secondary.disableFieldColor} !important`,
                    },
                  }}
                />
                {formik.touched.ExamBreakDuration &&
                  formik.errors.ExamBreakDuration && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {formik.touched.ExamBreakDuration &&
                        formik.errors.ExamBreakDuration && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {typeof formik.errors.ExamBreakDuration === "string"
                              ? formik.errors.ExamBreakDuration
                              : "An error occurred"}
                          </FormHelperText>
                        )}
                    </FormHelperText>
                  )}
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomFormLabel
                  htmlFor=""
                  sx={{
                    marginTop: "0",
                    color: theme.palette.secondary.fieldText,
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Total number of questions
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={""}
                  name="ExamNumberofQuestions"
                  value={formik.values.ExamNumberofQuestions}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    // Allow only positive numbers
                    if (value == "") {
                      setNumberOfQuestionError(false)
                    }
                    if (/^[1-9]\d*$/.test(value) || value === "") {
                      formik.handleChange(e);
                      if (formik.values.ExamNumberofBookletsID == 2 && value && parseInt(value) % 2 === 0) {
                        formik.setFieldError("ExamNumberofQuestions", ""); // Clear the error when even number is entered
                      }
                    }
                  }}
                  onBlur={() => {
                    const value = formik.values.ExamNumberofQuestions;
                    if (
                      formik.values.ExamNumberofBookletsID == 2 &&
                      value &&
                      parseInt(value) % 2 !== 0
                    ) {
                      setNumberOfQuestionError(true)
                      // alert("Please enter an even number."); // Optional: Inform the user
                    }
                    else {
                      setNumberOfQuestionError(false)
                    }
                  }}
                />
                {numberOfQuestionError && <span style={{ color: "#FC4B6C" }}><FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >(Please enter the even number only)</FormHelperText></span>}
                {formik.touched.ExamNumberofQuestions &&
                  formik.errors.ExamNumberofQuestions && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {formik.touched.ExamNumberofQuestions &&
                        formik.errors.ExamNumberofQuestions && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {typeof formik.errors.ExamNumberofQuestions ===
                              "string"
                              ? formik.errors.ExamNumberofQuestions
                              : "An error occurred"}
                          </FormHelperText>
                        )}
                    </FormHelperText>
                  )}
              </Grid>
            </Grid>
          )}
          {/* End Availability Dates and Conditions */}

          <Grid container spacing={"32px"} marginTop={"2px"}>
            <>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Exam Time</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={6}
                sx={{
                  "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset":
                  {
                    border: "1px solid rgba(115, 138, 150, 0.5) !important",
                  },
                }}
              >
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Availability Date
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label={null}
                    inputFormat="YYYY/MM/DD"
                    value={availabilityDateValue}
                    onChange={handleAvailabilityDateChange}
                    minDate={dayjs().startOf("day")}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        style={{ width: "100%" }}
                        sx={calenderTextField}
                        inputProps={{ ...params.inputProps, readOnly: true }} // Disable keyboard input
                      />
                    )}
                    PopperProps={{
                      sx: {
                        ...commonDatepickerStyle
                      },
                    }}
                  />
                </LocalizationProvider>
                {formik.touched.ExamAvailabilityDate &&
                  formik.errors.ExamAvailabilityDate && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {typeof formik.errors.ExamAvailabilityDate === "string"
                        ? formik.errors.ExamAvailabilityDate
                        : "An error occurred"}
                    </FormHelperText>
                  )}
              </Grid>

              <Grid item xs={6} md={6}>
                <Stack direction="row" gap="10px">
                  <Grid item xs={12} md={12}>
                    <Box>
                      <Typography
                        variant="paragraph3"
                        component={"p"}
                        sx={commonFieldLabelStyle}
                      >
                        Availability time <span style={{ color: "#FC4B6C" }}>*</span>
                      </Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"flex-end"}
                        gap={"10px"}
                      >
                        <CustomSelect
                          id="starthour"
                          fullWidth
                          variant="outlined"
                          displayEmpty
                          value={selectedHour}
                          onChange={handleHourChange}
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
                          <MenuItem defaultValue="" disabled>
                            Hours
                          </MenuItem>
                          {populateOptions(1, 12)}
                        </CustomSelect>
                        <CustomSelect
                          id="startmin"
                          fullWidth
                          variant="outlined"
                          displayEmpty
                          value={selectedMinute}
                          sx={commonSelectFieldStyle}
                          MenuProps={{
                            style: {
                              maxHeight: 350,
                            },
                            PaperProps: {
                              sx: commonDropdownMenuStyle,
                            },
                          }}
                          onChange={handleMinuteChange}
                        >
                          <MenuItem defaultValue="" disabled>
                            Minutes
                          </MenuItem>
                          {populateOptions(0, 59)}
                        </CustomSelect>
                        <CustomSelect
                          id="startshift"
                          fullWidth
                          variant="outlined"
                          displayEmpty
                          value={selectedShift}
                          onChange={handleShiftChange}
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
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </CustomSelect>
                      </Stack>
                      <CustomTextField
                        id=""
                        variant="outlined"
                        fullWidth
                        value={start}
                        defaultValue={0}
                        sx={{
                          display: "none",
                        }}
                        name="CSTimeOfExam"
                        error={
                          formik.touched.CSTimeOfExam &&
                          Boolean(formik.errors.CSTimeOfExam)
                        }
                        helperText={
                          formik.touched.CSTimeOfExam &&
                          formik.errors.CSTimeOfExam
                        }
                      />

                    </Box>
                  </Grid>
                  <Stack pt={"35px"} ml={"20px"}>
                    <Typography
                      variant="paragraph3"
                      component={"p"}
                      sx={commonFieldLabelStyle}
                    >
                      EST
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </>

            {/* Select date and time           */}
            {formik.values.ExamQuizStart != 2 && (
              <>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{
                    "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset":
                    {
                      border: "1px solid rgba(115, 138, 150, 0.5) !important",
                    },
                  }}
                >
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Due Date
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label={null}
                      inputFormat="YYYY/MM/DD"
                      value={dueDateValue}
                      onChange={handleDueDateChange}
                      minDate={dayjs().startOf("day")}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          style={{ width: "100%" }}
                          sx={calenderTextField}
                          inputProps={{ ...params.inputProps, readOnly: true }} // Disable keyboard input
                        />
                      )}
                      PopperProps={{
                        sx: {
                          ...commonDatepickerStyle
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {formik.touched.ExamDueDate && formik.errors.ExamDueDate && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {typeof formik.errors.ExamDueDate === "string"
                        ? formik.errors.ExamDueDate
                        : "An error occurred"}
                    </FormHelperText>
                  )}
                </Grid>
                {/* <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{
                    "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset":
                      {
                        border: "1px solid rgba(115, 138, 150, 0.5) !important",
                      },
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <Stack flex={1}>
                      <Typography
                        variant="paragraph3"
                        component={"p"}
                        sx={commonFieldLabelStyle}
                      >
                        Due time
                        <span style={{ color: "#FC4B6C" }}>*</span>
                      </Typography>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TextField
                          ref={dueFieldRef}
                          value={`${dueHour || "--"}:${dueMinute || "--"} ${
                            dueampm || ""
                          }`}
                          fullWidth
                          onClick={dueClick}
                          sx={calenderTextField}
                        />
                        <Popover
                          open={isDueTimePopoverOpen}
                          anchorEl={anchorElForDueTime}
                          onClose={dueClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box
                            sx={{
                              padding: 2,
                              width: 300,
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <Select
                                  fullWidth
                                  variant="outlined"
                                  value={dueHour}
                                  onChange={(event) => {
                                    dueTimeChange("hour", event.target.value);
                                  }}
                                  displayEmpty
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
                                  <MenuItem value="" disabled>
                                    Hour
                                  </MenuItem>
                                  {hours.map((hour) => (
                                    <MenuItem key={hour} value={hour}>
                                      {hour.toString().padStart(2, "0")}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid item xs={4}>
                                <Select
                                  fullWidth
                                  variant="outlined"
                                  value={dueMinute}
                                  onChange={(event) => {
                                    dueTimeChange("minute", event.target.value);
                                  }}
                                  displayEmpty
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
                                  <MenuItem value="" disabled>
                                    Minute
                                  </MenuItem>
                                  {minutes.map((minute) => (
                                    <MenuItem key={minute} value={minute}>
                                      {minute}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid item xs={4}>
                                <Select
                                  fullWidth
                                  variant="outlined"
                                  value={dueampm}
                                  onChange={(event) => {
                                    dueTimeChange("ampm", event.target.value);
                                  }}
                                  displayEmpty
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
                                  <MenuItem value="" disabled>
                                    AM/PM
                                  </MenuItem>
                                  {ampm.map((period) => (
                                    <MenuItem key={period} value={period}>
                                      {period}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                            </Grid>
                          </Box>
                        </Popover>
                      </LocalizationProvider>

                      {formik.touched.ExamAvailabilityDate &&
                        formik.errors.ExamAvailabilityDate && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {typeof formik.errors.ExamAvailabilityDate ===
                            "string"
                              ? formik.errors.ExamAvailabilityDate
                              : "An error occurred"}
                          </FormHelperText>
                        )}
                    </Stack>
                    <Stack pt={"35px"} ml={"20px"}>
                      <Typography
                        variant="paragraph3"
                        component={"p"}
                        sx={commonFieldLabelStyle}
                      >
                        EST
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid> */
                  <Grid item xs={6} md={6}>
                    <Stack direction="row" gap="10px">
                      <Grid item xs={12} md={12}>
                        <Box>
                          <Typography
                            variant="paragraph3"
                            component={"p"}
                            sx={commonFieldLabelStyle}
                          >
                            Due time <span style={{ color: "#FC4B6C" }}>*</span>
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            gap={"10px"}
                          >
                            <CustomSelect
                              id="starthour"
                              fullWidth
                              variant="outlined"
                              displayEmpty
                              value={selectedHourDue}
                              onChange={handleHourChangeDue}
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
                              <MenuItem defaultValue="" disabled>
                                Hours
                              </MenuItem>
                              {populateOptions(1, 12)}
                            </CustomSelect>
                            <CustomSelect
                              id="startmindue"
                              fullWidth
                              variant="outlined"
                              displayEmpty
                              value={selectedMinuteDue}
                              sx={commonSelectFieldStyle}
                              MenuProps={{
                                style: {
                                  maxHeight: 350,
                                },
                                PaperProps: {
                                  sx: commonDropdownMenuStyle,
                                },
                              }}
                              onChange={handleMinuteChangeDue}
                            >
                              <MenuItem defaultValue="" disabled>
                                Minutes
                              </MenuItem>
                              {populateOptions(0, 59)}
                            </CustomSelect>
                            <CustomSelect
                              id="startshiftdue"
                              fullWidth
                              variant="outlined"
                              displayEmpty
                              value={selectedShiftDue}
                              onChange={handleShiftChangeDue}
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
                              <MenuItem value="AM">AM</MenuItem>
                              <MenuItem value="PM">PM</MenuItem>
                            </CustomSelect>
                          </Stack>
                          <CustomTextField
                            id=""
                            variant="outlined"
                            fullWidth
                            value={startDue}
                            defaultValue={0}
                            sx={{
                              display: "none",
                            }}
                            name="CSTimeOfExamDue"
                            error={
                              formik.touched.CSTimeOfExamDue &&
                              Boolean(formik.errors.CSTimeOfExamDue)
                            }
                            helperText={
                              formik.touched.CSTimeOfExamDue &&
                              formik.errors.CSTimeOfExamDue
                            }
                          />

                        </Box>
                      </Grid>
                      <Stack pt={"35px"} ml={"20px"}>
                        <Typography
                          variant="paragraph3"
                          component={"p"}
                          sx={commonFieldLabelStyle}
                        >
                          EST
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                }
              </>
            )}
            {/* End Select date and time           */}

            {/* Select camps */}
            {examType?.ExamTypeSlug == "mockExamSlug" && (
              <>
                <Grid item md={12}>
                  <Typography variant="h5">Exam Locations</Typography>
                </Grid>
                <Grid item md={12}>
                  <TableContainer>
                    <Table
                      aria-label="simple table"
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                      className="c-table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: "24px" }}>
                            <CustomCheckbox
                              //   defaultChecked
                              color="primary"
                              inputProps={{
                                "aria-label": "checkbox with default color",
                              }}
                              className="checkbox_style"
                              sx={commonCheckboxField}
                            />
                            &nbsp;
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              fontSize={"14px"}
                              fontWeight={500}
                              color={theme.palette.primary.main}
                              display={"flex"}
                              alignItems={"center"}
                              gap={"10px"}
                              component={"div"}
                              className="listDatahead"
                            >
                              {" "}
                              <span>Date</span>{" "}
                              <Box
                                component={"span"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                gap={"1px"}
                                color={theme.palette.secondary.main}
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
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon />
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  placement="top"
                                  title="DESC"
                                  style={{
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon className="arrow-down" />
                                  </span>
                                </Tooltip>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              fontSize={"14px"}
                              fontWeight={500}
                              color={theme.palette.primary.main}
                              display={"flex"}
                              alignItems={"center"}
                              gap={"10px"}
                              component={"div"}
                              className="listDatahead"
                            >
                              {" "}
                              <span>Time</span>{" "}
                              <Box
                                component={"span"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                gap={"1px"}
                                color={theme.palette.secondary.main}
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
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon />
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  placement="top"
                                  title="DESC"
                                  style={{
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon className="arrow-down" />
                                  </span>
                                </Tooltip>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              fontSize={"14px"}
                              fontWeight={500}
                              color={theme.palette.primary.main}
                              display={"flex"}
                              alignItems={"center"}
                              gap={"10px"}
                              component={"div"}
                              className="listDatahead"
                            >
                              {" "}
                              <span>Country</span>{" "}
                              <Box
                                component={"span"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                gap={"1px"}
                                color={theme.palette.secondary.main}
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
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon />
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  placement="top"
                                  title="DESC"
                                  style={{
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon className="arrow-down" />
                                  </span>
                                </Tooltip>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              fontSize={"14px"}
                              fontWeight={500}
                              color={theme.palette.primary.main}
                              display={"flex"}
                              alignItems={"center"}
                              gap={"10px"}
                              component={"div"}
                              className="listDatahead"
                            >
                              {" "}
                              <span>Timezone</span>{" "}
                              <Box
                                component={"span"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                gap={"1px"}
                                color={theme.palette.secondary.main}
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
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon />
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  placement="top"
                                  title="DESC"
                                  style={{
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon className="arrow-down" />
                                  </span>
                                </Tooltip>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              fontSize={"14px"}
                              fontWeight={500}
                              color={theme.palette.primary.main}
                              display={"flex"}
                              alignItems={"center"}
                              gap={"10px"}
                              component={"div"}
                              className="listDatahead"
                            >
                              {" "}
                              <span>Campus</span>{" "}
                              <Box
                                component={"span"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                gap={"1px"}
                                color={theme.palette.secondary.main}
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
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon />
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  placement="top"
                                  title="DESC"
                                  style={{
                                    height: "8px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <span className={``}>
                                    <CaretupIcon className="arrow-down" />
                                  </span>
                                </Tooltip>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows?.map((row: any, index: any) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Stack direction="row">
                                <Box>
                                  <CustomCheckbox
                                    //   defaultChecked
                                    onChange={() => handleCheckBoxChange(index)}
                                    checked={checkedItems[index] || false}
                                    color="primary"
                                    inputProps={{
                                      "aria-label":
                                        "checkbox with default color",
                                    }}
                                    className="checkbox_style"
                                    sx={commonCheckboxField}
                                  />
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack
                                sx={{
                                  maxWidth: "195px",
                                  minWidth: "195px",
                                }}
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    label={null}
                                    inputFormat="YYYY/MM/DD"
                                    value={locationDate}
                                    // onChange={(date) =>
                                    //  null
                                    // }
                                    onChange={(date: any) =>
                                      handleDateChangeForLocation(date)
                                    }
                                    minDate={dayjs().startOf("day")}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        sx={calenderTextField}
                                      />
                                    )}

                                  />
                                </LocalizationProvider>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField
                                  ref={textFieldRef}
                                  value={`${row.selectedTime?.hour || "--"}:${row.selectedTime?.minute || "--"
                                    } ${row?.selectedTime?.ampm || ""}`}
                                  fullWidth
                                  onClick={(e) => handleClick(e, row.id)}
                                  sx={calenderTextField}
                                />
                                <Popover
                                  id={
                                    openPopoverId === row.id
                                      ? "time-popover"
                                      : undefined
                                  }
                                  open={Boolean(anchorEl[row.id])}
                                  anchorEl={anchorEl[row.id]}
                                  onClose={() => handleClose(row.id)}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      padding: 2,
                                      width: 300,
                                    }}
                                  >
                                    <Grid container spacing={2}>
                                      {/* Hour dropdown */}
                                      <Grid item xs={4}>
                                        <Select
                                          fullWidth
                                          variant="outlined"
                                          value={row.selectedTime.hour}
                                          onChange={(event) => {
                                            handleTimeChange(
                                              "hour",
                                              event.target.value,
                                              row.id
                                            );
                                          }}
                                          displayEmpty
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
                                          <MenuItem value="" disabled>
                                            Hour
                                          </MenuItem>
                                          {hours.map((hour) => (
                                            <MenuItem key={hour} value={hour}>
                                              {hour.toString().padStart(2, "0")}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </Grid>

                                      {/* Minute dropdown */}
                                      <Grid item xs={4}>
                                        <Select
                                          fullWidth
                                          variant="outlined"
                                          value={row.selectedTime.minute}
                                          onChange={(event) => {
                                            handleTimeChange(
                                              "minute",
                                              event.target.value,
                                              row.id
                                            );
                                          }}
                                          sx={commonSelectFieldStyle}
                                          MenuProps={{
                                            style: {
                                              maxHeight: 350,
                                            },
                                            PaperProps: {
                                              sx: commonDropdownMenuStyle,
                                            },
                                          }}
                                          displayEmpty
                                        >
                                          <MenuItem value="" disabled>
                                            Minute
                                          </MenuItem>
                                          {minutes.map((minute) => (
                                            <MenuItem
                                              key={minute}
                                              value={minute}
                                            >
                                              {minute}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </Grid>

                                      {/* AM/PM dropdown */}
                                      <Grid item xs={4}>
                                        <Select
                                          fullWidth
                                          variant="outlined"
                                          value={row.selectedTime.ampm}
                                          onChange={(event) => {
                                            handleTimeChange(
                                              "ampm",
                                              event.target.value,
                                              row.id
                                            );
                                          }}
                                          sx={commonSelectFieldStyle}
                                          MenuProps={{
                                            style: {
                                              maxHeight: 350,
                                            },
                                            PaperProps: {
                                              sx: commonDropdownMenuStyle,
                                            },
                                          }}
                                          displayEmpty
                                        >
                                          <MenuItem value="" disabled>
                                            AM/PM
                                          </MenuItem>
                                          {ampm.map((period) => (
                                            <MenuItem
                                              key={period}
                                              value={period}
                                            >
                                              {period}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </Popover>
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <CustomSelect
                                id="standard-select-currency"
                                // value={examType}
                                onChange={(event: any) =>
                                  countryHandleChange(event, index)
                                }
                                fullWidth
                                variant="outlined"
                                displayEmpty
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  disableScrollLock: true,
                                  style: {
                                    maxHeight: 350,
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle,
                                  },
                                }}
                              >
                                <MenuItem defaultValue="" disabled>
                                  Select Country
                                </MenuItem>
                                {countryData?.map(
                                  ([countryName, countryID]: [
                                    string,
                                    number
                                  ]) => (
                                    <MenuItem key={countryID} value={countryID}>
                                      {countryName}
                                    </MenuItem>
                                  )
                                )}
                              </CustomSelect>
                            </TableCell>
                            <TableCell>
                              <CustomSelect
                                id="standard-select-currency"
                                // value={examType}
                                onChange={(event: any) =>
                                  timezoneHandleChange(event, index)
                                }
                                fullWidth
                                variant="outlined"
                                displayEmpty
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  disableScrollLock: true,
                                  style: {
                                    maxHeight: 350,
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle,
                                  },
                                }}
                              >
                                <MenuItem defaultValue="" disabled>
                                  Select Time zone
                                </MenuItem>
                                {rows[index].timezones?.map((option: any) => (
                                  <MenuItem
                                    key={option.CountryWiseTimeZoneID}
                                    value={option.CountryWiseTimeZoneID}
                                  >
                                    {option.GoogleTimezone}
                                  </MenuItem>
                                ))}
                              </CustomSelect>
                            </TableCell>
                            <TableCell>
                              <CustomSelect
                                id="standard-select-currency"
                                // value={examType}
                                onChange={(event: any) =>
                                  campusHandleChange(event, index)
                                }
                                fullWidth
                                variant="outlined"
                                displayEmpty
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  disableScrollLock: true,
                                  style: {
                                    maxHeight: 350,
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle,
                                  },
                                }}
                              >
                                <MenuItem defaultValue="" disabled>
                                  Select Campus
                                </MenuItem>
                                {row.locations && row.locations.length > 0 ? (
                                  row.locations.map((location: any) => (
                                    <MenuItem
                                      key={location.CampusID}
                                      value={location.CampusID}
                                    >
                                      {location.CampusName}
                                    </MenuItem>
                                  ))
                                ) : (
                                  <MenuItem value="" disabled>
                                    No Locations Available
                                  </MenuItem>
                                )}
                              </CustomSelect>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Stack
                    gap={"10px"}
                    display={"flex"}
                    direction={"row"}
                    mt={"30px"}
                  >
                    <Button
                      sx={{
                        ...secondaryButon,
                      }}
                      onClick={() => deleteRow(selectedCheckBoxIndex)}
                    >
                      Remove Location
                    </Button>
                    <Button
                      sx={{
                        ...primaryButon,
                      }}
                      onClick={() => addRow()}
                    >
                      Add Location
                    </Button>
                  </Stack>
                </Grid>
              </>
            )}
            {/* End Select camps */}

            {examType?.ExamTypeSlug !== mockExamSlug &&
              examType?.ExamTypeSlug != selfAssessmentExamSlug && (
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Timing and Display</Typography>
                </Grid>
              )}
            <Grid item xs={12} md={6}>
              {examType?.ExamTypeSlug != mockExamSlug &&
                examType?.ExamTypeSlug != selfAssessmentExamSlug && (
                  <Stack>
                    <FormControlLabel
                      control={
                        <CustomCheckbox
                          // checked={checkBoxChecked}
                          onChange={(event) => handleSetTimeLimit(event)}
                          checked={isTimeLimit}
                          disabled={
                            examType?.ExamTypeSlug === mockExamSlug ||
                            examType?.ExamTypeSlug == selfAssessmentExamSlug
                          }
                          sx={commonCheckboxField}
                        />
                      }
                      label="Set Time Limit"
                      sx={checkboxLabelStyle}
                    />
                  </Stack>
                )}
              {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                examType?.ExamTypeSlug == quizzExamSlug) &&
                isTimeLimit && (
                  <Stack>
                    <Typography
                      variant="paragraph3"
                      component={"p"}
                      sx={commonFieldLabelStyle}
                    >
                      Time Limit<span style={{ color: "#FC4B6C" }}>*</span>
                    </Typography>

                    <Stack direction={"row"} gap={"30px"} alignItems={"center"}>
                      <CustomTextField
                        id=""
                        variant="outlined"
                        fullWidth
                        placeholder={""}
                        name="ExamTimeLimit"
                        value={formik.values.ExamTimeLimit}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          // Allow only positive numbers
                          if (/^[1-9]\d*$/.test(value) || value === "") {
                            formik.handleChange(e);
                          }
                        }}
                        disabled={
                          !isTimeLimit || examType?.ExamTypeSlug == mockExamSlug
                            ? true
                            : false
                        }
                        sx={{
                          ...disableInputStyle,
                          backgroundColor: "transparent !important",
                          "& .Mui-disabled fieldset": {
                            backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                            border: `${theme.palette.secondary.disableFieldColor} !important`,
                          },
                        }}
                        error={
                          formik.touched.ExamTimeLimit &&
                          Boolean(formik.errors.ExamTimeLimit)
                        }
                        helperText={
                          formik.touched.ExamTimeLimit &&
                          formik.errors.ExamTimeLimit
                        }
                      />
                      <CustomFormLabel
                        htmlFor=""
                        sx={{
                          marginTop: "0",
                          color: theme.palette.secondary.fieldText,
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        Minute(s)
                      </CustomFormLabel>
                    </Stack>
                  </Stack>
                )}
            </Grid>
            {isTimeLimit ? (
              <Grid item xs={12} md={12}>
                <>
                  <Stack>
                    {/* <Typography
                      variant="paragraph3"
                      component={"p"}
                      sx={commonFieldLabelStyle}
                    >
                      Quiz Start
                      <span style={{ color: "#FC4B6C" }}>*</span>
                    </Typography> */}
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <FormControlLabel
                        value="1"
                        disabled={
                          examType?.ExamTypeSlug == mockExamSlug || !isTimeLimit
                        }
                        sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                        control={
                          <Radio
                            sx={{
                              p: "0",
                              gap: "5px",
                              "& svg:not(svg + svg)": {
                                fill: theme.palette.primary.light,
                              },
                              "& input:checked + span svg": {
                                fill: theme.palette.primary.light,
                              },
                            }}
                          />
                        }
                        onChange={() => quizStart(1)}
                        checked={
                          isTimeLimit && formik.values.ExamQuizStart == 1
                            ? true
                            : false
                        }
                        label="Asynchronous: Timer starts when the learner launches the quiz"
                      />
                      <FormControlLabel
                        value="2"
                        disabled={
                          !isTimeLimit ||
                          examType?.ExamTypeSlug == quizzExamSlug ||
                          examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                          examType?.ExamTypeSlug == mockExamSlug
                        }
                        sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                        control={
                          <Radio
                            sx={{
                              p: "0",
                              gap: "5px",
                              "& svg:not(svg + svg)": {
                                fill: theme.palette.primary.light,
                              },
                              "& input:checked + span svg": {
                                fill: theme.palette.primary.light,
                              },
                            }}
                          />
                        }
                        onChange={() => quizStart(2)}
                        checked={
                          formik.values.ExamQuizStart == 2 ? true : false
                        }
                        label="Synchronous: Timer starts on the start date"
                      />
                    </RadioGroup>
                    {formik.touched.ExamQuizStart &&
                      formik.errors.ExamQuizStart && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {typeof formik.errors.ExamQuizStart === "string"
                            ? formik.errors.ExamQuizStart
                            : "An error occurred"}
                        </FormHelperText>
                      )}
                  </Stack>
                  {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                    examType?.ExamTypeSlug == quizzExamSlug /* || (examType?.ExamTypeSlug === mockExamSlug && mockOnlineAutoPublish == true) */) &&
                    isTimeLimit && (
                      <Stack mt="10px">
                        <Typography
                          variant="paragraph3"
                          component={"p"}
                          sx={{ ...commonFieldLabelStyle, mb: "20px" }}
                        >
                          When the Time Limit Expires
                          <span style={{ color: "#FC4B6C" }}>*</span>
                        </Typography>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          // value={
                          //   (isTimeLimit &&
                          //     examType?.ExamTypeSlug == quizzExamSlug) ||
                          //   (isTimeLimit &&
                          //     examType?.ExamTypeSlug == selfAssessmentExamSlug) ||
                          //   (isTimeLimit && examType?.ExamTypeSlug == mockExamSlug)
                          //     ? formik.values.ExamTimeLimitExpires || "1"
                          //     : ""
                          // }
                          // onChange={(event) => {
                          //   formik.setFieldValue(
                          //     "ExamTimeLimitExpires",
                          //     event.target.value
                          //   );
                          // }}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <FormControlLabel
                            value="1"
                            disabled={!isTimeLimit}
                            sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                            control={
                              <Radio
                                sx={{
                                  p: "0",
                                  gap: "5px",
                                  "& svg:not(svg + svg)": {
                                    fill: theme.palette.primary.light,
                                  },
                                  "& input:checked + span svg": {
                                    fill: theme.palette.primary.light,
                                  },
                                }}
                                onChange={() => examTimeExpire(1)}
                              />
                            }
                            checked={
                              isTimeLimit &&
                                formik.values.ExamTimeLimitExpires == 1
                                ? true
                                : false
                            }
                            label={`Automatically submit the ${examType?.ExamTypeSlug} attempt`}
                          />
                          <FormControlLabel
                            value="2"
                            disabled={
                              !isTimeLimit ||
                              (examType?.ExamTypeSlug === mockExamSlug && mockOnlineAutoPublish === false) ||
                              (examType?.ExamTypeSlug === quizzExamSlug &&
                                formik?.values?.ExamQuizStart == 2)
                            }
                            sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                            control={
                              <Radio
                                sx={{
                                  p: "0",
                                  gap: "5px",
                                  "& svg:not(svg + svg)": {
                                    fill: theme.palette.primary.light,
                                  },
                                  "& input:checked + span svg": {
                                    fill: theme.palette.primary.light,
                                  },
                                }}
                                checked={
                                  formik.values.ExamTimeLimitExpires == 2
                                    ? true
                                    : false
                                }
                                onChange={() => examTimeExpire(2)}
                              />
                            }
                            label="Flag as “exceeded time limit” and allow the learner to continue working"
                          />
                          <FormControlLabel
                            value="3"
                            sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                            control={
                              <Radio
                                sx={{
                                  p: "0",
                                  gap: "5px",
                                  "& svg:not(svg + svg)": {
                                    fill: theme.palette.primary.light,
                                  },
                                  "& input:checked + span svg": {
                                    fill: theme.palette.primary.light,
                                  },
                                }}
                                onChange={() => examTimeExpire(3)}
                                checked={
                                  formik.values.ExamTimeLimitExpires == 3
                                    ? true
                                    : false
                                }
                                disabled={
                                  !isTimeLimit ||
                                  examType?.ExamTypeSlug === mockExamSlug ||
                                  (examType?.ExamTypeSlug === quizzExamSlug &&
                                    formik?.values?.ExamQuizStart == 2) ||
                                  examType?.ExamTypeSlug ===
                                  selfAssessmentExamSlug ||
                                  examType?.ExamTypeSlug === quizzExamSlug
                                }
                              />
                            }
                            label="Do nothing: the time limit is not enforced"
                          />
                        </RadioGroup>
                        {formik.touched.ExamTimeLimitExpires &&
                          formik.errors.ExamTimeLimitExpires && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                            >
                              {typeof formik.errors.ExamTimeLimitExpires ===
                                "string"
                                ? formik.errors.ExamTimeLimitExpires
                                : "An error occurred"}
                            </FormHelperText>
                          )}
                      </Stack>
                    )}
                </>
              </Grid>
            ) : (
              <Grid item xs={12} md={12} p={"0px !important"} height={"0px"}></Grid>
            )}

            {/* <Grid
              item
              xs={12}
              md={6}
              sx={{
                "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
                  border: "1px solid rgba(115, 138, 150, 0.5) !important",
                },
              }}
            >
              <Typography
                variant="paragraph3"
                component={"p"}
                sx={commonFieldLabelStyle}
              >
                Shuffle {examType?.ExamTypeName || ""}
              </Typography>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    // checked={checkBoxChecked}
                    onChange={(event) => handleShuffleQuiz(event)}
                    sx={commonCheckboxField}
                  />
                }
                label="Shuffle questions and selections within the quiz. Does not cascade to sub-sections. "
                sx={checkboxLabelStyle}
              />
            </Grid> */}
            <Grid item xs={12} md={6} p={"0px !important"} height={"0px"}></Grid>
            {/* {isShuffleQuiz == 1 ||
              (examType?.ExamTypeSlug === quizzExamSlug && (
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset":
                      {
                        border: "1px solid rgba(115, 138, 150, 0.5) !important",
                      },
                  }}
                >
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Paging
                  </Typography>

                  <CustomSelect
                    id="standard-select-currency"
                    value={numberOfPaging}
                    onChange={handleNumberOfPaging}
                    fullWidth
                    variant="outlined"
                    disabled={isShuffleQuiz}
                    displayEmpty
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
                    <MenuItem defaultValue="" disabled>
                      Select Type
                    </MenuItem>
                    {pagingData?.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
              ))} */}
            <Grid item xs={12} md={6}></Grid>
            {examType?.ExamTypeSlug != mockExamSlug && (
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Attempts and Completion</Typography>
              </Grid>
            )}
            {examType?.ExamTypeSlug != mockExamSlug && (
              <>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <Box>
                      <Typography
                        variant="paragraph3"
                        component={"p"}
                        sx={commonFieldLabelStyle}
                      >
                        Number of Attempts
                        <span style={{ color: "#FC4B6C" }}>*</span>
                      </Typography>
                      <Stack
                        direction={"row"}
                        gap={"10px"}
                        width={"367px"}
                        alignItems={"center"}
                      >
                        <CustomTextField
                          id=""
                          variant="outlined"
                          fullWidth
                          disabled={
                            isUnlimited ||
                            examType?.ExamTypeSlug === mockExamSlug
                          }
                          placeholder={""}
                          name="ExamNumberofAttempts"
                          value={formik.values.ExamNumberofAttempts}
                          onChange={formik.handleChange}
                        />{" "}
                        <Typography variant="paragraph3" component={"p"}>
                          Attempt
                        </Typography>
                      </Stack>
                      <Stack mt={"10px"}>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              // checked={checkBoxChecked}
                              onChange={(event) => handleSetUnlimited(event)}
                              checked={isUnlimited}
                              disabled={examType?.ExamTypeSlug === mockExamSlug}
                              sx={commonCheckboxField}
                            />
                          }
                          label="Unlimited"
                          sx={checkboxLabelStyle}
                        />
                      </Stack>
                      {formik.touched.ExamNumberofAttempts &&
                        formik.errors.ExamNumberofAttempts && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {/* {typeof formik.errors.ExamNumberofAttempts ===
                          "string"
                            ? formik.errors.ExamNumberofAttempts
                            : Array.isArray(formik.errors.ExamNumberofAttempts)
                            ? formik.errors.ExamNumberofAttempts.join(", ")
                            : Object.values(
                                formik.errors.ExamNumberofAttempts
                              ).join(", ")} */}
                            {typeof formik.errors.ExamNumberofAttempts ===
                              "string"
                              ? formik.errors.ExamNumberofAttempts
                              : "An error occurred"}
                          </FormHelperText>
                        )}
                      {/* {examType?.ExamTypeSlug === mockExamSlug ? (
                      <CustomTextField
                        id=""
                        variant="outlined"
                        fullWidth
                        disabled={examType?.ExamTypeSlug === mockExamSlug}
                        placeholder={""}
                        name="ExamPaging"
                        value={formik.values.ExamNumberofAttempts}
                        onChange={formik.handleChange}
                        sx={{
                          ...disableInputStyle,
                          backgroundColor: "transparent !important",
                          "& .Mui-disabled fieldset": {
                            backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                            border: `${theme.palette.secondary.disableFieldColor} !important`,
                          },
                        }}
                      />
                    ) : (
                      <CustomSelect
                        id="standard-select-currency"
                        value={numberOfAttempt}
                        onChange={handleNumberOfAttempt}
                        fullWidth
                        variant="outlined"
                        // disabled={isShuffleQuiz}
                        displayEmpty
                        sx={{
                          "&.Mui-focused fieldset,&.MuiInputBase-root:hover fieldset":
                            {
                              border:
                                "1px solid rgba(115, 138, 150, 0.5) !important",
                            },
                          ...disableInputStyle,
                          backgroundColor: "transparent !important",
                          "&.Mui-disabled fieldset,&.Mui-disabled:hover fieldset":
                            {
                              bgcolor: `${theme.palette.secondary.disableFieldColor} !important`,
                              border: "0px !important",
                            },
                          "&.Mui-disabled": {
                            border: `0px !important`,
                          },
                        }}
                      >
                        <MenuItem defaultValue="" disabled>
                          Select Type
                        </MenuItem>
                        {attemptAllow?.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    )} */}
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <Box>
                      <Typography
                        variant="paragraph3"
                        component={"p"}
                        sx={commonFieldLabelStyle}
                      >
                        Overall Grade Calculation
                        <span style={{ color: "#FC4B6C" }}>*</span>
                      </Typography>
                      {examType?.ExamTypeSlug == mockExamSlug ? (
                        <CustomTextField
                          id=""
                          variant="outlined"
                          fullWidth
                          disabled={
                            isShuffleQuiz ||
                            examType?.ExamTypeSlug === mockExamSlug
                          }
                          placeholder={""}
                          name="ExamPaging"
                          value={"First Attempt"}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        <CustomSelect
                          id="standard-select-currency"
                          // value={examCycle}
                          value={selectedGrade}
                          onChange={handleGradeDropDown}
                          fullWidth
                          variant="outlined"
                          displayEmpty
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
                          <MenuItem defaultValue="" disabled>
                            Select Type
                          </MenuItem>
                          {gradeCalculation?.map((option: any) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      )}
                      {formik.touched.ExamOverallGradeCalculationID &&
                        formik.errors.ExamOverallGradeCalculationID && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {typeof formik.errors
                              .ExamOverallGradeCalculationID === "string"
                              ? formik.errors.ExamOverallGradeCalculationID
                              : "An error occurred"}
                          </FormHelperText>
                        )}
                    </Box>
                  </Stack>
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "felx",
                flexDirection: "column",
                gap: "10px",
                "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
                  border: "1px solid rgba(115, 138, 150, 0.5) !important",
                },
              }}
            >
              {(examType?.ExamTypeSlug !== mockExamSlug ||
                (examType?.ExamTypeSlug === mockExamSlug && mockOnlineAutoPublish == true)) && (
                  <><Typography variant="h5" mb={"16px"}>Evaluation and Feedback</Typography><Stack
                    sx={{
                      "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
                        border: "1px solid rgba(115, 138, 150, 0.5) !important",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={<CustomCheckbox
                        // checked={checkBoxChecked}
                        onChange={(event) => handleExamFeedBack(event)}
                        //disabled={examType?.ExamTypeSlug == mockExamSlug}
                        sx={commonCheckboxField} />}
                      label="Auto Publish Attempt Results immediately upon completion. "
                      sx={checkboxLabelStyle} />
                  </Stack>
                  </>
                )}
              {/* <Typography
                variant="paragraph3"
                component={"p"}
                sx={commonFieldLabelStyle}
              >
                When published, display to learners:
              </Typography>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    // checked={checkBoxChecked}
                    onChange={(event) => handleDisplayLerners(event)}
                    sx={commonCheckboxField}
                  />
                }
                label="Attempt Grade"
                sx={{ ...checkboxLabelStyle, mt: "15px" }}
              />
              <Stack pl={"30px"}>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Additionally:
                </Typography>
                <CustomSelect
                  id="standard-select-currency"
                  // value={examCycle}
                  onChange={handleAdditionally}
                  fullWidth
                  variant="outlined"
                  displayEmpty
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
                  <MenuItem defaultValue="" disabled>
                    Select Type
                  </MenuItem>
                  {additionallyDropDown?.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Stack> */}
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Exam Instructions
                  </Typography>
                  <CustomTextField
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    name="ExamInstructions"
                    value={formik.values.ExamInstructions}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
        <Box mt={6}>
          <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
            <Button
              sx={{
                ...secondaryButon,
                mr: "auto",
              }}
              onClick={() => {
                // router.push("/imock-exam");
                handleSaveAsDraft();
              }}
            >
              Save as Draft
            </Button>

            {/* <Button
              sx={{
                borderRadius: "6px",
                color: theme.palette.secondary.fieldText,
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: "#f1f4f5",
                padding: "8px 25px",
                minWidth: "150px",
                marginLeft: "auto",
                "&:hover": {
                  color: theme.palette.secondary.fieldText,
                  backgroundColor: `#f1f4f5`,
                },
              }}
              onClick={() => {
                router.push("/imock-exam/station-management");
              }}
            >
              Skip for now
            </Button> */}
            <Button
              sx={{
                ...primaryButon,
              }}
              type="submit"
            // onClick={() => router.push("/acj-exam/question-selection")}
            >
              Next
            </Button>
          </Box>
        </Box>
      </form>
      <CommonPopup
        open={openModal}
        onClose={handleModalClose}
        url={"/acj-exam"}
      />
    </PageContainer>
  );
}
