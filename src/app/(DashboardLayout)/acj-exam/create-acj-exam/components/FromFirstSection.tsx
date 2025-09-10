import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import { CornerDownArrowIcon } from "@/components/Icons"
import {
  checkboxLabelStyle,
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonPopStyle,
  commonSelectFieldStyle
} from "@/utils/commonstyles"
import {
  Autocomplete,
  Card,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Typography
} from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useState } from "react"
import {
  mockExamSlug,
  quizzExamSlug,
  selfAssessmentExamSlug
} from "../../constant"
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import { MockexamLocationTypeData } from "../data"
import useCreateExam from "@/hooks/useCreateExam"

function FormFirstSection() {
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const {
    formik,
    examTypeData,
    examType,
    handleChangeDropDown,
    handleChangeExamCourseDropDown,
    examinationCourse,
    selectedExamCourse,
    checkBoxChecked,
    handleChangeCheckBox,
    handleChangeDropDownLocationTypeData,
    isTimeLimit
  } = useCreateExam()

  return (
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
                Examination Name
                <span style={{ color: "#FC4B6C" }}>*</span>
              </Typography>
              <CustomTextField
                id=""
                variant="outlined"
                fullWidth
                placeholder={"Examination Name"}
                name="ExamName"
                value={formik.values.ExamName}
                onChange={formik.handleChange}
                error={
                  formik.touched.ExamName && Boolean(formik.errors.ExamName)
                }
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
                Examination Type
                <span style={{ color: "#FC4B6C" }}>*</span>
              </Typography>
              <Autocomplete
                id="country-select-demo"
                fullWidth
                options={examTypeData ? examTypeData : []}
                value={examType}
                autoHighlight
                getOptionLabel={(option: any) => option.ExamTypeName}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option.ExamTypeID}>
                    {option.ExamTypeName}
                  </li>
                )}
                onChange={(event, value) => {
                  handleChangeDropDown(value)
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    placeholder="Select your exam type..."
                    aria-label="Select your exam type"
                  />
                )}
                popupIcon={<CornerDownArrowIcon />}
                componentsProps={{
                  popper: {
                    sx: commonPopStyle,
                    modifiers: [
                      {
                        name: "flip",
                        enabled: false // Disable flipping to other sides
                      }
                    ]
                  }
                }}
                sx={commonAutocompleteStyle}
              />

              {formik.touched.ExamTypeID && formik.errors.ExamTypeID && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {typeof formik.errors.ExamTypeID === "string"
                    ? formik.errors.ExamTypeID
                    : "An error occurred"}
                </FormHelperText>
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
                Select Course
                <span style={{ color: "#FC4B6C" }}>*</span>
              </Typography>
              <Autocomplete
                loading={searchLoading}
                id="country-select-demo"
                fullWidth
                options={examinationCourse || []} // Ensure options are always an array
                value={selectedExamCourse ?? null} // Ensure value is null when undefined
                autoHighlight
                getOptionLabel={(option: any) =>
                  option?.lmscoursename ? option.lmscoursename : ""
                } // Handle undefined case
                renderOption={(props, option) => (
                  <li {...props} key={option?.ID ?? Math.random()}>
                    {option?.lmscoursename ?? ""}
                  </li>
                )}
                onChange={(event, value) => {
                  handleChangeExamCourseDropDown(value ?? null) // Ensure value is null when cleared
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
                    modifiers: [
                      {
                        name: "flip",
                        enabled: false // Disable flipping to other sides
                      }
                    ]
                  }
                }}
                sx={commonAutocompleteStyle}
              />

              {formik.touched.PrepXExamAFKACJOSCECourse &&
                formik.errors.PrepXExamAFKACJOSCECourse && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {typeof formik.errors.PrepXExamAFKACJOSCECourse === "string"
                      ? formik.errors.PrepXExamAFKACJOSCECourse
                      : "An error occurred"}
                  </FormHelperText>
                )}
            </Box>
          </Stack>
        </Grid>
        {isTimeLimit == true && examType?.ExamTypeSlug == mockExamSlug ? (
          <Grid item xs={12} md={6}>
            <Stack>
              <Box>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Mock Exam Location
                </Typography>
                <CustomSelect
                  id="standard-select-currency"
                  value={formik.values.ExamQuizStart}
                  onChange={handleChangeDropDownLocationTypeData}
                  fullWidth
                  renderInput={(params: any) => (
                    <CustomTextField
                      {...params}
                      placeholder="Select Your Location"
                      aria-label="Select-Your-Location"
                    />
                  )}
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
                  {MockexamLocationTypeData?.map((option: any) => (
                    <MenuItem key={option.selectid} value={option.selectid}>
                      {option.title}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Box>
            </Stack>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={12} md={12}>
          <Stack>
            <Box>
              <Typography
                variant="paragraph3"
                component={"p"}
                sx={commonFieldLabelStyle}
              >
                Short Description{" "}
                {/* <span style={{ color: "#FC4B6C" }}>*</span> */}
              </Typography>
              <CustomTextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
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
                  <CustomCheckbox
                    checked={checkBoxChecked}
                    onChange={handleChangeCheckBox}
                    sx={commonCheckboxField}
                  />
                }
                label="Long Description"
                sx={checkboxLabelStyle}
              />
              {(examType?.ExamTypeSlug == selfAssessmentExamSlug ||
                examType?.ExamTypeSlug == quizzExamSlug ||
                examType?.ExamTypeSlug == mockExamSlug) &&
                checkBoxChecked && (
                  <CustomTextField
                    id="outlined-multiline-static2"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    disabled={!checkBoxChecked}
                    name="LongDescription"
                    value={formik.values.LongDescription}
                    onChange={formik.handleChange}
                  />
                )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )
}

export default FormFirstSection
