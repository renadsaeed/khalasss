import { FaHome } from "react-icons/fa";
import { FaBuildingWheat } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { MdOutlineVolunteerActivism } from "react-icons/md";
export const SidebarData = [
  {
    title: "الرئيسية",
    path: "/",
    icon: <FaHome className="icon" />,
    cName: "nav-text",
  },
  {
    title: "الجمعيات",
    path: "/Organization",
    icon: <FaBuildingWheat className="icon" />,
    cName: "nav-text association",
  },
  {
    title: "خدمات",
    path: "/Services",
    icon: <FaHandsHelping className="icon" />,
    cName: "nav-text",
  },
  {
    title: "تبرع",
    path: "/Donate",
    icon: <IoCardOutline className="icon" />,
    cName: "nav-text",
  },
  {
    title: "تطوع",
    path: "/Volunteering",
    icon: <MdOutlineVolunteerActivism className="icon" />,
    cName: "nav-text",
  },
];
