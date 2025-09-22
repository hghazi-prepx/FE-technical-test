import React from "react";
import Link from "next/link";

// mui imports
import {
  ListItemIcon,
  List,
  styled,
  ListItemText,
  Chip,
  useTheme,
  Typography,
  ListItemButton,
  useMediaQuery,
  Theme,
  Tooltip,
} from "@mui/material";
import { useSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { AppState } from "@/store/store";
import { fontSize, lineHeight } from "@mui/system";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: () => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect?: string;
}

export default function NavItem({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}: ItemType) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const customizer = useSelector((state: AppState) => state.customizer);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon = level > 1 ? "" : <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 12px",
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: level > 1 ? "transparent !important" : "inherit",

    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.secondary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: level > 1 ? `${theme.palette.secondary.main}!important` : "#FFF",
    },
    "&.Mui-selected,&.active-tab": {
      color: theme.palette.mode === "light" ? "black" : "#000",
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
      },
    },
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
      lineHeight: "1.0125rem",
      fontWeight: level > 1 ? 400 : 500,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));

  const listItemProps: {
    component: any;
    href?: string;
    target?: any;
    to?: any;
  } = {
    component: item?.external ? "a" : Link,
    to: item?.href,
    href: item?.external ? item?.href : "",
    target: item?.external ? "_blank" : "",
  };

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href}>
        <ListItemStyled
          // {...listItemProps}
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color:
                level > 1 && pathDirect === item?.href
                  ? `${theme.palette.secondary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? "" : <>{t(`${item?.title}`)}</>}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">
                {hideMenu ? "" : item?.subtitle}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>
          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}
