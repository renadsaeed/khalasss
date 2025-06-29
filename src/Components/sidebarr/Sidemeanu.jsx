import { Link } from "react-router-dom";
import Logo from "../assets/d13798d6-b167-4cf9-8e79-d7a3eb2f3315.jfif";
import { IoCloseSharp } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";

export default function Sidemeanu() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="nav-con bg-[#FFFFFF] shadow-xs flex justify-between items-center p-2">
        <div className="logo-con md:hidden  flex items-center text-lg ">
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
        <nav className={sidebar ? "manu-nav active" : "meanu-nav"}>
          <ul className="meanu-nav-items">
            <li className="nav-bar-toggle">
              <link to="#" className="meanu-bars">
                <IoCloseSharp />
              </link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
