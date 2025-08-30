import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React from "react";
import { DownArrowIcon, ThrashIconNew, CopyIcon } from "../Icons";
// Removed useSession import
interface DropdownTableHeaderActionProps {
  enable?: boolean;
  handleDelete?: () => void;
  handleDuplicate?: () => void;
  length?: number;
  text?: any;
  duplicateEnable?: any
}
const DropdownTableHeaderAction: React.FC<DropdownTableHeaderActionProps> = ({
  enable,
  handleDelete,
  handleDuplicate,
  length,
  text,
  duplicateEnable
}) => {
  const theme = useTheme();
  // Removed useSession - authentication removed
  const loginRoleID = 1;
  const [anchorElAction, setAnchorElAction] =
    React.useState<null | HTMLElement>(null);
  const openActionDropdown = Boolean(anchorElAction);
  const handleClickActionDropdown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElAction(event.currentTarget);
  };
  const handleCloseActionDropdown = () => {
    setAnchorElAction(null);
  };
  return (
    <>
      <Button
        disabled={!enable}
        sx={{
          p: "0px",
          background: "transparent",
          width: "auto",
          minWidth: "auto",
          "&:hover": {
            background: "transparent",
          },
          "& svg path": {
            fill: theme.palette.mode === "light" ? "#000" : "#fff",
          },
          "&:disabled": {
            "& svg": {
              opacity: 0.4,
            },
          },
        }}
        onClick={handleClickActionDropdown}
      >
        <DownArrowIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElAction}
        open={openActionDropdown}
        onClose={handleCloseActionDropdown}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "152px",
            borderRadius: "5px",
            border: (theme: any) =>
              `1px solid ${theme.palette.mode === "light" ? "#E6E6E6" : "transparent"
              }`,
            background: (theme: any) =>
              `${theme.palette.action.menu} !important`,
            boxShadow: "none",
          },
          "& .MuiMenuItem-root": {
            fontSize: "14px",
            lineHeight: 1,
            color: theme.palette.mode === "light" ? "#2A2E31" : "#99ABB4",
            fontWeight: 500,
            p: "9px 15px",
            "& svg path": {
              stroke: theme.palette.mode === "light" ? "#2A2E31" : "#99ABB4",
            },
            "&:hover": {
              "&:hover": {
                color: (theme: any) =>
                  `${theme.palette.primary.light} !important`,
                backgroundColor: (theme: any) => theme.palette.action.hoverMenu,
              },
              "& svg path": {
                stroke: (theme: any) => theme.palette.primary.light,
              },
            },
          },
          "& .MuiList-root": {
            py: "0px",
          },
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        {
          handleDelete && (
            <MenuItem
              disabled={length === 0 || loginRoleID === 1 || duplicateEnable}
              onClick={() => {
                handleDelete();
                handleCloseActionDropdown();
              }}
              sx={{
                "& svg": {
                  mr: "12px",
                },
              }}
            >
              <ThrashIconNew />
              {text ? text : 'Delete'}
            </MenuItem>
          )}
        {handleDuplicate && (
          <MenuItem
            disabled={length === 0}
            onClick={() => {
              handleDuplicate();
              handleCloseActionDropdown();
            }}
            sx={{
              "& svg": {
                mr: "12px",
              },
            }}
          >
            <CopyIcon />
            Duplicate
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DropdownTableHeaderAction;
