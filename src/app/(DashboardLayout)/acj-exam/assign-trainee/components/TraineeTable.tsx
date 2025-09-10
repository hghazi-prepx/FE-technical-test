import {
  Box,
  Typography,
  Stack,
  Button,
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
  useTheme
} from "@mui/material"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import { CaretupIcon } from "@/components/Icons"
import { IconDotsVertical } from "@tabler/icons-react"
import CustomModal from "@/components/CustomModal"

import {
  commonCheckboxField,
  commonMenuStyle,
  commonTableStyle,
  primaryButon,
  stickyTableHeaderContainerStyle
} from "@/utils/commonstyles"

import DeleteModalComponent from "@/components/DeleleModalComponent"
import CustomTablePagination from "@/components/CustomPagination"
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction"
import useAssignTrainee from "@/hooks/useAssignTrainee"
import { IconDots } from "@tabler/icons-react"

function TraineeTable() {
  const {
    allChecked,
    handleAllChange,
    handleDeleteSelectedStudent,
    selectedAssignStudentId,
    selectedCheckboxes,
    checkorderBy,
    handleOrderBy,
    checkedItems,
    handleChange,
    selectedStudentData,
    open,
    handleClick,
    anchorEl,
    openModelForDelete,
    rowsPerPage,
    page,
    handlePagination,
    errorModel,
    handleLocationModelClose,
    handleModalClose,
    setDeleteText,
    handleClose
  } = useAssignTrainee()
  const theme = useTheme()
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
                    color="primary"
                    inputProps={{
                      "aria-label": "checkbox with default color"
                    }}
                    className="checkbox_style"
                    checked={allChecked}
                    onChange={handleAllChange}
                    sx={commonCheckboxField}
                  />
                  <DropdownTableHeaderAction
                    handleDelete={() =>
                      handleDeleteSelectedStudent(selectedAssignStudentId)
                    }
                    enable={selectedCheckboxes?.length > 1}
                    length={selectedCheckboxes?.length}
                    text="Remove"
                  />
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px"
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
                  <span>Trainee ID</span>
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
                        color: theme.palette.primary.main
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
                          checkorderBy === "StudentIDTextASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StudentIDText", "ASC")}
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
                          checkorderBy === "StudentIDTextDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StudentIDText", "DESC")}
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px"
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
                  <span>Trainee Name</span>
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
                        color: theme.palette.primary.main
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
                          checkorderBy === "StudentFirstNameASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StudentFirstName", "ASC")}
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
                          checkorderBy === "StudentFirstNameDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() =>
                          handleOrderBy("StudentFirstName", "DESC")
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
                  <span>Location</span>
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
                        color: theme.palette.primary.main
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
                          checkorderBy === "ActorIDTextASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("ActorIDText", "ASC")}
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
                          checkorderBy === "ActorIDTextDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("ActorIDText", "DESC")}
                      >
                        <CaretupIcon className="arrow-down" />
                      </span>
                    </Tooltip>
                  </Box>
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "640px",
                  maxWidth: "640px",
                  width: "640px"
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
                  <span>Email</span>
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
                        color: theme.palette.primary.main
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
                          checkorderBy === "StudentEmailASC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StudentEmail", "ASC")}
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
                          checkorderBy === "StudentEmailDESC"
                            ? "sortActiveTitle"
                            : ""
                        }`}
                        onClick={() => handleOrderBy("StudentEmail", "DESC")}
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
          <colgroup>
            <col width={"57px"} />
            <col width={"160px"} />
            <col width={"200px"} />
            <col width={"380px"} />
            <col width={"600px"} />
            <col width={"50px"} />
          </colgroup>
          <TableBody>
            {selectedStudentData?.results?.map((tdata: any, index: number) => (
              <TableRow key={tdata.id}>
                <TableCell>
                  <Stack direction="row">
                    <Box>
                      <CustomCheckbox
                        color="primary"
                        inputProps={{
                          "aria-label": "checkbox with default color"
                        }}
                        onChange={() => handleChange(tdata.id)}
                        checked={checkedItems[tdata.id] || false}
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
                    {tdata.UserRoleTextID}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.UserTitleName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.CampusName}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "640px",
                    maxWidth: "640px !important",
                    width: "640px"
                  }}
                >
                  <Typography
                    color={theme.palette.secondary.fieldText}
                    variant="h6"
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    {tdata.UserEmail}
                  </Typography>
                </TableCell>
                <TableCell
                  className="sticky-col"
                  width={"30px"}
                  sx={{
                    background:
                      theme.palette.mode === "light" ? "#fff" : "#232527"
                  }}
                >
                  {selectedCheckboxes?.length <= 1 ? (
                    <>
                      <IconButton
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) =>
                          handleClick(e, tdata.id, tdata.StudentID)
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
                        <MenuItem
                          onClick={() =>
                            handleDeleteSelectedStudent(selectedAssignStudentId)
                          }
                        >
                          Remove
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
      <DeleteModalComponent
        open={openModelForDelete}
        handleClose={handleModalClose}
        handleChange={(event: any) => setDeleteText(event.target.value)}
        handleClick={() => handleDeleteSelectedStudent(selectedAssignStudentId)}
      />
      <CustomModal open={errorModel} handleClose={handleLocationModelClose}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "24px",
            lineHeight: "36px",
            color: "#02376D",
            fontWeight: 600
          }}
        >
          Error!
        </Typography>
        <Typography
          sx={{ fontSize: "14px", lineHeight: "24px", color: "#455A64" }}
        >
          There are less questions and students assigned compared to the number
          of stations.
        </Typography>
        <Stack
          display={"flex"}
          direction={"row"}
          gap={"10px"}
          justifyContent={"center"}
          marginTop={"20px"}
        >
          <Button
            sx={{
              ...primaryButon,
              p: "9px 20px",
              color: theme.palette.mode === "light" ? "#FFF" : "#000"
            }}
          >
            Go Back
          </Button>
        </Stack>
      </CustomModal>
      <CustomTablePagination
        totalPageCount={selectedStudentData?.totalPages}
        totalRecords={selectedStudentData?.totalRecords}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        handlePagination={handlePagination}
      />
    </div>
  )
}

export default TraineeTable
