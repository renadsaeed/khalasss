import { AiOutlineClose } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomDropdown from "./CustomDropdown";
import { IoBarChartSharp } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { useState } from "react";
import { useRef } from "react";
import { getAuthToken } from "../../util/auth";
export default function Model({
  rest,
  ref,
  newHelp,
  setNewHelp,
  fileInputRef,
  categories,
}) {
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    const token = getAuthToken();
    console.log(token);
    const errors = {};
    if (!newHelp.title) errors.title = "هذا الحقل مطلوب";
    if (!newHelp.details) errors.details = "هذا الحقل مطلوب";
    if (!newHelp.email) errors.email = "هذا الحقل مطلوب";
    if (!newHelp.phone) errors.phone = "هذا الحقل مطلوب";
    if (newHelp.availableSpots === null || isNaN(newHelp.availableSpots)) {
      errors.availableSpots = "هذا الحقل مطلوب";
    }

    setFormErrors(errors);
    setFormMessage("");

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const payload = {
      title: newHelp.title,
      description: newHelp.details,
      availableSpots: newHelp.availableSpots ?? 0,
      assistanceTypeId: newHelp.category,
      contactInfo: {
        phone: newHelp.phone,
        email: newHelp.email,
      },
      isOpen: true,
    };
    console.log("send data");
    console.log(payload);

    try {
      const response = await fetch("/api/Assistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjA1M2FmMS05NzRkLTQyZDItYTc4Zi05ZDg1YzMyYjdlYjkiLCJlbWFpbCI6IlJlbmFkc2FlZWRAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJSZW5hZHNhZWVkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMTI3Nzg0MDQwNiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNzUwNzkzNjUyLCJleHAiOjE3NTMzODU2NTIsImlhdCI6MTc1MDc5MzY1MiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAxMyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMTMifQ.UIU_o0XFw2Yivd25fSxB2o8guOj2wLfVmLH1KRpCjzU",
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        const text = await response.text(); // نقرأ الرد كنص
        if (text) {
          data = JSON.parse(text);
          console.log("✅ Response JSON:", data);
        } else {
          console.warn("⚠️ الاستجابة فاضية من السيرفر.");
        }
      } catch (error) {
        console.warn("⚠️ الاستجابة مش JSON، أو حصل خطأ:", error);
      }

      if (!response.ok) {
        setFormMessage(
          data.message ||
            data.errorMessages?.join(" - ") ||
            "حدث خطأ أثناء إرسال المساعدة."
        );
      } else {
        setFormMessage("✅ تم نشر المساعدة بنجاح.");
        setNewHelp({
          email: "",
          phone: "",
          title: "",
          availableSpots: null,
          details: "",
          category: "medical",
        });
        setFormErrors({});
        ref.current.close();
      }
    } catch {
      setFormMessage("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <dialog
        ref={ref}
        className="result-modal w-full max-w-2xl mx-auto custom-scrollbar p-0 sm:p-0"
      >
        <div className="containerr relative rounded-2xl bg-white shadow-2xl px-8 sm:px-14 py-10 sm:py-14">
          <div className="flex justify-center items-center mb-10 relative">
            <button
              onClick={rest}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 shadow-md text-gray-400 hover:text-red-500 hover:bg-gray-200 transition-all duration-200 focus:outline-none"
            >
              <AiOutlineClose size={28} />
            </button>
            <h2 className="flex-1 text-center text-3xl sm:text-4xl text-[#183153] font-black tracking-tight">
              إضافة مساعدة
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="addres flex items-center gap-2">
              <input
                type="text"
                placeholder="عنوان الفرصه"
                value={newHelp.title}
                onChange={(e) =>
                  setNewHelp({ ...newHelp, title: e.target.value })
                }
                className="w-full p-2 rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition text-lg shadow-sm placeholder-gray-400 text-[#183153]"
              />
            </div>
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={newHelp.phone}
              onChange={(e) =>
                setNewHelp({ ...newHelp, phone: e.target.value })
              }
              className="w-full p-2 rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition text-lg shadow-sm placeholder-gray-400 text-[#183153]"
            />
            <input
              type="email"
              placeholder="البريد الالكتروني"
              value={newHelp.email}
              onChange={(e) =>
                setNewHelp({ ...newHelp, email: e.target.value })
              }
              className="w-full p-2 rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition text-lg shadow-sm placeholder-gray-400 text-[#183153]"
            />
            <input
              type="number"
              placeholder="عدد الحالات"
              value={newHelp.availableSpots ?? ""}
              onChange={(e) =>
                setNewHelp({
                  ...newHelp,
                  availableSpots:
                    e.target.value === "" ? null : parseInt(e.target.value),
                })
              }
              className="w-full p-2 rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition text-lg shadow-sm placeholder-gray-400 text-[#183153]"
            />
            <textarea
              placeholder="التفاصيل"
              value={newHelp.details}
              onChange={(e) =>
                setNewHelp({ ...newHelp, details: e.target.value })
              }
              className="w-full custom-scrollbar resize-none rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition min-h-[120px] text-lg shadow-sm placeholder-gray-400 text-[#183153] py-4 pr-4 text-right placeholder:text-right placeholder:align-middle"
            ></textarea>

            <CustomDropdown
              newHelp={newHelp}
              setNewHelp={setNewHelp}
              categories={categories}
            />
            {formMessage && (
              <p className="text-center mt-2 text-red-600">{formMessage}</p>
            )}

            <hr className="my-4 border-gray-200" />
            <div className="dialog-bottom flex flex-col sm:flex-row justify-between items-center gap-6 mt-2 w-full">
              <div
                className="cursor-pointer flex items-center gap-3"
                onClick={() => fileInputRef.current.click()}
              >
                <LuImagePlus className="text-2xl text-[#0D8F75]" />
                <IoBarChartSharp className="text-2xl text-[#0D8F75]" />
              </div>
              <div className="flex items-center text-lg text-[#183153] gap-2">
                <p className="text-gray-400">انشر في :</p>
                <p className="font-bold">
                  {categories.find((cat) => cat.id === newHelp.category)?.name}
                </p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#0D8F75] w-full sm:w-[220px] text-white px-10 py-5 rounded-3xl text-2xl font-black shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-200"
              >
                {isSubmitting ? "جارٍ النشر..." : "نشر"}
              </button>
            </div>
          </div>
        </div>
        {/* <form method="dialog">
          <button>close </button>
        </form> */}
      </dialog>
    </>
  );
}
