import { SelectOption } from "@/types/common.type"

export const MenuNameEnum = {
  Role: "Role",
  Admin: "Admin",
  InstructorManagement: "Instructor Management",
  CourseCategory: "Course Category",
  CourseCycle: "Cycle",
  CourseType: "Type",

  Dashboard: "Dashboard",
  EnrollmentDashboard: "Enrollment Dashboard",
  AdminDashboard: "Admin Dashboard",

  ExaminationDashboard: "Examination Dashboard",
  RevenueDashboard: "Revenue Dashboard",

  Services: "Services",
  ContentWatermarking: "Content Watermarking",

  Apps: "Apps",

  MasterManagement: "Master Management",
  Campus: "Campus",
  CampusRoom: "Campus Room",
  Asset: "Asset",
  QuestionType: "Question Type",
  ExamType: "Exam Type",
  NotificationType: "Notification Type",

  CourseManagement: "Course Management",
  Course: "Course",
  Courses: "Courses",
  CycleManagement: "Cycle",
  CourseTypeManagement: "Type Management",
  CourseOffering: "Offering",
  CourseListing: "Listing",
  ScheduleTypeManagement: "Schedule Type",

  MediaManagement: "Media Management",
  Media: "Media",

  TraineeManagement: "Trainee Management",
  TraineeJourney: "Trainee Journey",
  OfficeHourRequests: "Office Hour Requests",

  FacultyManagement: "Faculty Management",
  Instructor: "Instructor",
  Actor: "Actor",
  LineManager: "Line Manager",
  OfficeManagement: "Office Management",
  TeamShiftInstructor: "Team Shift Instructor",
  TeamShiftActor: "Team Shift Actor",
  TimeSheet: "Time Sheet",

  AssessmentModule: "Assessment Module",
  QuestionManagement: "Question Bank",
  ExamManagement: "Exam Management",
  StationMediaUpload: "Station Media Upload",
  TraineeStationRecording: "Trimming Manager",
  Violations: "Violation Report",
  ExpiredException: "Expired Exam",
  StatusManagement: "Exam Status",
  ExamDelayManagement: "Exam Delay Management",
  ExamStatusManagement: "Exam Status Management",
  ExamReports: "Exam Reports",
  ExamAttempts: "Exam Attempts",
  ExamEvaluationRubric: "Clinical Skills Rubric",
  ProjectManagement: "Project Management",
  ProjectTopicManagement: "Project Topic Management",
  ClinicalSkillsEvaluationVersionHistory: "Evaluation Version History",
  TopicDetailsManagement: "Topic Details Management",

  ExamHistory: "Exam History",

  Communication: "Communication",
  SMS: "SMS",
  Emails: "Emails",
  InAppNotification: "Audio Cue Management",
  NotificationManagement: "Audio Cue Management",

  Settings: "Settings",
  UserManagement: "User Management",
  RoleManagement: "Role Management",
  SuperAdminManagement: "Super Admin Management",
  AdminManagement: "Admin Management",
  AuditLog: "Audit Log",
  CsCriteria: "CS Criteria"
}

export const MenuCodeEnum = {
  Role: "role",
  InstructorManagement: "instructor-management",
  CourseCategory: "course-category",
  CourseCycle: "course-cycle",
  CourseType: "course-type",
  LineManager: "line-manager-management",
  Dashboard: "dashboard",
  EnrollmentDashboard: "enrollment-dashboard",
  AdminDashboard: "admin-dashboard",
  ExaminationDashboard: "examination-dashboard",
  RevenueDashboard: "revenue-dashboard",

  Services: "services",
  ContentWatermarking: "content-watermarking",

  Apps: "apps",

  MasterManagement: "master-management",
  Campus: "campus",
  CampusRoom: "campus-room",
  Asset: "asset-management",
  QuestionType: "question-type",
  ExamType: "exam-type",
  NotificationType: "notification-type",

  CourseManagement: "course-management",
  Course: "course",
  CycleManagement: "cycle-management",
  CourseTypeManagement: "course-type-management",
  CourseOffering: "course-offering",
  CourseListing: "course-listing",
  ScheduleTypeManagement: "schedule-management",

  MediaManagement: "media-management",
  Media: "media",

  TraineeManagement: "trainee-management",
  TraineeJourney: "trainee-journey",
  OfficeHourRequests: "office-hour-requests",

  FacultyManagement: "faculty-management",
  Instructor: "instructor",
  Actor: "actor",

  OfficeManagement: "office-management",
  TeamShiftInstructor: "team-shift-instructor",
  TeamShiftActor: "team-shift-actor",
  TimeSheet: "time-sheet",

  AssessmentModule: "assessment-module",
  QuestionManagement: "question",
  ExamManagement: "exam-management",
  StationMediaUpload: "station-media",
  TraineeStationRecording: "station-recording",
  Violations: "violations",
  ExpiredException: "expired-exception",
  StatusManagement: "status-management",
  ExamDelayManagement: "exam-delay-management",
  ExamReports: "exam-reports",
  ExamAttempts: "exam-attempts",
  ExamEvaluationRubric: "exam-evaluation-rubric",
  ProjectManagement: "project-management",
  ProjectTopicManagement: "project-topic-management",
  TopicDetailsManagement: "topic-details-management",
  EvaluationVersionHistory: "evaluation-version-history",
  ExamHistory: "exam-history",

  Communication: "communication",
  SMS: "sms",
  Emails: "emails",
  InAppNotification: "notification",
  NotificationManagement: "notification-management",

  Settings: "settings",
  UserManagement: "user-management",
  RoleManagement: "role-management",
  SuperAdminManagement: "super-admin-management",
  AdminManagement: "admin-management",
  AuditLog: "audit-log",
  StudentCourse: "student-course",
  CsCriteria: "cs-criteria"
}

export const SocketEvents = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_EXAM_ROOM: "join-exam-room",
  SUBMIT_ANSWER: "submit-answer",
  BREAK_TIME: "break-time",
  LEAVE_EXAM_ROOM: "leave-exam-room",
  EXAM_TIMER_STARTED: "exam-timer-started",
  EXAM_TIMER_REMAINING: "exam-timer-remaining",
  BREAK_TIMER_REMAINING: "break-timer-remaining",
  STOP_TIMER: "stop-timer",
  RESTART_TIMER: "restart-timer",
  EXTEND_EXAM_TIME: "extend-time",
  RESTART_EXAM_TIMER: "restart-exam-timer",
  EXAM_CLEARED: "exam-clear",
  STUDENT_DISABLE: "disable-student"
}

export const toothNumberingSystem = [
  // FDI Numbering System
  { value: 1.1, label: "1.1" },
  { value: 1.2, label: "1.2" },
  { value: 1.3, label: "1.3" },
  { value: 1.4, label: "1.4" },
  { value: 1.5, label: "1.5" },
  { value: 1.6, label: "1.6" },
  { value: 1.7, label: "1.7" },
  { value: 1.8, label: "1.8" },
  { value: 2.1, label: "2.1" },
  { value: 2.2, label: "2.2" },
  { value: 2.3, label: "2.3" },
  { value: 2.4, label: "2.4" },
  { value: 2.5, label: "2.5" },
  { value: 2.6, label: "2.6" },
  { value: 2.7, label: "2.7" },
  { value: 2.8, label: "2.8" },
  { value: 3.1, label: "3.1" },
  { value: 3.2, label: "3.2" },
  { value: 3.3, label: "3.3" },
  { value: 3.4, label: "3.4" },
  { value: 3.5, label: "3.5" },
  { value: 3.6, label: "3.6" },
  { value: 3.7, label: "3.7" },
  { value: 3.8, label: "3.8" },
  { value: 4.1, label: "4.1" },
  { value: 4.2, label: "4.2" },
  { value: 4.3, label: "4.3" },
  { value: 4.4, label: "4.4" },
  { value: 4.5, label: "4.5" },
  { value: 4.6, label: "4.6" },
  { value: 4.7, label: "4.7" },
  { value: 4.8, label: "4.8" }
]

export const SocketEventsBreakType = {
  BREAK_IN: "break-in",
  BREAK_OUT: "break-out"
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_TOTAL_PAGE: 50,
  DEFAULT_RECORDS: 0,
  MIN_GOTO_VALUE: 1
}

export const COURSE_TYPE: SelectOption[] = [
  { value: "AFK", label: "AFK" },
  { value: "ACJ", label: "ACJ" },
  { value: "OSCE", label: "OSCE" },
  { value: "NDECC-SJ", label: "NDECC-SJ" },
  { value: "NDECC-CS", label: "NDECC-CS" },
  { value: "Pharma-EE", label: "Pharma-EE" },
  { value: "INDBE", label: "INDBE" },
  { value: "ADAT", label: "ADAT" },
  { value: "Pharma-MCQ", label: "Pharma-MCQ" }
]

export const USER_CATEGORY: SelectOption[] = [
  { value: "SuperAdmin", label: "Super Admin" },
  { value: "Administrator", label: "Administrator" },
  { value: "Instructor", label: "Instructor" },
  { value: "Trainee", label: "Trainee" },
  { value: "Stations", label: "Stations" }
]

export const USER_STATUS: SelectOption[] = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" }
]
export const EXAM_TYPE: SelectOption[] = [
  { value: "mock", label: "MOCK" },
  { value: "CS-MOCK", label: "CS-MOCK" },
  { value: "quiz", label: "QUIZ" },
  { value: "self-assessment", label: "SELF ASSESSMENT" },
  { value: "sjmme", label: "SJ MINI MOCK" },
  { value: "sje", label: "SJ EXAMINATION" }
]

export const EXAM_STATUS: SelectOption[] = [
  { value: "1", label: "Active" },
  { value: "0", label: "Draft" },
  { value: "2", label: "Completed" }
]

export const numOfProjectTopicChoiceList = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  },
  {
    value: "5",
    label: "5"
  },
  {
    value: "6",
    label: "6"
  },
  {
    value: "7",
    label: "7"
  },
  {
    value: "8",
    label: "8"
  },
  {
    value: "9",
    label: "9"
  },
  {
    value: "10",
    label: "10"
  }
]

export const extendTimeValues = [
  {
    value: 1,
    label: "Booklet 1"
  },
  {
    value: 2,
    label: "Booklet 2"
  },
  {
    value: 3,
    label: "Break Time"
  }
]

enum ENVIRONMENT {
  DEV = "development",
  STAGE = "staging",
  PROD = "production"
}

const currentEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT

export const Environment = {
  Is: (env: keyof typeof ENVIRONMENT) =>
    currentEnvironment === ENVIRONMENT[env],
  IsDevelopment: () => Environment.Is("DEV"),
  IsStaging: () => Environment.Is("STAGE"),
  IsProduction: () => Environment.Is("PROD")
}

export const allowedQuestions = [
  "SJWritten",
  "mcq",
  "msq",
  "truefalse",
  "SJRoleplay",
  "drop-down-question",
  "fill-in-the-blanks",
  "writtenresponse"
]
