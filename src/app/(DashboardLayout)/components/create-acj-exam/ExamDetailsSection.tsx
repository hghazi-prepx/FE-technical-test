import {
  checkboxLabelStyle,
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonFieldLabelStyle,
  commonPopStyle,
} from "@/utils/commonstyles";
import {
  Autocomplete,
  Box,
  Card,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { CornerDownArrowIcon } from "@/components/Icons";
import { Field, FormikProps } from "formik";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import { ExamType, StepOneData } from "./types";
import { exampTypeSlugAllowed } from "../../acj-exam/constant";
import { handleExamTypeChange } from "./exam-handlers";
import { examinationCourse } from "@/types/types";
interface ExamDetailsSectionProps {
  values: FormikProps<StepOneData>["values"];
  errors: FormikProps<StepOneData>["errors"];
  touched: FormikProps<StepOneData>["touched"];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  examTypeData: ExamType[];
  isLoading: boolean;
  examinationCourse: examinationCourse[];
  searchLoading: boolean;
  selectedExamCourse: number;
  handleChangeExamCourseDropDown: (value: examinationCourse) => void;
  setExamTypeSlug: React.Dispatch<React.SetStateAction<string | undefined>>;
  examTypeSlug: string | undefined;
}

const mockLocations = [
  { ID: "onsite", name: "Onsite" },
  { ID: "online", name: "Online" },
];

const ExamDetailsSection: React.FC<ExamDetailsSectionProps> = ({
  values,
  errors,
  touched,
  setFieldValue,
  examTypeData,
  isLoading,
  examinationCourse,
  searchLoading,
  selectedExamCourse,
  handleChangeExamCourseDropDown,
  setExamTypeSlug,
  examTypeSlug,
}) => {
  console.log(selectedExamCourse);
  return (
    <Card sx={commonContentCardStyle}>
      <Grid container spacing={"32px"}>
        {/* Exam Name */}
        <Grid item xs={12} md={6}>
          <Stack>
            <Box>
              <CustomFormLabel sx={commonFieldLabelStyle}>
                PrepX ID
                <span style={{ color: "#FC4B6C" }}>*</span>
              </CustomFormLabel>
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
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Examination Name
            <span style={{ color: "#FC4B6C" }}>*</span>
          </CustomFormLabel>
          <Field
            name="ExamName"
            as={CustomTextField}
            fullWidth
            error={touched.ExamName && !!errors.ExamName}
            helperText={touched.ExamName && errors.ExamName}
          />
        </Grid>

        {/* Exam Type */}
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Exam Type<span style={{ color: "#FC4B6C" }}>*</span>
          </CustomFormLabel>
          <Autocomplete
            loading={isLoading}
            options={examTypeData}
            getOptionLabel={(option: ExamType) => option.ExamTypeName.trim()}
            value={
              examTypeData.find((t) => t.ExamTypeID === values.ExamTypeID) ||
              null
            }
            isOptionEqualToValue={(option, value) =>
              option.ExamTypeID === value.ExamTypeID
            }
            onChange={(e, value) =>
              handleExamTypeChange({
                value,
                setFieldValue,
                setExamTypeSlug,
                exampTypeSlugAllowed,
              })
            }
            renderOption={(props, option) => (
              <li {...props} key={option.ExamTypeID}>
                {option.ExamTypeName.trim()}
              </li>
            )}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                placeholder="Select Exam Type..."
                aria-label="Select Exam Type"
              />
            )}
            popupIcon={<CornerDownArrowIcon />}
            componentsProps={{
              popper: {
                sx: commonPopStyle,
                modifiers: [{ name: "flip", enabled: false }],
              },
            }}
            sx={commonAutocompleteStyle}
          />
          {touched.ExamTypeID && errors.ExamTypeID && (
            <FormHelperText error>{errors.ExamTypeID}</FormHelperText>
          )}

          {touched.ExamTypeID && errors.ExamTypeID && (
            <FormHelperText error>{errors.ExamTypeID}</FormHelperText>
          )}
        </Grid>

        {/* Select Course */}
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Select Course
            <span style={{ color: "#FC4B6C" }}>*</span>
          </CustomFormLabel>
          <Autocomplete
            loading={searchLoading}
            id="course-select"
            fullWidth
            options={examinationCourse || []}
            value={
              examinationCourse.find(
                (t) => t.lmscourseid === values.PrepXExamAFKACJOSCECourse
              ) || null
            }
            autoHighlight
            getOptionLabel={(option: any) => option?.lmscoursename || ""}
            renderOption={(props, option) => (
              <li {...props} key={option?.Identifier ?? Math.random()}>
                {option?.lmscoursename ?? ""}
              </li>
            )}
            onChange={(event, value) => {
              handleChangeExamCourseDropDown(value);
            }}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                placeholder="Select Your Course..."
                aria-label="Select Your Course"
              />
            )}
            popupIcon={<CornerDownArrowIcon />}
            componentsProps={{
              popper: {
                sx: commonPopStyle,
                modifiers: [{ name: "flip", enabled: false }],
              },
            }}
            sx={commonAutocompleteStyle}
          />
          {touched.PrepXExamAFKACJOSCECourse &&
            errors.PrepXExamAFKACJOSCECourse && (
              <FormHelperText error id="standard-weight-helper-text-course">
                {typeof errors.PrepXExamAFKACJOSCECourse === "string"
                  ? errors.PrepXExamAFKACJOSCECourse
                  : "An error occurred"}
              </FormHelperText>
            )}
        </Grid>
        {examTypeSlug === "mock" && (
          <Grid item xs={12}>
            <CustomFormLabel sx={commonFieldLabelStyle}>
              Mock Exam Location
              <span style={{ color: "#FC4B6C" }}>*</span>
            </CustomFormLabel>
            <Autocomplete
              options={mockLocations}
              value={
                mockLocations.find(
                  (loc) => loc.ID === values.ExamMockLocation
                ) || null
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                setFieldValue("ExamMockLocation", value?.ID || "");

                value?.ID === "online" &&
                  setFieldValue("ExamTimerMode", "asynchronous");
                value?.ID === "onsite" &&
                  setFieldValue("ExamTimerMode", "synchronous");
              }}
              renderInput={(params) => (
                <CustomTextField {...params} placeholder="Select location..." />
              )}
              popupIcon={<CornerDownArrowIcon />}
              componentsProps={{
                popper: {
                  sx: commonPopStyle,
                  modifiers: [{ name: "flip", enabled: false }],
                },
              }}
              sx={commonAutocompleteStyle}
            />
            {touched.ExamMockLocation && errors.ExamMockLocation && (
              <FormHelperText error>{errors.ExamMockLocation}</FormHelperText>
            )}
          </Grid>
        )}

        {/* Short Description */}
        <Grid item xs={12}>
          <CustomFormLabel sx={commonFieldLabelStyle}>
            Short Description
          </CustomFormLabel>
          <Field
            name="ShortDescription"
            as={CustomTextField}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>

        {/* Long Description Toggle */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={values.LongDescriptionEnabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const checked = event.target.checked;
                  setFieldValue("LongDescriptionEnabled", checked);

                  // Optional: clear field when disabled
                  if (!checked) {
                    setFieldValue("LongDescription", "");
                  }
                }}
                sx={commonCheckboxField}
              />
            }
            label=" Long Description"
            sx={checkboxLabelStyle}
          />
        </Grid>

        {/* Long Description (Conditional) */}
        {values.LongDescriptionEnabled && (
          <Grid item xs={12}>
            <CustomFormLabel sx={commonFieldLabelStyle}>
              Long Description
              <span style={{ color: "#FC4B6C" }}>*</span>
            </CustomFormLabel>
            <Field
              name="LongDescription"
              as={CustomTextField}
              multiline
              rows={4}
              fullWidth
              placeholder="Enter detailed description..."
              error={touched.LongDescription && !!errors.LongDescription}
              helperText={touched.LongDescription && errors.LongDescription}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ExamDetailsSection;
