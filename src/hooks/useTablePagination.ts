import { useState, useCallback } from 'react';
import { PAGINATION } from '@/utils/Constants';

const { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } = PAGINATION;

export interface TablePaginationData {
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface TablePaginationActions {
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setTotalRecords: (totalRecords: number) => void;
  setTotalPages: (totalPages: number) => void;
  handlePagination: (newPage: number, newRowsPerPage: number) => void;
  resetPagination: () => void;
}

export const useTablePagination = (
  initialPage: number = DEFAULT_PAGE,
  initialRowsPerPage: number = DEFAULT_ROWS_PER_PAGE
): TablePaginationData & TablePaginationActions => {
  const [page, setPage] = useState<number>(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handlePagination = useCallback((newPage: number, newRowsPerPage: number) => {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(DEFAULT_PAGE);
    setRowsPerPage(DEFAULT_ROWS_PER_PAGE);
    setTotalRecords(0);
    setTotalPages(0);
  }, []);

  return {
    page,
    rowsPerPage,
    totalRecords,
    totalPages,
    setPage,
    setRowsPerPage,
    setTotalRecords,
    setTotalPages,
    handlePagination,
    resetPagination,
  };
};
