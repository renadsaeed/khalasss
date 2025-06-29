import { Link } from "react-router-dom";
import Logo from "../../assets/d13798d6-b167-4cf9-8e79-d7a3eb2f3315.jfif";
import { IoCloseSharp } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { SidebarData } from "./SidbarData";
import { IconContext } from "react-icons";
import { CiUser } from "react-icons/ci";
// import Login from "../Login/Loginpage";
// import Singup from "../pages/Singup";
import "./Sidebar.css";
export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div
        className={`overlay ${sidebar ? "active" : ""}`}
        onClick={showSidebar}
      ></div>

      <div className="  navbar bg-[#FFFFFF] shadow-xs flex justify-between items-center p-2">
        <div className="logo-con   flex items-center text-lg ">
          <img
            className=" w-[80px]  h-[80px] rounded-full shadow-xs "
            src={Logo}
            alt="Logo"
          />
          <p className="self-center text-xl pb-[5px] ">وصل الخير</p>
        </div>

        <div className="nav-bar">
          <Link to="#" className="meanu-bars text-4xl ">
            <HiBars3 onClick={showSidebar} />
          </Link>
        </div>
      </div>

      <nav
        className={
          sidebar
            ? "fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 p-5 transform transition-transform duration-300 translate-x-0 "
            : "fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 p-5 transform transition-transform duration-300 -translate-x-full"
        }
      >
        <ul className="meanu-nav-items" onClick={showSidebar}>
          <li className="nav-bar-toggle">
            <div className="flex justify-between w-[100%]">
              <Link to="#" className="meanu-bars  ">
                <div className="flex justify-end relative  w-[100%]">
                  <IoCloseSharp className="text-4xl ml-auto text-[#214570]  " />
                </div>
              </Link>
              <Link
                to="/UserProfileModern"
                className="nav-links-mobile  lg:text-lg"
              >
                <div className="  ">
                  <p className=" ml-[6px] w-[50px] bg-[#0D8F75] border-none outline-0 rounded-md flex justify-center ">
                    <CiUser className="inline-block user-i  text-3xl text-[#FFFFFF]   " />
                  </p>
                </div>
              </Link>
            </div>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                  <div className="icon-con text-[#214570] ">{item.icon}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
