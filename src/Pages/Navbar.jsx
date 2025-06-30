import Logo from "../assets/newlogo.png";
import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import Volunteeringdropdown from "../Components/Navbar/Volunteeringdropdown";
import Servicesmenudrop from "../Components/Navbar/Servicesmenudrop";
import Searchbar from "../Components/Navbar/Searchbar";
import Sidebar from "../Components/sidebarr/Sidebar";

import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Components/Navbar/Navbar.css";
export default function Navbar() {
  const [dropdownVolunteering, setDropdownVolunteering] = useState(false);
  const [dropdownServices, setDropdownServices] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [location]); // 👈 كل ما يتغير المسار (يعني تسجيل دخول/خروج) هنحدث الرول

  const handelDropdownVolunteering = () =>
    setDropdownVolunteering(!dropdownVolunteering);
  const handelDropdownServices = () => setDropdownServices(!dropdownServices);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null); // للتأكيد فقط
    navigate("/");
  };

  return (
    <>
      {role !== "Charity" && (
        <div className="nav  h-[80px]  md:block  ">
          <div className="nav-con bg-[#FFFFFF]  h-[80px] grid xl:grid-cols-[250px_minmax(350px,1fr)_300px]  lg:grid-cols-[250px_minmax(300px,1fr)_200px] md:grid-cols-[150px_minmax(300px,1fr)_250px] shadow-xs   ">
            <div className="logo-con  flex items-center text-lg ">
              <img
                className=" md:w-[60px]   w-[80px] md:h-[60px] h-[80px] rounded-full shadow-xs "
                src={Logo}
                alt="Logo"
              />
              <p className="self-center lg:text-xl xl:text-xl ">وصل الخير</p>
            </div>
            {/* logo-con */}

            <div className="Links  flex justify-between">
              <ul className="flex items-center text-xl ">
                <li className=" lg:pr-[30px] md:pr-[20px] pad ">
                  <Link to="/">الرئيسية</Link>
                </li>
                <li className="lg:pr-[30px] pad md:pr-[15px] xl:pr-[80px]">
                  <Link to="/charity" className="nav-links">
                    الجمعيات
                  </Link>
                </li>

                <li className="lg:pr-[30px] md:pr-[15px] pad xl:pr-[80px] flex">
                  <Link to="/Help" className="nav-links">
                    المساعدات
                  </Link>
                  <p className="pr-[15px] self-center">
                    {" "}
                    <IoChevronDown
                      onClick={handelDropdownServices}
                      className="md:hidden lg:block"
                    />
                  </p>
                  {dropdownServices && (
                    <Servicesmenudrop className="md:hidden lg:block" />
                  )}
                </li>
                <li className="lg:pr-[40px] md:pr-[15px] xl:pr-[80px] pad">
                  <Link to="/Donation" className="nav-links">
                    التبرع
                  </Link>
                </li>
                <li className="lg:pr-[40px] md:pr-[15px] xl:pr-[80px] pad">
                  <Link to="/LostAndFoundPage" className="nav-links">
                    المفقودات
                  </Link>
                </li>

                <li className="lg:pr-[30px] md:pr-[15px]  lg:border-l-2 lg:pl-[40px] pad xl:border-none xl:pr-[80px] flex relative ">
                  <Link to="/Volantering" className="nav-links">
                    التطوع
                  </Link>
                  <p className="pr-[15px] self-center">
                    {" "}
                    <IoChevronDown
                      onClick={handelDropdownVolunteering}
                      className="md:hidden lg:block "
                    />
                  </p>
                  {dropdownVolunteering && (
                    <Volunteeringdropdown className="md:hidden lg:block " />
                  )}
                </li>
              </ul>
              <Searchbar />
            </div>

            {/* Links */}

            <div className="  sing-con flex text-xl xl:pr-[20px] lg:justify-around md:justify-end items-center">
              {role && (
                <Link to="/UserProfile" className="nav-links-mobile lg:text-lg">
                  <p className="ic sm:hidden md:block md:ml-[15px] bg-[#0D8F75] w-[50px] rounded-md flex justify-center pr-[9px] ">
                    <CiUser className="inline-block text-3xl text-[#FFFFFF]" />
                  </p>
                </Link>
              )}
              {role ? (
                <Link
                  onClick={onLogout}
                  className="nav-links-mobile lg:text-lg"
                >
                  تسجيل الخروج
                </Link>
              ) : (
                <Link to="/login" className="nav-links-mobile lg:text-lg">
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
          {/* nav-con */}
        </div>
      )}

      {role === "Charity" && (
        <div className="nav h-[80px]  bg-[#FFFFFF] shadow-xs ">
          <div className="nav-con h-full grid grid-cols-[1fr_auto] items-center px-6">
            <div className="logo-con pr-5 flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="w-[60px] h-[60px] rounded-full shadow"
              />
              <p className="ml-3 pr-6   lg:text-xl xl:text-2xl ">وصل الخير</p>
            </div>
            <div className="sing-con flex items-center text-xl">
              <Link onClick={onLogout} className="text-xl pr-9 text-[#0D8F75]">
                تسجيل الخروج
              </Link>
            </div>
          </div>
        </div>
      )}

      <Sidebar />
    </>
  );
}
