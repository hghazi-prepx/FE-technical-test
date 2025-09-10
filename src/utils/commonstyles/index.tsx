import { Opacity } from "@mui/icons-material"
import { Switch, SwitchProps, styled } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"
import {
  border,
  borderColor,
  borderRadius,
  color,
  display,
  fontSize,
  fontWeight,
  height,
  lineHeight,
  maxWidth,
  minHeight,
  minWidth,
  textAlign
} from "@mui/system"
import { FontBackgroundColor } from "ckeditor5"

export const disableInputStyle = {
  "&.MuiFormControl-root": {
    borderRadius: "4px",
    backgroundColor: "#F1F4F5"
  },
  "&.MuiFormControl-root .MuiInputBase-input.Mui-disabled": {
    color: "#6E7B82BF",
    textFillColor: "#6E7B82BF",
    opacity: 1
  },
  "&.MuiFormControl-root .Mui-disabled + .MuiOutlinedInput-notchedOutline": {
    borderColor: "#F1F4F5 !important",
    borderRadius: "4px"
  }
}
export const disableInputStyle2 = {
  "&.MuiFormControl-root": {
    borderRadius: "4px",
    backgroundColor: "#9390904D"
  },
  "&.MuiFormControl-root .Mui-disabled.MuiInputBase-input": {
    color: "#6E7B82D9",
    textFillColor: "#6E7B82D9",
    opacity: 1
  },
  "&.MuiFormControl-root .Mui-disabled + .MuiOutlinedInput-notchedOutline": {
    borderColor: "#F1F4F5 !important",
    borderRadius: "4px"
  }
}
export const inputStyle1 = {
  "&.MuiFormControl-root": {
    borderRadius: "0px"
    //   backgroundColor: "#F1F4F5",
  },
  "&.MuiFormControl-root .MuiInputBase-root": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px"
  }
}
export const inputBlankStyle = {
  "&.MuiFormControl-root .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff !important",
    borderRadius: "4px"
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#fff !important",
      borderRadius: "4px"
    }
}

export const selectStyle1 = {
  "&.MuiInputBase-root ": {
    borderRadius: "0px"
    //   backgroundColor: "#F1F4F5",
  },
  "&.MuiInputBase-root .MuiSelect-select": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px",
    fontSize: "0.875rem",
    lineHeight: "1.05rem"
  },
  "&.MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px",
    fontSize: "0.875rem",
    lineHeight: "1.05rem"
  },
  "& fieldset": {
    borderColor: "#DEE2E6 !important"
  },
  ".Mui-disabled": {
    backgroundColor: (theme: any) => `#EBF2F6!important`,
    border: (theme: any) =>
      `1px solid ${theme.palette.secondary.disableFieldColor} !important`,
    opacity: "0.5 !important"
  },
  ".Mui-disabled ~ fieldset": {
    border: 0
  },
  ".Mui-disabled ~ svg": {
    display: "none"
  }
}
export const disableSelectStyle = {
  "& .MuiInputBase-root": {
    borderRadius: "4px",
    backgroundColor: "#F1F4F5"
  },
  "& .MuiSelect-select.Mui-disabled": {
    color: "#6E7B8266",
    textFillColor: "#6E7B8266",
    opacity: 1,
    borderRadius: "4px",
    backgroundColor: "#F1F4F5"
  },
  "& .MuiSelect-select.Mui-disabled + .MuiSelect-nativeInput": {
    opacity: 0
  },
  "& .MuiSelect-select.Mui-disabled + .MuiSelect-nativeInput + .MuiSvgIcon-root + .MuiOutlinedInput-notchedOutline":
    {
      color: "#6E7B82",
      textFillColor: "#6E7B82",
      // opacity: 0,
      // backgroundColor:"#ccc"
      borderColor: "#F1F4F5 !important",
      borderRadius: "4px"
      // backgroundColor: "#F1F4F5",
    }
}
export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "#44D3BB"
            : theme.palette.secondary.main,
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}))

export const selectStyle2 = {
  "&.MuiInputBase-root ": {
    borderRadius: "0px"
    //   backgroundColor: "#F1F4F5",
  },
  "&.MuiInputBase-root .MuiSelect-select": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px"
  },
  "&.MuiInputBase-root .MuiSelect-select svg": {
    display: "none"
  },
  "&.MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px"
  }
}
export const uploadFileStyle = {
  [`& label`]: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E88E53D",
    borderRadius: "5px",
    border: "2px dashed #1E88E5",

    cursor: "pointer",
    marginLeft: "auto",
    width: "248px",
    height: "248px"
  },
  [`& .uploaded-image`]: {
    objectFit: "cover",
    borderRadius: "5px"
  }
}

// For input text align center
export const inputStyle2 = {
  "&.MuiFormControl-root": {
    borderRadius: "0px"
  },
  "&.MuiFormControl-root .MuiInputBase-root": {
    color: "#6E7B82",
    textFillColor: "#6E7B82",
    opacity: 1,
    borderRadius: "4px"
  },
  "&.MuiFormControl-root .MuiInputBase-root input": {
    textAlign: "center"
  }
}

// For input blank Style

export const primaryButon = {
  p: "11px 18px",
  borderRadius: "5px",
  border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
  background: (theme: any) => theme.palette.primary.main,
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  color: (theme: any) => theme.palette.text.buttonText,
  "&:hover": {
    color: (theme: any) => theme.palette.text.buttonText,
    background: (theme: any) => theme.palette.primary.main
  },
  "&.Mui-disabled": {
    opacity: 0.6,
    color: (theme: any) => `${theme.palette.text.buttonText} !important`
  }
}
export const secondaryButon = {
  p: "11px 18px",
  border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  background: "transparent",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  color: (theme: any) => theme.palette.primary.main,
  "&:hover": {
    color: (theme: any) => theme.palette.primary.main,
    backgroundColor: "transparent"
  }
}
export const blueButton = {
  p: "11px 18px",
  background: (theme: any) => theme.palette.action.blueButton,
  borderRadius: "5px",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  color: (theme: any) => theme.palette.text.blueButtonText,
  "&:hover": {
    color: (theme: any) => theme.palette.text.blueButtonText,
    background: (theme: any) => theme.palette.action.blueButton
  }
}
export const linkButton = {
  p: "0px",
  border: "0px",
  borderRadius: "5px",
  background: "transparent",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  color: (theme: any) => theme.palette.primary.main,
  textDecoration: "underline",
  height: "fit-content",
  "&:hover": {
    color: (theme: any) => theme.palette.primary.main,
    backgroundColor: "transparent",
    textDecoration: "underline"
  }
}
export const fieldLabel = {
  fontSize: "15px",
  lineHeight: "17.1px",
  fontWeight: 400,
  mt: "0px",
  mb: "8px"
}
export const customTooltip = {
  p: "10px 15px",
  backgroundColor: "#ffff",
  mt: "0px !important",
  border: "1px solid #E6E6E6",
  fontSize: "15px",
  color: "#99ABB4",
  fontWeight: 400
}
export const commonField = {
  "& fieldset": {
    p: "12px 16px 12px 16px",
    border: "1px solid rgba(115, 138, 150, 0.2) !important",
    fontSize: "15px",
    color: "#7A878D",
    fontWeight: 400,
    borderRadius: "4px !important"
  },
  "& .MuiInputBase-root": {
    borderRadius: "4px"
  }
} /* Text field */

export const viewField = {
  "& input": {
    p: "0px"
  },
  "& fieldset": {
    display: "none"
  }
} /* Text field */

export const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 3,
  [`& .delete-modal-graphic`]: { marginRight: "15px" }
}

export const customFieldStyle = {
  "& input": {
    fontSize: "14px",
    lineHeight: "1",
    p: "12px 16px 12px 16px"
  },
  "& fieldset": {
    p: "12px 16px 12px 16px",
    border: "1px solid #AFAFAF",
    fontSize: "15px",
    lineHeight: 1,
    fontWeight: 400,
    borderRadius: "4px !important"
  },
  "& input:hover + fieldset,& input:active + fieldset,& input:focus + fieldset":
    {
      border: "1px solid  rgba(115, 138, 150, 0.5)  !important"
    },
  "& .MuiInputBase-root": {
    borderRadius: "4px"
  },
  "& .Mui-error": {
    marginLeft: "0px"
  },
  "& input:disabled + fieldset": {
    border: "0px !important"
  }
}
export const commonMenuStyle = {
  "& .MuiPaper-root": {
    borderRadius: "4px",
    boxShadow: "0",
    border: (theme: any) =>
      `1px solid ${theme.palette.mode === "light" ? "#E6E6E6" : "transparent"}`,
    background: (theme: any) => `${theme.palette.action.menu} !important`
  },
  "& .MuiList-root": {
    padding: "0"
  },
  "& .MuiButtonBase-root": {
    color: (theme: any) => theme.palette.text.main,
    minWidth: "152px",
    padding: "10px",
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: ".015em",
    fontWeight: 400,
    "&:hover": {
      color: (theme: any) => `${theme.palette.primary.light} !important`,
      backgroundColor: (theme: any) => theme.palette.action.hoverMenu
    }
  }
}

export const createButtonStyle = {
  fontSize: "20px",
  lineHeight: "23px",
  borderRadius: "5px",
  color: (theme: any) => theme.palette.text.buttonText,
  display: "flex",
  gap: "6px",
  background: (theme: any) => theme.palette.primary.main,
  height: "48px",
  padding: "18px 20px",
  fontWeight: 400,
  "& svg": {
    height: "18px",
    width: "18px"
  },
  "&:hover": {
    background: (theme: any) => theme.palette.primary.main,
    color: (theme: any) => theme.palette.text.buttonText
  }
}
export const linkButtonStyle = {
  fontSize: "18px",
  lineHeight: "21px",
  borderRadius: "5px",
  color: (theme: any) => theme.palette.text.primary,
  padding: "5px 10px",
  height: "48px",
  minWidth: "42px",
  backgroundColor: "transparent",
  gap: "10px",
  "&:hover": {
    color: (theme: any) => theme.palette.text.primary,
    backgroundColor: "transparent"
  },
  "& svg path": {
    stroke: (theme: any) => theme.palette.text.primary
  },
  "&:disabled": {
    cursor: "not-allowed",
    color: (theme: any) =>
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(255, 255, 255, 0.3)",
    "& svg path": {
      stroke: (theme: any) =>
        theme.palette.mode === "light"
          ? "rgba(0, 0, 0, 0.3)"
          : "rgba(255, 255, 255, 0.3)"
    }
  }
}
export const commonPopStyle = {
  zIndex: 999,
  "& .MuiAutocomplete-listbox": {
    fontSize: "14px",
    lineHeight: "16px",
    maxHeight: "250px",
    background: (theme: any) => `${theme.palette.background.light} !important`
  },
  "& .MuiAutocomplete-option": {
    padding: "10px"
  },
  "& .MuiAutocomplete-noOptions": {
    fontSize: "14px",
    lineHeight: "16px",
    background: (theme: any) => `${theme.palette.background.light} !important`
  }
}
export const commonDropdownMenuStyle = {
  zIndex: 999,
  background: (theme: any) => theme.palette.background.light,
  "& .MuiButtonBase-root": {
    background: (theme: any) => theme.palette.background.light,
    color: (theme: any) => theme.palette.text.primary,
    fontSize: "15px",
    lineHeight: "17px"
  },
  "& .MuiButtonBase-root.Mui-selected": {
    backgroundColor: "transparent",
    color: (theme: any) => theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  "& .MuiButtonBase-root svg path": {
    fill: (theme: any) => theme.palette.text.primary,
    opacity: 0
  },
  "& .MuiButtonBase-root.Mui-selected svg path": {
    fill: (theme: any) => theme.palette.text.primary,
    opacity: 1
  }
}

export const commonSelectFieldStyle = {
  height: "46px",
  "&.MuiInputBase-root ": {
    borderRadius: "0px"
    //   backgroundColor: "#F1F4F5",
  },
  "&.MuiInputBase-root .MuiSelect-select": {
    color: (theme: any) => theme.palette.text.primary,
    textFillColor: (theme: any) => theme.palette.text.primary,
    opacity: 1,
    borderRadius: "4px",
    fontSize: "0.9375rem",
    lineHeight: "21px"
  },
  "&.MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    color: (theme: any) => theme.palette.text.primary,
    textFillColor: (theme: any) => theme.palette.text.primary,
    opacity: 1,
    borderRadius: "4px",
    fontSize: "0.875rem",
    lineHeight: "1.05rem"
  },
  "& fieldset": {
    borderColor: "#AFAFAF !important"
  },
  "&.Mui-disabled": {
    "& .Mui-disabled": {
      fontSize: "0.875rem",
      lineHeight: "1.05rem",
      backgroundColor: (theme: any) => `#EBF2F6!important`,
      border: (theme: any) =>
        `1px solid ${theme.palette.secondary.disableFieldColor} !important`,
      opacity: "0.5 !important"
    },
    "& fieldset": {
      border: "0px !important"
    }
  },
  ".Mui-disabled ~ fieldset": {
    border: 0
  },
  ".Mui-disabled ~ svg": {
    display: "none"
  }
}

export const commonFieldLabelStyle = {
  color: (theme: any) => theme.palette.text.main,
  mb: "8px"
}

export const commonTableCardStyle = {
  backgroundColor: (theme: any) => theme.palette.background.light,
  marginBottom: "25px",
  overflow: "visible",
  boxShadow: "none",
  border: (theme: any) =>
    `1px solid ${theme.palette.mode === "dark" ? "transparent" : "#738A9633"}`,
  borderRadius: "8px",
  p: "0"
}

export const commonTableStyle = {
  whiteSpace: "nowrap",
  "& :is(th,td)": {
    borderBottom: "1px solid #738A9633",
    p: "8.5px 12px",
    minWidth: "44px",
    maxWidth: "400px",
    textOverflow: "ellipsis",
    "&:last-child": {
      "&:has(button)": {
        textAlign: "right"
      }
    }
  },
  "& th": {
    minHeight: "55px",
    height: "55px",
    backgroundColor: (theme: any) => theme.palette.background.light,
    borderRadius: "8px 0 0 0"
  }
}

export const commonContentCardStyle = {
  p: "32px",
  backgroundColor: (theme: any) => theme.palette.background.light,
  marginBottom: "25px",
  overflow: "visible",
  boxShadow: "none",
  border: (theme: any) =>
    `1px solid ${theme.palette.mode === "dark" ? "transparent" : "#738A9633"}`,
  borderRadius: "5px"
}
export const commonSearchFieldStyle = {
  background: (theme: any) =>
    theme.palette.mode === "light" ? "#FFF" : "transparent",
  maxWidth: "360px",
  "& input": {
    p: "14px 12px 14px 48px"
  },
  "& + svg path": {
    stroke: "#777E89"
  },
  "& fieldset": {
    border: (theme: any) => `1px solid ${theme.palette.border.input} !important`
  }
}

export const commonCheckboxField = {
  p: "0px",
  "& span": {
    background: (theme: any) => theme.palette.secondary.radioColor,
    border: "0px",
    mr: "4px"
  },
  "& input": {
    "& + span": {
      boxShadow: "none"
    },
    "&:checked + span": {
      background: (theme: any) => theme.palette.primary.light
    }
  }
}

export const createDropdownButtonStyle = {
  fontSize: "20px",
  lineHeight: "23px",
  borderRadius: "5px",
  color: (theme: any) => (theme.palette.mode === "light" ? "#FFF" : "#000")
}

export const checkboxButtonStyle = {
  mx: "0px",
  border: (theme: any) => `1px solid ${theme.palette.primary.light}`,
  p: "8px 16px",
  borderRadius: "30px",
  width: "fit-content",
  color: (theme: any) => theme.palette.primary.light,
  "& .MuiCheckbox-root": {
    display: "none"
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
    lineHeight: "14px"
  },
  "&:has(.Mui-checked)": {
    background: (theme: any) => theme.palette.primary.light,
    color: (theme: any) => (theme.palette.mode === "light" ? "#fff" : "#000"),
    fontWeight: 500
  },
  "& .MuiButtonBase-root": {
    display: "none"
  }
}

export const borderedCheckboxFiledStyle = {
  color: "#777E89",
  pl: "0px",
  "&.Mui-checked": {
    color: "#777E89",
    pl: "0px !important"
  },
  "&.MuiButtonBase-root": {
    mt: "3px"
  },
  "& svg:not(svg + svg) path": {
    fill: (theme: any) => theme.palette.primary.light
  },
  "& input:checked + span svg path": {
    fill: (theme: any) => theme.palette.primary.light
  },
  "& span": {
    fontSize: "15px",
    lineHeight: "17px",
    fontWeight: 400,
    color: (theme: any) => theme.palette.text.primary
  },
  "& input": {
    "& + span": {
      background: "transparent",
      border: "0px",
      mr: "4px",
      boxShadow: "0 0 0 1px #465670",
      minWidth: "19px"
    },
    "&:checked + span": {
      background: (theme: any) => theme.palette.primary.light
    }
  }
}

export const quilEditorStyle = {
  "& .quill": {
    border: (theme: any) => `1px solid ${theme.palette.border.input}`
  },
  "& .ql-container": {
    minHeight: "80px"
  },
  "& .ql-toolbar": {
    borderBottom: (theme: any) => `1px solid ${theme.palette.border.input}`,
    "& .ql-picker-label": {
      color: (theme: any) => theme.palette.border.input
    },
    "& :is(.ql-stroke,.ql-fill)": {
      stroke: (theme: any) => `${theme.palette.text.secondary} !important`
    },
    "& button": {
      borderRadius: "4px",
      mr: "2px",
      "&.ql-active": {
        background: (theme: any) => theme.palette.primary.light,
        "& svg :is(path,line)": {
          stroke: (theme: any) => `${theme.palette.text.buttonText} !important`
        }
      }
    }
  }
}

export const commonRadioStyle = {
  pl: "0px",
  "& svg:not(svg + svg)": {
    fill: (theme: any) => theme.palette.primary.light,
    height: "30px",
    width: "30px"
  },
  "& input:checked + span svg": {
    fill: (theme: any) => theme.palette.primary.light,
    height: "30px",
    width: "30px"
  }
}

export const commonAutocompleteStyle = {
  [`& .MuiAutocomplete-inputRoot`]: {
    padding: "5px 10px",
    borderRadius: "4px",
    minHeight: "46px"
  },
  "& fieldset": {
    border: `1px solid #AFAFAF !important`
  },
  "& button svg path": {
    stroke: (theme: any) => theme.palette.text.primary
  },
  [`& .MuiAutocomplete-inputRoot:has(input:disabled)`]: {
    background: (theme: any) =>
      `${theme.palette.secondary.disableFieldColor} !important`
  },
  [`& .MuiAutocomplete-inputRoot:has(input:disabled) .MuiAutocomplete-endAdornment`]:
    {
      opacity: 0
    }
}
export const calenderTextField = {
  "& :is(input,textarea)": {
    fontSize: "14px",
    lineHeight: "22px",
    p: "12px 16px 12px 16px",
    "& fieldset": {
      border: (theme: any) =>
        `1px solid ${theme.palette.border.input} !important`
    }
  },
  "& fieldset": {
    p: "12px 16px 12px 16px",
    border: (theme: any) =>
      `1px solid ${theme.palette.border.input} !important`,
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: 400,
    borderRadius: "4px !important",
    background: "transparent"
  },
  "& input:hover + fieldset,& input:active + fieldset,& input:focus + fieldset":
    {
      border: "1px solid  rgba(115, 138, 150, 0.5)  !important"
    },
  "& .MuiInputBase-root": {
    borderRadius: "4px"
  },
  "& .Mui-error": {
    marginLeft: "0px"
  },
  "& input:disabled + fieldset": {
    border: "0px !important",
    background: "transparent"
  },
  "& .Mui-disabled input": {
    background: (theme: any) =>
      `${theme.palette.secondary.disableFieldColor} !important`,
    border: (theme: any) =>
      `${theme.palette.secondary.disableFieldColor} !important`,
    borderRadius: "5px",
    minHeight: "22px"
  },
  "& .MuiOutlinedInput-root": {
    minHeight: "46px"
  }
}

export const checkboxLabelStyle = {
  pl: "5px",
  mb: "10px",
  "& .MuiFormControlLabel-label": {
    padding: "0",
    color: (theme: any) => theme.palette.secondary.fieldText,
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "17px",
    ml: "5px"
  }
}
export const outerHtmlStyle = {
  fontSize: "15px",
  lineHeight: "17px",
  "& > div *": {
    margin: "20px 0px",
    "& .ck-content": {
      "& ul li": {
        color: (theme: any) => theme.palette.text.primary
      }
    }
  },
  "& figure": {
    margin: "0px !important"
  },
  "& table": {
    borderCollapse: "collapse",
    backgroundColor: (theme: any) =>
      theme.palette.mode === "light"
        ? "#D8D8D8 !important"
        : "#D8D8D8 !important",
    "& td": {
      border: "1px solid #ADB5BD",
      padding: "12px 40px !important",
      backgroundColor: (theme: any) =>
        theme.palette.mode === "light"
          ? "#D8D8D8 !important"
          : "#D8D8D8 !important",
      color: "#444B4E"
    },
    "& th": {
      color: "#444B4E"
    }
  },
  "& h6": {
    fontSize: "14px",
    lineHeight: "16.4px",
    fontWeight: 500,
    color: (theme: any) => theme.palette.text.primary,
    m: "0px"
  },
  "& time": {
    fontSize: "12px",
    lineHeight: "14.4px",
    fontWeight: 400,
    color: (theme: any) => theme.palette.text.primary,
    m: "0px"
  },
  "& p": {
    fontSize: "14px",
    lineHeight: "16.4px",
    fontWeight: 400,
    color: (theme: any) => theme.palette.text.primary,
    m: "10px 0px 0px 0px"
  }
}

export const rangePickerStyle = {
  "& div:has(>ul.MuiList-root.MuiList-padding.modernize-h4y409-MuiList-root)": {
    display: "none"
  },
  "& :is(.MuiGrid-root,.MuiPaper-root)": {
    background: (theme: any) => theme.palette.background.light,
    "&:has(>ul)": {
      // display: "none",
      "& ~ div": {
        "& > div:first-child": {
          display: "none"
        }
      }
    }
  },
  "& .MuiBox-root": {
    borderRadius: "0px",
    "&.modernize-org7aw": {
      borderRadius: "50% 0 0 50%",
      "& button": {
        background: (theme: any) => theme.palette.primary.main
      }
    },
    "&.modernize-jzp2cr": {
      borderRadius: "0 50% 50% 0",
      "& button": {
        background: (theme: any) => theme.palette.primary.main
      }
    },
    "&:is(.modernize-org7aw,.modernize-jzp2cr,.modernize-syqqmv)": {
      background: "#F9FAFB",
      "& p": {
        color: "#000"
      }
    }
  },
  "& .MuiSelect-select": {
    fontWeight: 600,
    color: (theme: any) => theme.palette.primary.light
  },
  "& .MuiInput-underline": {
    "&:before": {
      display: "none"
    }
  },
  "& .MuiGrid-root.modernize-rfnosa:first-of-type": {
    display: "none"
  },
  "& .MuiGrid-container": {
    // "& :is(.modernize-1jrucrm,.modernize-15lo3ef,.modernize-1nrkvhc)": {
    "& :is(.modernize-1jrucrm,.modernize-1nrkvhc)": {
      background: "#F9FAFB",
      borderRadius: "0px",
      "& button.MuiIconButton-root": {
        backgroundColor: "#044F90",
        color: "#fff",
        "& p": {
          color: "#fff"
        },
        "&:hover": {
          backgroundColor: "#044F90",
          color: "#fff",
          "& p": {
            color: "#fff"
          }
        }
      }
    },
    "& span": {
      fontSize: "16px",
      fontWeight: 500,
      color: (theme: any) => theme.palette.text.primary
    },
    // "& .modernize-15lo3ef": {
    //   background: "transparent",
    // },
    "& .modernize-1sn9ku4": {
      background: "#f9fafb"
    },
    "& button": {
      "& p": {
        fontSize: "16px",
        color: (theme: any) => theme.palette.text.primary
      },
      "&.modernize-km9o6u-MuiButtonBase-root-MuiIconButton-root": {
        borderColor: (theme: any) => theme.palette.primary.main
      },
      "&.modernize-1eas6yo-MuiButtonBase-root-MuiIconButton-root,&.modernize-ubin4d-MuiButtonBase-root-MuiIconButton-root":
        {
          background: (theme: any) => theme.palette.primary.main,
          borderColor: (theme: any) => theme.palette.primary.main,
          "& p": {
            color: (theme: any) => theme.palette.text.buttonText
          },
          "&:hover": {
            background: (theme: any) =>
              `${theme.palette.primary.main} !important`,
            borderColor: (theme: any) =>
              `${theme.palette.primary.main} !important`,
            "& p": {
              color: (theme: any) =>
                `${theme.palette.text.buttonText} !important`
            }
          }
        },
      "&.modernize-47xqb4-MuiButtonBase-root-MuiIconButton-root": {
        // backgroundColor: "#044F90",
        // color: "#fff",
        "& p": {
          fontSize: "16px"
          // color: "#fff",
        }
      },
      "& p.MuiTypography-root.MuiTypography-body2.modernize-o2kjmz-MuiTypography-root":
        {
          color: "#fff"
        }
    }
  },
  "& .MuiPopover-paper": {
    maxHeight: "256px"
  }
}

export const commonAccordionStyle = {
  borderRadius: "6px",
  boxShadow: "none",
  mt: "30px",
  background: (theme: any) => theme.palette.background.light,
  border: `1px solid ${(theme: any) =>
    theme.palette.mode === "dark" ? "#738A9633" : "#738A9633"}`,
  "&:before": {
    display: "none"
  }
}

export const commonAccordionSummaryStyle = {
  color: (theme: any) =>
    theme.palette.mode === "light" ? "#242731" : "#D8D8D8",
  fontSize: "21px",
  p: "20px 30px",

  "& .MuiAccordionSummary-content": {
    m: "0px !important",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  "& svg": {
    transform: "rotate(180deg)"
  },
  "& .MuiAccordionSummary-expandIconWrapper svg path": {
    fill: (theme: any) => theme.palette.primary.main
  }
}

export const commonAccordionDetailsStyle = {
  borderTop: (theme: any) =>
    `1px solid ${theme.palette.mode === "dark" ? "#738A9633" : "#E6E6E6"}`,
  p: "20px 30px"
}

export const stickyColStyle = {
  background: (theme: any) =>
    theme.palette.mode === "light" ? "#fff" : "#232527"
}

export const primaryButtonOther = {
  p: "11px 18px",
  background: "transparent",
  color: "#02376D",
  border: "1px solid #02376D",
  borderRadius: "5px",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  "&:hover": {
    background: "transparent",
    color: "#02376D",
    border: "1px solid #02376D"
  }
}
export const secondaryButtonOther = {
  p: "11px 18px",
  background: "transparent",
  color: "#02376D",
  border: "1px solid #02376D",
  borderRadius: "5px",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  "&:hover": {
    background: "transparent",
    color: "#02376D",
    border: "1px solid #02376D"
  }
}

export const stickyTableHeaderContainerStyle = {
  // maxHeight: {lg:"calc(100vh - 400px)",xs:"calc(100vh - 500px)"},
  minHeight: "108px"
}

export const commonDatepickerStyle = {
  "& .MuiPaper-root": {
    backgroundColor: (theme: any) => theme.palette.background.light,
    borderRadius: "6px"
  },
  "& button": {
    "&:is(.Mui-selected,.Mui-selected:hover,:hover,:active)": {
      backgroundColor: (theme: any) => theme.palette.primary.main,
      color: (theme: any) => theme.palette.text.buttonText
    }
  }
}
export const commonTableFieldtext = {
  fontSize: "0.875rem",
  lineHeight: "0.0em",
  color: (theme: any) => theme.palette.text.primary,
  fontWeight: 400
}
