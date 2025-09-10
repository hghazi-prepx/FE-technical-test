"use client"
import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Button,
  MenuItem,
  Autocomplete,
  TableContainer,
  Table,
  IconButton,
  Tooltip,
  Dialog
} from "@mui/material"

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect"
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox"
import { CornerDownArrowIcon, PlusIcon } from "@/components/Icons"
import { IconX } from "@tabler/icons-react"
import Image from "next/image"
import {
  commonAutocompleteStyle,
  commonCheckboxField,
  commonContentCardStyle,
  commonDropdownMenuStyle,
  commonFieldLabelStyle,
  commonPopStyle,
  commonSelectFieldStyle,
  commonTableCardStyle,
  linkButton,
  primaryButon,
  secondaryButon
} from "@/utils/commonstyles"
import QuestionOptions from "@/components/QuestionOptions"
import ExamWizardSteps from "@/components/ExamWizardSteps"
import { booklet } from "../dropDowns"
import { PAGINATION } from "@/utils/Constants"
import QuestionsTable from "./components/QuestionsTable"
import useQuestionSelection from "@/hooks/useQuestionSelection"
import theme from "@/utils/theme"
const { DEFAULT_PAGE } = PAGINATION
const BCrumb = [
  {
    to: "/",
    title: "Home"
  },
  {
    to: "/Exam-Management",
    title: "Assessment Module"
  },
  {
    title: "Exam Management"
  }
]

export default function StationManagement() {
  const {
    examId,
    examData,
    PrepXID,
    bookletHandleChange,
    bookletId,
    questionData,
    selectedOptions,
    defaultSelectedValue,
    setSelectedOptions,
    handlePreviewModalOpen,
    setOpenAutocomplete,
    studentHandleChange,
    selectedQuestionData,
    searchValue,
    searchItem,
    handleAssignQuestion,
    selectedQuestionIds,
    handleSaveAsDraft,
    router,
    modalPreviewOpen,
    handlePreviewModalClose,
    previewData,
    setSearchValue,
    searchLoading,
    loading,
    openAutocomplete,
    tabHandelChange,
    tabValue,
    isDisabled,
    selectedQuestions
  } = useQuestionSelection()
  return (
    <PageContainer title="Question Selection" description="Question Selection">
      <ExamWizardSteps step={1} examid={examId} />
      {/* breadcrumb */}
      <Breadcrumb title="Question Selection" items={undefined} />
      <Card sx={commonContentCardStyle}>
        <Grid container spacing={"32px"}>
          <Grid item xs={12} sm={6} md={6}>
            <Stack>
              <Box
                sx={{
                  position: "relative"
                }}
              >
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  PrepX ID
                </Typography>
                <CustomTextField
                  id="default-value"
                  variant="outlined"
                  defaultValue="Session ID"
                  placeholder={""}
                  value={PrepXID} // should be unique ID
                  fullWidth
                  disabled
                />
              </Box>
            </Stack>
          </Grid>

          {examData && examData.ExamTypeName === "Mock" && (
            <Grid item xs={12} sm={6} md={6}>
              <Stack>
                <Box
                  sx={{
                    position: "relative"
                  }}
                >
                  <Typography
                    variant="paragraph3"
                    component={"p"}
                    sx={commonFieldLabelStyle}
                  >
                    Booklet*
                  </Typography>
                  <CustomSelect
                    id="standard-select-currency"
                    value={bookletId}
                    onChange={bookletHandleChange}
                    fullWidth
                    variant="outlined"
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
                    {examData?.ExamNumberofBookletsID &&
                      booklet
                        .slice(0, examData?.ExamNumberofBookletsID)
                        ?.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                  </CustomSelect>
                </Box>
              </Stack>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                border: "1px solid #738A9633",
                borderRadius: "4px"
              }}
              p={"1.5625rem 1.875rem 1.875rem"}
            >
              <Stack direction={"row"} alignItems={"center"} mb={"10px"}>
                <Typography
                  variant="paragraph3"
                  component={"p"}
                  sx={commonFieldLabelStyle}
                >
                  Search Question
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                gap={"15px"}
                position={"relative"}
                sx={{
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "transparent" : "#738A9633"
                  }`,
                  borderRadius: "5px",
                  "&:has(input:disabled)": {
                    background: theme.palette.secondary.disableFieldColor
                  }
                }}
              >
                <>
                  {loading ? (
                    <>Loading...</>
                  ) : (
                    <Autocomplete
                      freeSolo
                      id="checkboxes-tags-demo"
                      loading={searchLoading}
                      multiple
                      options={questionData?.length ? questionData : []}
                      open={openAutocomplete}
                      autoHighlight
                      onBlur={() => {
                        setOpenAutocomplete(false)
                        setSearchValue("")
                      }}
                      getOptionLabel={(option: any) =>
                        option?.QuestionTopicName +
                        " / " +
                        option?.SubTopicName +
                        " / " +
                        option?.QuestionTextID
                      }
                      value={selectedOptions}
                      defaultValue={
                        questionData &&
                        questionData?.find(
                          (option: any) =>
                            defaultSelectedValue?.[0] == option.QuestionID
                        )
                      }
                      renderOption={(props, option, { selected }) => {
                        const isSelected =
                          selectedQuestions &&
                          selectedQuestions.includes(option.QuestionID)
                        return (
                          <li {...props}>
                            <CustomCheckbox
                              style={{ marginRight: 8 }}
                              checked={isSelected}
                              className="c-checkbox"
                              sx={commonCheckboxField}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOptions((prevSelected) =>
                                    prevSelected.filter(
                                      (id) => id !== option.QuestionID
                                    )
                                  )
                                } else {
                                  setSelectedOptions((prevSelected) =>
                                    prevSelected.filter(
                                      (id) => id !== option.QuestionID
                                    )
                                  )
                                }
                              }}
                            />

                            {option.QuestionTopicName +
                              " / " +
                              option.SubTopicName +
                              " / " +
                              option.QuestionTextID}

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
                                handlePreviewModalOpen(option?.QuestionID)
                              }}
                            >
                              Preview
                            </Button>
                          </li>
                        )
                      }}
                      fullWidth
                      onChange={(event, value) => {
                        // setSelectedQuestions(value);
                        studentHandleChange(value)
                        setSelectedOptions(value) // Update selected options
                        // setSearchValue("");
                      }}
                      disabled={isDisabled}
                      renderInput={(params) => (
                        <Tooltip
                          title={
                            selectedQuestionData?.results?.filter(
                              (question: any) =>
                                question.BookletID === `Booklet ${bookletId}`
                            ).length >= examData?.ExamBookletsQuestions
                              ? "Maximum questions reached"
                              : ""
                          }
                          placement="top"
                          arrow
                          sx={{
                            "& .MuiTooltip-tooltip": {
                              fontSize: "18px" // Adjust the font size as needed
                            }
                          }}
                        >
                          <div>
                            <CustomTextField
                              {...params}
                              placeholder="Search by Question ID, Name..."
                              aria-label="Favorites"
                              onChange={searchItem}
                              value={searchValue}
                            />
                          </div>
                        </Tooltip>
                      )}
                      // onClose={() => setOpenAutocomplete(false)}
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
                  )}
                </>
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
                    onClick={() =>
                      selectedQuestionIds?.length > 0
                        ? handleAssignQuestion()
                        : ""
                    }
                  >
                    <PlusIcon />
                    Assign
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Card sx={commonTableCardStyle}>
        <QuestionsTable />
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
              router.push(`/acj-exam/assign-trainee?examid=${examId}`)
            }}
          >
            Skip for now
          </Button>
          <Button
            sx={{
              ...primaryButon
            }}
            // type="submit"
            onClick={() => {
              router.push(`/acj-exam/assign-trainee?examid=${examId}`)
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Dialog
        open={modalPreviewOpen}
        onClose={handlePreviewModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 1301,
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1400px",
            padding: "15px",
            paddingTop: "30px",
            bgcolor: "#fff"
          },
          "& .MuiTabPanel-root": {
            // marginTop:"15px"
          }
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
            color: "#000"
          }}
        >
          {/* <CloseIcon /> */}
          <IconX stroke={2} />
        </IconButton>
        <Stack mt={"20px"}>
          <Grid container spacing={"30px"}>
            {previewData?.QuestionCaseStudy && (
              <Grid item md={6}>
                <Stack
                  sx={{
                    p: "30px",
                    background: "#F9FDFF",
                    border: "1px solid #738A9633",
                    borderRadius: "5px"
                  }}
                >
                  <Stack mb={"30px"}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: theme.palette.primary.main,
                        mb: "9px"
                      }}
                    >
                      Case Study
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "#7A878D",
                        "& table": {
                          tableLayout: "fixed"
                        },
                        "& *": {
                          maxWidth: "100% !important",
                          fontSize: "15px",
                          lineHeight: "24px",
                          fontWeight: 400,
                          padding: "0px !important",
                          m: "0px !important"
                        }
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: previewData?.QuestionCaseStudyText
                            ? previewData?.QuestionCaseStudyText
                            : ""
                        }}
                      />
                    </Typography>
                  </Stack>
                  <Stack>
                    <TableContainer>
                      <Table
                        sx={{
                          borderRadius: "4px",
                          border: `1px solid ${
                            theme.palette.mode === "light" ? "#000" : "#FFF"
                          }`,
                          borderCollapse: "collapse",
                          borderSpacing: "0px",
                          fontSize: "12px",
                          tableLayout: "fixed",
                          lineHeight: "14px",
                          background: "#fff",
                          "& tr:nth-child(even) td": {
                            bgcolor: "#C9E3F9"
                          },
                          "& td": {
                            borderRight: `1px solid ${
                              theme.palette.mode === "light" ? "#000" : "#FFF"
                            }`,
                            borderBottom: `1px solid ${
                              theme.palette.mode === "light" ? "#000" : "#FFF"
                            }`,
                            minWidth: "33.3%",
                            width: "33.3%",
                            p: "14px 10px",
                            "&:last-child": {
                              borderRight: "0px"
                            }
                          }
                        }}
                        dangerouslySetInnerHTML={{
                          __html: previewData?.QuestionCaseStudy
                        }}
                      ></Table>
                    </TableContainer>
                  </Stack>
                  {previewData?.CaseStudyImages?.length > 0 &&
                    previewData?.CaseStudyImages?.map((imageData: any) => (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            width: "fit-content",
                            margin: "10px auto",
                            maxWidth: "100%",
                            "& img": {
                              height: "auto",
                              width: "auto",
                              maxWidth: "100%",
                              objectFit: "contain",
                              gap: "40px"
                            }
                          }}
                        >
                          <Image
                            src={imageData?.CaseStudyImage}
                            alt={"question-preview"}
                            width={363}
                            height={240}
                            style={{
                              objectFit: "cover",
                              borderRadius: "6px"
                            }}
                          />
                        </Box>
                      </>
                    ))}
                </Stack>
              </Grid>
            )}
            <Grid
              item
              md={previewData?.QuestionCaseStudy ? 6 : 12}
              mt={"0px !important"}
            >
              <Stack
                sx={{
                  p: "30px",
                  background: "#F9FDFF",
                  border: "1px solid #738A9633",
                  borderRadius: "5px"
                }}
              >
                <QuestionOptions
                  type={previewData?.QuestionTypeFor}
                  primaryImage={previewData?.QuestionImageList?.PrimaryMedia}
                  secondaryImage={
                    previewData?.QuestionImageList?.SecondaryMedia
                  }
                  viewImage={previewData?.QuestionImageList?.AdditionalMedia}
                  tabValue={tabValue}
                  multipleImage={
                    previewData?.QuestionImageList?.AdditionalMedia
                  }
                  questionText={previewData?.QuestionText}
                  questionData={previewData}
                  handleChange={tabHandelChange}
                  caseStudy={previewData?.QuestionCaseStudy ? true : false}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Dialog>
    </PageContainer>
  )
}
