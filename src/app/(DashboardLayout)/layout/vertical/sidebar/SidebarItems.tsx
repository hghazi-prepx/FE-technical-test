import {
  LatestMenuItems,
  MenuitemsType,
  // Menuitems
  // MenuitemsALL,
  // MenuitemsStationManager,
} from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "@/store/hooks";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { AppState } from "@/store/store";
import { toggleMobileSidebar } from "@/store/customizer/CustomizerSlice";
// Removed authentication import
import { uniqueId } from "lodash";
import { useEffect, useState } from "react";
// Removed RolePermissions import - authentication removed
import { IconDashboard } from "@tabler/icons-react";
const SidebarItems = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  // Authentication removed - show all menu items
  const userType = "admin";
  const roleId = 1;

  // let parsedResponse: any; // Adjust the type as needed based on your JSON structure

  /* try {
    if (localPermission) {
      parsedResponse = localPermission;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  } */

  // const roleBaseMenu = LatestMenuItems ;

  const LatestMenuNewArray: any = [];
  const processedMainFields = new Map();

  // console.log('parsedResponse?.RolePermissions : ',parsedResponse?.RolePermissions);
  // console.log('LatestMenuItems : ',LatestMenuItems);

  // const AdminMenu: number[] = [1, 5, 7, 8, 22, 24, 27, 28, 55, 47, 48];

  // localPermission?.forEach((item: any) => {
  //   //console.log("RolePermissions | item : ", item);
  //   LatestMenuItems?.forEach((menu) => {
  //     // if (roleId == 6 && Number(menu.id) === 32) {
  //     //   return;
  //     // }
  //     // if (roleId == 6 && Number(menu.id) === 1) {
  //     //   return;
  //     // }
  //     // if (roleId != 6 && Number(menu.id) === 56) {
  //     //   return;
  //     // }
  //     // if (roleId == 3 && AdminMenu.includes(Number(menu.id))) {
  //     //   return;
  //     // }
  //     // console.log('LatestMenuItems | menu.code : ',menu.code);
  //     // console.log('LatestMenuItems | item.MenuCode : ',item.MenuCode);
  //     // console.log('LatestMenuItems | menu.children : ',menu.children);
  //     const matchFound =
  //       item.Permission.includes("Menu") &&
  //       (menu.code === item.MenuCode ||
  //         (menu.children &&
  //           menu.children.some((child) => child.code === item.MenuCode)));

  //     if (matchFound) {
  //       // console.log('LatestMenuItems | processedMainFields has menu title : ',processedMainFields.has(menu.title));

  //       if (!processedMainFields.has(menu.title)) {
  //         const newItem: any = {
  //           id: uniqueId(),
  //           title: menu.title,
  //           icon: menu.icon,
  //           href: menu.href,
  //           orderNumber: menu.orderNumber,
  //           children: [],
  //         };

  //         // console.log('LatestMenuItems | 81 menu.children : ',menu.children);

  //         if (menu.children) {
  //           newItem.children = menu.children.filter(
  //             (child) =>
  //               child.code == item.MenuCode && child.code == item.MenuCode
  //           );
  //         }

  //         LatestMenuNewArray.push(newItem);
  //         processedMainFields.set(menu.title, true);
  //       } else {
  //         const existingItem = LatestMenuNewArray.find(
  //           (existing: any) => existing.title == menu.title
  //         );

  //         // console.log('LatestMenuItems | existingItem : ',existingItem);
  //         // console.log('LatestMenuItems | 93 menu.children : ',menu.children);

  //         if (existingItem && menu.children) {
  //           existingItem.children.push(
  //             ...menu.children.filter((child) => child.code == item.MenuCode)
  //           );
  //         }
  //       }
  //     }
  //     // console.log("====================================");
  //   });
  // });

  // Sort LatestMenuNewArray by orderNumber
  LatestMenuNewArray.sort((a: any, b: any) => {
    const orderNumberA = a.orderNumber || 0;
    const orderNumberB = b.orderNumber || 0;
    return orderNumberA - orderNumberB;
  });

  // console.log('LatestMenuNewArray : ',LatestMenuNewArray);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme.palette.mode === "dark");
    document.body.classList.toggle(
      "light-mode",
      theme.palette.mode === "light"
    );
  }, [theme]);
  return (
    <Box sx={{ px: 2 }} borderRadius={0}>
      <List sx={{ pt: 4 }} className="sidebarNav">
        {LatestMenuItems?.map((item: MenuitemsType) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={item.onClick}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
