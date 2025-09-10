"use client"
import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "@/app/(DashboardLayout)/components/Toast"
import {
  assignTraineeForNewExam,
  deleteStudentForNewExam,
  getAssignTraineeListForNewExam,
  getAvailableTraineeForNewExam
} from "@/services/newExamFlow/newExamFlowAPI"
import usePagination2 from "@/hooks/usePagination2"
import { PAGINATION } from "@/utils/Constants"
import { CheckedItems } from "@/types/exam.type"

const { DEFAULT_PAGE } = PAGINATION

const useAssignTrainee = () => {
  const searchRouter = useSearchParams()
  const examId: any = searchRouter.get("examid")
  const [openModal, setOpenModal] = useState(false)
  const [locationModel, setLocationModel] = useState(false)
  const [openModelForDelete, setOpenModelForDelete] = useState(false)
  const [checkorderBy, setCheckorderBy] = useState<any>("")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [studentData, setStudentData] = useState<any>()
  const [studentSelectedId, setStudentSelectedId] = useState<any>([])
  const [selectedStudentData, setSelectedStudentData] = useState<any>()
  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>()
  const [orderBy, setOrderBy] = useState<any>("ExamAssingStudentCreatedOn DESC")
  const [deleteText, setDeleteText] = useState("")
  const [allChecked, setAllChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([])
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const handleModalClose = () => setOpenModelForDelete(false)
  const handleLocationModelClose = () => setLocationModel(false)
  const [selectedAssignStudentId, setSelectedAssignStudentId] = useState<any>()
  const [modalPreviewOpen, setmodalPreviewOpen] = useState(false)
  const [traineeData, setTraineeData] = useState<any>()
  const [previewStudentId, setPreviewStudentId] = useState<any>()
  const [errorModel, setErrorModel] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])
  const router = useRouter()
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    const getAvailableStudentList = async () => {
      setSearchLoading(true)
      const bodyData = {
        limit: 100000,
        page: DEFAULT_PAGE,
        search: searchValue,
        searchedKey: [],
        ascDesc: "UserCreatedOn DESC",
        ExamID: examId
      }
      await getAvailableTraineeForNewExam(bodyData)
        .then((result) => {
          if (result?.success) {
            setStudentData(result?.data?.results)
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
        getAvailableStudentList()
      }, 500) // Adjust the delay as needed

      return () => clearTimeout(timeoutId) // Clean up the timeout on component unmount or inputValue change
    } else {
      setStudentData([]) // Clear options when input is less than 3 characters
    }
  }, [searchValue])

  useEffect(() => {
    if (openModal || openModelForDelete) {
      setAnchorEl(null)
    }
  }, [openModal, openModelForDelete])

  useEffect(() => {
    getAllSelectedStudent()
  }, [page, rowsPerPage, orderBy])

  const getAllSelectedStudent = async () => {
    setIsLoading(true)
    setAllChecked(false)
    setCheckedItems({})
    const bodyData = {
      limit: rowsPerPage,
      page: page,
      search: "",
      searchedKey: [],
      ascDesc: orderBy,
      ExamID: examId
    }
    await getAssignTraineeListForNewExam(bodyData)
      .then((result) => {
        if (result?.success) {
          setSelectedStudentData([])
          setAnchorEl(null)
          setSelectedAssignStudentId("")
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)
        setIsLoading(false)
      })
  }

  const handleAssignStudent = async () => {
    setIsLoading(true)
    const dataBody = {
      ExamID: examId,
      StudentList: studentSelectedId
    }
    await assignTraineeForNewExam(dataBody)
      .then((result) => {
        if (result?.success) {
          toast({
            type: "success",
            message: "Assigned trainees successfully."
          })

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
              UserRoleTextID: `Trainee-${student.StudentID}`
            }))
          })

          setStudentSelectedId([])
          setSelectedOptions([])
        }

        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error: ", error)

        setIsLoading(false)
      })
  }

  const studentHandleChange = (value: any) => {
    if (!value || value.length == 0) {
      setSelectedStudents([])
      setStudentSelectedId([]) // Deselecting all students, so empty the array
      setOpenAutocomplete(false)
    }
    const studentIDs = new Set<number>()

    for (let i = 0; i < value.length; i++) {
      const student = value[i]
      if (studentIDs.has(student.UserID)) {
        toast({
          type: "error",
          message: `This trainee has been already selected.`
        })
        value.splice(i, 1) // Remove the duplicate entry
        i-- // Adjust the index after removal
      } else {
        studentIDs.add(student.UserID)
      }
    }
    const studentIDsAndCampusIDs = value.map((student: any) => ({
      StudentID: student.UserID,
      CampusID: student.CampusID ? student.CampusID : 0
    }))
    setStudentSelectedId(studentIDsAndCampusIDs)
    setSelectedStudents(value.map((option: any) => option.UserID))
    // setOpenAutocomplete(false);
  }

  /**
   * @ Function Name      : handleChange
   * @ Function Purpose   : Set searched key like first name, last name etc
   */
  const handleChange = (value: any) => {
    debugger
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

  const handleAllChange = () => {
    // Handle the change event for the "all_check" checkbox
    const newCheckedState: { [key: string]: boolean } = {}
    const allnewCheckedState: string[] = []

    if (!allChecked) {
      // Set all checkboxes to checked
      selectedStudentData.results.forEach((tdata: { id: any }) => {
        newCheckedState[tdata.id] = true
        allnewCheckedState.push(tdata.id)
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
  const handleDeleteSelectedStudent = async (id: any) => {
    let finalArray: any = []
    if (id) {
      finalArray.push(id)
    } else {
      finalArray = selectedCheckboxes
    }
    const bodyData = {
      ExamID: examId,
      id: finalArray
    }
    await deleteStudentForNewExam(bodyData)
      .then((result) => {
        debugger
        if (result?.success) {
          setSelectedCheckboxes([])
          setSelectedStudentData((prev: any) => {
            return {
              results: prev.results.filter(
                (student: any) => !finalArray.includes(student.id)
              )
            }
          })
          setSelectedStudents([])
          handleModalClose()
        } else {
          handleModalClose()
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log("error:", error)
        handleModalClose()
        setIsLoading(false)
      })
    // }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: any,
    StudentID: any
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedAssignStudentId(id)
    setPreviewStudentId(StudentID)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedAssignStudentId("")
  }

  const handleSaveAsDraft = async () => {
    setIsLoading(true)
    toast({ type: "success", message: "Draft saved successfully." })
    router.push("/Exam-Management")
    setIsLoading(false)
  }

  const handlePreviewModalClose = () => {
    setmodalPreviewOpen(false)
  }

  const searchItem = (event: any) => {
    setSearchValue(event.target.value)
    if (event.target.value) {
      setOpenAutocomplete(true)
    } else {
      setOpenAutocomplete(false)
    }
  }

  return {
    searchLoading,
    studentData,
    openAutocomplete,
    setOpenAutocomplete,
    setSearchValue,
    defaultSelectedValue,
    selectedOptions,
    selectedStudents,
    setSelectedOptions,
    studentHandleChange,
    searchItem,
    searchValue,
    studentSelectedId,
    handleAssignStudent,
    allChecked,
    handleAllChange,
    handleDeleteSelectedStudent,
    selectedAssignStudentId,
    selectedCheckboxes,
    checkorderBy,
    handleOrderBy,
    isLoading,
    router,
    examId,
    handleSaveAsDraft,
    modalPreviewOpen,
    handlePreviewModalClose,
    traineeData,
    selectedStudentData,
    open,
    handleClick,
    checkedItems,
    handleChange,
    handleClose,
    anchorEl,
    openModelForDelete,
    rowsPerPage,
    page,
    handlePagination,
    errorModel,
    handleLocationModelClose,
    handleModalClose,
    setDeleteText,
    setSelectedStudents
  }
}

export default useAssignTrainee
