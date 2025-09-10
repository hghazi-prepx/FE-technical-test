import { ColumnDef } from "@/types/common.type"
import { ExamType } from "@/types/exam.type"
import { format } from "date-fns"

export const examColumns: ColumnDef<ExamType>[] = [
  { field: "imockid", headerName: "imockid" },
  { field: "examtype", headerName: "Type" },
  { field: "examname", headerName: "Name" },
  { field: "examnumber", headerName: "Exam Number" },
  {
    field: "examdate",
    headerName: "Date",
    render: (row) => format(new Date(row.examdate), "dd/MM/yyyy hh:mm")
  }
]
