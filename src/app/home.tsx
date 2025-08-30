"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "@/utils/theme/Theme";

import { Provider } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import { NextAppDirEmotionCacheProvider } from "@/utils/theme/EmotionCache";
// Removed Gethostname import
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "@/utils/i18n";
// Removed PermissionProvider
import { PaginationProvider } from "@/utils/pagination";
const MyApp = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeSettings();


  return (
    <>
      <NextTopLoader color="#A5DAD1" />
      <NextAppDirEmotionCacheProvider options={{ key: "modernize" }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <PaginationProvider>{children}</PaginationProvider>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyApp children={children} />
      </PersistGate>
    </Provider>
  );
};

export default Home;
