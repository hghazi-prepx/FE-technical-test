import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect"
import { CaretupIcon } from "@/components/Icons"
import {
  calenderTextField,
  commonCheckboxField,
  commonDropdownMenuStyle,
  commonSelectFieldStyle,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import theme from "@/utils/theme"
import {
  Button,
  Grid,
  MenuItem,
  Popover,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Table
} from "@mui/material"
import { Box, Stack } from "@mui/system"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { ampm, hours, minutes } from "../data"
import useCreateExam from "@/hooks/useCreateExam"

function MockExamSlug() {
  const {
    addRow,
    deleteRow,
    selectedCheckBoxIndex,
    campusHandleChange,
    rows,
    timezoneHandleChange,
    countryData,
    countryHandleChange,
    handleTimeChange,
    handleClose,
    anchorEl,
    openPopoverId,
    handleClick,
    textFieldRef,
    handleDateChangeForLocation,
    locationDate,
    handleCheckBoxChange,
    checkedItems
  } = useCreateExam()
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h5">Exam Locations</Typography>
      </Grid>
      <Grid item md={12}>
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap"
            }}
            className="c-table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "24px" }}>
                  <CustomCheckbox
                    //   defaultChecked
                    color="primary"
                    inputProps={{
                      "aria-label": "checkbox with default color"
                    }}
                    className="checkbox_style"
                    sx={commonCheckboxField}
                  />
                  &nbsp;
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={theme.palette.primary.main}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    component={"div"}
                    className="listDatahead"
                  >
                    {" "}
                    <span>Date</span>{" "}
                    <Box
                      component={"span"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={"1px"}
                      color={theme.palette.secondary.main}
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
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="DESC"
                        style={{
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={theme.palette.primary.main}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    component={"div"}
                    className="listDatahead"
                  >
                    {" "}
                    <span>Time</span>{" "}
                    <Box
                      component={"span"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={"1px"}
                      color={theme.palette.secondary.main}
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
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="DESC"
                        style={{
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={theme.palette.primary.main}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    component={"div"}
                    className="listDatahead"
                  >
                    {" "}
                    <span>Country</span>{" "}
                    <Box
                      component={"span"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={"1px"}
                      color={theme.palette.secondary.main}
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
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="DESC"
                        style={{
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={theme.palette.primary.main}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    component={"div"}
                    className="listDatahead"
                  >
                    {" "}
                    <span>Timezone</span>{" "}
                    <Box
                      component={"span"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={"1px"}
                      color={theme.palette.secondary.main}
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
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="DESC"
                        style={{
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontSize={"14px"}
                    fontWeight={500}
                    color={theme.palette.primary.main}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    component={"div"}
                    className="listDatahead"
                  >
                    {" "}
                    <span>Campus</span>{" "}
                    <Box
                      component={"span"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={"1px"}
                      color={theme.palette.secondary.main}
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
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="DESC"
                        style={{
                          height: "8px",
                          lineHeight: 0
                        }}
                      >
                        <span className={``}>
                          <CaretupIcon className="arrow-down" />
                        </span>
                      </Tooltip>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row: any, index: any) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Stack direction="row">
                      <Box>
                        <CustomCheckbox
                          //   defaultChecked
                          onChange={() => handleCheckBoxChange(index)}
                          checked={checkedItems[index] || false}
                          color="primary"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                          className="checkbox_style"
                          sx={commonCheckboxField}
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        maxWidth: "195px",
                        minWidth: "195px"
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label={null}
                          inputFormat="YYYY/MM/DD"
                          value={locationDate}
                          // onChange={(date) =>
                          //  null
                          // }
                          onChange={(date: any) =>
                            handleDateChangeForLocation(date)
                          }
                          minDate={dayjs().startOf("day")}
                          renderInput={(params) => (
                            <TextField {...params} sx={calenderTextField} />
                          )}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TextField
                        ref={textFieldRef}
                        value={`${row.selectedTime?.hour || "--"}:${
                          row.selectedTime?.minute || "--"
                        } ${row?.selectedTime?.ampm || ""}`}
                        fullWidth
                        onClick={(e) => handleClick(e, row.id)}
                        sx={calenderTextField}
                      />
                      <Popover
                        id={
                          openPopoverId === row.id ? "time-popover" : undefined
                        }
                        open={Boolean(anchorEl[row.id])}
                        anchorEl={anchorEl[row.id]}
                        onClose={() => handleClose(row.id)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left"
                        }}
                      >
                        <Box
                          sx={{
                            padding: 2,
                            width: 300
                          }}
                        >
                          <Grid container spacing={2}>
                            {/* Hour dropdown */}
                            <Grid item xs={4}>
                              <Select
                                fullWidth
                                variant="outlined"
                                value={row.selectedTime.hour}
                                onChange={(event) => {
                                  handleTimeChange(
                                    "hour",
                                    event.target.value,
                                    row.id
                                  )
                                }}
                                displayEmpty
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  style: {
                                    maxHeight: 350
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle
                                  }
                                }}
                              >
                                <MenuItem value="" disabled>
                                  Hour
                                </MenuItem>
                                {hours.map((hour: any) => (
                                  <MenuItem key={hour} value={hour}>
                                    {hour?.toString().padStart(2, "0")}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            {/* Minute dropdown */}
                            <Grid item xs={4}>
                              <Select
                                fullWidth
                                variant="outlined"
                                value={row.selectedTime.minute}
                                onChange={(event) => {
                                  handleTimeChange(
                                    "minute",
                                    event.target.value,
                                    row.id
                                  )
                                }}
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  style: {
                                    maxHeight: 350
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle
                                  }
                                }}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  Minute
                                </MenuItem>
                                {minutes.map((minute: any) => (
                                  <MenuItem key={minute} value={minute}>
                                    {minute}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            {/* AM/PM dropdown */}
                            <Grid item xs={4}>
                              <Select
                                fullWidth
                                variant="outlined"
                                value={row.selectedTime.ampm}
                                onChange={(event) => {
                                  handleTimeChange(
                                    "ampm",
                                    event.target.value,
                                    row.id
                                  )
                                }}
                                sx={commonSelectFieldStyle}
                                MenuProps={{
                                  style: {
                                    maxHeight: 350
                                  },
                                  PaperProps: {
                                    sx: commonDropdownMenuStyle
                                  }
                                }}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  AM/PM
                                </MenuItem>
                                {ampm.map((period: any) => (
                                  <MenuItem key={period} value={period}>
                                    {period}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                        </Box>
                      </Popover>
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      id="standard-select-currency"
                      // value={examType}
                      onChange={(event: any) =>
                        countryHandleChange(event, index)
                      }
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      sx={commonSelectFieldStyle}
                      MenuProps={{
                        disableScrollLock: true,
                        style: {
                          maxHeight: 350
                        },
                        PaperProps: {
                          sx: commonDropdownMenuStyle
                        }
                      }}
                    >
                      <MenuItem defaultValue="" disabled>
                        Select Country
                      </MenuItem>
                      {countryData?.map(
                        ([countryName, countryID]: [string, number]) => (
                          <MenuItem key={countryID} value={countryID}>
                            {countryName}
                          </MenuItem>
                        )
                      )}
                    </CustomSelect>
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      id="standard-select-currency"
                      // value={examType}
                      onChange={(event: any) =>
                        timezoneHandleChange(event, index)
                      }
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      sx={commonSelectFieldStyle}
                      MenuProps={{
                        disableScrollLock: true,
                        style: {
                          maxHeight: 350
                        },
                        PaperProps: {
                          sx: commonDropdownMenuStyle
                        }
                      }}
                    >
                      <MenuItem defaultValue="" disabled>
                        Select Time zone
                      </MenuItem>
                      {rows[index].timezones?.map((option: any) => (
                        <MenuItem
                          key={option.CountryWiseTimeZoneID}
                          value={option.CountryWiseTimeZoneID}
                        >
                          {option.GoogleTimezone}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      id="standard-select-currency"
                      // value={examType}
                      onChange={(event: any) =>
                        campusHandleChange(event, index)
                      }
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      sx={commonSelectFieldStyle}
                      MenuProps={{
                        disableScrollLock: true,
                        style: {
                          maxHeight: 350
                        },
                        PaperProps: {
                          sx: commonDropdownMenuStyle
                        }
                      }}
                    >
                      <MenuItem defaultValue="" disabled>
                        Select Campus
                      </MenuItem>
                      {row.locations && row.locations.length > 0 ? (
                        row.locations.map((location: any) => (
                          <MenuItem
                            key={location.CampusID}
                            value={location.CampusID}
                          >
                            {location.CampusName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          No Locations Available
                        </MenuItem>
                      )}
                    </CustomSelect>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack gap={"10px"} display={"flex"} direction={"row"} mt={"30px"}>
          <Button
            sx={{
              ...secondaryButon
            }}
            onClick={() => deleteRow(selectedCheckBoxIndex)}
          >
            Remove Location
          </Button>
          <Button
            sx={{
              ...primaryButon
            }}
            onClick={() => addRow()}
          >
            Add Location
          </Button>
        </Stack>
      </Grid>
    </>
  )
}

export default MockExamSlug
