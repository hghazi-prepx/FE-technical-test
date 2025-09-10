import { useRouter, useSearchParams } from "next/navigation"
import usePagination2 from "@/hooks/usePagination2"
import { useEffect, useState } from "react"
import { PAGINATION } from "@/utils/Constants"
import { createFilterOptions } from "@mui/material/Autocomplete"
import toast from "../../src/app/(DashboardLayout)/components/Toast"
import {
  createQuestionForNewExam,
  deleteQuestionForNewExam,
  getQuestionListForNewExam
} from "@/services/newExamFlow/newExamFlowAPI"

const useQuestionSelection = () => {
  const router = useRouter()
  const searchRouter = useSearchParams()
  const [PrepXID, setPrepXID] = useState(new Date().getTime())
  const examId: any = searchRouter.get("examid")
  const [loading, setLoading] = useState(false)
  const [bookletId, setBookletId] = useState("1")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [questionData, setQuestionData] = useState<any>()
  const [searchValue, setSearchValue] = useState<any>("")
  const [selectedQuestionData, setSelectedQuestionData] = useState<any>()
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([])
  const [selectedAssignStudentId, setSelectedAssignStudentId] = useState<any>()
  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>()
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<any>([])
  type CheckedItems = {
    [key: string]: boolean
  }
  const [allChecked, setAllChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [openModal, setOpenModal] = useState(false)
  const handleModalClose = () => setOpenModal(false)
  const [selectedAssignQuestionId, setSelectedAssignQuestionId] =
    useState<any>()
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [checkorderBy, setCheckorderBy] = useState<any>("")
  const [orderBy, setOrderBy] = useState<any>("BookletID ASC")
  const [deleteText, setDeleteText] = useState("")
  const [modalPreviewOpen, setmodalPreviewOpen] = useState(false)
  const [previewData, setPreViewData] = useState<any>()
  const [previewQuestionId, setPreviewQuestionId] = useState<any>()
  const [examData, setExamData] = useState<any>()
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [tabValue, setTabValue] = useState("1")
  const [selectedQuestionStatus, setSelectedQuestionStatus] = useState<any>()
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { DEFAULT_PAGE } = PAGINATION

  const isDisabled =
    selectedQuestionData?.results?.filter(
      (question: any) => question.BookletID === `Booklet ${bookletId}`
    ).length >= examData?.ExamBookletsQuestions

  useEffect(() => {
    const getAllSelectQuestion = async () => {
      setSearchLoading(true)
      const bodyData = {
        limit: 10000,
        page: DEFAULT_PAGE,
        search: searchValue,
        searchedKey: [],
        ascDesc: "QuestionCreatedOn DESC",
        ExamID: examId,
        ExamBookletsQuestions: examData?.ExamBookletsQuestions,
        BookletID: bookletId,
        ExamCourseType: examData?.ExamCourseType
      }

      await getQuestionListForNewExam(bodyData)
        .then((result: any) => {
          if (result?.success) {
            setQuestionData(result?.data?.results)
            const defaultValue = result?.data?.assignStudent?.map(
              (studentId: any) => studentId
            )
            setDefaultSelectedValue(defaultValue)
            setSelectedAssignStudentId("")
          }

          setSearchLoading(false)
        })
        .catch((error) => {
          console.log("error: ", error)

          setSearchLoading(false)
        })
    }

    if (searchValue.length > 0) {
      const timeoutId = setTimeout(() => {
        getAllSelectQuestion()
      }, 500) // Adjust the delay as needed

      return () => clearTimeout(timeoutId) // Clean up the timeout on component unmount or inputValue change
    } else {
      setQuestionData([]) // Clear options when input is less than 3 characters
    }
  }, [searchValue])

  useEffect(() => {
    getAllSelectedQuestion()
  }, [page, rowsPerPage, orderBy])

  const searchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value) // Update the search value state
    if (value) {
      setOpenAutocomplete(true)
    } else {
      setOpenAutocomplete(false)
    }
  }

  const getAllSelectedQuestion = async () => {
    setAllChecked(false)
    setIsLoading(true)
    setCheckedItems({})
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      search: "",
      searchedKey: [],
      ascDesc: orderBy,
      ExamID: examId
    }
  }

  const filterOptions: any = createFilterOptions({
    matchFrom: "any",
    limit: 10
  })

  const handleSaveAsDraft = async () => {
    setIsLoading(true)
    toast({ type: "success", message: "Draft saved successfully." })
    router.push("/Exam-Management")
    setIsLoading(false)
  }

  const bookletHandleChange = async (event: any) => {
    setIsLoading(true)
    setBookletId(event.target.value)
    setSearchValue("")
    setSelectedQuestions([])
    setOpenAutocomplete(false)
    setSelectedCheckboxes([])
    getAllSelectedQuestion()
  }

  const updateQuestionStatus = async (questionStatus: any) => {
    const bodyData = {
      ExamQuestionID: selectedAssignQuestionId,
      ExamQuestionStatus: questionStatus == 1 ? 0 : 1
    }
  }

  const removeKeepInReportQuestion = async (selectedAssignQuestionId: any) => {
    const bodyData = {
      ExamID: examId,
      ExamQuestionID: selectedAssignQuestionId
    }
    setIsLoading(false)
  }

  const handleAssignQuestion = async () => {
    setIsLoading(true)
    const dataBody = {
      ExamID: examId,
      QuestionID: selectedQuestionIds,
      BookletID: bookletId
    }
    await createQuestionForNewExam(dataBody)
      .then((result) => {
        if (result?.success) {
          toast({
            type: "success",
            message: "Assigned question successfully."
          })
          setQuestionData([])
          setSelectedOptions([])
          setSelectedQuestionData({
            results: selectedQuestionIds.map((id: any) => ({
              ExamQuestionID: id,
              BookletID: `Booklet ${bookletId}`,
              QuestionID: id,
              CourseTypeName: "ACJ",
              ExamQuestionStatus: 1,
              QuestionTextID: `Question-${id}`,
              QuestionTopicName: "Radiology",
              QuestionTypeFor: "msq"
            }))
          })
          // getAllSelectedQuestion();
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
      })
      .finally(() => setIsLoading(false))
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    questionId: any,
    previewId: any,
    questionStatus: any
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedAssignQuestionId(questionId)
    setPreviewQuestionId(previewId)
    setSelectedQuestionStatus(questionStatus)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedAssignQuestionId("")
  }

  /**
   * @ Function Name      : handleChange
   * @ Function Purpose   : Set searched key like first name, last name etc
   */
  const handleChange = (value: any) => {
    // Check if the checkbox value is already in the array
    const index = selectedCheckboxes.indexOf(value)
    setCheckedItems((prevState) => ({
      ...prevState,
      [value]: !prevState[value as keyof typeof prevState]
    }))

    if (index === -1) {
      // If not, add it to the array
      setSelectedCheckboxes([...selectedCheckboxes, value])
    } else {
      setAllChecked(false)
      // If yes, remove it from the array
      const updatedCheckboxes = [...selectedCheckboxes]
      updatedCheckboxes.splice(index, 1)
      setSelectedCheckboxes(updatedCheckboxes)
    }
  }

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      setSelectedQuestions([])
      setSelectedQuestionIds([]) // Deselecting all students, so empty the array
      setOpenAutocomplete(false)
    }
    const questionIDs = new Set<number>()
    for (let i = 0; i < value.length; i++) {
      const question = value[i]
      if (questionIDs.has(question.QuestionID)) {
        toast({
          type: "error",
          message: `This question has been already selected.`
        })
        value.splice(i, 1) // Remove the duplicate entry
        i-- // Adjust the index after removal
      } else {
        questionIDs.add(question.QuestionID)
      }
    }
    const selectedQuestionID = value.map((question: any) => question.QuestionID)
    setSelectedQuestionIds(selectedQuestionID)
    // setSelectedQuestions(Array.from(questionIDs));
    setSelectedQuestions(value.map((option: any) => option.QuestionID))
    // setOpenAutocomplete(false);
  }

  const handleAllChange = () => {
    // Handle the change event for the "all_check" checkbox
    const newCheckedState: { [key: string]: boolean } = {}
    const allnewCheckedState: string[] = []

    if (!allChecked) {
      // Set all checkboxes to checked
      selectedQuestionData.results.forEach((tdata: { ExamQuestionID: any }) => {
        newCheckedState[tdata.ExamQuestionID] = true
        allnewCheckedState.push(tdata.ExamQuestionID)
        //selectedCheckboxes([...selectedCheckboxes, tdata.QuestionID]);
      })
    }
    setSelectedCheckboxes(allnewCheckedState)

    setAllChecked(!allChecked)
    setCheckedItems(newCheckedState)
  }

  /**
   * @ Function Name      : handleOrderBy
   * @ Function Purpose   : Handle filters ascending and descending order
   */
  const handleOrderBy = (key: any, order: any) => {
    const combineKey = key + " " + order
    setCheckorderBy(key + "" + order)
    setOrderBy(combineKey)
  }

  /**
   * @ Function Name      : handleDeleteStation
   * @ Function Purpose   : Calling API for deleting station
   */
  const handleDeleteSelectedQuestion = async (id?: any) => {
    console.log("id: ", id)
    console.log("selectedCheckboxes: ", selectedCheckboxes)
    let finalArray: any = []
    if (id) {
      finalArray.push(id)
    } else {
      finalArray = selectedCheckboxes
    }
    const bodyData = {
      ExamID: examId,
      ExamQuestionID: finalArray
    }
    await deleteQuestionForNewExam(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedCheckboxes([])
          setSelectedQuestionData((prev: any) => {
            return {
              results: prev.results.filter(
                (question: any) => !finalArray.includes(question.ExamQuestionID)
              )
            }
          })

          setSelectedQuestions([])
        } else {
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log("error:", error)
        setIsLoading(false)
      })
    // }
  }

  const handlePreviewModalOpen = async (questionId: any) => {
    setIsLoading(true)
  }

  const handlePreviewModalClose = () => {
    setmodalPreviewOpen(false)
  }

  const tabHandelChange = (event: React.SyntheticEvent, newValue: any) => {
    setTabValue(newValue)
  }

  return {
    examId,
    searchItem,
    getAllSelectedQuestion,
    filterOptions,
    handleSaveAsDraft,
    bookletHandleChange,
    updateQuestionStatus,
    removeKeepInReportQuestion,
    handleAssignQuestion,
    handleClick,
    handleClose,
    handleChange,
    studentHandleChange,
    handleAllChange,
    handleOrderBy,
    handleDeleteSelectedQuestion,
    handlePreviewModalOpen,
    handlePreviewModalClose,
    tabHandelChange,
    selectedQuestionData,
    checkedItems,
    allChecked,
    selectedCheckboxes,
    checkorderBy,
    anchorEl,
    open,
    selectedAssignQuestionId,
    previewQuestionId,
    selectedQuestionStatus,
    openModal,
    setDeleteText,
    handleModalClose,
    handlePagination,
    rowsPerPage,
    page,
    PrepXID,
    examData,
    bookletId,
    questionData,
    selectedOptions,
    defaultSelectedValue,
    setSelectedOptions,
    setOpenAutocomplete,
    searchValue,
    selectedQuestionIds,
    router,
    modalPreviewOpen,
    previewData,
    setSearchValue,
    searchLoading,
    loading,
    openAutocomplete,
    tabValue,
    isDisabled,
    selectedQuestions,
    isLoading
  }
}

export default useQuestionSelection
