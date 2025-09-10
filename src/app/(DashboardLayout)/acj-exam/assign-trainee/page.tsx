"use client"
import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Button,
  Autocomplete,
  IconButton,
  Dialog,
  DialogContent
} from "@mui/material"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import { useTheme } from "@mui/material/styles"
import { CornerDownArrowIcon, PlusIcon } from "@/components/Icons"
import Loading from "../../loading"
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonPopStyle,
  commonTableCardStyle,
  linkButton,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import { IconX } from "@tabler/icons-react"
import Image from "next/image"
import moment from "moment"
import ExamWizardSteps from "@/components/ExamWizardSteps"

import useAssignTrainee from "@/hooks/useAssignTrainee"
import TraineeTable from "./components/TraineeTable"

export default function AssignTrainee() {
  const {
    searchLoading,
    studentData,
    openAutocomplete,
    setOpenAutocomplete,
    setSearchValue,
    defaultSelectedValue,
    selectedOptions,
    selectedStudents,
    setSelectedOptions,
    studentHandleChange,
    searchItem,
    searchValue,
    studentSelectedId,
    handleAssignStudent,
    router,
    examId,
    handleSaveAsDraft,
    modalPreviewOpen,
    handlePreviewModalClose,
    traineeData,
    isLoading,
    setSelectedStudents
  } = useAssignTrainee()
  const theme = useTheme()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <PageContainer title="Assign Trainees" description="Assign Trainees">
        <ExamWizardSteps step={2} examid={examId} />
        {/* breadcrumb */}
        <Card sx={commonContentCardStyle}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative"
                }}
              >
                <Autocomplete
                  freeSolo
                  id="checkboxes-tags-demo"
                  loading={searchLoading}
                  multiple
                  options={studentData?.length ? studentData : []}
                  open={openAutocomplete}
                  onBlur={() => {
                    setOpenAutocomplete(false), setSearchValue("")
                  }}
                  getOptionLabel={(option: any) =>
                    option?.UserFirstName +
                    " " +
                    option?.UserLastName +
                    " / " +
                    option?.UserRoleTextID
                  }
                  defaultValue={
                    studentData &&
                    studentData?.find(
                      (option: any) =>
                        defaultSelectedValue?.[0] == option?.UserID
                    )
                  }
                  value={selectedOptions}
                  renderOption={(props, option, { selected }) => {
                    const isSelected =
                      selectedStudents &&
                      selectedStudents.includes(option.UserID)
                    return (
                      <li {...props}>
                        <CustomCheckbox
                          style={{ marginRight: 8 }}
                          checked={isSelected}
                          className="c-checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOptions((prevSelected) =>
                                prevSelected.filter(
                                  (id) => id !== option.UserID
                                )
                              )
                            } else {
                              setSelectedStudents((prevSelected: any) =>
                                prevSelected.filter(
                                  (id: any) => id !== option.UserID
                                )
                              )
                              setSelectedOptions((prevSelected) =>
                                prevSelected.filter(
                                  (id) => id !== option.UserID
                                )
                              )
                            }
                          }}
                          sx={commonCheckboxField}
                        />
                        {option?.UserFirstName +
                          " " +
                          option?.UserLastName +
                          " / " +
                          option?.UserRoleTextID}
                        <Button
                          type="submit"
                          size="small"
                          sx={{
                            borderRadius: "4px",
                            color: "#fff",
                            backgroundColor: theme.palette.secondary.main,
                            padding: "5px 10px",
                            marginLeft: "auto",
                            "&:hover": {
                              color: "#fff",
                              backgroundColor: theme.palette.secondary.main
                            }
                          }}
                          onClick={(event) => {
                            event.stopPropagation()
                            setOpenAutocomplete(false)
                          }}
                        >
                          Preview
                        </Button>
                      </li>
                    )
                  }}
                  fullWidth
                  onChange={(event, value) => {
                    studentHandleChange(value)
                    setSelectedOptions(value)
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Search by name, Trainee ID...( type test to see mock data )"
                      aria-label="Search"
                      onChange={searchItem}
                      value={searchValue}
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
                  sx={{
                    ...commonAutocompleteStyle,
                    "& .MuiAutocomplete-inputRoot": {
                      pr: "120px"
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "115px !important"
                    }
                  }}
                />

                <Box
                  display={"flex"}
                  gap={"12px"}
                  justifyContent={"left"}
                  position={"relative"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "6px"
                  }}
                >
                  <Button
                    sx={{
                      ...primaryButon,
                      height: "38px",
                      p: "9px 16px",
                      zIndex: "10",
                      "&:disabled": {
                        opacity: 0.8
                      },
                      "& svg": {
                        mr: "2px",
                        width: "16px"
                      }
                    }}
                    disabled={selectedStudents && selectedStudents.length == 0}
                    onClick={() =>
                      studentSelectedId ? handleAssignStudent() : ""
                    }
                  >
                    <PlusIcon />
                    Assign
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Card sx={commonTableCardStyle}>
          <TraineeTable />
        </Card>
        <Box mt={6}>
          <Box
            display={"flex"}
            gap={"20px"}
            justifyContent={"left"}
            alignItems={"center"}
          >
            <Button
              sx={{
                ...secondaryButon,
                mr: "auto"
              }}
              onClick={() => {
                handleSaveAsDraft()
              }}
            >
              Save as Draft
            </Button>

            <Button
              sx={{
                ...linkButton
              }}
              onClick={() => {
                router.push(`/acj-exam/review-details?examid=${examId}`)
              }}
            >
              Skip for now
            </Button>
            <Button
              sx={{
                ...primaryButon
              }}
              onClick={() => {
                router.push(`/acj-exam/review-details?examid=${examId}`)
              }}
            >
              Generate
            </Button>
          </Box>
        </Box>
        <Dialog
          open={modalPreviewOpen}
          onClose={handlePreviewModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "1400px",
              padding: "15px",
              paddingTop: "30px",
              bgcolor: theme.palette.background.light
            },
            "& .MuiTabPanel-root": {}
          }}
          className="q-modal"
        >
          <IconButton
            aria-label="close"
            onClick={handlePreviewModalClose}
            sx={{
              position: "absolute",
              right: 7,
              top: 3,
              color: "#ccc"
            }}
          >
            <IconX stroke={2} />
          </IconButton>
          <DialogContent
            sx={{
              p: 0
            }}
          >
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
              >
                Trainee Profile Picture
              </Typography>
              <Grid container spacing={3} mb={"24px"}>
                <Grid item xs={12} md={12}>
                  <Box
                    textAlign="center"
                    lineHeight={0}
                    sx={{
                      "& img": {
                        borderRadius: "50%",
                        objectFit: "cover"
                      }
                    }}
                  >
                    <Image
                      src={
                        traineeData?.StudentMedia
                          ? traineeData?.StudentMedia
                          : `/images/profile-img.svg`
                      }
                      width={300}
                      height={300}
                      alt="Trainee image"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Student Profile
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      PrepX ID
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentIDText}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Status
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentStatus == 1 ? "Active" : "Inactive"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      First Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentFirstName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Middle Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMiddleName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Last Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentLastName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Preferred Name
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPreferredName}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Contact Info & Bio
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentEmail}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Phone Number
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPhoneNumber}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Assigned Date
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentAssignedDate
                        ? moment(traineeData?.StudentAssignedDate).format(
                            "YYYY-MM-DD"
                          )
                        : "-"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      End Date
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentEndDate
                        ? moment(traineeData?.StudentEndDate).format(
                            "YYYY-MM-DD"
                          )
                        : "-"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Residential Address
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Country
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentCountryName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 1
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentResidentialAddress}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 2
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentAddressLine2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      City
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentCity}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Province
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentProvince}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Postal Code
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentPostalCode}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"solid 1px #e5eaef"} borderRadius={0}>
              <Typography
                variant="body1"
                component={"p"}
                color={theme.palette.text.primary}
                mb={4}
                fontSize={"18px"}
                lineHeight={"28px"}
                my={"24px"}
              >
                Mailing Address
              </Typography>
              <Grid container spacing={4} mb={"24px"}>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Country
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingCountryName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 1
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingResidentialAddress}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Address Line 2
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingAddressLine2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      City
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingCity}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Province
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingProvince}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction={"row"} gap={5}>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="500"
                      fontSize="15px"
                      flexBasis={"180px"}
                      textAlign={"right"}
                    >
                      Postal Code
                    </Typography>
                    <Typography
                      variant="body1"
                      component={"p"}
                      color={theme.palette.text.primary}
                      fontWeight="400"
                      fontSize="15px"
                      flexGrow={1}
                    >
                      {traineeData?.StudentMailingPostalCode}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  )
}
