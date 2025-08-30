export interface TableType {
  id?: string;
  questionId?: string;
  questionType?: string;
  questionText?: string;
  active?: boolean;
  station?: string;
}

export const iMockExamQustionTableData: TableType[] = [
  {
    id: "1",
    questionId: "Q001",
    questionType: "Multiple Choice",
    questionText: "Sample question 1",
    active: true,
  },
  {
    id: "2",
    questionId: "Q002",
    questionType: "Essay",
    questionText: "Sample question 2",
    active: true,
  },
];
