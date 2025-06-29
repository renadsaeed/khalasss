import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { IoFlag } from "react-icons/io5";

export default function VolanteringCards(props) {
  let monthName = "تاريخ غير متاح";
  try {
    if (props.startDate) {
      const date = new Date(props.startDate);
      if (!isNaN(date)) {
        monthName = date.toLocaleString("ar-EG", { month: "long" });
      }
    }
  } catch (error) {
    console.error("خطأ في التاريخ:", error);
  }
  return (
    <>
      <div
        key={props.key}
        className={`card shadow-md  pt-[10px] rounded-lg ${
          props.home ? `bg-white` : `bg-transprent`
        } `}
      >
        <div className=" flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-[5px]">{props.title}</h2>
          <img src={props.image} alt="img" className="w-[400px] h-[300px] " />
        </div>
        <div className="flex justify-between">
          <div className="  flex flex-col items-start">
            <div className="self-start pr-[15px]  ">
              <div className="time   pr-[2px] flex pt-[15px]">
                <FaRegCalendarAlt className="text-2xl ml-[12px] " />
                <p className="text-xl pr-[5px]">{monthName}</p>
              </div>
              <div className="location pr-[2px] flex pt-[10px]">
                <CiLocationOn className="text-2xl ml-[12px] " />
                <p className="text-xl pr-[5px]">{props.location}</p>
              </div>
              <div className="sets pr-[2px] flex pt-[10px]">
                <MdPersonSearch className="text-2xl ml-[12px] " />
                <p className="text-xl pr-[5px]">{props.seatsAvailable} مقعد</p>
              </div>
              <div className="type pr-[2px] flex pt-[10px] pb-[10px]">
                <IoFlag className="text-2xl ml-[12px]" />

                {props.type === "جمعيه" ? (
                  <Link
                    to="/Organization"
                    state={{
                      OfficialAuthority: props.OfficialAuthority,
                      name: props.name,
                    }}
                  >
                    {" "}
                    <p className="">{props.OfficialAuthority}</p>
                  </Link>
                ) : (
                  <p className="">{props.OfficialAuthority}</p>
                )}
              </div>
            </div>
          </div>
          <div className=" pl-[30px] text-4xl self-center ">
            <Link to={`/Volantering/${props.id}`}>
              <FaCircleArrowLeft className="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
VolanteringCards.propTypes = {
  key: PropTypes.any,
  home: PropTypes.bool,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  seatsAvailable: PropTypes.string.isRequired,
  OfficialAuthority: PropTypes.string.isRequired,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
