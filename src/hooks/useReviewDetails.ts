import React, { useState } from "react"

import { useTheme } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import usePagination2 from "@/hooks/usePagination2"
import toast from "@/app/(DashboardLayout)/components/Toast"
import { stationList } from "@/app/(DashboardLayout)/Exam-Management/stations"

const useReviewDetails = () => {
  const router = useRouter()
  const searchRouter = useSearchParams()
  const examId: any = searchRouter.get("examid")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [iMockExamData] = useState<any>()
  const [selectedStudentData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0
  })
  const [selectedQuestionData] = useState<any>({
    results: [],
    totalPages: 0,
    totalRecords: 0
  })
  const { setPage, page, setRowsPerPage, rowsPerPage, handlePagination } =
    usePagination2()

  const {
    setPage: setPage1,
    page: page1,
    setRowsPerPage: setRowsPerPage1,
    rowsPerPage: rowsPerPage1,
    handlePagination: handlePagination1
  } = usePagination2()

  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  /**
   * @ Function Name      : handleChangeRowsPerPage
   * @ Function Purpose   : To change page size
   */
  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage1(parseInt(event.target.value, 10))
    setPage1(0)
  }

  /**
   * @ Function Name      : handleChangePage
   * @ Function Purpose   : For change page
   */
  const handleChangePage1 = (event: unknown, newPage: number) => {
    setPage1(newPage)
  }

  const countTotalAddedTrainee = (id: any) => {
    let count = 0
    selectedStudentData?.forEach((item: any) => {
      if (item.CampusID == id) {
        count++
      }
    })
    return count
  }

  const getStationNameById = (id: any) => {
    const stationData = stationList?.find(
      (stationData: any) => stationData.value == id
    )
    return stationData?.label
  }

  const updateExamDataStatus = async () => {
    if (selectedQuestionData.totalRecords == 0) {
      toast({
        type: "error",
        message: "Please select a Question for the exam"
      })
      return
    }
    try {
      setIsLoading(true)

      const bodyData = {
        Status: 1
      }

      //   const result = await updateIMockExamStatus(examId, bodyData)
      if (true) {
        router.push("/Exam-Management")
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("error: ", error)
    }
  }

  return {
    iMockExamData,
    isLoading,
    examId,
    selectedQuestionData,
    selectedStudentData,
    searchRouter,
    router,
    page,
    setRowsPerPage,
    rowsPerPage,
    handlePagination,
    handleChangeRowsPerPage1,
    handleChangePage,
    handleChangeRowsPerPage,
    updateExamDataStatus,
    getStationNameById,
    countTotalAddedTrainee,
    handleChangePage1,
    handlePagination1,
    page1,
    rowsPerPage1
  }
}

export default useReviewDetails
