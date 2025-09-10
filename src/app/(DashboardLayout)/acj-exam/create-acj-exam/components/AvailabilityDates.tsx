import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import {
  commonAutocompleteStyle,
  commonPopStyle,
  disableInputStyle,
  fieldLabel
} from "@/utils/commonstyles"
import theme from "@/utils/theme"
import { Autocomplete, FormHelperText, Grid, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { booklet } from "../../dropDowns"
import { CornerDownArrowIcon } from "@/components/Icons"
import useCreateExam from "@/hooks/useCreateExam"

function AvailabilityDates() {
  const {
    formik,
    isTimeLimit,
    bookletValue,
    numberOfQuestionError,
    setNumberOfQuestionError
  } = useCreateExam()

  return (
    <Grid container spacing={"32px"} marginTop={"2px"}>
      <Grid item xs={12} md={12}>
        <Typography variant="h5">Availability Dates and Conditions</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack>
          <Box
            sx={{
              position: "relative"
            }}
          >
            <CustomFormLabel
              htmlFor="activeStatus"
              sx={{
                ...fieldLabel,
                color: theme.palette.secondary.fieldText
              }}
            >
              Booklet Duration (min)
              <span style={{ color: "#FC4B6C" }}>*</span>
            </CustomFormLabel>

            <CustomTextField
              id=""
              variant="outlined"
              fullWidth
              placeholder={""}
              disabled={!isTimeLimit}
              name="ExamBookletDuration"
              value={formik.values.ExamBookletDuration}
              onChange={(e: any) => {
                const value = e.target.value
                // Allow only positive numbers
                if (/^[1-9]\d*$/.test(value) || value === "") {
                  formik.handleChange(e)
                }
              }}
              sx={{
                ...disableInputStyle,
                backgroundColor: "transparent !important",
                "& .Mui-disabled fieldset": {
                  backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
                  border: `${theme.palette.secondary.disableFieldColor} !important`
                }
              }}
            />
            {formik.touched.ExamBookletDuration &&
              formik.errors.ExamBookletDuration && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {formik.errors.ExamBookletDuration as string}
                </FormHelperText>
              )}
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack>
          <Box>
            <CustomFormLabel
              htmlFor=""
              sx={{
                ...fieldLabel,
                color: theme.palette.secondary.fieldText
              }}
            >
              Number of Booklets
              <span style={{ color: "#FC4B6C" }}>*</span>
            </CustomFormLabel>
            <Autocomplete
              id="checkboxes-tags-demo"
              options={booklet}
              getOptionLabel={(option: any) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>{option.label}</li>
              )}
              fullWidth
              onChange={(event, value) => {
                formik.setFieldValue("ExamNumberofBookletsID", value?.id || "")
                if (value?.id == "1") {
                  formik.setFieldValue("ExamBreakDuration", "0")
                } else {
                  formik.setFieldValue("ExamBreakDuration", "1")
                  formik.setFieldValue("ExamNumberofQuestions", "")
                }
              }}
              renderInput={(params: any) => (
                <CustomTextField
                  {...params}
                  placeholder="Select Your Booklet"
                  aria-label="Select-Your-Booklet"
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
          </Box>
          {formik.touched.ExamNumberofBookletsID &&
            formik.errors.ExamNumberofBookletsID && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {typeof formik.errors.ExamNumberofBookletsID === "string"
                  ? formik.errors.ExamNumberofBookletsID
                  : "An error occurred"}
              </FormHelperText>
            )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomFormLabel
          htmlFor=""
          sx={{
            marginTop: "0",
            color: theme.palette.secondary.fieldText,
            fontWeight: 500,
            fontSize: "14px"
          }}
        >
          Break Duration (min)
          <span style={{ color: "#FC4B6C" }}>*</span>
        </CustomFormLabel>
        <CustomTextField
          id=""
          variant="outlined"
          fullWidth
          placeholder={""}
          name="ExamBreakDuration"
          disabled={
            !isTimeLimit ||
            bookletValue == 1 ||
            formik.values.ExamNumberofBookletsID == 1
          }
          value={formik.values.ExamBreakDuration}
          onChange={(e: any) => {
            const value = e.target.value
            // Allow only positive numbers
            if (/^[1-9]\d*$/.test(value) || value === "") {
              formik.handleChange(e)
            }
          }}
          sx={{
            ...disableInputStyle,
            backgroundColor: "transparent !important",
            "& .Mui-disabled fieldset": {
              backgroundColor: `${theme.palette.secondary.disableFieldColor} !important`,
              border: `${theme.palette.secondary.disableFieldColor} !important`
            }
          }}
        />
        {formik.touched.ExamBreakDuration &&
          formik.errors.ExamBreakDuration && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.touched.ExamBreakDuration &&
                formik.errors.ExamBreakDuration && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {typeof formik.errors.ExamBreakDuration === "string"
                      ? formik.errors.ExamBreakDuration
                      : "An error occurred"}
                  </FormHelperText>
                )}
            </FormHelperText>
          )}
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomFormLabel
          htmlFor=""
          sx={{
            marginTop: "0",
            color: theme.palette.secondary.fieldText,
            fontWeight: 500,
            fontSize: "14px"
          }}
        >
          Total number of questions
          <span style={{ color: "#FC4B6C" }}>*</span>
        </CustomFormLabel>
        <CustomTextField
          id=""
          variant="outlined"
          fullWidth
          placeholder={""}
          name="ExamNumberofQuestions"
          value={formik.values.ExamNumberofQuestions}
          onChange={(e: any) => {
            const value = e.target.value
            // Allow only positive numbers
            if (value == "") {
              setNumberOfQuestionError(false)
            }
            if (/^[1-9]\d*$/.test(value) || value === "") {
              formik.handleChange(e)
              if (
                formik.values.ExamNumberofBookletsID == 2 &&
                value &&
                parseInt(value) % 2 === 0
              ) {
                formik.setFieldError("ExamNumberofQuestions", "") // Clear the error when even number is entered
              }
            }
          }}
          onBlur={() => {
            const value = formik.values.ExamNumberofQuestions
            if (
              formik.values.ExamNumberofBookletsID == 2 &&
              value &&
              parseInt(value) % 2 !== 0
            ) {
              setNumberOfQuestionError(true)
              // alert("Please enter an even number."); // Optional: Inform the user
            } else {
              setNumberOfQuestionError(false)
            }
          }}
        />
        {numberOfQuestionError && (
          <span style={{ color: "#FC4B6C" }}>
            <FormHelperText error id="standard-weight-helper-text-email-login">
              (Please enter the even number only)
            </FormHelperText>
          </span>
        )}
        {formik.touched.ExamNumberofQuestions &&
          formik.errors.ExamNumberofQuestions && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.touched.ExamNumberofQuestions &&
                formik.errors.ExamNumberofQuestions && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {typeof formik.errors.ExamNumberofQuestions === "string"
                      ? formik.errors.ExamNumberofQuestions
                      : "An error occurred"}
                  </FormHelperText>
                )}
            </FormHelperText>
          )}
      </Grid>
    </Grid>
  )
}

export default AvailabilityDates
