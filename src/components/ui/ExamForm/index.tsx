import React from 'react';
import { useFormik } from 'formik';
import { Card, Grid, Stack, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Dayjs } from 'dayjs';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomSelect from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect';
import { MenuItem, FormHelperText } from '@mui/material';
import {
  commonContentCardStyle,
  commonFieldLabelStyle,
  commonSelectFieldStyle,
  commonDropdownMenuStyle,
  calenderTextField,
} from '@/utils/commonstyles';
import { ExamFormValidation } from '@/business/exam/formValidation';
import { ExamType } from '@/business/exam/types';

interface ExamFormProps {
  examTypes: ExamType[];
  examType: ExamType | null;
  setExamType: (examType: ExamType | null) => void;
  isUnlimited: boolean;
  setIsUnlimited: (value: boolean) => void;
  isTimeLimit: boolean;
  setIsTimeLimit: (value: boolean) => void;
  availabilityDateValue: Dayjs | null;
  setAvailabilityDateValue: (value: Dayjs | null) => void;
  dueDateValue: Dayjs | null;
  setDueDateValue: (value: Dayjs | null) => void;
  selectedHour: string;
  setSelectedHour: (value: string) => void;
  selectedMinute: string;
  setSelectedMinute: (value: string) => void;
  selectedShift: string;
  setSelectedShift: (value: string) => void;
  selectedHourDue: string;
  setSelectedHourDue: (value: string) => void;
  selectedMinuteDue: string;
  setSelectedMinuteDue: (value: string) => void;
  selectedShiftDue: string;
  setSelectedShiftDue: (value: string) => void;
  onSubmit: (values: any) => void;
  isLoading: boolean;
}

export const ExamForm: React.FC<ExamFormProps> = ({
  examTypes,
  examType,
  setExamType,
  isUnlimited,
  setIsUnlimited,
  isTimeLimit,
  setIsTimeLimit,
  availabilityDateValue,
  setAvailabilityDateValue,
  dueDateValue,
  setDueDateValue,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedShift,
  setSelectedShift,
  selectedHourDue,
  setSelectedHourDue,
  selectedMinuteDue,
  setSelectedMinuteDue,
  selectedShiftDue,
  setSelectedShiftDue,
  onSubmit,
  isLoading,
}) => {
  const formik = useFormik({
    initialValues: {
      ExamName: "",
      PrepXExamAFKACJOSCECourse: "",
      ExamTypeID: "",
      Status: 0,
      ShortDescription: "",
      LongDescription: false,
      LongDescriptionText: "",
      ExamBookletDuration: 1,
      ExamNumberofBookletsID: "",
      ExamBreakDuration: 1,
      ExamNumberofQuestions: 1,
      ExamSetTimeLimit: 0,
      ExamTimeLimit: 1,
      ExamQuizStart: 1,
      ExamTimeLimitExpires: 1,
      ExamAvailabilityDate: "",
      ExamDueDate: "",
      ExamShuffleQuiz: 0,
      ExamPaging: 0,
      ExamNumberofAttempts: "",
      ExamOverallGradeCalculationID: 1,
      ExamEvaluationFeedback: 0,
      ExamPublishedDisplayToLearners: 0,
      ExamAdditionallyID: 0,
      ExamInstructions: "",
      PrepXExamAFKACJOSCECampus: [],
      ExamCourseType: "",
      CSTimeOfExam: "",
      CSTimeOfExamDue: "",
    },
    validationSchema: ExamFormValidation.getValidationSchema(examType?.ExamTypeSlug, isUnlimited),
    onSubmit,
  });

  const handleExamTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTypeId = event.target.value;
    const selectedType = examTypes?.find((type) => type.ExamTypeID.toString() === selectedTypeId) || null;
    setExamType(selectedType);
    formik.setFieldValue("ExamTypeID", selectedTypeId);
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const courseValue = event.target.value;
    formik.setFieldValue("PrepXExamAFKACJOSCECourse", courseValue);
  };

  const handleLongDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("LongDescription", event.target.checked);
    if (!event.target.checked) {
      formik.setFieldValue("LongDescriptionText", "");
    }
  };

  const handleTimeLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTimeLimit(event.target.checked);
    formik.setFieldValue("ExamSetTimeLimit", event.target.checked ? 1 : 0);
  };

  const handleUnlimitedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUnlimited(event.target.checked);
    if (event.target.checked) {
      formik.setFieldValue("ExamNumberofAttempts", "");
    }
  };

  const handleEvaluationFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("ExamEvaluationFeedback", event.target.checked ? 1 : 0);
  };

  const handleHourChange = (event: any) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event: any) => {
    setSelectedMinute(event.target.value);
  };

  const handleShiftChange = (event: any) => {
    setSelectedShift(event.target.value);
  };

  const handleHourDueChange = (event: any) => {
    setSelectedHourDue(event.target.value);
  };

  const handleMinuteDueChange = (event: any) => {
    setSelectedMinuteDue(event.target.value);
  };

  const handleShiftDueChange = (event: any) => {
    setSelectedShiftDue(event.target.value);
  };

  const handleOverallGradeChange = (event: any) => {
    formik.setFieldValue("ExamOverallGradeCalculationID", event.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={commonContentCardStyle}>
        <Grid container spacing={"32px"}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Exam Details
            </Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  PrepX ID
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Exam - xxxx"}
                  name="PrepX_G_id"
                  disabled
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Examination Name*
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Examination Name"}
                  name="ExamName"
                  value={formik.values.ExamName}
                  onChange={formik.handleChange}
                  error={formik.touched.ExamName && Boolean(formik.errors.ExamName)}
                  helperText={formik.touched.ExamName && formik.errors.ExamName}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Examination Type*
                </Typography>
                <CustomSelect
                  id="standard-select-currency"
                  value={formik.values.ExamTypeID}
                  onChange={handleExamTypeChange}
                  fullWidth
                  variant="outlined"
                  displayEmpty
                  sx={commonSelectFieldStyle}
                  error={formik.touched.ExamTypeID && Boolean(formik.errors.ExamTypeID)}
                  MenuProps={{
                    style: {
                      maxHeight: 350,
                    },
                    PaperProps: {
                      sx: commonDropdownMenuStyle,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select your exam type...
                  </MenuItem>
                  {examTypes?.map((option) => (
                    <MenuItem key={option.ExamTypeID} value={option.ExamTypeID}>
                      {option.ExamTypeName}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.ExamTypeID && formik.errors.ExamTypeID && (
                  <FormHelperText error>{formik.errors.ExamTypeID}</FormHelperText>
                )}
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Select Course*
                </Typography>
                <CustomSelect
                  id="standard-select-course"
                  value={formik.values.PrepXExamAFKACJOSCECourse}
                  onChange={handleCourseChange}
                  fullWidth
                  variant="outlined"
                  displayEmpty
                  sx={commonSelectFieldStyle}
                  error={formik.touched.PrepXExamAFKACJOSCECourse && Boolean(formik.errors.PrepXExamAFKACJOSCECourse)}
                  MenuProps={{
                    style: {
                      maxHeight: 350,
                    },
                    PaperProps: {
                      sx: commonDropdownMenuStyle,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Your Course...
                  </MenuItem>
                  <MenuItem value="ACJ">ACJ</MenuItem>
                  <MenuItem value="OSCE">OSCE</MenuItem>
                  <MenuItem value="AFK">AFK</MenuItem>
                </CustomSelect>
                {formik.touched.PrepXExamAFKACJOSCECourse && formik.errors.PrepXExamAFKACJOSCECourse && (
                  <FormHelperText error>{formik.errors.PrepXExamAFKACJOSCECourse}</FormHelperText>
                )}
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Short Description
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter short description"}
                  name="ShortDescription"
                  value={formik.values.ShortDescription}
                  onChange={formik.handleChange}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.LongDescription}
                      onChange={handleLongDescriptionChange}
                      name="LongDescription"
                    />
                  }
                  label="Long Description"
                />
                {formik.values.LongDescription && (
                  <Box sx={{ mt: 2 }}>
                    <CustomTextField
                      id="long-description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder={"Enter long description"}
                      name="LongDescriptionText"
                      value={formik.values.LongDescriptionText}
                      onChange={formik.handleChange}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ ...commonContentCardStyle, mt: 3 }}>
        <Grid container spacing={"32px"}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Exam Time
            </Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Availability Date*
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={availabilityDateValue}
                    onChange={(newValue) => setAvailabilityDateValue(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={calenderTextField}
                        fullWidth
                        placeholder="yyyy/mm/dd"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Availability time*
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CustomSelect
                    value={selectedHour}
                    onChange={handleHourChange}
                    sx={{ minWidth: 80 }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                      <MenuItem key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <Typography>:</Typography>
                  <CustomSelect
                    value={selectedMinute}
                    onChange={handleMinuteChange}
                    sx={{ minWidth: 80 }}
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <MenuItem key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <CustomSelect
                    value={selectedShift}
                    onChange={handleShiftChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                  </CustomSelect>
                  <Typography sx={{ ml: 1 }}>EST</Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Due Date*
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={dueDateValue}
                    onChange={(newValue) => setDueDateValue(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={calenderTextField}
                        fullWidth
                        placeholder="yyyy/mm/dd"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Due time*
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CustomSelect
                    value={selectedHourDue}
                    onChange={handleHourDueChange}
                    sx={{ minWidth: 80 }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                      <MenuItem key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <Typography>:</Typography>
                  <CustomSelect
                    value={selectedMinuteDue}
                    onChange={handleMinuteDueChange}
                    sx={{ minWidth: 80 }}
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <MenuItem key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <CustomSelect
                    value={selectedShiftDue}
                    onChange={handleShiftDueChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                  </CustomSelect>
                  <Typography sx={{ ml: 1 }}>EST</Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
              Timing and Display
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTimeLimit}
                      onChange={handleTimeLimitChange}
                      name="ExamSetTimeLimit"
                    />
                  }
                  label="Set Time Limit"
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
              Attempts and Completion
            </Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Number of Attempts*
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CustomTextField
                    id=""
                    variant="outlined"
                    placeholder={"Enter number"}
                    name="ExamNumberofAttempts"
                    value={formik.values.ExamNumberofAttempts}
                    onChange={formik.handleChange}
                    disabled={isUnlimited}
                    sx={{ flex: 1 }}
                  />
                  <Typography>Attempt</Typography>
                </Stack>
                <Box sx={{ mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isUnlimited}
                        onChange={handleUnlimitedChange}
                        name="Unlimited"
                      />
                    }
                    label="Unlimited"
                  />
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Overall Grade Calculation*
                </Typography>
                <CustomSelect
                  id="standard-select-grade"
                  value={formik.values.ExamOverallGradeCalculationID}
                  onChange={handleOverallGradeChange}
                  fullWidth
                  variant="outlined"
                  sx={commonSelectFieldStyle}
                >
                  <MenuItem value={1}>Highest Attempt</MenuItem>
                  <MenuItem value={2}>Average of All Attempts</MenuItem>
                  <MenuItem value={3}>Last Attempt</MenuItem>
                </CustomSelect>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
              Evaluation and Feedback
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.ExamEvaluationFeedback === 1}
                      onChange={handleEvaluationFeedbackChange}
                      name="ExamEvaluationFeedback"
                    />
                  }
                  label="Auto Publish Attempt Results immediately upon completion."
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
              Exam Instructions
            </Typography>
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
                  rows={4}
                  variant="outlined"
                  fullWidth
                  name="ExamInstructions"
                  value={formik.values.ExamInstructions}
                  onChange={formik.handleChange}
                  placeholder="Enter exam instructions..."
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};
