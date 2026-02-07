"use client";
import { styled, Container, Box, useTheme, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Customizer from "./layout/shared/customizer/Customizer";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import ToastProvider from "../toasterProvider";
import { PaginationProvider } from "../../utils/pagination/index";
import { usePathname, useRouter } from "next/navigation";

const MainWrapper = styled("div")(() => ({
  // display: "flex",
  // minHeight: "100vh",
  // width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  background: "transparent !important",
}));

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const currentPath = usePathname();
  // console.log(currentPath);
  useEffect(() => { }, []);
  const sxStyles = {
    background: theme.palette.mode === "light" ? "#FFF" : "#191b1d",
    pb: "0",
    ...(customizer.isHorizontal == false && {
      [theme.breakpoints.up("lg")]: {
        ml: `${customizer.SidebarWidth}px`,
      },
    }),
    ...(customizer.isCollapse && {
      [theme.breakpoints.up("lg")]: {
        ml: `${customizer.MiniSidebarWidth}px`,
      },
    }),
  };

  return (
    <PaginationProvider>
      <ToastProvider>
        <MainWrapper>
          <title>PrepX</title>

          <Header />
          <Sidebar />

          <PageWrapper
            className="page-wrapper"
            sx={
              currentPath !== "/student-view/in-person" &&
                !currentPath.startsWith("/situational-timer/") &&
                !currentPath.startsWith("/station-view") &&
                !currentPath.startsWith(
                  "/trainee-exam-view/student-transition"
                ) &&
                !currentPath.startsWith("/transition/thank-you")
                ? sxStyles
                : {}
            }
          >
            {/* PageContent */}
            <Container
              sx={{
                px: { lg: "64px !important", xs: "24px !important" },
                maxWidth:
                  currentPath.startsWith("/station-view") ||
                    currentPath === "/station-view"
                    ? "1480px !important"
                    : currentPath === "/student-view/in-person"
                      ? "1600px !important"
                      : "1600px !important",
              }}
            >
              {/* ------------------------------------------- */}
              {/* PageContent */}
              {/* ------------------------------------------- */}

              <Box
                sx={{
                  minHeight: `${currentPath === "/station-view"
                    ? "calc(100vh - 146px)"
                    : "calc(100vh - 175px)"
                    }`,
                }}
              >
                {/* <Outlet /> */}
                {children}
                {/* <Index /> */}
              </Box>

              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </Container>
            <Customizer />
            <Stack
              sx={{
                fontSize: "15px",
                color: theme.palette.secondary.fieldText,
                p: "20px",
                borderTop: "1px solid #738A9633",
                mt: "20px",
              }}
            >
              All rights reserved by Prep Doctors
            </Stack>
          </PageWrapper>
        </MainWrapper>
      </ToastProvider>
    </PaginationProvider>
  );
};

export default RootLayout;
