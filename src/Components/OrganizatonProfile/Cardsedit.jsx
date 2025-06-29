import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Editformvol from "./Editformvol";
import { getAuthToken } from "../../util/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
export default function Cardsedit({
  title,
  id,
  description,
  role,
  fullName,
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const dialog = useRef();
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

  return (
    <div key={index} className="shadow-sm h-[350px]  ">
      <div className="container   border border-stone-200 h-[350px] p-3 rounded-md  ">
        <div className="title flex justify-between  p-1 mb-1">
          <p className="text-xl font-medium text-black">{title}</p>
          <div className="text-2xl flex ">
            <button onClick={() => dialog.current.showModal()}>
              <MdOutlineModeEditOutline className="ml-3 " />
            </button>

            <button onClick={() => setShowConfirm(true)}>
              <IoIosClose className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="imgcard  h-[280px] ">
          <img src={photoUrl} alt="imgCard" className="w-[100%] h-[100%]" />
        </div>
      </div>
      <Editformvol
        ref={dialog}
        title={title}
        id={id}
        description={description}
        image={image}
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
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 z-50"
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
