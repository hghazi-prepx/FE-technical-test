export type ColumnDef<T> = {
  field: keyof T | string
  headerName: string
  width?: string | number
  render?: (row: T) => React.ReactNode
}

export type GenericTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
}

export type SelectOption = { value: string; label: string }
