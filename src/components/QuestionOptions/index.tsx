import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  DialogContent,
  Box,
  Grid,
  Checkbox,
  Radio,
  Tab,
  Typography,
  Paper,
  Stack,
  useTheme,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);
import { FileIcon } from "../Icons";
import { minWidth, width } from "@mui/system";
import CustomSelect from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSelect";
import {
  borderedCheckboxFiledStyle,
  commonDropdownMenuStyle,
  commonRadioStyle,
  commonSelectFieldStyle,
} from "@/utils/commonstyles";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import zIndex from "@mui/material/styles/zIndex";
interface questionOptionsProps {
  type?: any;
  primaryImage: any;
  secondaryImage: any;
  viewImage: any;
  tabValue: any;
  multipleImage: any;
  questionText: any;
  handleChange?: (event: any, newValue: any) => void;
  questionData?: any;
  isCreate?: any;
  QuestionRandomizeOrder?: any;
  Createenumeration?: any;
  selectedTrueFalseOptions?: any;
  selectedMcqOptions?: any;
  caseStudy: boolean;
}
const MAX_WORD_COUNT = 3000;
const QuestionOptions: React.FC<questionOptionsProps> = ({
  type,
  primaryImage,
  secondaryImage,
  viewImage,
  tabValue,
  multipleImage,
  questionText,
  handleChange,
  questionData,
  isCreate,
  QuestionRandomizeOrder,
  Createenumeration,
  selectedMcqOptions,
  caseStudy,
}) => {
  const [selectedOptions, setSelectOptions] = useState<any>();
  const [questionValue, setQuestionValue] = useState<any>();
  const [questionTextWords, setQuestionTextWords] = useState("");
  const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState<any>();
  const [selectedField, setSelectedField] = useState(selectedMcqOptions);
  const [imageSrc, setImageSrc] = useState(null);
  const theme = useTheme();
  const handleRadioChange = (event: any) => {
    setSelectedValue(parseInt(event.target.value)); // Update the selectedValue state when a radio button is clicked
  };
  const [blankValues, setBlankValues] = useState<{ [key: string]: string }>({});
  const changeRadio = (val: any) => {
    setSelectOptions(parseInt(val.target.value));
  };
  // let questionValue;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      // Update the state with the image data
      setImageSrc(event?.target?.result);
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  };

  const handleQuestionText = (value: any) => {
    const textWithoutNewLines = value.replace(/[\n\r]+/g, "");
    if (textWithoutNewLines.replace(/\s+/g, "").length > MAX_WORD_COUNT) {
      setError("Text limit exceeded. Maximum 3000 characters allowed.");
      return;
    }
    setError("");
    setQuestionTextWords(value);
  };
  console.log("casestudy", caseStudy);
  useEffect(() => {
    if (isCreate) {
      switch (type) {
        case "msq":
          setQuestionValue(
            QuestionRandomizeOrder === 1
              ? [...questionData].sort(() => Math.random() - 0.5)
              : questionData
          );
          break;
        case "mcq":
          setQuestionValue(
            QuestionRandomizeOrder === 1
              ? [...questionData].sort(() => Math.random() - 0.5)
              : questionData
          );
          break;
        case "truefalse":
          setQuestionValue(
            QuestionRandomizeOrder === 1
              ? [...questionData].sort(() => Math.random() - 0.5)
              : questionData
          );
          break;
        default:
          setQuestionValue(questionData);
      }
    } else {
      switch (type) {
        case "msq":
          setQuestionValue(
            questionData?.QuestionTypeText?.QuestionMSQRandomizeOrder === 1
              ? [
                  ...questionData?.QuestionTypeText?.QuestionMSQOptionsText,
                ].sort(() => Math.random() - 0.5)
              : questionData?.QuestionTypeText?.QuestionMSQOptionsText
          );
          break;
        case "mcq":
          setQuestionValue(
            questionData?.QuestionTypeText?.QuestionMCQRandomizeOrder === 1
              ? [
                  ...questionData?.QuestionTypeText?.QuestionMCQOptionsText,
                ].sort(() => Math.random() - 0.5)
              : questionData?.QuestionTypeText?.QuestionMCQOptionsText
          );
          break;
        case "truefalse":
          // setQuestionValue(
          //   questionData?.QuestionTypeText?.QuestionTrueFalseRandomizeOrder ===
          //     1
          //     ? [
          //         ...questionData?.QuestionTypeText
          //           ?.QuestionTrueFalseOptionText,
          //       ].sort(() => Math.random() - 0.5)
          //     : questionData?.QuestionTypeText?.QuestionTrueFalseOptionText
          // );
          setQuestionValue(
            QuestionRandomizeOrder === 1
              ? [...questionData].sort(() => Math.random() - 0.5)
              : questionData
          );
          break;
        default:
          setQuestionValue(
            questionData?.QuestionTypeText?.QuestionMSQOptionsText
          );
      }
    }
  }, [QuestionRandomizeOrder, questionData]);

  const removeHtmlTags = (text: any) => {
    if (text) {
      return text.replace(/<[^>]*>/g, "");
    }
  };

  // function parseQuestionText(questionText: any, questionData: any) {
  //   const blankRegex = /\(Blank No (\d+)\)/g;
  //   const matches = questionText.match(blankRegex);
  //   let questionTextHtml = questionText;

  //   if (matches) {
  //     matches.forEach((match: any) => {
  //       const blankNo = parseInt(match.replace(blankRegex, "$1"));
  //       const answer = questionData.find(
  //         (item: any) => item.blankNo === blankNo
  //       )?.Answer;
  //       const inputFieldHtml = `<input type="text" value="${answer}" disabled/>`;
  //       questionTextHtml = questionTextHtml.replace(match, inputFieldHtml);
  //     });
  //   }

  //   return <div dangerouslySetInnerHTML={{ __html: questionTextHtml }} />;
  // }

  const handleInputChange = (
    blankId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBlankValues((prev) => ({
      ...prev,
      [blankId]: event.target.value,
    }));
  };

  const parseQuestionText = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const elements = Array.from(doc.body.childNodes);

    return (
      <div>
        {elements.map((element, index) => (
          <section
            key={index}
            style={{
              margin: "1rem 0",
              color: "#2D363E",
              fontSize: "15px",
              lineHeight: "24px",
              fontWeight: 400,
            }}
          >
            {element.nodeName === "P" ? (
              <Typography
                variant="body3"
                style={{
                  display: "inline-block",
                  alignItems: "center",
                  gap: "10px",
                  lineHeight: "46px",
                  color: "#2D363E",
                }}
              >
                <>
                  {element?.textContent
                    ?.trim()
                    .split(/(\(Blank No \d+\))/g)
                    .map((match: any, matchIndex: any) => {
                      if (/\(Blank No (\d+)\)/.test(match)) {
                        const blankId = match.replace(/[\[\]{}()]/g, "").trim();
                        return (
                          <CustomTextField
                            key={matchIndex}
                            id={blankId}
                            variant="outlined"
                            placeholder={blankId}
                            value={blankValues[blankId] || ""}
                            onChange={(e: any) => handleInputChange(blankId, e)}
                            fullWidth={false}
                            sx={{
                              width: "150px",
                              minWidth: "150px",
                              mr: "8px",
                              my: "10px",
                              "& input": {
                                background: "#fff",
                                color: "#000",
                              },
                            }}
                          />
                        );
                      } else if (match.trim()) {
                        return (
                          <span
                            key={matchIndex}
                            style={{
                              margin: "10px 10px 10px 0",
                              display: "inline-block",
                            }}
                          >
                            {match}
                          </span>
                        );
                      }
                      return null;
                    })}
                </>
              </Typography>
            ) : (
              element?.textContent?.trim()
            )}
          </section>
        ))}
      </div>
    );
  };

  // function parseQuestionText(questionText, questionData) {
  //   const blankRegex = /\(Blank No (\d+)\)/g;
  //   const matches = questionText.match(blankRegex);
  //   let questionTextHtml = questionText;

  //   if (matches) {
  //     console.log("matches = ", matches);
  //     matches.forEach((match) => {
  //       const blankNo = parseInt(match.replace(blankRegex, "$1"));
  //       const answer = questionData.find(
  //         (item) => item.blankNo === blankNo
  //       )?.Answer;
  //       console.log("answer = ", answer);
  //       const inputField = <input type="text" value={answer} disabled />;
  //       questionTextHtml = questionTextHtml.replace(match, inputField);
  //       console.log("questionTextHtml = ", questionTextHtml);
  //     });
  //   }

  //   return <div dangerouslySetInnerHTML={{ __html: questionTextHtml }} />;
  // }

  if (type === "msq") {
    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            {primaryImage || secondaryImage || viewImage?.length > 0 ? (
              <Grid
                item
                xs={12}
                md={caseStudy ? 12 : 6}
                order={caseStudy ? 1 : 2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mt={8}
                  mb={3}
                  gap={"10px"}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mb={3}
                  gap={"10px"}
                >
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  sx={{
                    // color: theme.palette.secondary.fieldText,
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F7F8",
                      borderRadius: "7px",
                      padding: "35px 30px",
                      cursor: "pointer",
                      width: "100%",
                      height: "400px",
                    },
                  }}
                  mb={3}
                  gap={"10px"}
                >
                  {viewImage
                    ?.flat(Infinity)
                    .map((imageData: any, index: any) => {
                      return (
                        <Image
                          src={imageData.QuestionImage}
                          alt={"question-preview123"}
                          width={406}
                          height={419}
                          style={{
                            height: "fit-content",
                            objectFit: "contain",
                            width: "auto",
                          }}
                        />
                      );
                    })}
                </Box>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.fieldText,
                  "& a": {
                    color: `${theme.palette.primary.main} !important`,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  },
                  "& p": {
                    color: "#7A878D",
                    fontSize: "15px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    mb: "32px",
                  },
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: isCreate ? questionText : questionText,
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
                {questionValue &&
                  questionValue.map((option: any, index: any) => {
                    return (
                      <Stack
                        gap={"10px"}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "20px 25px auto",
                          alignItems: "flex-start",
                        }}
                      >
                        <CustomCheckbox
                          disableRipple
                          checked={option?.IsCorrect}
                          value={option?.IsCorrect}
                          name={`check-buttons-${index}`}
                          sx={{
                            "& span": {
                              fontSize: "15px",
                              lineHeight: "17px",
                              fontWeight: 400,
                              color: (theme: any) => theme.palette.text.primary,
                            },
                            "& input": {
                              "& + span": {
                                background: "transparent",
                                border: "0px",
                                mr: "4px",
                                boxShadow: "0 0 0 1.5px #2D363E",
                                minWidth: "19px",
                                ml: "8px",
                                borderRadius: "2px",
                              },
                              "&:checked + span": {
                                background: "#2D363E",
                              },
                            },
                            p: "0px",
                            alignItems: "flex-start",
                            mt: "2px !important",
                          }}
                        />{" "}
                        <Typography
                          variant="body3"
                          fontWeight="400"
                          sx={{
                            width: "40px",
                            color: "#2D363E",
                            fontSize: "15px",
                            lineHeight: "24px",
                          }}
                        >
                          {`${
                            isCreate
                              ? toEnumerationType(index, Createenumeration)
                              : toEnumerationType(
                                  index,
                                  questionData?.QuestionTypeText
                                    ?.QuestionMSQEnumeration
                                )
                          })`}
                        </Typography>
                        <Typography
                          variant="body3"
                          fontWeight="400"
                          sx={{
                            wordBreak: "break-word",
                            color: "#2D363E",
                            fontSize: "15px",
                            lineHeight: "24px",
                          }}
                        >
                          {option.OptionText}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    );
  } else if (type === "mcq") {
    return (
      <Stack
        sx={{
          p: 0,
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 1 : 2}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={4}
                mb={3}
              >
                {primaryImage ? (
                  <Image
                    src={primaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mb={3}
              >
                {secondaryImage ? (
                  <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={3}
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Image
                      src={imageData.QuestionImage}
                      alt={"question-preview123"}
                      width={406}
                      height={419}
                      style={{
                        height: "fit-content",
                        objectFit: "contain",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: "#7A878D",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  "& a": {
                    color: `${theme.palette.primary.main} !important`,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  },
                  "& p": {
                    color: "#7A878D",
                    fontSize: "15px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    mb: "32px",
                  },
                }}
              >
                {/* {removeHtmlTags(
                    isCreate ? questionText : questionData?.QuestionText
                  )} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: isCreate ? questionText : questionText,
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
                {questionValue &&
                  questionValue?.map((option: any, index: any) => (
                    <Stack
                      gap={"10px"}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "20px 25px auto",
                        alignItems: "flex-start",
                      }}
                    >
                      <Radio
                        disabled
                        // checked={selectedOptions == index}
                        // value={selectedOptions}
                        checked={selectedOptions === index}
                        value={index}
                        name={`radio-buttons`}
                        inputProps={{ "aria-label": "A" }}
                        sx={{
                          ...commonRadioStyle,
                          p: "0px",
                          alignItems: "flex-start",
                          mt: "-3px",
                          "& svg path": {
                            fill: "#2D363E",
                          },
                          "& input:checked + span svg path": {
                            fill: "#2D363E",
                          },
                        }}
                        onChange={changeRadio}
                      />
                      <Typography
                        variant="body3"
                        sx={{
                          width: "40px",
                          color: "#2D363E",
                          fontSize: "15px",
                          lineHeight: "24px",
                        }}
                      >
                        {`${
                          isCreate
                            ? toEnumerationType(index, Createenumeration)
                            : toEnumerationType(
                                index,
                                questionData?.QuestionTypeText
                                  ?.QuestionMCQEnumeration
                              )
                        })`}
                      </Typography>
                      <Typography
                        variant="body3"
                        sx={{
                          wordBreak: "break-word",
                          color: "#2D363E",
                          fontSize: "15px",
                          lineHeight: "24px",
                        }}
                      >
                        {" "}
                        {option.OptionText}
                      </Typography>
                    </Stack>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    );
  } else if (type === "truefalse") {
    if (!Array.isArray(questionData)) {
      questionData = questionData.QuestionTypeText.QuestionTrueFalseOptionText;
    }
    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "sticky",
            top: 0,
            padding: "0 24px",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
              }}
            >
              True or False
            </Box> */}
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            {primaryImage || secondaryImage || viewImage.length > 0 ? (
              <Grid
                item
                xs={12}
                md={caseStudy ? 12 : 6}
                order={caseStudy ? 1 : 2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mt={4}
                  mb={3}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mb={3}
                >
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  gap={3}
                  sx={{
                    // color: theme.palette.secondary.fieldText,
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F7F8",
                      borderRadius: "7px",
                      padding: "35px 30px",
                      cursor: "pointer",
                      width: "100%",
                      height: "400px",
                    },
                  }}
                >
                  {viewImage
                    ?.flat(Infinity)
                    .map((imageData: any, index: any) => {
                      return (
                        <Image
                          src={imageData.QuestionImage}
                          alt={"question-preview123"}
                          width={406}
                          height={419}
                          style={{
                            height: "fit-content",
                            objectFit: "contain",
                            width: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      );
                    })}
                </Box>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: "#7A878D",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  mb: "32px",
                  "& a": {
                    color: `${theme.palette.primary.main} !important`,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  },
                }}
              >
                {/* {removeHtmlTags(
                      isCreate ? questionText : questionData?.QuestionText
                    )} */}
                {/* <div
                      dangerouslySetInnerHTML={{
                        __html: isCreate
                          ? questionText
                          : questionData?.QuestionText,
                      }}
                    /> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: isCreate ? questionText : questionText,
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"8px"}
                pl={"5px"}
              >
                {questionValue &&
                  questionValue.map((option: any, index: any) => (
                    <Stack
                      gap={"10px"}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "20px 25px auto",
                        alignItems: "flex-start",
                      }}
                    >
                      <Radio
                        disableRipple
                        checked={selectedValue === index}
                        onChange={handleRadioChange}
                        value={index} // Use a unique identifier for each option
                        name={`radio-buttons`}
                        inputProps={{ "aria-label": "A" }}
                        sx={{
                          ...commonRadioStyle,
                          p: "0px",
                          alignItems: "flex-start",
                          mt: "-3px",
                          "& svg path": {
                            fill: "#2D363E",
                          },
                          "& input:checked + span svg path": {
                            fill: "#2D363E",
                          },
                        }}
                      />
                      <Typography
                        variant="body3"
                        sx={{
                          width: "40px",
                          color: "#2D363E",
                        }}
                      >
                        {/* {isCreate
                          ? toEnumerationType(index, Createenumeration)
                          : toEnumerationType(
                              index,
                              questionData?.QuestionTypeText
                                ?.QuestionTrueFalseEnumeration
                            )} */}
                        {`${
                          isCreate
                            ? toEnumerationType(index, Createenumeration)
                            : toEnumerationType(
                                index,
                                questionData?.QuestionTypeText
                                  ?.QuestionMCQEnumeration
                              )
                        })`}
                      </Typography>
                      {/* <Radio
                        disableRipple
                        checked={selectedValue === index}
                        onChange={handleRadioChange}
                        value={index} // Use a unique identifier for each option
                        name={`radio-buttons`}
                        inputProps={{ "aria-label": "A" }}
                        sx={{
                          padding: "3px 3px 3px 0",
                          "& svg:first-of-type path": {
                            fill: "#777E89",
                          },
                          "& svg:last-of-type path": {
                            fill: "#777E89",
                          },
                          cursor: "default",
                        }}
                      /> */}
                      <Typography
                        variant="body3"
                        sx={{
                          wordBreak: "break-word",
                          color: "#2D363E",
                        }}
                      >
                        {option.OptionText}
                      </Typography>
                    </Stack>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    );
  } else if (type === "shortanswer") {
    if (!Array.isArray(questionData)) {
      questionData =
        questionData.QuestionTypeText.QuestionShortAnswerOptionsText;
    }

    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "sticky",
            top: 0,
            padding: "0 24px",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
              }}
            >
              Short Answer
            </Box> */}
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={4}
                mb={3}
              >
                {primaryImage ? (
                  <Image
                    src={primaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mb={3}
              >
                {secondaryImage ? (
                  <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={3}
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Image
                      src={imageData.QuestionImage}
                      alt={"question-preview123"}
                      width={406}
                      height={419}
                      style={{
                        height: "fit-content",
                        objectFit: "contain",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              sx={{
                width: "100%",
                p: "0 48px 24px",
              }}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.fieldText,
                  "& a": {
                    color: `${theme.palette.primary.main} !important`,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  },
                }}
              >
                {/* {removeHtmlTags(
                  isCreate ? questionText : questionData?.QuestionText
                )} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: isCreate ? questionText : questionText,
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                {isCreate
                  ? questionData?.map((option: any, index: any) => (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        display={"flex"}
                        gap={"10px"}
                        flexDirection={"column"}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            fontSize: "15px",
                            color: theme.palette.secondary.fieldText,
                          }}
                        >
                          {index === 0
                            ? "Short Answer"
                            : `Short Answer ${index + 1}`}
                        </Typography>
                        <CustomTextField
                          disabled
                          multiline
                          rows={5}
                          id="{`short-answer-${index}`}"
                          variant="outlined"
                          placeholder={option.Answer}
                          // class="inputstyle1 slider-value-input"
                          fullWidth
                          sx={{
                            "& .MuiInputBase-root": {
                              p: "0px",
                              borderRadius: "4px",
                              width: "300px",
                            },
                          }}
                        />
                      </Grid>
                    ))
                  : questionData?.map((option: any, index: any) => (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        display={"flex"}
                        gap={"10px"}
                        flexDirection={"column"}
                        key={index}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            fontSize: "15px",
                            color: theme.palette.secondary.fieldText,
                          }}
                        >
                          {index === 0
                            ? "Short Answer"
                            : `Short Answer ${index + 1}`}
                        </Typography>
                        <CustomTextField
                          disabled
                          multiline
                          rows={5}
                          id="{`short-answer-${index}`}"
                          variant="outlined"
                          placeholder={option.Answer}
                          // class="inputstyle1 slider-value-input"
                          fullWidth
                          sx={{
                            "& .MuiInputBase-root": {
                              p: "0px",
                              borderRadius: "4px",
                              width: "300px",
                            },
                          }}
                        />
                      </Grid>
                    ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* tab */}
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      borderRadius: "6px",
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                        color: "#2D363E",
                        "& a": {
                          color: `${theme.palette.primary.main} !important`,
                          textDecoration: "underline",
                          textDecorationColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: questionText,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          width: "auto",
                          height: "fit-content",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {/* <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={924}
                      height={391}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                    }}
                  /> */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Image
                      src={imageData.QuestionImage}
                      alt={"question-preview123"}
                      width={406}
                      height={419}
                      style={{
                        height: "fit-content",
                        objectFit: "contain",
                      }}
                    />
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    );
  } else if (type === "fill-in-the-blanks") {
    const parsedContent = parseQuestionText(
      isCreate ? questionText : questionText || ""
    );

    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "sticky",
            top: 0,
            padding: "0 24px",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
              }}
            >
              Short Answer
            </Box> */}
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            {primaryImage || secondaryImage || viewImage.length > 0 ? (
              <Grid
                item
                xs={12}
                md={caseStudy ? 12 : 6}
                order={caseStudy ? 1 : 2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mt={4}
                  mb={3}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mb={3}
                >
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  gap={3}
                  sx={{
                    // color: theme.palette.secondary.fieldText,
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F7F8",
                      borderRadius: "7px",
                      padding: "35px 30px",
                      cursor: "pointer",
                      width: "100%",
                      height: "400px",
                    },
                  }}
                >
                  {viewImage
                    ?.flat(Infinity)
                    .map((imageData: any, index: any) => {
                      return (
                        <Image
                          src={imageData.QuestionImage}
                          alt={"question-preview123"}
                          width={406}
                          height={419}
                          style={{
                            height: "fit-content",
                            objectFit: "contain",
                            maxWidth: "100%",
                            width: "auto",
                          }}
                        />
                      );
                    })}
                </Box>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.fieldText,
                  "& > div": {
                    alignItems: "center",
                    gap: "10px",
                  },
                }}
              >
                {/* {removeHtmlTags(
                  isCreate ? questionText : questionData?.QuestionText
                )} */}
                {/* <div
                  contentEditable
                  dangerouslySetInnerHTML={{
                    __html: isCreate
                      ? parseQuestionText(questionText)
                      : parseQuestionText(questionData?.QuestionText || ""),
                  }}
                /> */}

                <div>{parsedContent}</div>

                {/* {isCreate
                  ? parseQuestionText(questionText)
                  : parseQuestionText(questionData?.QuestionText || "")} */}
                {/* {parseQuestionText(questionText, questionData)} */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* tab */}
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      borderRadius: "6px",
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                        color: "#2D363E",
                        "& a": {
                          color: `${theme.palette.primary.main} !important`,
                          textDecoration: "underline",
                          textDecorationColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: questionText,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {/* <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={924}
                      height={391}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                    }}
                  /> */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Image
                        src={imageData.QuestionImage}
                        alt={"question-preview123"}
                        width={406}
                        height={419}
                        style={{
                          height: "fit-content",
                          objectFit: "contain",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    );
  } else if (type === "writtenresponse") {
    return (
      <Stack
        sx={{
          p: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "sticky",
            top: 0,
            padding: "0 24px",
          }}
        ></Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            {primaryImage || secondaryImage || viewImage.length > 0 ? (
              <Grid
                item
                xs={12}
                md={caseStudy ? 12 : 6}
                order={caseStudy ? 1 : 2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mt={4}
                  mb={3}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mb={3}
                >
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  gap={3}
                  sx={{
                    // color: theme.palette.secondary.fieldText,
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F7F8",
                      borderRadius: "7px",
                      padding: "35px 30px",
                      cursor: "pointer",
                      width: "100%",
                      height: "400px",
                    },
                  }}
                >
                  {viewImage
                    ?.flat(Infinity)
                    .map((imageData: any, index: any) => {
                      return (
                        <Image
                          src={imageData.QuestionImage}
                          alt={"question-preview123"}
                          width={406}
                          height={419}
                          style={{
                            height: "fit-content",
                            objectFit: "contain",
                            maxWidth: "100%",
                            width: "auto",
                          }}
                        />
                      );
                    })}
                </Box>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Stack>
                  <Box
                    sx={{
                      color: "#7A878D",
                      fontSize: "15px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      mb: "0px",
                    }}
                  >
                    {/* {removeHtmlTags(
                        isCreate ? questionText : questionData?.QuestionText
                      )} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isCreate ? questionText : questionText,
                      }}
                    />
                  </Box>
                </Stack>
                {isCreate
                  ? questionData.QuestionWrittenResponseOptionsText1
                      ?.IsCorrect && (
                      <Paper variant="outlined">
                        <ReactQuill
                          placeholder="Type here..."
                          className="reactquill_editor"
                        />
                      </Paper>
                    )
                  : (questionData?.QuestionTypeText
                      ?.QuestionWrittenResponseOptionsText1?.IsCorrect ||
                      questionData?.QuestionWrittenResponseOptionsText1
                        ?.IsCorrect) && (
                      <Paper variant="outlined">
                        <ReactQuill
                          value={questionTextWords}
                          onChange={handleQuestionText}
                          placeholder="Type here..."
                          className="reactquill_editor"
                        />
                        {error && (
                          <FormHelperText error>{error}</FormHelperText>
                        )}
                      </Paper>
                    )}
                {/* {questionData.QuestionTypeText.QuestionWrittenResponseOptionsText1?.IsCorrect && 
                  <Paper
                 
                  variant="outlined"
                >
                  <ReactQuill
                    placeholder="Type here..."
                    className="reactquill_editor"
                  />
                </Paper>
                } */}

                {isCreate
                  ? questionData?.QuestionWrittenResponseOptionsText2
                      ?.IsCorrect && (
                      <>
                        <Stack justifyContent={"center"} direction={"row"}>
                          {imageSrc && (
                            <Image
                              src={imageSrc}
                              alt={"Selected Image"}
                              width={400}
                              height={391}
                              style={{
                                objectFit: "contain",
                                height: "fit-content",
                              }}
                            />
                          )}
                        </Stack>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            [`& label`]: {
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              borderRadius: "6px",
                              border: `1px dashed ${theme.palette.border.dashedBorder}`,
                              padding: primaryImage ? "0" : "10px",
                              cursor:
                                primaryImage?.length >= 1 ? "" : "pointer",
                              marginLeft: "auto",
                              mr: "auto",
                              width: "248px",
                              height: "248px",
                            },
                            [`& .uploaded-image`]: {
                              objectFit: "cover",
                              borderRadius: "5px",
                            },
                          }}
                        >
                          <label htmlFor="avatar">
                            <input
                              style={{ display: "none" }}
                              id="avatar"
                              name="avatar"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />

                            <Box
                              sx={{
                                textAlign: "center",
                                "& svg": {
                                  width: "48px",
                                  height: "60px",
                                  "& path": {
                                    stroke: theme.palette.text.primary,
                                  },
                                },
                              }}
                            >
                              <Typography
                                color={theme.palette.text.primary}
                                fontSize={"18px"}
                                lineHeight={"21px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mb={"10px"}
                              >
                                Media
                              </Typography>
                              <FileIcon />
                              <Typography
                                color={theme.palette.text.primary}
                                fontSize={"14px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mt={"10px"}
                                mb={1.25}
                                lineHeight={"16px"}
                              >
                                Drag & Drop Image File
                              </Typography>
                              <Button
                                disabled
                                sx={{
                                  color:
                                    theme.palette.mode === "light"
                                      ? "#fff"
                                      : "#000",
                                  background: theme.palette.primary.light,
                                  p: "6px 43px",
                                  "&:disabled": {
                                    color:
                                      theme.palette.mode === "light"
                                        ? "#fff"
                                        : "#000",
                                  },
                                }}
                              >
                                Browse
                              </Button>
                              <Typography
                                color={theme.palette.text.primary}
                                fontSize={"14px"}
                                lineHeight={"21px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mt={"10px"}
                              >
                                PNG, JPEG format only
                              </Typography>
                            </Box>
                          </label>
                        </Box>
                      </>
                    )
                  : (questionData?.QuestionTypeText
                      ?.QuestionWrittenResponseOptionsText2?.IsCorrect ||
                      questionData?.QuestionWrittenResponseOptionsText2
                        ?.IsCorrect) && (
                      <>
                        <Stack justifyContent={"center"} direction={"row"}>
                          {imageSrc && (
                            <Image
                              src={imageSrc}
                              alt={"Selected Image"}
                              width={400}
                              height={391}
                              style={{
                                objectFit: "contain",
                                height: "fit-content",
                              }}
                            />
                          )}
                        </Stack>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            [`& label`]: {
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              borderRadius: "6px",
                              border: `1px dashed ${theme.palette.border.dashedBorder}`,
                              padding: primaryImage ? "0" : "10px",
                              cursor:
                                primaryImage?.length >= 1 ? "" : "pointer",
                              mx: "auto",
                              width: "248px",
                              height: "248px",
                            },
                            [`& .uploaded-image`]: {
                              objectFit: "cover",
                              borderRadius: "5px",
                            },
                          }}
                        >
                          <label htmlFor="avatar">
                            <input
                              style={{ display: "none" }}
                              id="avatar"
                              name="avatar"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />

                            <Box
                              sx={{
                                textAlign: "center",
                                "& svg": {
                                  width: "48px",
                                  height: "60px",
                                  "& path": {
                                    stroke: theme.palette.text.primary,
                                  },
                                },
                              }}
                            >
                              <Typography
                                color={"#67757C"}
                                fontSize={"18px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mb={1.5}
                              >
                                Media
                              </Typography>
                              <FileIcon />
                              <Typography
                                color={theme.palette.text.primary}
                                fontSize={"14px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mt={"10px"}
                                mb={1.25}
                                lineHeight={"16px"}
                              >
                                Drag & Drop Image File
                              </Typography>
                              <Button
                                disabled
                                sx={{
                                  color:
                                    theme.palette.mode === "light"
                                      ? "#fff"
                                      : "#000",
                                  background: theme.palette.primary.light,
                                  p: "6px 43px",
                                  "&:disabled": {
                                    color:
                                      theme.palette.mode === "light"
                                        ? "#fff"
                                        : "#000",
                                  },
                                }}
                              >
                                Browse
                              </Button>
                              <Typography
                                color={theme.palette.text.primary}
                                fontSize={"14px"}
                                lineHeight={"21px"}
                                fontWeight={400}
                                variant="body1"
                                component={"div"}
                                mt={"10px"}
                              >
                                PNG, JPEG format only
                              </Typography>
                            </Box>
                          </label>
                        </Box>
                      </>
                    )}
                {/* {questionData.QuestionTypeText.QuestionWrittenResponseOptionsText2?.IsCorrect && 
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1E88E53D",
                      borderRadius: "5px",
                      border: "2px dashed #1E88E5",
                      padding: primaryImage ? "0" : "30px",
                      cursor: "pointer",
                      width: "248px",
                      height: "248px",
                    },
                    [`& .uploaded-image`]: {
                      objectFit: "cover",
                      borderRadius: "5px",
                    },
                  }}
                >
                <label htmlFor="upload-photo-primary">
                <Box
                        sx={{
                          opacity: "0.95",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          color={"#67757C"}
                          fontSize={"18px"}
                          fontWeight={400}
                          variant="body1"
                          component={"div"}
                          mb={1.5}
                        >
                          Media
                        </Typography>
                        <FileIcon />
                        <Typography
                          color={"#67757C"}
                          fontSize={"15px"}
                          fontWeight={500}
                          variant="body1"
                          component={"div"}
                          mt={1}
                          mb={1.25}
                        >
                          Drag & Drop Image File
                        </Typography>
                        <Typography
                          color={"#67757C"}
                          fontSize={"14px"}
                          fontWeight={400}
                          variant="body1"
                          component={"div"}
                          mt={1}
                        >
                          PNG, JPEG format only
                        </Typography>
                      </Box>
                      </label>
                      </Box>
                    } */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* tab */}
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                        color: "#2D363E",
                        "& a": {
                          color: `${theme.palette.primary.main} !important`,
                          textDecoration: "underline",
                          textDecorationColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: questionText,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {/* <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={924}
                      height={391}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                    }}
                  /> */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Image
                        src={imageData.QuestionImage}
                        alt={"question-preview123"}
                        width={406}
                        height={419}
                        style={{
                          height: "fit-content",
                          objectFit: "contain",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    );
  } else if (type === "casebased1") {
    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                textAlign: "center",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                DOCTOR DENTIST
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                100 ANYWHERE STREET, ANYWHERE CITY, CANADA
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                DOCTOR DENTIST TELEPHONE XXXX-XXX XXXX
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            p: "0 24px 24px",
            marginLeft: 0,
          }}
        >
          <Grid xs={12} md={6}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                123 Main Street, Ottawa, ON
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                textAlign: "right",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                30/12/23
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1", mt: "30px" }}>
          <Grid
            container
            spacing={3}
            sx={{
              width: "100%",
              p: "0 24px 24px",
              marginLeft: 0,
            }}
          >
            <Grid xs={12} md={12}>
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  gap={"10px"}
                  flexDirection={"column"}
                >
                  <CustomTextField
                    id="outlined-multiline-static"
                    rows={8}
                    multiline
                    variant="outlined"
                    fullWidth
                    resize="false"
                    placeholder={""}
                    name="NotificationDesc"
                    sx={{
                      "& > div": {
                        p: 0,
                        border: 0,
                        borderRadius: "4px",
                      },
                      "& textarea": {
                        border: "1px solid #738A9633",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* tab */}
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                        color: "#2D363E",
                        "& a": {
                          color: `${theme.palette.primary.main} !important`,
                          textDecoration: "underline",
                          textDecorationColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: questionText,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {/* <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={924}
                      height={391}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                    }}
                  /> */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Image
                        src={imageData.QuestionImage}
                        alt={"question-preview123"}
                        width={406}
                        height={419}
                        style={{
                          height: "fit-content",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    );
  } else if (type === "casebased2") {
    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                textAlign: "center",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                DOCTOR DENTIST
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                100 ANYWHERE STREET, ANYWHERE CITY, CANADA
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                DOCTOR DENTIST TELEPHONE XXXX-XXX XXXX
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            p: "0 24px 24px",
            marginLeft: 0,
          }}
        >
          <Grid xs={12} md={6}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                123 Main Street, Ottawa, ON
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
                textAlign: "right",
                pt: "30px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                  fontWeight: 400,
                }}
              >
                30/12/23
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1", mt: "30px" }}>
          <Grid
            container
            spacing={3}
            sx={{
              width: "100%",
              p: "0 24px 24px 0",
              marginLeft: 0,
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              gap={"10px"}
              flexDirection={"column"}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                }}
              >
                Drug
              </Typography>
              <CustomTextField
                id=""
                variant="outlined"
                placeholder={""}
                class="inputstyle1 slider-value-input"
                fullWidth
                sx={{
                  border: "1px solid #738A9633",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              gap={"10px"}
              flexDirection={"column"}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                }}
              >
                Strength
              </Typography>
              <CustomTextField
                id=""
                variant="outlined"
                placeholder={""}
                class="inputstyle1 slider-value-input"
                fullWidth
                sx={{
                  border: "1px solid #738A9633",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              gap={"10px"}
              flexDirection={"column"}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                sx={{
                  fontSize: "15px",
                  color: theme.palette.secondary.fieldText,
                }}
              >
                Disp.
              </Typography>
              <CustomTextField
                id=""
                variant="outlined"
                placeholder={""}
                class="inputstyle1 slider-value-input"
                fullWidth
                sx={{
                  border: "1px solid #738A9633",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  gap={"10px"}
                  flexDirection={"column"}
                >
                  <CustomTextField
                    id="outlined-multiline-static"
                    rows={8}
                    multiline
                    variant="outlined"
                    fullWidth
                    resize="false"
                    placeholder={""}
                    name="NotificationDesc"
                    sx={{
                      "& > div": {
                        p: 0,
                        border: 0,
                        borderRadius: "4px",
                      },
                      "& textarea": {
                        border: "1px solid #738A9633",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* tab */}
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                        color: "#2D363E",
                        "& a": {
                          color: `${theme.palette.primary.main} !important`,
                          textDecoration: "underline",
                          textDecorationColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: questionText,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {/* <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={924}
                      height={391}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                    }}
                  /> */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Image
                        src={imageData.QuestionImage}
                        alt={"question-preview123"}
                        width={406}
                        height={419}
                        style={{
                          height: "fit-content",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    );
  } else if (type === "drop-down-question") {
    if (!Array.isArray(questionData)) {
      questionData = questionData.QuestionTypeText.QuestionDropDownOptionsText;
    }
    const renderQuestionTextWithDropdown = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(questionText, "text/html");
      const elements = Array.from(doc.body.childNodes);
      return (
        <div>
          {elements.map((element, index) => (
            <section
              key={index}
              style={{
                margin: "1rem 0",
                color: "#2D363E",
                fontSize: "15px",
                lineHeight: "24px",
                fontWeight: 400,
              }}
            >
              <Typography
                variant="body3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#2D363E",
                }}
              >
                {Array.from(element.childNodes).map((childNode, matchIndex) => {
                  if (childNode.nodeType === Node.ELEMENT_NODE) {
                    const elementNode = childNode as Element;
                    const tagName = elementNode.tagName.toLowerCase();
                    const styles = {
                      fontWeight: tagName === "strong" ? "bold" : "normal",
                      fontStyle: tagName === "em" ? "italic" : "normal",
                      textDecoration: tagName === "u" ? "underline" : "none",
                      fontSize: tagName === "h3" ? "1.5rem" : "inherit",
                    };
                    console.log("styles ++ ", styles);
                    return (
                      <span key={matchIndex} style={styles}>
                        {elementNode.textContent}
                      </span>
                    );
                  } else if (childNode.nodeType === Node.TEXT_NODE) {
                    const textContent = childNode.textContent || "";
                    const parts = textContent.split(
                      /(\(Drop-down No\. \d+\))/g
                    );
                    return parts.map((part, partIndex) => {
                      if (/\(Drop-down No\. \d+\)/.test(part)) {
                        return (
                          <div
                            key={partIndex}
                            style={{
                              all: "unset",
                              display: "inline-block",
                            }}
                          >
                            <CustomSelect
                              id={`select-dropdown-${index}-${partIndex}`}
                              fullWidth
                              variant="outlined"
                              displayEmpty
                              sx={{
                                height: "46px",
                                "&.MuiInputBase-root ": {
                                  borderRadius: "0px",
                                  //   backgroundColor: "#F1F4F5",
                                },
                                "&.MuiInputBase-root .MuiSelect-select": {
                                  color: "#2D363E",
                                  textFillColor: "#2D363E",
                                  opacity: 1,
                                  borderRadius: "4px",
                                  fontSize: "0.9375rem",
                                  lineHeight: "21px",
                                },
                                "&.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    color: "#2D363E",
                                    textFillColor: "#2D363E",
                                    opacity: 1,
                                    borderRadius: "4px",
                                    fontSize: "0.875rem",
                                    lineHeight: "1.05rem",
                                  },
                                "& svg path": { fill: "#2D363E" },
                                "& fieldset": {
                                  borderColor: "#AFAFAF !important",
                                },
                              }}
                              MenuProps={{
                                style: {
                                  maxHeight: 350,
                                  zIndex: "14000",
                                },
                                PaperProps: {
                                  background: (theme: any) => "#fff",
                                  zIndex: "1302",
                                  "& .MuiButtonBase-root": {
                                    background: (theme: any) => "#fff",
                                    color: (theme: any) => "#2D363E",
                                    fontSize: "15px",
                                    lineHeight: "17px",
                                  },
                                  "& .MuiButtonBase-root.Mui-selected": {
                                    backgroundColor: "transparent",
                                    color: (theme: any) => "#2D363E",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                  },
                                  "& .MuiButtonBase-root svg path": {
                                    fill: (theme: any) => "#2D363E",
                                    opacity: 0,
                                  },
                                  "& .MuiButtonBase-root.Mui-selected svg path":
                                    {
                                      fill: (theme: any) => "#2D363E",
                                      opacity: 1,
                                    },
                                },
                              }}
                            >
                              <MenuItem defaultValue="" disabled>
                                Select Choice
                              </MenuItem>
                              {questionData?.map(
                                (option: any, optionIndex: any) => (
                                  <MenuItem
                                    key={optionIndex}
                                    value={option.choiseText}
                                  >
                                    {option.choiseText}
                                  </MenuItem>
                                )
                              )}
                            </CustomSelect>
                          </div>
                        );
                      } else if (part.trim()) {
                        return <span key={partIndex}>{part}</span>;
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </Typography>
            </section>
          ))}
        </div>
      );
    };

    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            {primaryImage || secondaryImage || viewImage.length > 0 ? (
              <Grid
                item
                xs={12}
                md={caseStudy ? 12 : 6}
                order={caseStudy ? 1 : 2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mt={4}
                  mb={3}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  mb={3}
                >
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={400}
                      height={391}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  gap={3}
                  sx={{
                    [`& label`]: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F7F8",
                      borderRadius: "7px",
                      padding: "35px 30px",
                      cursor: "pointer",
                      width: "100%",
                      height: "400px",
                    },
                  }}
                >
                  {viewImage
                    ?.flat(Infinity)
                    .map((imageData: any, index: any) => {
                      return (
                        <Image
                          src={imageData.QuestionImage}
                          alt={"question-preview123"}
                          width={406}
                          height={419}
                          style={{
                            height: "fit-content",
                            objectFit: "contain",
                            width: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      );
                    })}
                </Box>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.fieldText,
                }}
              >
                {/* Render the question text with dropdown */}
                {renderQuestionTextWithDropdown()}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
          <TabContext value={tabValue}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28 px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />

                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box
                    padding={3}
                    sx={{
                      backgroundColor: "#fff",
                      border: "solid 1px #738A9633",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component={"div"}
                      padding={4}
                      sx={{
                        backgroundColor: "#F5F7F8",
                        borderRadius: "10px",
                        border: "solid 1px #738A9633",
                      }}
                    >
                      <Box
                        component="div"
                        padding={4}
                        sx={{
                          backgroundColor: "#F5F7F8",
                          borderRadius: "10px",
                          border: "solid 1px #738A9633",
                        }}
                      >
                        {renderQuestionTextWithDropdown()}{" "}
                        {/* Render JSX directly */}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    mt={2.5}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage?.QuestionImage}
                        alt={"question-preview"}
                        width={400}
                        height={391}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {secondaryImage ? (
                    <Image
                      src={secondaryImage?.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={2.5}
                sx={{
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Grid item xs={12} md={4} key={index}>
                      <Image
                        src={imageData.QuestionImage}
                        alt={"question-preview"}
                        width={406}
                        height={419}
                        style={{
                          objectFit: "contain",
                          height: "fit-content",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    );
  } else if (type === "match-the-list") {
    if (!Array.isArray(questionData)) {
      questionData =
        questionData.QuestionTypeText.QuestionMatchTheListOptionsText;
    }
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
      Array(questionData.length).fill("")
    );

    const handleSelectChange = (index: number) => (event: any) => {
      const value = event.target.value;
      const newAnswers = [...selectedAnswers];

      // Clear any previously selected option if it's being selected again
      selectedAnswers.forEach((answer, i) => {
        if (answer === value && i !== index) {
          newAnswers[i] = ""; // Clear the selection of the other dropdown
        }
      });

      newAnswers[index] = value;
      setSelectedAnswers(newAnswers);
    };

    return (
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            position: "sticky",
            top: 0,
            padding: "0 24px",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* <Box
              sx={{
                color: "#02376D",
                fontWeight: "500",
              }}
            >
              True or False
            </Box> */}
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={4}
                mb={3}
              >
                {primaryImage ? (
                  <Image
                    src={primaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mb={3}
              >
                {secondaryImage ? (
                  <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={2.5}
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Image
                      src={imageData.QuestionImage}
                      alt={"question-preview123"}
                      width={406}
                      height={419}
                      style={{
                        height: "fit-content",
                        objectFit: "contain",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              sx={{
                width: "100%",
                p: "0 48px 24px",
              }}
            >
              <Box>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      color: "#2D363E",
                      "& a": {
                        color: `${theme.palette.primary.main} !important`,
                        textDecoration: "underline",
                        textDecorationColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {/* {removeHtmlTags(
                      isCreate ? questionText : questionData?.QuestionText
                    )} */}
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: isCreate
                          ? questionText
                          : questionData?.QuestionText,
                      }}
                    /> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isCreate ? questionText : questionText,
                      }}
                    />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack
              sx={{ width: "100%", typography: "body1", p: "0 48px 200px" }}
              gap={"10px"}
            >
              {questionData.map((data: any, index: any) => (
                <Grid
                  key={index}
                  container
                  alignItems="center"
                  spacing={"20px"}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Box width={"30%"} maxWidth={"140px"}>
                      {data.choice}
                    </Box>
                    <FormControl fullWidth sx={{ maxWidth: "80px" }}>
                      <Select
                        value={selectedAnswers[index]}
                        onChange={handleSelectChange(index)}
                      >
                        {questionData.map((_: any, idx: any) => (
                          <MenuItem key={idx} value={(idx + 1).toString()}>
                            {idx + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box width={"50%"}>{data.match}</Box>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>
        </Box>
      </DialogContent>
    );
  } else {
    return (
      // <DialogContent
      //   sx={{
      //     p: 0,
      //   }}
      // >
      //   <Grid
      //     container
      //     spacing={3}
      //     sx={{
      //       position: "sticky",
      //       top: 0,
      //       padding: "0 24px",
      //
      //     }}
      //   >
      //     <Grid item xs={12} md={12}>
      //       <Box
      //         sx={{
      //           color: "#02376D",
      //           fontWeight: "500",
      //         }}
      //       >
      //         True or False {type}
      //       </Box>
      //       <Box
      //         sx={{
      //           color: theme.palette.secondary.fieldText,
      //         }}
      //       >
      //         Which one of these is correct answer?
      //       </Box>
      //     </Grid>
      //   </Grid>
      //   <Box sx={{ width: "100%", typography: "body1" }}>
      //     <Grid container spacing={3}>
      //       <Grid item xs={12} md={12}>
      //         <Box
      //           display="flex"
      //           alignItems="center"
      //           flexDirection="column"
      //           mt={4}
      //           mb={3}
      //         >
      //           {primaryImage ? (
      //             <Image
      //               src={primaryImage?.QuestionImage}
      //               alt={"question-preview"}
      //               width={400}
      //               height={391}
      //               style={{
      //                 objectFit: "contain",
      //               }}
      //             />
      //           ) : (
      //             ""
      //           )}
      //         </Box>
      //         <Box
      //           display="flex"
      //           alignItems="center"
      //           flexDirection="column"
      //           mb={3}
      //         >
      //           {secondaryImage ? (
      //             <Image
      //               src={secondaryImage?.QuestionImage}
      //               alt={"question-preview"}
      //               width={400}
      //               height={391}
      //               style={{
      //                 objectFit: "contain",
      //               }}
      //             />
      //           ) : (
      //             ""
      //           )}
      //         </Box>
      //         <Box
      //           display="flex"
      //           alignItems="center"
      //           flexDirection="column"
      //           sx={{
      //             // color: theme.palette.secondary.fieldText,
      //             [`& label`]: {
      //               display: "flex",
      //               flexDirection: "column",
      //               gap: "0.5rem",
      //               alignItems: "center",
      //               justifyContent: "center",
      //               backgroundColor: "#F5F7F8",
      //               borderRadius: "7px",
      //               padding: "35px 30px",
      //               cursor: "pointer",
      //               width: "100%",
      //               height: "400px",
      //             },
      //           }}
      //         >
      //           {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
      //             return (
      //               <Grid item xs={12} md={4} mb={3}>
      //                 <Image
      //                   src={imageData.QuestionImage}
      //                   alt={"question-preview123"}
      //                   width={406}
      //                   height={419}
      //                   style={{
      //                     height: "fit-content",
      //                     objectFit: "contain",
      //                   }}
      //                 />
      //               </Grid>
      //             );
      //           })}
      //         </Box>
      //       </Grid>
      //       <Grid
      //         sx={{
      //           width: "100%",
      //           p: "0 48px 24px",
      //         }}
      //       >
      //         <Box>
      //           <Grid
      //             item
      //             xs={12}
      //             md={4}
      //             display={"flex"}
      //             alignItems={"center"}
      //             gap={"10px"}
      //           >
      //             <Typography
      //               variant="h6"
      //               fontWeight="400"
      //               sx={{
      //                 width: "10px",
      //               }}
      //             >
      //               1
      //             </Typography>
      //             <Radio
      //               disableRipple
      //               value={1}
      //               name={`radio-buttons1}`}
      //               inputProps={{ "aria-label": "A" }}
      //               sx={{
      //                 padding: "3px 3px 3px 0",
      //                 "& svg:first-of-type path": {
      //                   fill: "#777E89",
      //                 },
      //                 "& svg:last-of-type path": {
      //                   fill: "#777E89",
      //                 },
      //               }}
      //             />
      //             True
      //           </Grid>
      //           <Grid
      //             item
      //             xs={12}
      //             md={4}
      //             display={"flex"}
      //             alignItems={"center"}
      //             gap={"10px"}
      //           >
      //             <Typography
      //               variant="h6"
      //               fontWeight="400"
      //               sx={{
      //                 width: "10px",
      //               }}
      //             >
      //               2
      //             </Typography>
      //             <Radio
      //               disableRipple
      //               value={2}
      //               name={`radio-buttons1`}
      //               inputProps={{ "aria-label": "A" }}
      //               sx={{
      //                 padding: "3px 3px 3px 0",
      //                 "& svg:first-of-type path": {
      //                   fill: "#777E89",
      //                 },
      //                 "& svg:last-of-type path": {
      //                   fill: "#777E89",
      //                 },
      //               }}
      //             />
      //             False
      //           </Grid>
      //         </Box>
      //       </Grid>
      //     </Grid>
      //   </Box>
      //   {/* tab */}
      //   <Box sx={{ width: "100%", typography: "body1" }} display={"none"}>
      //     <TabContext value={tabValue}>
      //       <Box>
      //         <TabList
      //           onChange={handleChange}
      //           aria-label="lab API tabs example"
      //           sx={{
      //             minHeight: "0 !important",
      //             "& .MuiTab-root": {
      //               color: "#99ABB4",
      //               backgroundColor: "#738A9633",
      //               padding: "4px 12px",
      //               minHeight: "28px",
      //               height: "auto",
      //               lineHeight: "1.2",
      //             },
      //             "& .MuiTab-root.Mui-selected": {
      //               color: "#fff",
      //               backgroundColor: theme.palette.secondary.textColor,
      //             },
      //             "& .MuiTabs-indicator": {
      //               display: "none",
      //             },
      //             "& div": {
      //               height: "0",
      //             },
      //           }}
      //         >
      //           <Tab
      //             label="Question"
      //             value="1"
      //             disableRipple
      //             sx={{
      //               borderRadius: "5px 0 0 0",
      //             }}
      //           />

      //           {multipleImage?.length > 0 && (
      //             <Tab
      //               label="Additional Media"
      //               value="2"
      //               disableRipple
      //               sx={{
      //                 borderRadius: "0 5px 0 0",
      //               }}
      //             />
      //           )}
      //         </TabList>
      //       </Box>
      //       <TabPanel
      //         value="1"
      //         sx={{
      //           "&.MuiTabPanel-root": {
      //             padding: "0",
      //           },
      //         }}
      //       >
      //         <Grid container spacing={3}>
      //           <Grid item xs={12} md={8}>
      //             <Box
      //               padding={3}
      //               sx={{
      //                 backgroundColor: "#fff",
      //                 borderRadius: "10px",
      //                 border: "solid 1px #738A9633",
      //               }}
      //             >
      //               <Box
      //                 component={"div"}
      //                 padding={4}
      //                 sx={{
      //                   backgroundColor: "#F5F7F8",
      //                   borderRadius: "10px",
      //                   border: "solid 1px #738A9633",
      //                 }}
      //               >
      //                 <Box
      //                   dangerouslySetInnerHTML={{
      //                     __html: questionText,
      //                   }}
      //                 />
      //               </Box>
      //             </Box>
      //             <Box
      //               display="flex"
      //               alignItems="center"
      //               flexDirection="column"
      //               mt={2.5}
      //             >
      //               {primaryImage ? (
      //                 <Image
      //                   src={primaryImage?.QuestionImage}
      //                   alt={"question-preview"}
      //                   width={400}
      //                   height={391}
      //                   style={{
      //                     objectFit: "contain",
      //                   }}
      //                 />
      //               ) : (
      //                 ""
      //               )}
      //               {/* <Image
      //                 src={primaryImage?.QuestionImage}
      //                 alt={"question-preview"}
      //                 width={924}
      //                 height={391}
      //                 style={{
      //                   width: "100%",
      //                   height: "380px",
      //                   objectFit: "cover",
      //                 }}
      //               /> */}
      //             </Box>
      //           </Grid>
      //           <Grid item xs={12} md={4}>
      //             {secondaryImage ? (
      //               <Image
      //                 src={secondaryImage?.QuestionImage}
      //                 alt={"question-preview"}
      //                 width={406}
      //                 height={419}
      //                 style={{
      //                   objectFit: "contain",
      //                 }}
      //               />
      //             ) : (
      //               ""
      //             )}
      //             {/* <Image
      //               src={secondaryImage?.QuestionImage}
      //               alt={"question-preview"}
      //               width={406}
      //               height={419}
      //               style={{
      //                 width: "100%",
      //                 height: "380px",
      //                 objectFit: "cover",
      //               }}
      //             /> */}
      //           </Grid>
      //         </Grid>
      //       </TabPanel>
      //       <TabPanel
      //         value="2"
      //         sx={{
      //           "&.MuiTabPanel-root": {
      //             padding: "0",
      //           },
      //         }}
      //       >
      //         <Box
      //           display="flex"
      //           alignItems="center"
      //           flexDirection="column"
      //           sx={{
      //             // color: theme.palette.secondary.fieldText,
      //             [`& label`]: {
      //               display: "flex",
      //               flexDirection: "column",
      //               gap: "0.5rem",
      //               alignItems: "center",
      //               justifyContent: "center",
      //               backgroundColor: "#F5F7F8",
      //               borderRadius: "7px",
      //               padding: "35px 30px",
      //               cursor: "pointer",
      //               width: "100%",
      //               height: "400px",
      //             },
      //           }}
      //         >
      //           {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
      //             return (
      //               <Grid item xs={12} md={4}>
      //                 <Image
      //                   src={imageData.QuestionImage}
      //                   alt={"question-preview123"}
      //                   width={406}
      //                   height={419}
      //                   style={{
      //                     height: "fit-content",
      //                     objectFit: "contain",
      //                   }}
      //                 />
      //               </Grid>
      //             );
      //           })}
      //         </Box>
      //       </TabPanel>
      //     </TabContext>
      //   </Box>
      // </DialogContent>
      <Stack>
        <Box sx={{ width: "100%", typography: "body1", p: "0px" }}>
          {/* <TabContext value={tabValue}> */}
          {/* <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  minHeight: "0 !important",
                  "& .MuiTab-root": {
                    color: "#99ABB4",
                    backgroundColor: "#738A9633",
                    padding: "4px 12px",
                    minHeight: "28px",
                    height: "auto",
                    lineHeight: "1.2",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.textColor,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& div": {
                    height: "0",
                  },
                }}
              >
                <Tab
                  label="Question"
                  value="1"
                  disableRipple
                  sx={{
                    borderRadius: "5px 0 0 0",
                  }}
                />
                {multipleImage?.length > 0 && (
                  <Tab
                    label="Additional Media"
                    value="2"
                    disableRipple
                    sx={{
                      borderRadius: "0 5px 0 0",
                    }}
                  />
                )}
              </TabList>
            </Box> */}
          {/* <TabPanel
              value="1"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            > */}
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 2 : 1}
            >
              <Box
                sx={{
                  color: "#7A878D",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  "& a": {
                    color: `${theme.palette.primary.main} !important`,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  },
                  "& p": {
                    color: "#7A878D",
                    fontSize: "15px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    mb: "32px",
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: questionText,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={caseStudy ? 12 : 6}
              order={caseStudy ? 1 : 2}
            >
              <Box mt={2.5} textAlign={"center"}>
                {primaryImage ? (
                  <Image
                    src={primaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={400}
                    height={391}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                ) : (
                  ""
                )}
                {/* <Image
                        src={primaryImage?.[0]?.images_url}
                        alt={"question-preview"}
                        width={924}
                        height={391}
                        style={{
                          width: "100%",
                          height: "380px",
                          objectFit: "cover",
                        }}
                      /> */}
              </Box>
              {secondaryImage ? (
                <Box mt={2.5} textAlign={"center"}>
                  <Image
                    src={secondaryImage?.QuestionImage}
                    alt={"question-preview"}
                    width={406}
                    height={419}
                    style={{
                      objectFit: "contain",
                      height: "fit-content",
                      maxWidth: "100%",
                      width: "auto",
                    }}
                  />
                </Box>
              ) : (
                ""
              )}

              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={2.5}
                gap={2.5}
                sx={{
                  // color: theme.palette.secondary.fieldText,
                  [`& label`]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F7F8",
                    borderRadius: "7px",
                    padding: "35px 30px",
                    cursor: "pointer",
                    width: "100%",
                    height: "400px",
                  },
                }}
              >
                {viewImage?.flat(Infinity).map((imageData: any, index: any) => {
                  return (
                    <Image
                      src={imageData.QuestionImage}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        objectFit: "contain",
                        height: "fit-content",
                        maxWidth: "100%",
                        width: "auto",
                      }}
                    />
                  );
                })}
              </Box>
              {/* <Image
                      src={secondaryImage?.[0]?.images_url}
                      alt={"question-preview"}
                      width={406}
                      height={419}
                      style={{
                        width: "100%",
                        height: "380px",
                        objectFit: "cover",
                      }}
                    /> */}
            </Grid>
          </Grid>
          {/* </TabPanel> */}
          {/* <TabPanel
              value="2"
              sx={{
                "&.MuiTabPanel-root": {
                  padding: "0",
                },
              }}
            > */}

          {/* </TabPanel> */}
          {/* </TabContext> */}
        </Box>
      </Stack>
    );
  }
};

export default QuestionOptions;

const toEnumerationType = (index: any, enumerationType: any) => {
  let contentType;

  switch (enumerationType) {
    case "1":
      contentType = String.fromCharCode(65 + index);
      break;
    case "2":
      contentType = toRomanNumerals(index + 1, "U");
      break;
    case "4":
      contentType = toRomanNumerals(index + 1, "L");
      break;
    case "5":
      contentType = String.fromCharCode(97 + index);
      break;
    default:
      contentType = index + 1;
  }
  return contentType;
};

const toRomanNumerals = (num: any, type: any) => {
  const romanNumerals =
    type === "U"
      ? [
          { value: 1000, numeral: "M" },
          { value: 900, numeral: "CM" },
          { value: 500, numeral: "D" },
          { value: 400, numeral: "CD" },
          { value: 100, numeral: "C" },
          { value: 90, numeral: "XC" },
          { value: 50, numeral: "L" },
          { value: 40, numeral: "XL" },
          { value: 10, numeral: "X" },
          { value: 9, numeral: "IX" },
          { value: 5, numeral: "V" },
          { value: 4, numeral: "IV" },
          { value: 1, numeral: "I" },
        ]
      : [
          { value: 1000, numeral: "m" },
          { value: 900, numeral: "cm" },
          { value: 500, numeral: "d" },
          { value: 400, numeral: "cd" },
          { value: 100, numeral: "c" },
          { value: 90, numeral: "xc" },
          { value: 50, numeral: "l" },
          { value: 40, numeral: "xl" },
          { value: 10, numeral: "x" },
          { value: 9, numeral: "ix" },
          { value: 5, numeral: "v" },
          { value: 4, numeral: "iv" },
          { value: 1, numeral: "i" },
        ];

  let result = "";

  for (const pair of romanNumerals) {
    while (num >= pair.value) {
      result += pair.numeral;
      num -= pair.value;
    }
  }

  return result;
};
