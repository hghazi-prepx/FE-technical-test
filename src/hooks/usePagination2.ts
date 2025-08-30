"use client";

import React, { useState } from "react";
import { debounce } from "lodash";
import { PAGINATION } from "@/utils/Constants";

const { DEFAULT_PAGE, DEFAULT_TOTAL_PAGE } = PAGINATION;

interface IHandlePagination {
  page: number;
  rowsPerPage: number;
}

interface IHandlePagination2 {
  page2: number;
  rowsPerPage2: number;
}

type PaginationState = {
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  page: number;
  setRowsPerPage2?: React.Dispatch<React.SetStateAction<number>>;
  setPage2?: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage2?: number;
  page2?: number;
  handlePagination: ({ page, rowsPerPage }: IHandlePagination) => void;
  handlePagination2?: ({ page2,rowsPerPage2 }: IHandlePagination2) => void;
};

const usePagination2 = (): PaginationState => {
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_TOTAL_PAGE);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage2, setRowsPerPage2] = useState(DEFAULT_TOTAL_PAGE);
  const [page2, setPage2] = useState(DEFAULT_PAGE);

  const handlePagination = debounce(
    ({ page, rowsPerPage }: IHandlePagination) => {
      setPage(page);
      setRowsPerPage(rowsPerPage);
    },
    200
  );
  const handlePagination2 = debounce(
    ({ page2, rowsPerPage2 }: IHandlePagination2) => {
      setPage2(page2 ? page2 : DEFAULT_PAGE);
      setRowsPerPage2(rowsPerPage2 ? rowsPerPage2 : DEFAULT_TOTAL_PAGE);
    },
    200
  );

  return { setRowsPerPage, setPage, rowsPerPage, page,rowsPerPage2, setRowsPerPage2, page2, setPage2, handlePagination,handlePagination2 };
};

export default usePagination2;
