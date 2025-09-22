import React from "react";
import {
  checkboxLabelStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonFieldLabelStyle,
} from "@/utils/commonstyles";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, FormikProps } from "formik";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import { StepOneData } from "./types";
import dayjs from "dayjs";

interface ExamTimeSectionProps {
  values: FormikProps<StepOneData>["values"];
  errors: FormikProps<StepOneData>["errors"];
  touched: FormikProps<StepOneData>["touched"];
  setFieldValue: FormikProps<StepOneData>["setFieldValue"];
  isUnlimited: boolean;
  setIsUnlimited: React.Dispatch<React.SetStateAction<boolean>>;
  examTypeSlug: string | undefined;
  theme: ReturnType<typeof useTheme>;
}

const populateOptions = (start: any, end: any) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(
      <MenuItem key={i} value={i < 10 ? "0" + i : i}>
        {i < 10 ? "0" + i : i}
      </MenuItem>
    );
  }
  return options;
};
const ExamTimeSection: React.FC<ExamTimeSectionProps> = ({
  // 3. Destructure the props
  values,
  errors,
  touched,
  setFieldValue,
  isUnlimited,
  setIsUnlimited,
  examTypeSlug,
  theme, // Destructure theme if passed as prop
}) => {
  return (
    <Card sx={commonContentCardStyle}>
      <CustomFormLabel variant="h6" gutterBottom>
        Exam Time
      </CustomFormLabel>

      <Grid container spacing={3}>
        {/* Availability Date */}
        {examTypeSlug === "mock" && (
          <>
            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Number of Booklets
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <Field
                name="ExamNumberofBookletsID"
                as={CustomTextField}
                type="number"
                fullWidth
                error={
                  touched.ExamNumberofBookletsID &&
                  !!errors.ExamNumberofBookletsID
                }
                helperText={
                  touched.ExamNumberofBookletsID &&
                  errors.ExamNumberofBookletsID
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Booklet Duration (min)
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <Field
                name="ExamBookletDuration"
                as={CustomTextField}
                type="number"
                fullWidth
                error={
                  touched.ExamBookletDuration && !!errors.ExamBookletDuration
                }
                helperText={
                  touched.ExamBookletDuration && errors.ExamBookletDuration
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Break Duration (min)
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <Field
                name="ExamBreakDuration"
                as={CustomTextField}
                type="number"
                fullWidth
                error={touched.ExamBreakDuration && !!errors.ExamBreakDuration}
                helperText={
                  touched.ExamBreakDuration && errors.ExamBreakDuration
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Total Number of Questions
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <Field
                name="ExamNumberofQuestions"
                as={CustomTextField}
                type="number"
                fullWidth
                error={
                  touched.ExamNumberofQuestions &&
                  !!errors.ExamNumberofQuestions
                }
                helperText={
                  touched.ExamNumberofQuestions && errors.ExamNumberofQuestions
                }
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Availability Date
            <span style={{ color: "#FC4B6C" }}>*</span>
          </CustomFormLabel>
          <DatePicker
            value={
              values.ExamAvailabilityDate
                ? dayjs(values.ExamAvailabilityDate)
                : null
            }
            onChange={(date) => {
              setFieldValue(
                "ExamAvailabilityDate",
                date ? date.format("YYYY-MM-DD") : ""
              );
            }}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                error={
                  touched.ExamAvailabilityDate && !!errors.ExamAvailabilityDate
                }
                helperText={
                  touched.ExamAvailabilityDate && errors.ExamAvailabilityDate
                }
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Availability Time - Single Row */}
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Availability Time
            <span style={{ color: "#FC4B6C" }}>*</span>
          </CustomFormLabel>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Hours */}
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <CustomSelect
                name="CSTimeOfExamHour"
                value={values.CSTimeOfExam.split(":")[0] || "09"}
                onChange={(e) => {
                  const hour = e.target.value;
                  const [_, minute] = values.CSTimeOfExam.split(":");
                  const newTime = `${hour}:${minute || "00"}`;
                  setFieldValue("CSTimeOfExam", newTime);
                  setFieldValue("ExamQuizStart", newTime);
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Hours
                </MenuItem>
                {populateOptions(1, 12)}
              </CustomSelect>
            </FormControl>

            {/* Minutes */}
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <CustomSelect
                name="CSTimeOfExamMinute"
                value={values.CSTimeOfExam.split(":")[1] || "00"}
                onChange={(e) => {
                  const [hour] = values.CSTimeOfExam.split(":");
                  const minute = e.target.value;
                  const newTime = `${hour || "09"}:${minute}`;

                  setFieldValue("CSTimeOfExam", newTime);
                  setFieldValue("ExamQuizStart", newTime);
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Minutes
                </MenuItem>
                {populateOptions(0, 59)}
              </CustomSelect>
            </FormControl>

            {/* AM/PM Toggle */}
            <ToggleButtonGroup
              value={values.CSTimeOfExamPeriod || "AM"}
              exclusive
              onChange={(e, newPeriod) => {
                if (newPeriod !== null) {
                  setFieldValue("CSTimeOfExamPeriod", newPeriod);
                }
              }}
              size="small"
              sx={{ height: 40 }}
            >
              <ToggleButton value="AM" sx={{ minWidth: 50 }}>
                AM
              </ToggleButton>
              <ToggleButton value="PM" sx={{ minWidth: 50 }}>
                PM
              </ToggleButton>
            </ToggleButtonGroup>

            {/* EST Label */}
            <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
              EST
            </Typography>
          </Box>

          {/* Error Message */}
          {touched.CSTimeOfExam && errors.CSTimeOfExam && (
            <FormHelperText error>{errors.CSTimeOfExam}</FormHelperText>
          )}
        </Grid>

        {/* Due Date & Time - Conditional for Mock Online OR Quiz Async */}
        {values.ExamTimerMode === "asynchronous" && (
          <>
            {/* Due Date */}
            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Due Date
              </CustomFormLabel>
              <DatePicker
                value={values.ExamDueDate ? dayjs(values.ExamDueDate) : null}
                onChange={(date) => {
                  setFieldValue(
                    "ExamDueDate",
                    date ? date.format("YYYY-MM-DD") : ""
                  );
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    error={touched.ExamDueDate && !!errors.ExamDueDate}
                    helperText={touched.ExamDueDate && errors.ExamDueDate}
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Due Time - Single Row */}
            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Due Time
                {examTypeSlug === "mock" &&
                  values.ExamMockLocation === "online" && (
                    <span style={{ color: "#FC4B6C" }}>*</span>
                  )}
              </CustomFormLabel>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "normal",
                  width: "100%",
                  gap: 1,
                }}
              >
                {/* Hours */}
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <CustomSelect
                    name="CSTimeOfExamDueHour"
                    value={values.CSTimeOfExamDue.split(":")[0] || "11"}
                    onChange={(e) => {
                      const hour = e.target.value;
                      const [_, minute] = values.CSTimeOfExamDue.split(":");
                      const newTime = `${hour}:${minute || "00"}`;
                      setFieldValue("CSTimeOfExamDue", newTime);
                      setFieldValue("ExamTimeLimitExpires", newTime);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Hours
                    </MenuItem>
                    {populateOptions(1, 12)}
                  </CustomSelect>
                </FormControl>

                {/* Minutes */}
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <CustomSelect
                    name="CSTimeOfExamDueMinute"
                    value={values.CSTimeOfExamDue.split(":")[1] || "00"}
                    onChange={(e) => {
                      const [hour] = values.CSTimeOfExamDue.split(":");
                      const minute = e.target.value;
                      const newTime = `${hour || "11"}:${minute}`;
                      setFieldValue("CSTimeOfExamDue", newTime);
                      setFieldValue("ExamTimeLimitExpires", newTime);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Minutes
                    </MenuItem>
                    {populateOptions(0, 59)}
                  </CustomSelect>
                </FormControl>

                {/* AM/PM Toggle */}
                <ToggleButtonGroup
                  value={values.CSTimeOfExamDuePeriod || "AM"}
                  exclusive
                  onChange={(e, newPeriod) => {
                    if (newPeriod !== null) {
                      setFieldValue("CSTimeOfExamDuePeriod", newPeriod);
                    }
                  }}
                  size="small"
                  sx={{ height: 40 }}
                >
                  <ToggleButton value="AM" sx={{ minWidth: 50 }}>
                    AM
                  </ToggleButton>
                  <ToggleButton value="PM" sx={{ minWidth: 50 }}>
                    PM
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* EST Label */}
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ ml: 1 }}
                >
                  EST
                </Typography>
              </Box>

              {/* Error Message */}
              {examTypeSlug === "mock" &&
                values.ExamMockLocation === "online" &&
                touched.CSTimeOfExamDue &&
                errors.CSTimeOfExamDue && (
                  <FormHelperText error>
                    {errors.CSTimeOfExamDue}
                  </FormHelperText>
                )}
            </Grid>
          </>
        )}

        {examTypeSlug === "quiz" && (
          <React.Fragment>
            {/* Set Time Limit */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    name="ExamSetTimeLimit"
                    checked={values.ExamSetTimeLimit} // ربط مع Formik
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("ExamSetTimeLimit", event.target.checked);
                    }}
                    sx={commonCheckboxField}
                  />
                }
                label="Set Time Limit"
                sx={checkboxLabelStyle}
              />
            </Grid>

            {values.ExamSetTimeLimit && (
              <Grid item xs={12}>
                <CustomFormLabel sx={commonFieldLabelStyle}>
                  Time Limit
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </CustomFormLabel>
                <Field
                  name="ExamTimeLimit"
                  as={CustomTextField}
                  type="number"
                  fullWidth
                  error={touched.ExamTimeLimit && !!errors.ExamTimeLimit}
                  helperText={touched.ExamTimeLimit && errors.ExamTimeLimit}
                />
                <Typography variant="caption" color="textSecondary">
                  Minute(s)
                </Typography>
              </Grid>
            )}

            {/* Timer Mode */}
            {values.ExamSetTimeLimit && (
              <Grid item xs={12}>
                <CustomFormLabel sx={commonFieldLabelStyle}>
                  Timer Mode
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </CustomFormLabel>
                <RadioGroup
                  name="ExamTimerMode"
                  value={values.ExamTimerMode}
                  onChange={(e) =>
                    setFieldValue("ExamTimerMode", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="asynchronous"
                    control={
                      <Radio
                        sx={{
                          p: "0",
                          gap: "5px",
                          "& svg:not(svg + svg)": {
                            fill: theme.palette.primary.light,
                          },
                          "& input:checked + span svg": {
                            fill: theme.palette.primary.light,
                          },
                        }}
                      />
                    }
                    label="Asynchronous: Timer starts when the learner launches the quiz"
                  />
                  <FormControlLabel
                    value="synchronous"
                    disabled
                    control={
                      <Radio
                        sx={{
                          p: "0",
                          gap: "5px",
                          "& svg:not(svg + svg)": {
                            fill: theme.palette.primary.light,
                          },
                          "& input:checked + span svg": {
                            fill: theme.palette.primary.light,
                          },
                        }}
                      />
                    }
                    label="Synchronous: Timer starts on the start date"
                  />
                </RadioGroup>
              </Grid>
            )}

            {/* When Time Expires */}
            {values.ExamSetTimeLimit && (
              <Grid item xs={12}>
                <CustomFormLabel sx={commonFieldLabelStyle}>
                  When the Time Limit Expires
                  <span style={{ color: "#FC4B6C" }}>*</span>
                </CustomFormLabel>
                <RadioGroup
                  name="ExamTimeLimitAction"
                  value={values.ExamTimeLimitAction}
                  onChange={(e) =>
                    setFieldValue("ExamTimeLimitAction", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="auto-submit"
                    control={<Radio />}
                    label="Automatically submit the quiz attempt"
                  />
                  <FormControlLabel
                    value="flag-exceeded"
                    control={<Radio />}
                    label="Flag as “exceeded time limit” and allow the learner to continue working"
                  />
                  <FormControlLabel
                    value="do-nothing"
                    control={<Radio />}
                    disabled
                    label="Do nothing: the time limit is not enforced"
                  />
                </RadioGroup>
              </Grid>
            )}
          </React.Fragment>
        )}

        {examTypeSlug !== "mock" && (
          <>
            {/* Attempts and Completion */}
            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Number of Attempts
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <Field
                name="ExamNumberofAttempts"
                as={CustomTextField}
                type="number"
                fullWidth
                disabled={isUnlimited}
              />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={isUnlimited} // ربط مع Formik
                    onChange={(e) => {
                      setIsUnlimited(e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("ExamNumberofAttempts", null);
                      } else {
                        setFieldValue("ExamNumberofAttempts", null);
                      }
                    }}
                    sx={commonCheckboxField}
                  />
                }
                label="Unlimited Attempts"
                sx={checkboxLabelStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                Overall Grade Calculation
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
              <FormControl
                fullWidth
                error={
                  touched.ExamOverallGradeCalculationID &&
                  !!errors.ExamOverallGradeCalculationID
                }
              >
                <CustomSelect
                  name="ExamOverallGradeCalculationID"
                  value={values.ExamOverallGradeCalculationID}
                  onChange={(e) =>
                    setFieldValue(
                      "ExamOverallGradeCalculationID",
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="1">Highest Attempt</MenuItem>
                  <MenuItem value="2">Average of All Attempts</MenuItem>
                  <MenuItem value="3">Last Attempt</MenuItem>
                </CustomSelect>
                {touched.ExamOverallGradeCalculationID &&
                  errors.ExamOverallGradeCalculationID && (
                    <FormHelperText>
                      {errors.ExamOverallGradeCalculationID}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={values.ExamEvaluationFeedback} // ربط مع Formik
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        "ExamEvaluationFeedback",
                        event.target.checked
                      );
                    }}
                    sx={commonCheckboxField}
                  />
                }
                label="Auto Publish Attempt Results immediately upon completion."
                sx={checkboxLabelStyle}
              />
            </Grid>
          </>
        )}

        {/* Instructions */}
        <Grid item xs={12}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Exam Instructions
          </CustomFormLabel>
          <Field
            name="ExamInstructions"
            as={CustomTextField}
            multiline
            rows={4}
            fullWidth
            placeholder="Enter instructions for students..."
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExamTimeSection;
