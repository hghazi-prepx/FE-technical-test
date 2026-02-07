export interface examinationCourse {
  lmscourseid: number;
  lmscoursename: string;
  Identifier: number;
}
export interface Question {
  QuestionID: number;
  QuestionTextID: string;
  QuestionText: string;
  QuestionCompetency: string;
  QuestionTypeFor: string;
  QuestionTypeName: string;
  QuestionTopicName: string;
  SubTopicName: string;
}
export interface apiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}
export interface StudentData {
  UserID: number;
  UserIDText: string;
  UserRoleTextID: string;
  UserFirstName: string;
  UserLastName: string;
  UserNumber: string | null;
  CampusID: number | null;
  UserTitleName: string;
}
