import { useRef } from "react";
import { categories, initialData } from "./HelpsData";
import { AiOutlineClose } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

export default function Deatailspage({
  key,
  src,
  details,
  title,
  userimage,
  adress,
  category,
  rest,
}) {
  return (
    <div
      key={key}
      className={`details-modal w-full max-w-lg mx-auto mt-[40px] border-0 outline-0 custom-scrollbar p-4 sm:p-6`}
    >
      <div className="dialog-label flex flex-col sm:flex-row justify-center items-center gap-2">
        <div className="flex grow items-center justify-center sm:justify-start">
          <p className="text-[#214570] ml-3 text-2xl sm:text-3xl">{" "}{categories.find((cat) => cat.id === category)?.icon}</p>
          <h2 className="text-lg sm:text-2xl text-[#214570] font-bold ">{categories.find((cat) => cat.id === category)?.name}</h2>
        </div>
        <AiOutlineClose onClick={rest} className="text-2xl mt-1 self-end" />
      </div>
      <div className="flex flex-col sm:flex-row mt-2 items-center gap-2">
        <img
          src={userimage}
          alt="noimg"
          className="h-10 w-10 sm:h-12 sm:w-12 ml-3 rounded-full"
        />
        <p className="text-base sm:text-lg font-medium">مروان محمد</p>
      </div>
      <div className="flex flex-col sm:flex-row mt-3 gap-2 items-center">
        <div className="flex items-center">
          <CiLocationOn className="text-xl mt-1 text-blue-400 ml-2" />
          <p className="text-[#214570] text-base sm:text-lg">المكان:</p>
        </div>
        <h3 className="text-base sm:text-lg mr-2 text-stone-700">{adress}</h3>
      </div>
      <div className="flex flex-col sm:flex-row mt-3 gap-2 items-center">
        <p className="text-[#214570] text-base sm:text-lg">عنوان الفرصه :</p>
        <h3 className="text-base sm:text-lg mr-2 text-stone-700">{title}</h3>
      </div>
      <div className="mt-3">
        <p className="text-[#214570] text-base sm:text-lg mb-1">التفاصيل:</p>
        <p className="text-base sm:text-lg text-stone-700">{details}</p>
      </div>
      {src && (
        <div>
          <img
            src={src}
            alt="no-image"
            className="w-full max-w-xs border border-[#eee] shadow-2xl mt-6"
          />
        </div>
      )}
    </div>
  );
}