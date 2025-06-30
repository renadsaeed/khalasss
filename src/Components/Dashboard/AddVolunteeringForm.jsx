import React, { useState } from "react";

import { getAuthToken } from "../../util/auth";
import "./scroll.css";
const AddVolunteeringForm = ({ onClose, setOrganizationData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tasks: "",
    startDate: "",
    endDate: "",
    seatsAvailable: "",
    location: "",
    benefits: "",
    requiredAge: "",
    type: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

    // التحقق من الحقول المطلوبة
    const requiredFields = [
      "title",
      "description",
      "tasks",
      "startDate",
      "endDate",
      "seatsAvailable",
      "location",
      "benefits",
      "requiredAge",
      "type",
    ];
    for (let field of requiredFields) {
      if (!form[field]) {
        setError("يرجى ملء جميع الحقول المطلوبة");
        return;
      }
    }

    if (!form.image) {
      setError("يرجى اختيار صورة");
      return;
    }

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("Tasks", form.tasks);
    formData.append("StartDate", form.startDate);
    formData.append("EndDate", form.endDate);
    formData.append("SeatsAvailable", form.seatsAvailable);
    formData.append("Location", form.location);
    formData.append("Benefits", form.benefits);
    formData.append("RequiredAge", form.requiredAge);
    formData.append("Type", form.type);
    formData.append("Image", form.image);

    setIsSubmitting(true);
    console.log("formData keys:", [...formData.keys()]);
    console.log("hello");

    try {
      const token = getAuthToken();
      const response = await fetch("/api/Opportunities/CreateOpportunity", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!response.ok) {
        const res = await response.json();
        console.log("Response error details:", res);
        setError(res?.message || "حدث خطأ أثناء إرسال البيانات.");
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();

      const newOpportunity = {
        ...form,
        id: result?.result?.id || Math.random(),
        photoUrl: URL.createObjectURL(form.image),
      };

      setOrganizationData((prev) => ({
        ...prev,
        volData: [newOpportunity, ...prev.volData],
      }));
      setSuccessMessage("تم التعديل بنجاح!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
      onClose();
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
      <div className="editedform custom-scrollbar absolute top-0  xl:w-[700px] lg:w-[600px] text-[#214570] md:w-[500px] focus:border-0 focus:outline-0    custom-scrollbar">
        <form className="space-y-4" dir="rtl" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-blue-900 pr-5">
              إضافة فرصة تطوع جديدة
            </h2>
            <button className="text-4xl" onClick={onClose}>
              &times;
            </button>
          </div>
          <label className="block text-lg text-blue-900">
            اسم الفرصة
            <input
              type="text"
              name="title"
              className={className}
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block text-lg text-blue-900">
            وصف الفرصة
            <input
              name="description"
              type="text"
              value={form.description}
              className={className}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block text-lg text-blue-900">
            المهام
            <input
              type="text"
              name="tasks"
              value={form.tasks}
              onChange={handleChange}
              className={className}
              required
            />
          </label>
          <label className="block text-lg text-blue-900">
            الموقع
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={className}
              required
            />
          </label>
          <label className="block text-lg text-blue-900">
            الفوائد
            <input
              name="benefits"
              value={form.benefits}
              className={className}
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <label className="block text-lg text-blue-900">
            نوع الفرصة
            <input
              type="text"
              name="type"
              value={form.type}
              className={className}
              onChange={handleChange}
              required
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-blue-900">
                تاريخ البدء
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  className={className}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-lg text-blue-900">
                تاريخ الانتهاء
                <input
                  type="date"
                  name="endDate"
                  className={className}
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-blue-900">
                عدد المقاعد
                <input
                  type="number"
                  name="seatsAvailable"
                  className={className}
                  value={form.seatsAvailable}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-lg text-blue-900">
                العمر المطلوب
                <input
                  type="number"
                  name="requiredAge"
                  className={className}
                  value={form.requiredAge}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="block text-blue-900">
            <label className="block text-blue-900">رفع صورة</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[40%] py-2 rounded-sm text-lg  bg-[#0D8F75] hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? "جاري الإرسال..." : "إضافة الفرصة"}
            </button>
          </div>
          {successMessage && (
            <p className="text-green-600 text-center font-medium mt-2">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddVolunteeringForm;
