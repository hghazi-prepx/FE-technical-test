export type ExamType = {
  id?: string
  imockid?: string
  examnumber?: string
  examname?: string
  examtype?: string
  active?: Boolean
  examdate: string
}

export type CheckedItems = {
  [key: string]: boolean
}
