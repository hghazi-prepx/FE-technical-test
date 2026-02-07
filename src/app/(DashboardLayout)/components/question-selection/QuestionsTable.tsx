import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  Stack,
  MenuItem,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  IconButton,
  Menu,
  Tooltip,
  Dialog,
} from "@mui/material";

import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import { CaretupIcon } from "@/components/Icons";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  commonCheckboxField,
  commonMenuStyle,
  commonTableCardStyle,
  commonTableStyle,
  stickyColStyle,
  stickyTableHeaderContainerStyle,
} from "@/utils/commonstyles";
import { IconDots } from "@tabler/icons-react";
import CustomTablePagination from "@/components/CustomPagination";
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction";
// QuestionsTableProps.ts (or within the component file)
import { Theme } from "@mui/material/styles"; // Assuming you are using MUI themes
import { MouseEvent } from "react"; // For event types

// Assuming a type for the question data based on usage
interface QuestionDataItem {
  id: string | number; // Or whatever type your ID is
  ExamQuestionID: string | number;
  QuestionID: string | number;
  QuestionTextID: string;
  BookletID: string | number;
  CourseTypeName: string;
  QuestionTopicName: string;
  ExamQuestionStatus: number; // Assuming 1 is Active, 0/other is Inactive/Removed
  // Add other properties used from tdata if necessary
}

interface SelectedQuestionData {
  results: QuestionDataItem[];
  totalPages: number;
  totalRecords: number;
  // Add other properties if present in the actual data structure
}

export interface QuestionsTableProps {
  // State values
  allChecked: boolean;
  selectedCheckboxes: string[] | number[]; // Array of selected ExamQuestionIDs
  checkorderBy: string; // e.g., "StationRankIDASC", "BookletIDDESC"
  selectedQuestionData: SelectedQuestionData | null; // The data to display
  checkedItems: Record<string | number, boolean>; // Object mapping ExamQuestionID to checked state
  open: boolean; // For the action menu
  anchorEl: null | HTMLElement; // For the action menu positioning
  previewQuestionId: string | number | null; // ID of the question to preview
  selectedAssignQuestionId: string | number | null; // ID of the question selected for assignment/action
  page: number; // Current page for pagination
  rowsPerPage: number; // Number of rows per page

  // Handlers (Functions)
  handleAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteSelectedQuestion: (id?: string | number) => void; // Might take an ID or use selectedCheckboxes
  handleOrderBy: (field: string, direction: "ASC" | "DESC") => void;
  handleChange: (examQuestionId: string | number) => void; // For individual checkbox
  handleClick: (
    event: MouseEvent<HTMLElement>,
    examQuestionId: string | number,
    questionId: string | number,
    examQuestionStatus: number
  ) => void; // For opening the action menu
  handleClose: () => void; // For closing the action menu
  handlePreviewModalOpen: (questionId: string | number) => void;
  handlePagination: (newPage: number, newRowsPerPage: number) => void; // Handles page/rows change
  theme: Theme;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({
  allChecked,
  selectedCheckboxes,
  checkorderBy,
  selectedQuestionData,
  checkedItems,
  open,
  anchorEl,
  previewQuestionId,
  selectedAssignQuestionId,
  page,
  rowsPerPage,
  handleAllChange,
  handleDeleteSelectedQuestion,
  handleOrderBy,
  handleChange,
  handleClick,
  handleClose,
  handlePreviewModalOpen,
  handlePagination,
  theme,
}) => {
  return (
    <Card sx={commonTableCardStyle}>
      <TableContainer sx={stickyTableHeaderContainerStyle}>
        <Table
          aria-label="simple table"
          sx={{ ...commonTableStyle, tableLayout: "fixed" }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
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
                    //   defaultChecked
                    color="primary"
                    // className="c-checkbox"
                    inputProps={{
                      "aria-label": "checkbox with default color",
                    }}
                    className="checkbox_style"
                    checked={allChecked}
                    onChange={handleAllChange}
                    sx={commonCheckboxField}
                  />
                  <DropdownTableHeaderAction
                    enable={selectedCheckboxes?.length > 1}
                    text="Remove"
                    handleDelete={() => handleDeleteSelectedQuestion()}
                    length={selectedCheckboxes?.length}
                  />
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "180px",
                  maxWidth: "180px",
                  width: "180px",
                }}
              >
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>Question ID</span>
                  <Box
                    component={"span"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"1px"}
                    color={theme.palette.primary.main}
                    sx={{
                      [`& svg`]: {
                        width: "8px",
                        height: "6px",
                        cursor: "pointer",
                      },
                      [`& svg path`]: {
                        color: "#67757C",
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: "#02376D",
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1",
                      },
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "StationRankIDASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StationRankID", "ASC")}
                      >
                        <CaretupIcon />
                      </span>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="DESC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "StationRankIDDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StationRankID", "DESC")}
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "320px",
                  maxWidth: "320px",
                  width: "320px",
                }}
              >
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>Booklet</span>
                  <Box
                    component={"span"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"1px"}
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
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "BookletIDASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("BookletID", "ASC")}
                      >
                        <CaretupIcon />
                      </span>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="DESC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "BookletIDDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("BookletID", "DESC")}
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "320px",
                  maxWidth: "320px",
                  width: "320px",
                }}
              >
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>Course Type</span>
                  <Box
                    component={"span"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"1px"}
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
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeForASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("QuestionTypeFor", "ASC")}
                      >
                        <CaretupIcon />
                      </span>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="DESC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeForDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("QuestionTypeFor", "DESC")}
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "240px",
                  maxWidth: "240px",
                  width: "240px",
                }}
              >
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>Topic</span>
                  <Box
                    component={"span"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"1px"}
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
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeNameASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("QuestionTypeName", "ASC")}
                      >
                        <CaretupIcon />
                      </span>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="DESC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeNameDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() =>
                          handleOrderBy("QuestionTypeName", "DESC")
                        }
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  minWidth: "240px",
                  maxWidth: "240px",
                  width: "240px",
                }}
              >
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>Status</span>
                  <Box
                    component={"span"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"1px"}
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
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeNameASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("QuestionTypeName", "ASC")}
                      >
                        <CaretupIcon />
                      </span>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="DESC"
                      style={{
                        height: "6px",
                        lineHeight: 0,
                      }}
                    >
                      <span
                        className={`${
                          checkorderBy === "QuestionTypeNameDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() =>
                          handleOrderBy("QuestionTypeName", "DESC")
                        }
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  component={"span"}
                  color={theme.palette.primary.main}
                  fontSize={"15px"}
                  fontWeight={500}
                >
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedQuestionData?.results?.map((tdata: any) => (
              <TableRow key={tdata.id}>
                <TableCell>
                  <Stack direction="row">
                    <Box>
                      <CustomCheckbox
                        //   defaultChecked
                        color="primary"
                        // className="c-checkbox"
                        inputProps={{
                          "aria-label": "checkbox with default color",
                        }}
                        onChange={() => handleChange(tdata.ExamQuestionID)}
                        checked={checkedItems[tdata.ExamQuestionID] || false}
                        className="checkbox_style"
                        sx={commonCheckboxField}
                      />
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    <Tooltip
                      title={
                        tdata?.ExamQuestionStatus == 1 ? "Active" : "Inactive"
                      }
                    >
                      <Box
                        component="span"
                        sx={{
                          padding: 0,
                          backgroundColor:
                            tdata.ExamQuestionStatus == 1
                              ? "#44D3BB"
                              : "#FC4B6C",
                          marginRight: "10px",
                          borderRadius: "50%",
                          width: "8px",
                          height: "8px",
                          display: "inline-block",
                          lineHeight: 0,
                          cursor: "pointer",
                        }}
                      ></Box>
                    </Tooltip>
                    {tdata.QuestionTextID}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.BookletID}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.CourseTypeName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.QuestionTopicName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.ExamQuestionStatus == 1 ? "Active" : "Removed"}
                  </Typography>
                </TableCell>
                <TableCell className="sticky-col" sx={stickyColStyle}>
                  {selectedCheckboxes?.length <= 1 ? (
                    <>
                      <IconButton
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) =>
                          handleClick(
                            e,
                            tdata.ExamQuestionID,
                            tdata.QuestionID,
                            tdata.ExamQuestionStatus
                          )
                        }
                        sx={{
                          transform: "rotate(90deg)",
                        }}
                        className="menu_dots"
                      >
                        <IconDotsVertical width={18} />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        sx={{
                          ...commonMenuStyle,
                        }}
                        transformOrigin={{
                          horizontal: "center",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "center",
                          vertical: "bottom",
                        }}
                      >
                        {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
                        <MenuItem
                          onClick={() =>
                            handlePreviewModalOpen(previewQuestionId)
                          }
                        >
                          View
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDeleteSelectedQuestion(
                              selectedAssignQuestionId
                            );
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <IconButton disabled className="menu_dots">
                        <IconDots width={20} />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomTablePagination
        totalPageCount={selectedQuestionData?.totalPages}
        totalRecords={selectedQuestionData?.totalRecords}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        handlePagination={handlePagination}
      />
    </Card>
  );
};

export default QuestionsTable;
