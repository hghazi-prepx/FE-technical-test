import React from 'react';
import { useFormik } from 'formik';
import { Card, Grid, Stack, Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

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
  availabilityDateValue: Dayjs | null;
  setAvailabilityDateValue: (value: Dayjs | null) => void;
  dueDateValue: Dayjs | null;
  setDueDateValue: (value: Dayjs | null) => void;
  onSubmit: (values: any) => void;
  isLoading: boolean;
}

export const ExamForm: React.FC<ExamFormProps> = ({
  examTypes,
  examType,
  setExamType,
  isUnlimited,
  availabilityDateValue,
  setAvailabilityDateValue,
  dueDateValue,
  setDueDateValue,
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
      LongDescription: "",
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={commonContentCardStyle}>
        <Grid container spacing={"32px"}>
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
                  Exam Name
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter exam name"}
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
                  Exam Type
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
                  <MenuItem defaultValue="" disabled>
                    Select Type
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
                  Exam Course
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter exam course"}
                  name="PrepXExamAFKACJOSCECourse"
                  value={formik.values.PrepXExamAFKACJOSCECourse}
                  onChange={formik.handleChange}
                  error={formik.touched.PrepXExamAFKACJOSCECourse && Boolean(formik.errors.PrepXExamAFKACJOSCECourse)}
                  helperText={formik.touched.PrepXExamAFKACJOSCECourse && formik.errors.PrepXExamAFKACJOSCECourse}
                />
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
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Long Description
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter long description"}
                  name="LongDescription"
                  value={formik.values.LongDescription}
                  onChange={formik.handleChange}
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
                  Time Limit (minutes)
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter time limit"}
                  name="ExamTimeLimit"
                  value={formik.values.ExamTimeLimit}
                  onChange={formik.handleChange}
                  error={formik.touched.ExamTimeLimit && Boolean(formik.errors.ExamTimeLimit)}
                  helperText={formik.touched.ExamTimeLimit && formik.errors.ExamTimeLimit}
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
                  Number of Questions
                </Typography>
                <CustomTextField
                  id=""
                  variant="outlined"
                  fullWidth
                  placeholder={"Enter number of questions"}
                  name="ExamNumberofQuestions"
                  value={formik.values.ExamNumberofQuestions}
                  onChange={formik.handleChange}
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
                  Availability Date
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
                        placeholder="Select availability date"
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
                  Due Date
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
                        placeholder="Select due date"
                      />
                    )}
                  />
                </LocalizationProvider>
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
        </Grid>
      </Card>
    </form>
  );
};
