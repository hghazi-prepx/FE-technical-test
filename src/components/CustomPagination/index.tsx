import React, { memo, useState } from "react";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Pagination, Stack, Typography, useTheme } from "@mui/material";
import WithPaginationSelect from "./WithPaginationSelect";
import { PAGINATION } from "@/utils/Constants";
import { minHeight } from "@mui/system";

interface IHandlePagination {
  rowsPerPage: number;
  page: number;
}

interface CustomPaginationProps {
  align?: string;
  totalPageCount: number;
  currentPage: number;
  handlePagination: (values: IHandlePagination) => void;
  rowsPerPage: number;
  totalRecords: number;
}

const { DEFAULT_PAGE, DEFAULT_RECORDS, MIN_GOTO_VALUE } = PAGINATION;

const CustomTablePagination = ({
  align,
  totalPageCount = DEFAULT_RECORDS,
  currentPage = DEFAULT_PAGE,
  handlePagination,
  rowsPerPage,
  totalRecords = DEFAULT_RECORDS,
}: CustomPaginationProps): JSX.Element => {
  const theme = useTheme();
  const [page, setPage] = useState(currentPage || DEFAULT_PAGE);
  const [goto, setGoto] = useState("");
  const minValues = MIN_GOTO_VALUE;
  const maxValue = totalPageCount;

  const onGotoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      const numericValue = Math.max(minValues, Math.min(+value, maxValue));
      setPage(numericValue);
      setGoto(`${numericValue}`);
      handlePagination({ rowsPerPage, page: numericValue });
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setGoto("");
    setPage(value)
    handlePagination({ rowsPerPage, page: value  });
  };

  const handleOnBulkChange = (value: number) => {
    handlePagination({ rowsPerPage: value, page: DEFAULT_PAGE});
    setPage(DEFAULT_PAGE);
    setGoto("")
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      // borderTop={`1px solid ${theme.palette.secondary.borderColor}`}
      justifyContent={"flex-end"}
      p={"20px 18px 20px"}
      borderTop={"1px solid #738A9633"}
    >
      <Stack
        direction={"row"}
        gap={"10px"}
        alignItems={"center"}
        justifyContent={align === "end" ? "flex-end" : ""}
      >
        <Typography
          variant="body4"
          sx={{
            color: theme.palette.secondary.fieldText,
          }}
        >
          Total {totalRecords} items
        </Typography>

        <Pagination
          count={totalPageCount}
          page={page}
          onChange={handlePageChange}
          sx={{
            height: "31px",
            "& .MuiPagination-ul": {
              border: `1px solid ${
                theme.palette.mode === "light" ? "#DEE2E6" : "#DEE2E6"
              } !important`,
              width: "fit-content",
              display: "flex",
              alignItems: "stretch",
              borderRadius: "4px",
              "& > li:not(:last-of-type)": {
                borderRight: `1px solid ${
                  theme.palette.mode === "light" ? "#DEE2E6" : "#DEE2E6"
                }`,
              },
              "& > li": {
                height: "inherit",
                "& .MuiPaginationItem-ellipsis": {
                  marginTop: "2px",
                  color: theme.palette.secondary.fieldText,
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "21px",
                },
                "& button": {
                  margin: "0px",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: theme.palette.secondary.fieldText,
                  height: "31px",
                  textDecoration: "underline",
                  display: "flex",
                  borderRadius: "0px",
                  "&.Mui-selected": {
                    background: theme.palette.primary.main,
                    color: theme.palette.mode === "light" ? "#fff" : "#000",
                  },
                },
              },
            },
          }}
        />

        <WithPaginationSelect
          onChange={handleOnBulkChange}
          value={rowsPerPage}
        />

        <Typography
          variant="h4"
          sx={{
            fontSize: "14px",
            color: theme.palette.secondary.fieldText,
            fontWeight: 400,
          }}
        >
          Go to:
        </Typography>

        <CustomTextField
          id=""
          required
          minValues={1}
          maxValue={totalPageCount}
          type="text"
          value={goto}
          variant="outlined"
          fullWidth
          placeholder={""}
          onChange={(e: any) => setGoto(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              // Handle the event when Enter is pressed
              onGotoChange(e); // Call the function or set a new value
            }
          }}
          sx={{
            maxWidth: "50px",
            "& input": {
              p: "7px 14px",
              textAlign: "center",
            },
            "& .MuiInputBase-root": {
              borderRadius: "4px",
            },
            "& .MuiOutlinedInput-root": {
              minHeight: "34px",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default memo(CustomTablePagination);
