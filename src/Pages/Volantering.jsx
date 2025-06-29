import Flutterbar from "../Components/Volanteringcomponent/Flutterbar";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import HomeCards from "../Components/Volanteringcomponent/VolanteringCards";

export default function Volantering() {
  return (
    <>
      <div className="homepage  ">
        <div className="home-container w-[90%]  mx-auto">
          <div className="page-info pt-[40px] pb-[20px] px-3 ">
            <span className="font-bold text-xl">الصفحه الرئيسية/</span>
            <span className="text-xl">تطوع الان</span>
          </div>
          <div className="search-bar">
            <h2 className=" font-bold text-2xl px-3 pb-[20px]">البحث</h2>
            <Flutterbar />
          </div>

          {/* end of home-container */}
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const response = await fetch("/api/Opportunities");
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ messge: "could not fetch opportyes" }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
