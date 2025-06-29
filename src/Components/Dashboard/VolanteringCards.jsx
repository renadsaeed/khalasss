import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Editformvol from "../OrganizatonProfile/Editformvol";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { getAuthToken } from "../../util/auth";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";

import { IoFlag } from "react-icons/io5";
import { useState } from "react";

export default function Cardsedit({
  title,
  id,
  description,
  role,
  orgname,
  phoneNumber,
  orgimage,
  orgemail,
  orgid,
  image,
  benefits,
  endDate,
  isClosed,
  location,
  photoUrl,
  requiredAge,
  seatsAvailable,
  startDate,
  tasks,
  index,
  setOrganizationData,
  type,
}) {
  const dialog = useRef();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  async function handleDeleteConfirmed() {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/Opportunities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        let message = "حدث خطأ أثناء حذف الفرصة.";
        try {
          const errorData = await response.json();
          message = errorData.message || message;
        } catch (jsonError) {
          // رد غير صالح كـ JSON
        }

        setDeleteError(message);
        return;
      }

      setOrganizationData((prev) => ({
        ...prev,
        volData: prev.volData.filter((item) => item.id !== id),
      }));
      setDeleteError(""); // تأكد من تصفير الخطأ لو العملية نجحت
      setShowConfirm(false);
    } catch (err) {
      setDeleteError("فشل الاتصال بالخادم. حاول مرة أخرى.");
      console.error("خطأ في الاتصال:", err);
    }
  }

  let monthName = "تاريخ غير متاح";
  try {
    if (startDate) {
      const date = new Date(startDate);
      if (!isNaN(date)) {
        monthName = date.toLocaleString("ar-EG", { month: "long" });
      }
    }
  } catch (error) {
    console.error("خطأ في التاريخ:", error);
  }

  // function handelClose() {
  //   setOrganizationData((prevData) =>
  //     prevData.filter((item) => item.id !== id)
  //   );
  // }

  return (
    <div
      key={index}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col"
    >
      <div className="relative">
        <img
          src={photoUrl}
          alt="imgCard"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => dialog.current.showModal()}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white hover:text-blue-500 transition-colors"
          >
            <MdOutlineModeEditOutline size={20} />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white hover:text-red-500 transition-colors"
          >
            <IoIosClose size={24} />
          </button>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col" dir="rtl">
        <h3 className="text-xl font-bold text-[#183153] mb-4 text-center">
          {title}
        </h3>

        {/* Progress Bar and amounts */}
        {/* <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-[#0D8F75]">
              مجموع التبرعات
            </span>
            <span className="text-sm font-medium text-gray-700">
              ${collectedAmount.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#10a386] to-[#0D8F75] h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">المتبقي</span>
            <span className="text-xs text-gray-500">
              ${remainingAmount.toLocaleString()}
            </span>
          </div>
        </div> */}

        {/* Stats */}
        <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-800">
          <div className="time   pr-[2px] flex pt-[15px]">
            <FaRegCalendarAlt className="text-2xl ml-[12px] " />
            <p className="text-xl pr-[5px]">{monthName}</p>
          </div>
          <div className="location pr-[2px] flex pt-[10px]">
            <CiLocationOn className="text-2xl ml-[12px] " />
            <p className="text-xl pr-[5px]">{location}</p>
          </div>
          <div className="sets pr-[2px] flex pt-[10px]">
            <MdPersonSearch className="text-2xl ml-[12px] " />
            <p className="text-xl pr-[5px]">{seatsAvailable} مقعد</p>
          </div>
          <div className="type pr-[2px] flex pt-[10px] pb-[10px]">
            <IoFlag className="text-2xl ml-[12px]" />

            {type === "جمعيه" ? (
              <Link
                to="/Organization"
                state={{
                  OfficialAuthority: orgname,
                  name: orgname,
                }}
              >
                {" "}
                <p className="">{orgname}</p>
              </Link>
            ) : (
              <p className="">{orgname}</p>
            )}
          </div>
        </div>
      </div>

      <Editformvol
        ref={dialog}
        title={title}
        id={id}
        description={description}
        image={image}
        orgname={orgname}
        benefits={benefits}
        endDate={endDate}
        isClosed={isClosed}
        location={location}
        photoUrl={photoUrl}
        requiredAge={requiredAge}
        seatsAvailable={seatsAvailable}
        startDate={startDate}
        tasks={tasks}
        key={index}
        type={type}
        setOrganizationData={setOrganizationData}
      />
      {showConfirm && (
        <dialog
          open
          className="fixed top-0 left-0 w-full h-full flex items-start justify-center bg-black/30 z-50"
        >
          <div className="bg-white rounded-md p-6 w-[90%] max-w-md shadow-md text-center">
            <h2 className="text-xl font-bold text-red-700 mb-4">
              هل أنت متأكد من حذف الفرصة؟
            </h2>
            <p className="text-gray-700 mb-6">
              لن تتمكن من استعادة البيانات بعد الحذف.
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteError("");
                }}
              >
                لا
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteConfirmed}
              >
                نعم، احذف
              </button>
            </div>

            {deleteError && (
              <p className="text-red-600 mt-4 text-sm font-medium">
                {deleteError}
              </p>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}
