import React, { MouseEvent } from "react";
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
} from "@mui/material";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import { CaretupIcon } from "@/components/Icons";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  commonCheckboxField,
  commonMenuStyle,
  commonTableCardStyle,
  commonTableStyle,
  stickyTableHeaderContainerStyle,
} from "@/utils/commonstyles";
import { IconDots } from "@tabler/icons-react";
import DeleteModalComponent from "@/components/DeleleModalComponent";
import CustomTablePagination from "@/components/CustomPagination";
import DropdownTableHeaderAction from "@/components/DropdownTableHeaderAction";

// Assuming a type for the student data based on usage
interface StudentDataItem {
  id: string | number; // Or whatever type your ID is
  UserRoleTextID: string; // Trainee ID
  UserTitleName: string; // Trainee Name (assuming this combines First/Last Name)
  // Consider separate StudentFirstName, StudentLastName if needed for sorting
  CampusName: string; // Location
  UserEmail: string; // Email
  StudentID: string | number; // Assuming this is needed for the remove action
  // Add other properties used from tdata if necessary
}

interface SelectedStudentData {
  results: StudentDataItem[];
  totalPages: number;
  totalRecords: number;
  // Add other properties if present in the actual data structure
}

export interface TraineeTableProps {
  // Or whatever you name your component
  // State values
  allChecked: boolean;
  selectedCheckboxes: (string | number)[]; // Array of selected student IDs
  checkorderBy: string; // e.g., "StudentIDTextASC", "StudentFirstNameDESC"
  selectedStudentData: SelectedStudentData | null; // The data to display
  checkedItems: Record<string | number, boolean>; // Object mapping student ID to checked state
  open: boolean; // For the action menu
  anchorEl: null | HTMLElement; // For the action menu positioning
  selectedAssignStudentId: string | number | null; // ID of the student selected for removal
  openModelForDelete: boolean; // Controls the delete confirmation modal
  page: number; // Current page for pagination
  rowsPerPage: number; // Number of rows per page
  // Assuming setDeleteText is for a confirmation text input in the modal
  // If not, you might pass the deleteText state and a setter for it, or just the value if it's managed internally
  // For now, assuming the parent manages the input state and passes the value or a setter if needed elsewhere
  // deleteText?: string; // If needed as a prop
  // setDeleteText?: (value: string) => void; // If needed as a prop

  // Handlers (Functions)
  handleAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderBy: (field: string, direction: "ASC" | "DESC") => void;
  handleChange: (studentId: string | number) => void; // For individual checkbox
  handleClick: (
    event: MouseEvent<HTMLElement>, // Use MouseEvent from react
    studentId: string | number,
    studentTextId: string | number // Assuming UserRoleTextID is used here or another ID
  ) => void; // For opening the action menu
  handleClose: () => void; // For closing the action menu
  handleDeleteSelectedStudent: (id?: string | number) => void; // Remove student, might use selectedAssignStudentId
  handleModalClose: () => void; // Close delete modal
  setDeleteText: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handle input change in delete modal
  handlePagination: (newPage: number, newRowsPerPage: number) => void; // Handles page/rows change
}
const TraineesTable: React.FC<TraineeTableProps> = ({
  allChecked,
  selectedCheckboxes,
  checkorderBy,
  selectedStudentData,
  checkedItems,
  open,
  anchorEl,
  selectedAssignStudentId,
  openModelForDelete,
  page,
  rowsPerPage,
  handleAllChange,
  handleOrderBy,
  handleChange,
  handleClick,
  handleClose,
  handleDeleteSelectedStudent,
  handleModalClose,
  setDeleteText,
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
                    color="primary"
                    inputProps={{
                      "aria-label": "checkbox with default color",
                    }}
                    // className="c-checkbox"
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
                  width: "160px",
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
                        cursor: "pointer",
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1",
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText,
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.primary.main,
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
                        lineHeight: 0,
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
                  width: "160px",
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
                        cursor: "pointer",
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1",
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText,
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.primary.main,
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
                        lineHeight: 0,
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
                        cursor: "pointer",
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1",
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText,
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.primary.main,
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
                        lineHeight: 0,
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
                  width: "640px",
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
                        cursor: "pointer",
                      },
                      [`& svg.arrow-down`]: {
                        scale: "-1",
                      },
                      [`& svg path`]: {
                        color: theme.palette.secondary.fieldText,
                      },
                      [`& .sortActiveTitle svg path`]: {
                        color: theme.palette.primary.main,
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
                        lineHeight: 0,
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
                        //   defaultChecked
                        color="primary"
                        inputProps={{
                          "aria-label": "checkbox with default color",
                        }}
                        // className="c-checkbox"
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
                    width: "640px",
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
                      theme.palette.mode === "light" ? "#fff" : "#232527",
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

      <CustomTablePagination
        totalPageCount={selectedStudentData?.totalPages}
        totalRecords={selectedStudentData?.totalRecords}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        handlePagination={handlePagination}
      />
    </Card>
  );
};

export default TraineesTable;
