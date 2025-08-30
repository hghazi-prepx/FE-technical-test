import React, { useState } from "react";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as yup from "yup";
// Removed useDataContext import
import { IconEyeOff } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import CustomOutlinedInput from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomOutlinedInput";
import { useTheme } from "@mui/material/styles";
import fetchApi from "../../../utils/apiCall/index";
import { height } from "@mui/system";
import Image from "next/image";
export const APIURL = process.env.NEXT_PUBLIC_API_URL;

const validationSchema = yup.object({
  UserName: yup.string().required("UserName is Required"),
  UserPassword: yup.mixed().required("Password is required"),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  // Removed hostName context - no longer needed
  const [errormsg, setErrormsg] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      UserPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // Removed hostName check - using default UserType
      let UserType = 3;
      const repsignin = await signIn("credentials", {
        UserName: values.UserName,
        UserPassword: values.UserPassword,
        redirect: false,
        UserType: 3,
      });
      // console.log("AuthLogin | repsignin : ", repsignin);
      if (repsignin?.ok) {
        // console.log("AuthLogin | repsignin1111 : ", repsignin);
        window.localStorage.setItem("manualLogin", "true");
        // Get Role Based Permisssion and Store in localstorage
        await fetchApi(`${APIURL}user/getRoleBasedPermission`, "GET")
          .then(async (response: any) => {
            // console.log("getRoleBasedPermission : ", response);
            if (response.success) {
              window.localStorage.setItem(
                "RolePermissions",
                JSON.stringify(response.data?.RolePermissions)
              );
              window.localStorage.setItem(
                "DashboardPermission",
                JSON.stringify(response.data?.Dashboard)
              );

              setSuccessmsg("Login successful");
              const session = await getSession();
              const loginRoleID: any = (
                session?.user?.name as { RoleID?: string }
              )?.RoleID;
              const isPasswordUpdated: number | undefined = (
                session?.user?.name as { ispasswordupdated?: number }
              )?.ispasswordupdated;

              if (isPasswordUpdated !== undefined && isPasswordUpdated == 0) {
                router.push("/update-password");
              } else if (loginRoleID === 3 || loginRoleID === 2) {
                // router.push("/dashboard");
                window.location.href = "/Exam-Management";
              } else {
                // router.push("/");
                window.location.href = "/Exam-Management";
              }
            }
          })
          .catch((error) => {
            console.log("Error in getRoleBasedPermission : ", error);
            setLoading(false);
            setErrormsg("Invalid username or password");
          });
      } else {
        setLoading(false);
        setErrormsg("Invalid username or password");
      }

      setTimeout(() => {
        setSuccessmsg("");
        setErrormsg("");
      }, 3000);
    },
  });

  const LinkStyled = styled(Link)(() => ({
    color: "#02376D",
    fontWeight: 500,
    "&:hover": {
      color: "#02376D",
      textDecoration: "underline",
    },
  }));

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack mb={"48px"} display={{ xs: "flex", lg: "none" }}>
        <Image src="/images/prepx-logo.svg" height={40} width={139} alt="" />
      </Stack>
      {title ? (
        <Typography variant="h1" color="#000000" mb={"8px"}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Stack>
        <Box>
          <Typography variant="body1" color={"#4F595F"} mb={"32px"}>
            Enter your details to Sign in
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color={"#fa896b"}
            fontWeight={400}
            fontSize={{ xs: "12px", lg: "15px" }}
            mb={{ xs: "10px", lg: "15px" }}
          >
            {errormsg}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={"#046104"}
            fontWeight={400}
            fontSize={{ xs: "12px", lg: "15px" }}
            mb={{ xs: "10px", lg: "15px" }}
          >
            {successmsg}
          </Typography>
          <Typography
            color={"#2D363E"}
            variant="paragraph3"
            component={"p"}
            sx={{
              marginTop: 0,
              mb: "8px",
            }}
          >
            Email:
          </Typography>
          <CustomTextField
            id="UserName"
            variant="outlined"
            fullWidth
            //onChange={handleUsernameChange}
            onChange={formik.handleChange}
            error={formik.touched.UserName && Boolean(formik.errors.UserName)}
            helperText={formik.touched.UserName && formik.errors.UserName}
            sx={{
              "& input": {
                color: "#6E7B82",
                textFillColor: "#2F2F2F",
              },
              [`&.MuiFormControl-root .MuiInputBase-root .MuiOutlinedInput-notchedOutline`]:
              {
                borderWidth: "1px",
              },
              [`&.MuiFormControl-root .Mui-error .MuiOutlinedInput-notchedOutline`]:
              {
                color: "#FC4B6C",
                borderColor: "#AFAFAF",
              },
              [`&.MuiFormControl-root .MuiFormHelperText-root.Mui-error`]: {
                color: "#FC4B6C",
                marginLeft: "0",
              },
            }}
          />
        </Box>
        <Box mt={"32px"}>
          <Typography
            color={"#2D363E"}
            variant="paragraph3"
            component={"p"}
            sx={{
              marginTop: 0,
              mb: "8px",
            }}
          >
            Password :
          </Typography>
          <CustomOutlinedInput
            id="UserPassword"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            //onChange={handlepasswordChange}
            onChange={formik.handleChange}
            error={
              formik.touched.UserPassword && Boolean(formik.errors.UserPassword)
            }
            helperText={
              formik.touched.UserPassword && formik.errors.UserPassword
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{
                    color: formik.errors.UserPassword ? "#FC4B6C" : "",
                    "& svg path": {
                      stroke: "#777777",
                    },
                  }}
                >
                  {showPassword ? (
                    <IconEye size="20" />
                  ) : (
                    <IconEyeOff size="20" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              [`&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline`]: {
                borderWidth: "1px",
                borderRadius: "4px",
              },
              [`&.Mui-error .MuiOutlinedInput-notchedOutline`]: {
                borderColor: "#FC4B6C",
              },
              "& input": {
                color: "#2F2F2F",
                textFillColor: "#2F2F2F",
              },
              "&:hover fieldset": {
                borderColor: "1px solid  rgba(115, 138, 150, 0.5)  !important",
                borderRadius: "4px",
              },
            }}
          />
        </Box>
        {formik.touched.UserPassword && formik.errors.UserPassword ? (
          <Box color={"#FC4B6C"} fontSize={"12px"}>
            {formik.errors.UserPassword}
          </Box>
        ) : null}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        ></Stack>
      </Stack>
      <Box textAlign="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{
              marginTop: 0,
              bgcolor: "#02376D",
              color: "#fff",
              fontWeight: 500,
              borderRadius: "5px",
              fontSize: "15px",
              lineHeight: "17.6px",
              boxShadow: "none",
              p: "9px 16px",
              "&:hover": {
                bgcolor: "#02376D",
                boxShadow: "none",
              },
            }}
          >
            Login
          </Button>
        )}
      </Box>
      {/* <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{
          marginTop: "24px",
          bgcolor: "#FFF",
          color: "#02376D",
          border: "1px solid #02376D",
          fontWeight: 500,
          borderRadius: "5px",
          fontSize: "15px",
          lineHeight: "17.6px",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#FFF",
            color: "#02376D",
            boxShadow: "none",
          },
        }}
      >
        Sign Up
      </Button> */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="500"
        mt={{ xs: 3, lg: "32px" }}
      >
        <LinkStyled
          href="/forgot-password"
          color="#02376D"
          sx={{
            textDecoration: "underline",
            fontSize: "15px",
            lineHeight: "17.6px",
          }}
        >
          Forgot Password?
        </LinkStyled>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
