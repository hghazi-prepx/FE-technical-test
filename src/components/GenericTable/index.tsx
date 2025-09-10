import {
  Typography,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table
} from "@mui/material"
import { commonTableStyle } from "@/utils/commonstyles"
import SortableHeader from "@/components/SortableHeader"
import { GenericTableProps } from "@/types/common.type"

function GenericTable<T>({ columns, data }: GenericTableProps<T>) {
  return (
    <Table
      aria-label="generic table"
      sx={{ ...commonTableStyle }}
      className="c-table"
      stickyHeader
    >
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={String(col.field)}
              sx={
                {
                  // minWidth: col.width ?? "150px",
                  // maxWidth: col.width ?? "150px",
                  // width: col.width ?? "150px"
                }
              }
            >
              <SortableHeader field={col.headerName} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.field)}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {col.render ? col.render(row) : (row as any)[col.field]}{" "}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              <Typography variant="body1">No data available</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default GenericTable
