import {
  commonCheckboxField,
  commonMenuStyle,
  commonTableStyle,
  stickyColStyle,
  stickyTableHeaderContainerStyle
} from "@/utils/commonstyles"
import {
  Box,
  Typography,
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
  Tooltip
} from "@mui/material"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction"
import theme from "@/utils/theme"
import { CaretupIcon } from "@/components/Icons"
import { IconDotsVertical } from "@tabler/icons-react"
import { IconDots } from "@tabler/icons-react"
import DeleteModalComponent from "@/components/DeleleModalComponent"
import CustomTablePagination from "@/components/CustomPagination"
import useQuestionSelection from "@/hooks/useQuestionSelection"

function QuestionsTable() {
  const {
    selectedQuestionData,
    handleChange,
    checkedItems,
    handleAllChange,
    allChecked,
    handleDeleteSelectedQuestion,
    selectedCheckboxes,
    handleOrderBy,
    checkorderBy,
    handleClick,
    anchorEl,
    open,
    selectedAssignQuestionId,
    previewQuestionId,
    handlePreviewModalOpen,
    selectedQuestionStatus,
    removeKeepInReportQuestion,
    openModal,
    setDeleteText,
    handleModalClose,
    updateQuestionStatus,
    handleClose,
    handlePagination,
    rowsPerPage,
    page
  } = useQuestionSelection()
  return (
    <div>
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
                  paddingRight: "0px !important"
                }}
              >
                <Stack direction="row">
                  <CustomCheckbox
                    //   defaultChecked
                    color="primary"
                    // className="c-checkbox"
                    inputProps={{
                      "aria-label": "checkbox with default color"
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
                  width: "180px"
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
                    gap: "10px"
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
                        cursor: "pointer"
                      },
                      [`& svg path`]: {
                        color: "#67757C"
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: "#02376D"
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1"
                      }
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0
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
                        lineHeight: 0
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
                  width: "320px"
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
                    gap: "10px"
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
                        cursor: "pointer"
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1"
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.secondary.textColor
                      }
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0
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
                        lineHeight: 0
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
                  width: "320px"
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
                    gap: "10px"
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
                        cursor: "pointer"
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1"
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.secondary.textColor
                      }
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0
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
                        lineHeight: 0
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
                  width: "240px"
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
                    gap: "10px"
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
                        cursor: "pointer"
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1"
                      }
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0
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
                        lineHeight: 0
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
                  width: "240px"
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
                    gap: "10px"
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
                        cursor: "pointer"
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1"
                      }
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="ASC"
                      style={{
                        height: "6px",
                        lineHeight: 0
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
                        lineHeight: 0
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
                  &nbsp;
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
                          "aria-label": "checkbox with default color"
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
                          cursor: "pointer"
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
                          transform: "rotate(90deg)"
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
                          "aria-labelledby": "basic-button"
                        }}
                        sx={{
                          ...commonMenuStyle
                        }}
                        transformOrigin={{
                          horizontal: "center",
                          vertical: "top"
                        }}
                        anchorOrigin={{
                          horizontal: "center",
                          vertical: "bottom"
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
                            )
                          }}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            updateQuestionStatus(selectedQuestionStatus)
                          }
                        >
                          Update Status
                        </MenuItem>

                        <MenuItem
                          onClick={() =>
                            removeKeepInReportQuestion(selectedAssignQuestionId)
                          }
                        >
                          Remove & keep in report
                        </MenuItem>
                        {/* <MenuItem onClick={() => router.push("/audit-trail")}>
                                View Logs
                              </MenuItem>
                              <MenuItem>Reports</MenuItem> */}
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
      <DeleteModalComponent
        open={openModal}
        handleClose={handleModalClose}
        handleChange={(event: any) => setDeleteText(event.target.value)}
        handleClick={() =>
          handleDeleteSelectedQuestion(selectedAssignQuestionId)
        }
      />
      <CustomTablePagination
        totalPageCount={selectedQuestionData?.totalPages}
        totalRecords={selectedQuestionData?.totalRecords}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        handlePagination={handlePagination}
      />
    </div>
  )
}

export default QuestionsTable
