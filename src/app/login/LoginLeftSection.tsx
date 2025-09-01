"use client";

import { Grid, Box, Stack, Typography, CircularProgress } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthLogo from "@/app/(DashboardLayout)/layout/shared/logo/AuthLogo";
import AuthLogin from "../auth/authForms/AuthLogin";
import Image from "next/image";

export default function LoginLeftSection() {
  return (
    <Grid item xs={12} sm={12} lg={6} xl={6} sx={{
      display:{xs:"none",lg:"block"}
    }}>
      <Box
        position="relative"
        sx={{
          bgcolor: "#02376D",
          borderRadius: "0px",
        }}
      >
        <Box px={3}>
          <AuthLogo />
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          height={"100vh"}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <Box p={4} position={"absolute"}>
            <Image
              src={"/images/big/prepxlogobigwhite.svg"}
              height={143}
              width={377}
              alt=""
            />
          </Box>
          <Image
            src={"/images/login/login-image.png"}
            alt="bg"
            width={660}
            height={760}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
}
