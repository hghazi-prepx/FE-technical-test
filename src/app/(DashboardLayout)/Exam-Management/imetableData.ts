import { ExamType } from "@/types/exam.type"

const iMockExamTableData: ExamType[] = [
  {
    id: "1",
    imockid: "PX-1001",
    examnumber: "Station-001",
    examname: "PrepDoctors Mock Exam A",
    examtype: "iMock",
    examdate: "2025-09-15T09:30:00",
    active: true
  },
  {
    id: "2",
    imockid: "PX-1002",
    examnumber: "Station-002",
    examname: "Clinical Practice Exam B",
    examtype: "Final Mock",
    examdate: "2025-09-22T14:00:00",
    active: false
  },
  {
    id: "3",
    imockid: "PX-1003",
    examnumber: "Station-003",
    examname: "OSCE Simulation",
    examtype: "iMock",
    examdate: "2025-10-01T11:15:00",
    active: true
  },
  {
    id: "4",
    imockid: "PX-1004",
    examnumber: "Station-004",
    examname: "PrepDoctors Mock Exam C",
    examtype: "Trial",
    examdate: "2025-10-10T16:45:00",
    active: true
  },
  {
    id: "5",
    imockid: "PX-1005",
    examnumber: "Station-005",
    examname: "Clinical Knowledge Assessment",
    examtype: "iMock",
    examdate: "2025-10-20T08:00:00",
    active: true
  },
  {
    id: "6",
    imockid: "PX-1006",
    examnumber: "Station-006",
    examname: "Final Mock Exam D",
    examtype: "Final",
    examdate: "2025-10-28T13:30:00",
    active: false
  },
  {
    id: "7",
    imockid: "PX-1007",
    examnumber: "Station-007",
    examname: "OSCE Final Simulation",
    examtype: "iMock",
    examdate: "2025-11-05T10:00:00",
    active: true
  },
  {
    id: "8",
    imockid: "PX-1008",
    examnumber: "Station-008",
    examname: "PrepDoctors Mock Exam E",
    examtype: "Trial",
    examdate: "2025-11-12T15:20:00",
    active: true
  }
]

export { iMockExamTableData }
