import React, { useState } from "react";
import { getAuthToken } from "../../util/auth";
import { IoIosClose } from "react-icons/io";

const categories = [
  { label: "المجال الطبي", value: "المجال الطبي" },
  { label: "المجال الغذائي", value: "المجال الغذائي" },
  { label: "المجال التعليمي", value: "المجال التعليمي" },
  { label: "المجال السكني", value: "المجال السكني" },
  { label: "المجال الديني", value: "المجال الديني" },
  { label: "المجال البيئي", value: "المجال البيئي" },
  { label: "المجال البيطري", value: "المجال البيطري" },
  {
    label: "كفالة الأيتام والأسر المحتاجة",
    value: "كفالة الأيتام والأسر المحتاجة",
  },
];

const AddDonationForm = ({ onClose, setDetailedDonations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryName: "المجال الطبي",
    target: "",
    deadline: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.description || !form.categoryName || !form.image) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("CategoryName", form.categoryName);
    formData.append("TargetAmount", form.target || 0);
    formData.append("Deadline", form.deadline || "");
    formData.append("ImageUrl", form.image);

    setIsSubmitting(true);
    console.log("formData keys:", [...formData.entries()]);
    console.log("hello");
    try {
      const token = getAuthToken();
      const response = await fetch("/api/DonationOpportunity", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      // const result = await response.json();
      // console.log("Response error details:", result);
      // let result = null;
      // try {
      //   result = await response.json();
      // } catch (jsonError) {
      //   console.warn("الرد مش بصيغة JSON:", jsonError);
      // }
      // if (!response.ok) {
      //   setError(result?.message || "حدث خطأ أثناء إرسال البيانات.");
      // } else {
      //   setSuccess("تم الإرسال بنجاح");
      //   // Optionally reset form:
      //   setForm({
      //     title: "",
      //     description: "",
      //     categoryName: "",
      //     target: "",
      //     deadline: "",
      //     image: null,
      //   });
      //   setTimeout(() => {
      //     onClose();
      //   }, 1500); // تقفيل بعد نجاح الإرسال
      // }
      let result = null;
      let text = null;
      try {
        text = await response.text();
        result = JSON.parse(text);
      } catch (err) {
        console.warn("الرد ليس JSON، المحتوى هو:", text);
      }

      if (!response.ok) {
        setError(result?.message || text || "حدث خطأ أثناء إرسال البيانات.");
      } else {
        const newOpportunity = {
          ...form,
          id: result?.result?.id || Math.random(),
          imageUrl: URL.createObjectURL(form.image),
        };

        setDetailedDonations((prev) => [...prev, newOpportunity]);
        setSuccess("تم الإرسال بنجاح");
        setForm({
          title: "",
          description: "",
          categoryName: "",
          target: "",
          deadline: "",
          image: null,
        });
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error("خطأ:", err);
      setError("فشل الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const className =
    "flex h-10 w-[90%] text-right rounded-md border border-input bg-background px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none     md:text-sm";

  return (
    <div className="modal-overlay">
      <div className="editedform absolute top-0  xl:w-[700px] lg:w-[600px] text-[#214570] md:w-[500px] focus:border-0 focus:outline-0    custom-scrollbar">
        <button className="modal-close-btn " onClick={onClose}>
          <IoIosClose className="text-3xl" />
        </button>
        <h2 className="modal-title">إضافة فرصة تبرع جديدة</h2>
        <form className="add-donation-form" onSubmit={handleSubmit}>
          <label>
            اسم الفرصة
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            وصف الفرصة
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          {/* <select
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
            required
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select> */}
          <div className="relative w-56 text-right">
            <div className="relative">
              {/* الزر الأساسي لعرض القيمة المحددة */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-[#214570] text-sm flex items-center justify-between hover:border-teal-500 transition"
              >
                <span>
                  {categories.find((cat) => cat.value === form.categoryName)
                    ?.label || "اختر التصنيف"}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* القائمة المنسدلة */}
              {isOpen && (
                <div
                  className="absolute w-full bg-[#eee] text-[#214570] shadow-xs mt-1 overflow-y-auto rounded-md z-50 text-sm custom-scrollbar"
                  style={{ maxHeight: "120px" }} // ← هنا الحل الفعّال للسكرول
                >
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setForm({ ...form, categoryName: cat.value });
                        setIsOpen(false);
                      }}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollbar ستايل */}
            <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
  `}</style>
          </div>

          <label>
            الهدف المالي (اختياري)
            <input
              type="number"
              name="target"
              value={form.target}
              onChange={handleChange}
              min="0"
            />
          </label>
          <label>
            الموعد النهائي (اختياري)
            <input
              type="datetime-local"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className={className}
            />
          </label>
          <label>
            صورة الفرصة<span>*</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>

          {/* رسالة الخطأ أو النجاح */}
          {error && <div className="form-error">{error}</div>}
          {/* {success && <div className="form-success">{success}</div>} */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              className="w-[40%] py-2 rounded-sm text-lg  bg-[#0D8F75] hover:bg-emerald-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "إضافة الفرصة"}
            </button>
          </div>
          {success && (
            <p className="text-green-600 text-center font-medium mt-2">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDonationForm;
