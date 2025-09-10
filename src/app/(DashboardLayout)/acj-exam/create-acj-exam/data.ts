const locationData = [
  { title: "Location1" },
  { title: "Location2" },
  { title: "Location3" },
  { title: "Location4" },
  { title: "Location5" },
  { title: "Location6" },
  { title: "Location6" }
]

export default locationData

export const hours = Array.from({ length: 12 }, (_, i) => i + 1)

export const minutes = Array.from({ length: 60 / 5 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
)

export const ampm = ["AM", "PM"]

export const MockexamLocationTypeData = [
  { selectid: 2, title: "On Site" },
  { selectid: 1, title: "Online" }
]

export const examInitialValues = {
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
  ExamDueDate: "",
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
  CSTimeOfExamDue: ""
}
