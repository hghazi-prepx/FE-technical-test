import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import {
  commonCheckboxField,
  commonTableStyle,
  stickyTableHeaderContainerStyle,
  stickyColStyle,
  commonMenuStyle,
} from "@/utils/commonstyles";
import { CaretupIcon } from "@/components/Icons";

// ✅ Types
export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  sortKey?: string;
  render?: (row: any) => JSX.Element | string;
}

export interface TableAction {
  label: string;
  onClick: (row: any) => void;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  onOrderBy?: (key: string, order: "ASC" | "DESC") => void;
  onSelectAll?: () => void;
  onSelectOne?: (id: string | number) => void;
  allChecked?: boolean;
  checkedItems?: Record<string | number, boolean>;
  actions?: TableAction[];
}

export default function CustomTable({
  columns,
  rows,
  onOrderBy,
  onSelectAll,
  onSelectOne,
  allChecked = false,
  checkedItems = {},
  actions = [],
}: CustomTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const theme = useTheme();

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <TableContainer sx={stickyTableHeaderContainerStyle}>
      <Table
        stickyHeader
        sx={{ ...commonTableStyle, tableLayout: "fixed" }}
        aria-label="custom table"
      >
        <TableHead>
          <TableRow>
            {onSelectAll && (
              <TableCell
                sx={{
                  width: "57px",
                  minWidth: "160px",
                  maxWidth: "160px",
                  paddingRight: "0px !important",
                }}
              >
                <Stack direction="row">
                  <CustomCheckbox
                    color="primary"
                    inputProps={{ "aria-label": "select all" }}
                    sx={commonCheckboxField}
                    checked={allChecked}
                    onChange={onSelectAll}
                    className="checkbox_style"
                  />
                </Stack>
              </TableCell>
            )}

            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  width: "100px",
                }}
              >
                <Typography
                  component="span"
                  color={theme.palette.primary.main}
                  fontSize="15px"
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>{col.label}</span>
                  {col.sortable && col.sortKey && onOrderBy && (
                    <Box
                      component="span"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      gap="1px"
                      color={theme.palette.primary.main}
                      sx={{
                        [`& svg`]: {
                          width: "8px",
                          height: "6px",
                          cursor: "pointer",
                        },
                        [`& svg.arrow-down`]: {
                          scale: "-1",
                        },
                        [`& svg path`]: {
                          color: theme.palette.secondary.fieldText,
                        },
                        [`& .sortActiveTitle svg path`]: {
                          color: theme.palette.secondary.textColor,
                        },
                      }}
                    >
                      <Tooltip placement="top" title="ASC">
                        <span onClick={() => onOrderBy(col.sortKey!, "ASC")}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip placement="top" title="DESC">
                        <span
                          className="arrow-down"
                          onClick={() => onOrderBy(col.sortKey!, "DESC")}
                        >
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  )}
                </Typography>
              </TableCell>
            ))}

            {actions.length > 0 && <TableCell>&nbsp;</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id || row.ExamQuestionID}>
              {onSelectOne && (
                <TableCell>
                  <CustomCheckbox
                    color="primary"
                    inputProps={{ "aria-label": "select row" }}
                    sx={commonCheckboxField}
                    checked={checkedItems[row.ExamQuestionID] || false}
                    onChange={() => onSelectOne(row.ExamQuestionID)}
                    className="checkbox_style"
                  />
                </TableCell>
              )}

              {columns.map((col) => (
                <TableCell key={col.id}>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    fontWeight={400}
                    fontSize="14px"
                  >
                    {col.render ? col.render(row) : row[col.id]}
                  </Typography>
                </TableCell>
              ))}

              {actions.length > 0 && (
                <TableCell className="sticky-col" sx={stickyColStyle}>
                  <IconButton onClick={(e) => handleMenuClick(e, row)}>
                    ⋮
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRow === row}
                    onClose={handleMenuClose}
                    sx={commonMenuStyle}
                  >
                    {actions.map((action, i) => (
                      <MenuItem
                        key={i}
                        onClick={() => {
                          action.onClick(row);
                          handleMenuClose();
                        }}
                      >
                        {action.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
