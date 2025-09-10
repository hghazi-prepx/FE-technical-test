import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Dayjs } from "dayjs"
import { useFormik } from "formik"
import moment from "moment-timezone"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { getCampusList } from "@/services/station/stationAPI"
import { getCourseLmsList } from "@/services/adminCourseDashboard/adminCourseDashboard"
import { CheckedItems } from "@/types/exam.type"
import { gradeCalculation } from "@/app/(DashboardLayout)/acj-exam/dropDowns"
import { examInitialValues } from "@/app/(DashboardLayout)/acj-exam/create-acj-exam/data"
import { getValidationSchema } from "@/app/(DashboardLayout)/acj-exam/create-acj-exam/validation"
import {
  exampTypeSlugAllowed,
  mockExamSlug,
  quizzExamSlug,
  selfAssessmentExamSlug
} from "@/app/(DashboardLayout)/acj-exam/constant"
import {
  addSelectedTimeToTimestamp,
  generateTimeOptions
} from "@/app/(DashboardLayout)/acj-exam/create-acj-exam/utils"
import { createNewExam } from "@/services/newExamFlow/newExamFlowAPI"
import { PAGINATION } from "@/utils/Constants"
import toast from "@/app/(DashboardLayout)/components/Toast"
import { getExamTypeList } from "@/services/examType/examTypeAPI"

const { DEFAULT_PAGE } = PAGINATION
const useCreateExam = () => {
  const searchRouter = useSearchParams()
  const examCourse: any = searchRouter.get("examcourse")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedHour, setSelectedHour] = useState("10")
  const [selectedMinute, setSelectedMinute] = useState("00")
  const [selectedShift, setSelectedShift] = useState("AM")
  const [dateValue2, setDateValue2] = useState<Dayjs | null>(null)
  const [start, setStart] = useState<any | null>("10:00 AM")
  const [selectedHourDue, setSelectedHourDue] = useState("10")
  const [selectedMinuteDue, setSelectedMinuteDue] = useState("00")
  const [selectedShiftDue, setSelectedShiftDue] = useState("AM")
  const [dateValue2Due, setDateValue2Due] = useState<Dayjs | null>(null)
  const [startDue, setStartDue] = useState<any | null>("10:00 AM")
  const [numberOfQuestionError, setNumberOfQuestionError] = useState<any>(false)
  const [examType, setExamType] = useState<any>()
  const [examTypeData, setExamTypeData] = useState<any>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [checkBoxChecked, setCheckBoxChecked] = useState(false)
  const [isShuffleQuiz, setIsShuffleQuiz] = useState<any>(false)
  const [numberOfAttempt, setNumberOfAttempt] = useState<any>()
  const [numberOfPaging, setNumberOfPaging] = useState<any>()
  const [isTimeLimit, setIsTimeLimit] = useState<any>(false)
  const [selectedExamCourse, setSelectedExamCourse] = useState<any>(null)
  const [availabilityDateValue, setAvailabilityDateValue] =
    React.useState<Dayjs | null>(null)
  const [dueDateValue, setDueDateValue] = React.useState<Dayjs | null>(null)
  const [timeDropDownData, setTimeDropDownData] = useState<any>([])
  const [selectedCheckBoxIndex, setSelectedCheckBoxIndex] = useState<any>([])
  const [globalDateTime, setGlobalDateTime] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<any>(false)
  const [openPopoverId, setOpenPopoverId] = useState<string | null>()
  const open = Boolean(anchorEl)
  const textFieldRef = useRef<HTMLDivElement | null>(null)
  const [selectedCountry1, setSelectedCountry1] = useState(null)
  const [mockOnlineAutoPublish, setMockOnlineAutoPublish] = useState<any>(false)
  const [isEvolution, setIsEvolution] = useState<any>()

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [countryData, setCountryData] = useState<any>()
  const [locationData, setLocationData] = useState<any>()
  const [examinationCourse, setExaminationCourse] = useState<any>([])
  const [originalCountryData, setOriginalCountryData] = useState<any>([])
  const [bookletValue, setBookletValue] = useState<any>("")
  const [isUnlimited, setIsUnlimited] = useState<any>(false)
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([])
  const [selectedGrade, setSelectedGrade] = useState(gradeCalculation[0].id)
  const [filteredTimeZones, setFilteredTimeZone] = useState<any>([])
  const [timeZone, setTimeZone] = useState("America/Toronto")
  const [rows, setRows] = useState<any>([
    {
      id: uuidv4(),
      ExamCampusDateTime: null,
      CountryID: 0,
      CampusID: 0,
      CountryWiseTimeZoneID: 0,
      timezones: [],
      selectedTime: { hour: "", minute: "", ampm: "" }
    }
  ])
  const [locationDate, setLocationDate] = useState<number | null>(null)
  const [examDetails, setExamDetails] = useState({})
  const handleModalClose = () => setOpenModal(false)
  const router = useRouter()

  const formik = useFormik({
    initialValues: examInitialValues,
    validationSchema: examType
      ? getValidationSchema(examType.ExamTypeSlug, isUnlimited)
      : undefined,
    onSubmit: async (values: any) => {
      setExamDetails(values)
      await handleSubmitExam(values)
    }
  })
  useEffect(() => {
    if (
      // added or condition so when any of the value changes it will recalculate
      examType &&
      examType?.ExamTypeSlug == mockExamSlug &&
      formik.values.ExamBookletDuration &&
      formik.values.ExamNumberofBookletsID &&
      formik.values.ExamBreakDuration != null
    ) {
      calculateTimeLimit()
    }
  }, [
    formik.values.ExamBookletDuration,
    formik.values.ExamNumberofBookletsID,
    formik.values.ExamBreakDuration
  ])

  useEffect(() => {
    getAllExamTypeList()
    setTimeDropDownData(generateTimeOptions())
    getAllLocation()
  }, [])

  useEffect(() => {
    getAllExaminationCourse()
  }, [examCourse])

  useEffect(() => {
    const filteredTimezones = originalCountryData
      .filter((country: any) => country.CountryID === selectedCountry1)
      .map((country: any) => ({
        CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
        Timezone: country.Timezone,
        GoogleTimezone: country.GoogleTimezone
      }))
    setFilteredTimeZone(filteredTimezones)
  }, [selectedCountry1])

  useEffect(() => {
    if (formik.values.ExamNumberofBookletsID == 1) {
      formik.setFieldValue("ExamBreakDuration", 0)
    }
  }, [formik.values.ExamNumberofBookletsID])

  const handleTimeChange = (
    key: string,
    value: string | number,
    rowId: string
  ) => {
    setRows((prevRows: any) => {
      const updatedRows = prevRows.map((row: any) => {
        if (row.id === rowId) {
          const newTime = { ...row.selectedTime, [key]: value }
          if (newTime.hour && newTime.minute && newTime.ampm) {
            const selectedTimeStr = `${newTime.hour}:${newTime.minute} ${newTime.ampm}`
            const newDateTime = addSelectedTimeToTimestamp(
              selectedTimeStr,
              globalDateTime
            )
            return {
              ...row,
              selectedTime: newTime,
              ExamCampusDateTime: newDateTime
            }
          }
          return { ...row, selectedTime: newTime }
        }
        return row
      })
      return updatedRows
    })

    if (key === "ampm") {
      handleClose(rowId)
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: event.currentTarget }))
    setOpenPopoverId(rowId)
  }

  const handleClose = (rowId: string) => {
    setAnchorEl((prev: any) => ({ ...prev, [rowId]: null }))
    setOpenPopoverId(null)
  }

  const handleSubmitExam = async (values: any) => {
    if (numberOfQuestionError) {
      return
    }
    setIsLoading(true)
    if (!isTimeLimit) {
      values.ExamTimeLimit = 0
    }

    values.CountryID = 32
    values.TimeZoneID = 248
    values.ExamCourseType = examCourse
    values.ExamNumberofQuestions = values.ExamNumberofQuestions || 1000

    if (
      selectedHour &&
      selectedMinute &&
      selectedShift &&
      availabilityDateValue
    ) {
      // Set the timezone correctly and clone the dateValue2 to avoid mutating it
      const date = moment(availabilityDateValue.valueOf()).tz(timeZone, true)
      // Adjust hour based on the AM/PM shift
      let hour = +selectedHour
      if (selectedShift === "PM" && hour < 12) {
        hour += 12 // Convert PM hours to 24-hour format
      } else if (selectedShift === "AM" && hour === 12) {
        hour = 0 // Handle midnight as 0 hour in 24-hour format
      }

      // Set the time correctly based on the adjusted hour and minute
      const localDate = date.clone().tz(timeZone, true) // Clone the date object with timezone

      localDate.set({
        hour: hour,
        minute: +selectedMinute,
        second: 0
      })
      const updatedTimestamp = localDate.valueOf()
      values.ExamAvailabilityDate = updatedTimestamp
    }

    try {
      if (values.ExamQuizStart == 2) {
        const MomentExamAvailabilityDate = moment(values.ExamAvailabilityDate)
        let Edd = MomentExamAvailabilityDate.add(
          values.ExamTimeLimit,
          "minutes"
        )
        values.ExamNumberofAttempts = 1

        values.ExamDueDate = Edd.valueOf()
      } else {
        if (
          selectedHourDue &&
          selectedMinuteDue &&
          selectedShiftDue &&
          dueDateValue
        ) {
          // Set the timezone correctly and clone the dateValue2 to avoid mutating it
          const date = moment(dueDateValue.valueOf()).tz(timeZone, true)
          // Adjust hour based on the AM/PM shift
          let hour = +selectedHourDue
          if (selectedShiftDue === "PM" && hour < 12) {
            hour += 12 // Convert PM hours to 24-hour format
          } else if (selectedShiftDue === "AM" && hour === 12) {
            hour = 0 // Handle midnight as 0 hour in 24-hour format
          }

          // Set the time correctly based on the adjusted hour and minute
          const localDate = date.clone().tz(timeZone, true) // Clone the date object with timezone

          localDate.set({
            hour: hour,
            minute: +selectedMinuteDue,
            second: 0
          })
          const updatedTimestamp = localDate.valueOf()
          values.ExamDueDate = updatedTimestamp
        }
      }

      delete values.CSTimeOfExam
      delete values.CSTimeOfExamDue

      if (examType?.ExamTypeSlug === mockExamSlug) {
        values.ExamNumberofAttempts = 1
      }

      const result = await createNewExam(values)
      console.log("createNewExam result: ", result)
      if (result?.success) {
        toast({
          type: "success",
          message: "Exam has been created successfully."
        })
        router.push(
          `/acj-exam/question-selection?examid=${result?.data?.ExamID}`
        )
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        type: "error",
        message: "Sorry, something went wrong. Please try again."
      })
      setIsLoading(false)
      console.log("error: ", error)
    }
  }
  //Calling to get exam type list API
  const getAllExamTypeList = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE
    }
    await getExamTypeList(bodyData)
      .then((result) => {
        if (result?.success) {
          const filteredData = result.data?.results.filter((examType: any) =>
            exampTypeSlugAllowed.includes(examType.ExamTypeSlug)
          )

          setExamTypeData(filteredData)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        // setIsLoading(false);
      })
  }

  const handleMinuteChange = (event: any) => {
    setSelectedMinute(event.target.value)
    setStart(selectedHour + ":" + event.target.value + " " + selectedShift)
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + event.target.value + " " + selectedShift
    )
  }

  const handleShiftChange = (event: any) => {
    setSelectedShift(event.target.value)
    setStart(selectedHour + ":" + selectedMinute + " " + event.target.value)
    formik.setFieldValue(
      "CSTimeOfExam",
      selectedHour + ":" + selectedMinute + " " + event.target.value
    )
  }

  const handleHourChange = (event: any) => {
    setSelectedHour(event.target.value)
    setStart(event.target.value + ":" + selectedMinute + " " + selectedShift)
    formik.setFieldValue(
      "CSTimeOfExam",
      event.target.value + ":" + selectedMinute + " " + selectedShift
    )
  }

  const handleMinuteChangeDue = (event: any) => {
    setSelectedMinuteDue(event.target.value)
    setStartDue(
      selectedHourDue + ":" + event.target.value + " " + selectedShiftDue
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + event.target.value + " " + selectedShiftDue
    )
  }

  const handleShiftChangeDue = (event: any) => {
    setSelectedShiftDue(event.target.value)
    setStartDue(
      selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      selectedHourDue + ":" + selectedMinuteDue + " " + event.target.value
    )
  }

  const handleHourChangeDue = (event: any) => {
    setSelectedHourDue(event.target.value)
    setStartDue(
      event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue
    )
    formik.setFieldValue(
      "CSTimeOfExamDue",
      event.target.value + ":" + selectedMinuteDue + " " + selectedShiftDue
    )
  }

  const handleSetUnlimited = (event: any) => {
    setIsUnlimited(event.target.checked)
    formik.setFieldValue("ExamNumberofAttempts", "")
    if (event.target.checked == true) {
      formik.setErrors({
        ...formik.errors,
        ExamNumberofAttempts: "" // Clear the error for this field
      })
    }
  }

  /**
   * @ Function Name      : getAllLocation getCourseCycleList
   * @ Function Purpose   : getting locations details
   */
  const getAllLocation = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 100000000000000000,
      page: DEFAULT_PAGE
    }
    await getCampusList(bodyData)
      .then((result) => {
        if (result?.success) {
          setLocationData(result?.data)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        setIsLoading(false)
      })
  }

  /**
   * @ Function Name      : getAllExaminationCycle
   * @ Function Purpose   : getting examination cycle details
   */
  const getAllExaminationCourse = async () => {
    setIsLoading(true)
    const bodyData = {
      limit: 10000000,
      page: DEFAULT_PAGE
    }
    await getCourseLmsList(bodyData)
      .then((result) => {
        if (result?.success) {
          setExaminationCourse(result?.data?.results)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        setIsLoading(false)
      })
  }

  const addRow = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        id: uuidv4(),
        ExamCampusDateTime: "",
        CountryID: 0,
        CampusID: 0,
        CountryWiseTimeZoneID: 0,
        timezones: [],
        selectedTime: { hour: "", minute: "", ampm: "" }
      }
    ])
  }

  const handleDynamicTableInputChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setRows(
      rows?.map((row: any, i: number) =>
        i == index ? { ...row, [field]: value } : row
      )
    )
  }

  const handleDateChangeForLocation = (date: any) => {
    const adjustedDate = date
      ? date.hour(12).minute(0).second(0).millisecond(0)
      : null
    setLocationDate(adjustedDate ? adjustedDate.valueOf() : null)
    setGlobalDateTime(adjustedDate ? adjustedDate.valueOf() : null)

    setRows(
      rows.map((row: any, i: number) => {
        const newDateTime = addSelectedTimeToTimestamp(
          `${row.selectedTime.hour}:${row.selectedTime.minute} ${row.selectedTime.ampm}`,
          adjustedDate ? adjustedDate.valueOf() : null
        )
        return { ...row, ExamCampusDateTime: newDateTime }
      })
    )
  }

  const deleteRow = (indexes: any) => {
    if (rows.length == 1 && indexes.length > 0) {
      toast({
        type: "error",
        message: `At least one exam location is required to create this exam.`
      })
      return
    }
    setRows((prevRows: any) =>
      prevRows.filter((row: any, i: number) => !indexes.includes(i))
    )
    setSelectedCheckBoxIndex([])
    setCheckedItems({})
  }

  const handleCheckBoxChange = (index: any) => {
    // Check if the checkbox value is already in the array
    const isIndex = selectedCheckBoxIndex?.indexOf(index)
    setCheckedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index as keyof typeof prevState]
    }))

    if (isIndex == -1) {
      // If not, add it to the array
      setSelectedCheckBoxIndex([...selectedCheckBoxIndex, index])
    } else {
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckBoxIndex]
      updatedCheckboxes.splice(isIndex, 1)
      setSelectedCheckBoxIndex(updatedCheckboxes)
    }
  }

  // Handle change for exam type
  const handleChangeDropDown = (event: any) => {
    setExamType(event)
    setMockOnlineAutoPublish(false)
    if (event?.ExamTypeSlug === mockExamSlug) {
      setIsTimeLimit(true)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", "")
      formik.setFieldValue("ExamQuizStart", 2)
      formik.setFieldValue("ExamTimeLimitExpires", 1)
      formik.setFieldValue("ExamBreakDuration", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(1)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamNumberofAttempts", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 4)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 1)
      formik.setFieldValue("ExamNumberofQuestions", 1)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }
    if (event?.ExamTypeSlug === selfAssessmentExamSlug) {
      setIsTimeLimit(false)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamNumberofBookletsID", 1)
      formik.setFieldValue("ExamBreakDuration", 0)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamQuizStart", 0)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(0)
      formik.setFieldValue("ExamNumberofQuestions", 0)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }
    if (event?.ExamTypeSlug == quizzExamSlug) {
      setIsTimeLimit(false)
      setIsUnlimited(false)
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamQuizStart", 1)
      formik.setFieldValue("ExamTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", 1)
      formik.setFieldValue("ExamPaging", 1)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamNumberofQuestions", 0)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setIsEvolution(0)
    }

    formik.setFieldValue("ExamTypeID", event?.ExamTypeID)
  }

  const handleChangeDropDownLocationTypeData = (event: any, prop: any) => {
    if (event?.target?.value == 1) {
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofAttempts", "")
      formik.setFieldValue("ExamQuizStart", 1)
      formik.setFieldValue("ExamPaging", 1)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 1)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setMockOnlineAutoPublish(true)
      setIsEvolution(0)
    } else if (event?.target?.value == 2) {
      setIsTimeLimit(true)
      setIsUnlimited(false)
      formik.setFieldValue("ExamSetTimeLimit", 1)
      formik.setFieldValue("ExamNumberofBookletsID", "")
      formik.setFieldValue("ExamQuizStart", 2)
      formik.setFieldValue("ExamTimeLimitExpires", 1)
      formik.setFieldValue("ExamBreakDuration", 1)
      setNumberOfPaging(1)
      formik.setFieldValue("ExamPaging", 1)
      setNumberOfAttempt(1)
      formik.setFieldValue("ExamAdditionallyID", 1)
      formik.setFieldValue("ExamNumberofAttempts", 1)
      formik.setFieldValue("ExamOverallGradeCalculationID", 4)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamBookletDuration", 1)
      formik.setFieldValue("ExamNumberofQuestions", 1)
      formik.setFieldValue("ExamEvaluationFeedback", 0)
      setMockOnlineAutoPublish(false)
      setIsEvolution(0)
    }
  }

  const handleSaveAsDraft = async () => {
    const errors = await formik.validateForm()
    formik.setTouched(
      Object.keys(formik.values).reduce((acc: any, key: any) => {
        acc[key] = true
        return acc
      }, {})
    )
    if (Object.keys(errors).length > 0) {
      return // Exit if there are validation errors
    }
    const draftValues = { ...formik.values }

    try {
      const result = {
        success: true
      }
      if (result?.success) {
        toast({ type: "success", message: "Draft saved successfully." })
        router.push("/Exam-Management")
      } else {
        toast({ type: "error", message: "Failed to save draft" })
      }
    } catch (error) {
      toast({
        type: "error",
        message:
          "Sorry, something went wrong while saving the draft. Please try again."
      })
      console.error("Error saving draft:", error)
    }
  }
  // Handle change country dropdown
  const countryHandleChange = (event: any, index: any) => {
    const selectedCountryID = event.target.value
    handleDynamicTableInputChange(
      index,
      "CountryID",
      selectedCountryID ? selectedCountryID : null
    )
    const selectedCountry = originalCountryData.find(
      (country: any) => country.CountryID === selectedCountryID
    )

    if (selectedCountry) {
      const filteredTimezones = originalCountryData
        .filter((country: any) => country.CountryID === selectedCountryID)
        .map((country: any) => ({
          CountryWiseTimeZoneID: country.CountryWiseTimeZoneID,
          Timezone: country.Timezone,
          GoogleTimezone: country.GoogleTimezone
        }))

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, timezones: filteredTimezones }
          }
          return row
        })
      )

      const alreadySelectedCampuses = rows
        .filter((_: any, rowIndex: any) => rowIndex !== index) // Exclude the current row
        .map((row: any) => row.CampusID) // Get all selected CampusIDs
        .filter((campusID: any) => campusID !== 0) // Remove any unselected campuses (value 0)

      const filteredLocations = locationData.filter(
        (location: any) =>
          location.CountryID === selectedCountryID &&
          !alreadySelectedCampuses.includes(location.CampusID) // Filter out already selected campuses
      )

      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: filteredLocations }
          }
          return row
        })
      )
    } else {
      setRows((prevRows: any) =>
        prevRows.map((row: any, rowIndex: any) => {
          if (rowIndex === index) {
            return { ...row, locations: locationData }
          }
          return row
        })
      )
    }
  }

  //Handle Timezone dropdown
  const timezoneHandleChange = async (event: any, index: any) => {
    const selectedOption = event.target.value // Access the selected option object

    handleDynamicTableInputChange(
      index,
      "CountryWiseTimeZoneID",
      selectedOption ? selectedOption : null
    )
  }

  // Handle change country dropdown
  const campusHandleChange = (event: any, index: any) => {
    const selectedCampusID = event?.target.value ? event?.target.value : null
    handleDynamicTableInputChange(index, "CampusID", selectedCampusID)
    setSelectedCampuses((prevSelected) => {
      const updatedSelected = [...prevSelected]
      updatedSelected[index] = selectedCampusID
      return updatedSelected
    })

    setRows((prevRows: any) =>
      prevRows.map((row: any, rowIndex: any) => {
        const alreadySelectedCampuses = prevRows
          .filter((_: any, i: any) => i !== rowIndex)
          .map((r: any) => r.CampusID)
          .filter((id: number) => id !== 0)

        const filteredLocations = locationData.filter(
          (location: any) =>
            location.CountryID === row.CountryID &&
            !alreadySelectedCampuses.includes(location.CampusID)
        )

        return {
          ...row,
          locations: filteredLocations
        }
      })
    )
  }

  const handleChangeExamCourseDropDown = (value: any) => {
    let createCourseArray = value ? [value] : []
    if (!createCourseArray || createCourseArray.length == 0) {
      setSelectedExamCourse([]) // Deselecting all students, so empty the array
    } else {
      const selectedCourseIds: any = createCourseArray?.map(
        (course: any) => course
      )
      setSelectedExamCourse(selectedCourseIds?.[0])
      console.log("selectedCourseIds?.lmscourseid: ", [
        selectedCourseIds?.[0]?.lmscourseid
      ])
      formik.setFieldValue("PrepXExamAFKACJOSCECourse", [
        selectedCourseIds?.[0]?.lmscourseid
      ])
    }
  }

  // Handle change for long description check box
  const handleChangeCheckBox = (event: any) => {
    setCheckBoxChecked(event.target.checked)
    if (!event.target.checked) {
      formik.setFieldValue("LongDescription", "")
    }
  }

  // Handle change
  const handleAvailabilityDateChange = (newValue: Dayjs | null) => {
    setAvailabilityDateValue(newValue)
    setDateValue2(newValue)
    formik.setFieldValue("ExamAvailabilityDate", newValue?.valueOf())
  }
  // Handle change
  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDateValue(newValue)
    setDateValue2Due(newValue)
    formik.setFieldValue("ExamDueDate", newValue?.valueOf())
  }

  const quizStart = (value: any) => {
    if (examType?.ExamTypeSlug === quizzExamSlug && value == 2) {
      formik.setFieldValue("ExamTimeLimitExpires", 1)
    }
    formik.setFieldValue("ExamQuizStart", value)
  }

  const examTimeExpire = (value: any) => {
    formik.setFieldValue("ExamTimeLimitExpires", value)
  }

  const handleSetTimeLimit = (event: any) => {
    setIsTimeLimit(event.target.checked)
    formik.setFieldValue("ExamSetTimeLimit", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamQuizStart", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamTimeLimitExpires", event.target.checked ? 1 : 0)
    formik.setFieldValue("ExamTimeLimit", 1)
    if (!event.target.checked) {
      formik.setFieldValue("ExamBookletDuration", 0)
      formik.setFieldValue("ExamBreakDuration", 0)
      formik.setFieldValue("ExamTimeLimit", 0)
      formik.setFieldValue("ExamQuizStart", 0)
      formik.setFieldValue("ExamTimeLimitExpires", 0)
    }
  }

  const calculateTimeLimit = () => {
    const totalDuration =
      formik.values.ExamBookletDuration *
      parseInt(formik.values.ExamNumberofBookletsID)
    const finalValue = totalDuration + Number(formik.values.ExamBreakDuration)
    formik.setFieldValue("ExamTimeLimit", finalValue)
  }

  // Handle change
  const handleGradeDropDown = (event: any, prop: any) => {
    setSelectedGrade(event.target.value)
    formik.setFieldValue("ExamOverallGradeCalculationID", event.target.value)
  }

  const handleExamFeedBack = (event: any) => {
    formik.setFieldValue("ExamEvaluationFeedback", event.target.checked ? 1 : 0)
  }
  return {
    formik,
    examTypeData,
    examType,
    handleChangeDropDown,
    handleChangeExamCourseDropDown,
    examinationCourse,
    selectedExamCourse,
    checkBoxChecked,
    handleChangeCheckBox,
    handleChangeDropDownLocationTypeData,
    isTimeLimit,
    bookletValue,
    numberOfQuestionError,
    setNumberOfQuestionError,
    addRow,
    deleteRow,
    selectedCheckBoxIndex,
    campusHandleChange,
    rows,
    timezoneHandleChange,
    countryData,
    countryHandleChange,
    handleTimeChange,
    handleClose,
    anchorEl,
    openPopoverId,
    handleClick,
    textFieldRef,
    handleDateChangeForLocation,
    locationDate,
    handleCheckBoxChange,
    checkedItems,
    handleAvailabilityDateChange,
    availabilityDateValue,
    handleHourChange,
    selectedHour,
    handleShiftChange,
    selectedShift,
    handleMinuteChange,
    selectedMinute,
    start,
    startDue,
    handleDueDateChange,
    dueDateValue,
    handleHourChangeDue,
    selectedHourDue,
    handleMinuteChangeDue,
    selectedMinuteDue,
    handleShiftChangeDue,
    selectedShiftDue,
    handleExamFeedBack,
    mockOnlineAutoPublish,
    selectedGrade,
    handleGradeDropDown,
    isShuffleQuiz,
    handleSetUnlimited,
    isUnlimited,
    examTimeExpire,
    quizStart,
    handleSetTimeLimit,
    isLoading,
    openModal,
    handleModalClose,
    handleSaveAsDraft,
    examDetails
  }
}

export default useCreateExam
