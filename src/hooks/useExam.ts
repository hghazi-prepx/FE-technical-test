import { iMockExamTableData } from "@/app/(DashboardLayout)/Exam-Management/imetableData"
import { useState } from "react"

const useExam = () => {
  const [iMockExamData, setIMockExamData] = useState(iMockExamTableData)
  return { iMockExamData, setIMockExamData }
}

export default useExam