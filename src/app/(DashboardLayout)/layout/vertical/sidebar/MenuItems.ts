import { uniqueId } from "lodash";

export interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
  onClick?: () => void;
}
import { IconFile, IconNotebook } from "@tabler/icons-react";
import { useExamWizardStore } from "@/store/useExamWizardSteps";

export const LatestMenuItems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Exam Management",
    icon: IconFile,
    href: "/Exam-Management",
    code: "exam-management",
    orderNumber: 2,
  },
  {
    id: uniqueId(),
    title: "Create Exam",
    icon: IconNotebook,
    href: "/acj-exam",
    code: "create-exam",
    onClick: () => {
      // ✅ reset the wizard state
      useExamWizardStore.getState().reset();
    },
    orderNumber: 1,
  },
];
