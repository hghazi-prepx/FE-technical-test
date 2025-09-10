import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect"
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import {
  calenderTextField,
  checkboxLabelStyle,
  commonCheckboxField,
  commonDatepickerStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonSelectFieldStyle,
  disableInputStyle
} from "@/utils/commonstyles"
import {
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material"
import { Box, Stack } from "@mui/system"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import {
  mockExamSlug,
  quizzExamSlug,
  selfAssessmentExamSlug
} from "../../constant"
import { gradeCalculation } from "../../dropDowns"
import theme from "@/utils/theme"
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel"
import { populateOptions } from "../utils"
import useCreateExam from "@/hooks/useCreateExam"
import MockExamSlug from "./MockExamSlug"

function ExamTime() {
  const {
    handleAvailabilityDateChange,
    availabilityDateValue,
    formik,
    handleHourChange,
    selectedHour,
    handleShiftChange,
    selectedShift,
    handleMinuteChange,
    selectedMinute,
    examType,
    start,
    startDue,
    handleDueDateChange,
    dueDateValue,
    handleHourChangeDue,
    selectedHourDue,
    handleMinuteChangeDue,
    selectedMinuteDue,
    handleShiftChangeDue,
    selectedShiftDue,
    handleExamFeedBack,
    mockOnlineAutoPublish,
    selectedGrade,
    handleGradeDropDown,
    isShuffleQuiz,
    handleSetUnlimited,
    isUnlimited,
    isTimeLimit,
    examTimeExpire,
    quizStart,
    handleSetTimeLimit
  } = useCreateExam()

  return (
    <Grid container spacing={"32px"} marginTop={"2px"}>
      <>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">Exam Time</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
              border: "1px solid rgba(115, 138, 150, 0.5) !important"
            }
          }}
        >
          <Typography
            variant="paragraph3"
            component={"p"}
            sx={commonFieldLabelStyle}
          >
            Availability Date
            <span style={{ color: "#FC4B6C" }}>*</span>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={null}
              inputFormat="YYYY/MM/DD"
              value={availabilityDateValue}
              onChange={handleAvailabilityDateChange}
              minDate={dayjs().startOf("day")}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  style={{ width: "100%" }}
                  sx={calenderTextField}
                  inputProps={{ ...params.inputProps, readOnly: true }} // Disable keyboard input
                />
              )}
              PopperProps={{
                sx: {
                  ...commonDatepickerStyle
                }
              }}
            />
          </LocalizationProvider>
          {formik.touched.ExamAvailabilityDate &&
            formik.errors.ExamAvailabilityDate && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {typeof formik.errors.ExamAvailabilityDate === "string"
                  ? formik.errors.ExamAvailabilityDate
                  : "An error occurred"}
              </FormHelperText>
            )}
        </Grid>

        <Grid item xs={6} md={6}>
          <Stack direction="row" gap="10px">
            <Grid item xs={12} md={12}>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Availability time <span style={{ color: "#FC4B6C" }}>*</span>
                </Typography>
                <Stack direction={"row"} alignItems={"flex-end"} gap={"10px"}>
                  <CustomSelect
                    id="starthour"
                    fullWidth
                    variant="outlined"
                    displayEmpty
                    value={selectedHour}
                    onChange={handleHourChange}
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
                    <MenuItem defaultValue="" disabled>
                      Hours
                    </MenuItem>
                    {populateOptions(1, 12)}
                  </CustomSelect>
                  <CustomSelect
                    id="startmin"
                    fullWidth
                    variant="outlined"
                    displayEmpty
                    value={selectedMinute}
                    sx={commonSelectFieldStyle}
                    MenuProps={{
                      style: {
                        maxHeight: 350
                      },
                      PaperProps: {
                        sx: commonDropdownMenuStyle
                      }
                    }}
                    onChange={handleMinuteChange}
                  >
                    <MenuItem defaultValue="" disabled>
                      Minutes
                    </MenuItem>
                    {populateOptions(0, 59)}
                  </CustomSelect>
                  <CustomSelect
                    id="startshift"
                    fullWidth
                    variant="outlined"
                    displayEmpty
                    value={selectedShift}
                    onChange={handleShiftChange}
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
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                  </CustomSelect>
                </Stack>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  value={start}
                  defaultValue={0}
                  sx={{
                    display: "none"
                  }}
                  name="CSTimeOfExam"
                  error={
                    formik.touched.CSTimeOfExam &&
                    Boolean(formik.errors.CSTimeOfExam)
                  }
                  helperText={
                    formik.touched.CSTimeOfExam && formik.errors.CSTimeOfExam
                  }
                />
              </Box>
            </Grid>
            <Stack pt={"35px"} ml={"20px"}>
              <Typography
                variant="paragraph3"
                component={"p"}
                sx={commonFieldLabelStyle}
              >
                EST
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </>

      {/* Select date and time           */}
      {formik.values.ExamQuizStart != 2 && (
        <>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
                border: "1px solid rgba(115, 138, 150, 0.5) !important"
              }
            }}
          >
            <Typography
              variant="paragraph3"
              component={"p"}
              sx={commonFieldLabelStyle}
            >
              Due Date
              <span style={{ color: "#FC4B6C" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={null}
                inputFormat="YYYY/MM/DD"
                value={dueDateValue}
                onChange={handleDueDateChange}
                minDate={dayjs().startOf("day")}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    style={{ width: "100%" }}
                    sx={calenderTextField}
                    inputProps={{ ...params.inputProps, readOnly: true }} // Disable keyboard input
                  />
                )}
                PopperProps={{
                  sx: {
                    ...commonDatepickerStyle
                  }
                }}
              />
            </LocalizationProvider>

            {formik.touched.ExamDueDate && formik.errors.ExamDueDate && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {typeof formik.errors.ExamDueDate === "string"
                  ? formik.errors.ExamDueDate
                  : "An error occurred"}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack direction="row" gap="10px">
              <Grid item xs={12} md={12}>
                <Box>
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Due time <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <Stack direction={"row"} alignItems={"flex-end"} gap={"10px"}>
                    <CustomSelect
                      id="starthour"
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      value={selectedHourDue}
                      onChange={handleHourChangeDue}
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
                      <MenuItem defaultValue="" disabled>
                        Hours
                      </MenuItem>
                      {populateOptions(1, 12)}
                    </CustomSelect>
                    <CustomSelect
                      id="startmindue"
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      value={selectedMinuteDue}
                      sx={commonSelectFieldStyle}
                      MenuProps={{
                        style: {
                          maxHeight: 350
                        },
                        PaperProps: {
                          sx: commonDropdownMenuStyle
                        }
                      }}
                      onChange={handleMinuteChangeDue}
                    >
                      <MenuItem defaultValue="" disabled>
                        Minutes
                      </MenuItem>
                      {populateOptions(0, 59)}
                    </CustomSelect>
                    <CustomSelect
                      id="startshiftdue"
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      value={selectedShiftDue}
                      onChange={handleShiftChangeDue}
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
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </CustomSelect>
                  </Stack>
                  <CustomTextField
                    id=""
                    variant="outlined"
                    fullWidth
                    value={startDue}
                    defaultValue={0}
                    sx={{
                      display: "none"
                    }}
                    name="CSTimeOfExamDue"
                    error={
                      formik.touched.CSTimeOfExamDue &&
                      Boolean(formik.errors.CSTimeOfExamDue)
                    }
                    helperText={
                      formik.touched.CSTimeOfExamDue &&
                      formik.errors.CSTimeOfExamDue
                    }
                  />
                </Box>
              </Grid>
              <Stack pt={"35px"} ml={"20px"}>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  EST
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </>
      )}
      {/* End Select date and time           */}

      <Grid item xs={12} md={6}>
        {examType?.ExamTypeSlug != mockExamSlug &&
          examType?.ExamTypeSlug != selfAssessmentExamSlug && (
            <Stack>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    // checked={checkBoxChecked}
                    onChange={(event) => handleSetTimeLimit(event)}
                    checked={isTimeLimit}
                    disabled={
                      examType?.ExamTypeSlug === mockExamSlug ||
                      examType?.ExamTypeSlug == selfAssessmentExamSlug
                    }
                    sx={commonCheckboxField}
                  />
                }
                label="Set Time Limit"
                sx={checkboxLabelStyle}
              />
            </Stack>
          )}
        {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
          examType?.ExamTypeSlug == quizzExamSlug) &&
          isTimeLimit && (
            <Stack>
              <Typography
                variant="paragraph3"
                component={"p"}
                sx={commonFieldLabelStyle}
              >
                Time Limit<span style={{ color: "#FC4B6C" }}>*</span>
              </Typography>

              <Stack direction={"row"} gap={"30px"} alignItems={"center"}>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={""}
                  name="ExamTimeLimit"
                  value={formik.values.ExamTimeLimit}
                  onChange={(e: any) => {
                    const value = e.target.value
                    // Allow only positive numbers
                    if (/^[1-9]\d*$/.test(value) || value === "") {
                      formik.handleChange(e)
                    }
                  }}
                  disabled={
                    !isTimeLimit || examType?.ExamTypeSlug == mockExamSlug
                      ? true
                      : false
                  }
                  sx={{
                    ...disableInputStyle,
                    backgroundColor: "transparent !important",
                    "& .Mui-disabled fieldset": {
                      backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                      border: `${theme.palette.secondary.disableFieldColor} !important`
                    }
                  }}
                  error={
                    formik.touched.ExamTimeLimit &&
                    Boolean(formik.errors.ExamTimeLimit)
                  }
                  helperText={
                    formik.touched.ExamTimeLimit && formik.errors.ExamTimeLimit
                  }
                />
                <CustomFormLabel
                  htmlFor=""
                  sx={{
                    marginTop: "0",
                    color: theme.palette.secondary.fieldText,
                    fontWeight: 500,
                    fontSize: "14px"
                  }}
                >
                  Minute(s)
                </CustomFormLabel>
              </Stack>
            </Stack>
          )}
      </Grid>
      {isTimeLimit ? (
        <Grid item xs={12} md={12}>
          <>
            <Stack>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <FormControlLabel
                  value="1"
                  disabled={
                    examType?.ExamTypeSlug == mockExamSlug || !isTimeLimit
                  }
                  sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                  control={
                    <Radio
                      sx={{
                        p: "0",
                        gap: "5px",
                        "& svg:not(svg + svg)": {
                          fill: theme.palette.primary.light
                        },
                        "& input:checked + span svg": {
                          fill: theme.palette.primary.light
                        }
                      }}
                    />
                  }
                  onChange={() => quizStart(1)}
                  checked={
                    isTimeLimit && formik.values.ExamQuizStart == 1
                      ? true
                      : false
                  }
                  label="Asynchronous: Timer starts when the learner launches the quiz"
                />
                <FormControlLabel
                  value="2"
                  disabled={
                    !isTimeLimit ||
                    examType?.ExamTypeSlug == quizzExamSlug ||
                    examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                    examType?.ExamTypeSlug == mockExamSlug
                  }
                  sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                  control={
                    <Radio
                      sx={{
                        p: "0",
                        gap: "5px",
                        "& svg:not(svg + svg)": {
                          fill: theme.palette.primary.light
                        },
                        "& input:checked + span svg": {
                          fill: theme.palette.primary.light
                        }
                      }}
                    />
                  }
                  onChange={() => quizStart(2)}
                  checked={formik.values.ExamQuizStart == 2 ? true : false}
                  label="Synchronous: Timer starts on the start date"
                />
              </RadioGroup>
              {formik.touched.ExamQuizStart && formik.errors.ExamQuizStart && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {typeof formik.errors.ExamQuizStart === "string"
                    ? formik.errors.ExamQuizStart
                    : "An error occurred"}
                </FormHelperText>
              )}
            </Stack>
            {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
              examType?.ExamTypeSlug == quizzExamSlug) &&
              isTimeLimit && (
                <Stack mt="10px">
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={{ ...commonFieldLabelStyle, mb: "20px" }}
                  >
                    When the Time Limit Expires
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px"
                    }}
                  >
                    <FormControlLabel
                      value="1"
                      disabled={!isTimeLimit}
                      sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                      control={
                        <Radio
                          sx={{
                            p: "0",
                            gap: "5px",
                            "& svg:not(svg + svg)": {
                              fill: theme.palette.primary.light
                            },
                            "& input:checked + span svg": {
                              fill: theme.palette.primary.light
                            }
                          }}
                          onChange={() => examTimeExpire(1)}
                        />
                      }
                      checked={
                        isTimeLimit && formik.values.ExamTimeLimitExpires == 1
                          ? true
                          : false
                      }
                      label={`Automatically submit the ${examType?.ExamTypeSlug} attempt`}
                    />
                    <FormControlLabel
                      value="2"
                      disabled={
                        !isTimeLimit ||
                        (examType?.ExamTypeSlug === mockExamSlug &&
                          mockOnlineAutoPublish === false) ||
                        (examType?.ExamTypeSlug === quizzExamSlug &&
                          formik?.values?.ExamQuizStart == 2)
                      }
                      sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                      control={
                        <Radio
                          sx={{
                            p: "0",
                            gap: "5px",
                            "& svg:not(svg + svg)": {
                              fill: theme.palette.primary.light
                            },
                            "& input:checked + span svg": {
                              fill: theme.palette.primary.light
                            }
                          }}
                          checked={
                            formik.values.ExamTimeLimitExpires == 2
                              ? true
                              : false
                          }
                          onChange={() => examTimeExpire(2)}
                        />
                      }
                      label="Flag as “exceeded time limit” and allow the learner to continue working"
                    />
                    <FormControlLabel
                      value="3"
                      sx={{ ...checkboxLabelStyle, ml: "0px", pl: "0px" }}
                      control={
                        <Radio
                          sx={{
                            p: "0",
                            gap: "5px",
                            "& svg:not(svg + svg)": {
                              fill: theme.palette.primary.light
                            },
                            "& input:checked + span svg": {
                              fill: theme.palette.primary.light
                            }
                          }}
                          onChange={() => examTimeExpire(3)}
                          checked={
                            formik.values.ExamTimeLimitExpires == 3
                              ? true
                              : false
                          }
                          disabled={
                            !isTimeLimit ||
                            examType?.ExamTypeSlug === mockExamSlug ||
                            (examType?.ExamTypeSlug === quizzExamSlug &&
                              formik?.values?.ExamQuizStart == 2) ||
                            examType?.ExamTypeSlug === selfAssessmentExamSlug ||
                            examType?.ExamTypeSlug === quizzExamSlug
                          }
                        />
                      }
                      label="Do nothing: the time limit is not enforced"
                    />
                  </RadioGroup>
                  {formik.touched.ExamTimeLimitExpires &&
                    formik.errors.ExamTimeLimitExpires && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {typeof formik.errors.ExamTimeLimitExpires === "string"
                          ? formik.errors.ExamTimeLimitExpires
                          : "An error occurred"}
                      </FormHelperText>
                    )}
                </Stack>
              )}
          </>
        </Grid>
      ) : (
        <Grid item xs={12} md={12} p={"0px !important"} height={"0px"}></Grid>
      )}

      <Grid item xs={12} md={6} p={"0px !important"} height={"0px"}></Grid>

      <Grid item xs={12} md={6}></Grid>
      {examType?.ExamTypeSlug != mockExamSlug && (
        <Grid item xs={12} md={12}>
          <Typography variant="h5">Attempts and Completion</Typography>
        </Grid>
      )}
      {examType?.ExamTypeSlug != mockExamSlug && (
        <>
          <Grid item xs={12} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Number of Attempts
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </Typography>
                <Stack
                  direction={"row"}
                  gap={"10px"}
                  width={"367px"}
                  alignItems={"center"}
                >
                  <CustomTextField
                    id=""
                    variant="outlined"
                    fullWidth
                    disabled={
                      isUnlimited || examType?.ExamTypeSlug === mockExamSlug
                    }
                    placeholder={""}
                    name="ExamNumberofAttempts"
                    value={formik.values.ExamNumberofAttempts}
                    onChange={formik.handleChange}
                  />{" "}
                  <Typography variant="paragraph3" component={"p"}>
                    Attempt
                  </Typography>
                </Stack>
                <Stack mt={"10px"}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        // checked={checkBoxChecked}
                        onChange={(event) => handleSetUnlimited(event)}
                        checked={isUnlimited}
                        disabled={examType?.ExamTypeSlug === mockExamSlug}
                        sx={commonCheckboxField}
                      />
                    }
                    label="Unlimited"
                    sx={checkboxLabelStyle}
                  />
                </Stack>
                {formik.touched.ExamNumberofAttempts &&
                  formik.errors.ExamNumberofAttempts && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {typeof formik.errors.ExamNumberofAttempts === "string"
                        ? formik.errors.ExamNumberofAttempts
                        : "An error occurred"}
                    </FormHelperText>
                  )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Overall Grade Calculation
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </Typography>
                {examType?.ExamTypeSlug == mockExamSlug ? (
                  <CustomTextField
                    id=""
                    variant="outlined"
                    fullWidth
                    disabled={
                      isShuffleQuiz || examType?.ExamTypeSlug === mockExamSlug
                    }
                    placeholder={""}
                    name="ExamPaging"
                    value={"First Attempt"}
                    onChange={formik.handleChange}
                  />
                ) : (
                  <CustomSelect
                    id="standard-select-currency"
                    // value={examCycle}
                    value={selectedGrade}
                    onChange={handleGradeDropDown}
                    fullWidth
                    variant="outlined"
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
                    <MenuItem defaultValue="" disabled>
                      Select Type
                    </MenuItem>
                    {gradeCalculation?.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                )}
                {formik.touched.ExamOverallGradeCalculationID &&
                  formik.errors.ExamOverallGradeCalculationID && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {typeof formik.errors.ExamOverallGradeCalculationID ===
                      "string"
                        ? formik.errors.ExamOverallGradeCalculationID
                        : "An error occurred"}
                    </FormHelperText>
                  )}
              </Box>
            </Stack>
          </Grid>
        </>
      )}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "felx",
          flexDirection: "column",
          gap: "10px",
          "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
            border: "1px solid rgba(115, 138, 150, 0.5) !important"
          }
        }}
      >
        {(examType?.ExamTypeSlug !== mockExamSlug ||
          (examType?.ExamTypeSlug === mockExamSlug &&
            mockOnlineAutoPublish == true)) && (
          <>
            <Typography variant="h5" mb={"16px"}>
              Evaluation and Feedback
            </Typography>
            <Stack
              sx={{
                "& .Mui-focused fieldset,&:hover .MuiInputBase-root fieldset": {
                  border: "1px solid rgba(115, 138, 150, 0.5) !important"
                }
              }}
            >
              <FormControlLabel
                control={
                  <CustomCheckbox
                    // checked={checkBoxChecked}
                    onChange={(event) => handleExamFeedBack(event)}
                    //disabled={examType?.ExamTypeSlug == mockExamSlug}
                    sx={commonCheckboxField}
                  />
                }
                label="Auto Publish Attempt Results immediately upon completion. "
                sx={checkboxLabelStyle}
              />
            </Stack>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <Box>
            <Typography
              variant="paragraph3"
              component={"p"}
              sx={commonFieldLabelStyle}
            >
              Exam Instructions
            </Typography>
            <CustomTextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              name="ExamInstructions"
              value={formik.values.ExamInstructions}
              onChange={formik.handleChange}
            />
          </Box>
        </Stack>
      </Grid>
      {examType && examType?.ExamTypeSlug == "mockExamSlug" && <MockExamSlug />}
      {/* End Select camps */}

      {examType &&
        examType?.ExamTypeSlug !== mockExamSlug &&
        examType?.ExamTypeSlug != selfAssessmentExamSlug && (
          <Grid item xs={12} md={12}>
            <Typography variant="h5">Timing and Display</Typography>
          </Grid>
        )}
    </Grid>
  )
}

export default ExamTime
