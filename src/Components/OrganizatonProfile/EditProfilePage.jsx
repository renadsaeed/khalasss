import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../util/auth";

const EditProfilePage = () => {
  const [form, setForm] = useState({
    id: "",
    email: "",
    charityName: "",
    charityRegistrationNumber: "",
    charityMission: "",
    establishedAt: "",
    address: "",
    phoneNumber: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const token = getAuthToken();
  const storeduser = localStorage.getItem("user");
  if (!storeduser) {
    throw new Response("Charity not found", { status: 401 });
  }
  const user = JSON.parse(storeduser);
  const charityId = user.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Charity/${charityId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!res.ok) throw new Error("فشل تحميل بيانات الجمعية");

        const data = await res.json();
        const result = data.result;
        setForm({
          id: result.id ?? "",
          email: result.email ?? "",
          charityName: result.charityName ?? "",
          charityRegistrationNumber: result.charityRegistrationNumber ?? "",
          charityMission: result.charityMission ?? "",
          establishedAt: result.establishedAt?.split("T")[0] ?? "",
          address: result.address ?? "",
          phoneNumber: result.phoneNumber ?? "",
          image: result.image ?? null,
        });
      } catch (err) {
        setError(err.message || "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [charityId, token]);
  console.log(form);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("email", form.email);
    formData.append("charityName", form.charityName);
    formData.append(
      "charityRegistrationNumber",
      form.charityRegistrationNumber
    );
    formData.append("charityMission", form.charityMission);
    formData.append("establishedAt", form.establishedAt);
    formData.append("address", form.address);
    formData.append("phoneNumber", form.phoneNumber);
    if (form.image && typeof form.image === "string") {
      // لو الصورة جاية كـ URL (صورة قديمة)، نحولها لـ Blob ونبعتها
      const response = await fetch(form.image);
      const blob = await response.blob();
      const filename = form.image.split("/").pop(); // اسم تقريبي
      formData.append("Image", new File([blob], filename, { type: blob.type }));
    } else if (form.image) {
      // صورة جديدة من input type="file"
      formData.append("Image", form.image);
    } else {
      alert("❌ يجب اختيار صورة للجمعية");
      return;
    }
    try {
      const res = await fetch(`/api/Charity/${form.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("فشل في حفظ التعديلات");

      const data = await res.json();
      setMessage(" تم تحديث بيانات الجمعية بنجاح!");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage(err.message || " حدث خطأ أثناء حفظ البيانات");
      setMessageType("error");
    }
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-start bg-[#f7fafc] py-8 px-0">
      <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex items-center gap-3 mb-1">
              {/* صورة الجمعية */}
              {form.image ? (
                <img
                  src={
                    typeof form.image === "string"
                      ? form.image
                      : URL.createObjectURL(form.image)
                  }
                  alt="شعار الجمعية"
                  className="w-14 h-14 rounded-full border-2 border-[#0D8F75] shadow"
                />
              ) : (
                <div className="w-14 h-14 rounded-full border-2 border-[#0D8F75] bg-gray-200 shadow" />
              )}
              <h2 className="text-2xl font-extrabold text-[#183153]">
                {form.charityName || "اسم الجمعية"}
              </h2>
            </div>
            <span className="text-gray-500 text-base">
              {form.email || "example@email.com"}
            </span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleSubmit}
              className="flex-1 sm:flex-none bg-[#0D8F75] text-white font-bold rounded-xl px-8 py-2 text-lg transition hover:bg-[#0a6b58]"
            >
              حفظ
            </button>
            <button
              type="button"
              className="flex-1 sm:flex-none bg-gray-200 text-[#0D8F75] font-bold rounded-xl px-8 py-2 text-lg transition hover:bg-gray-300"
            >
              إلغاء
            </button>
          </div>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          <div className="flex flex-col gap-4">
            <label className="font-bold text-[#183153]">
              رقم التعريف (Id) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="ادخل رقم التعريف"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              اسم الجمعية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="charityName"
              value={form.charityName}
              onChange={handleChange}
              placeholder="ادخل اسم الجمعية"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              رقم تسجيل الجمعية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="charityRegistrationNumber"
              value={form.charityRegistrationNumber}
              onChange={handleChange}
              placeholder="ادخل رقم التسجيل"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              رسالة الجمعية <span className="text-red-500">*</span>
            </label>
            <textarea
              name="charityMission"
              value={form.charityMission}
              onChange={handleChange}
              placeholder="ادخل رسالة الجمعية"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none min-h-[60px]"
              required
            />
            <label className="font-bold text-[#183153]">
              تاريخ التأسيس <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="establishedAt"
              value={form.establishedAt}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-bold text-[#183153]">
              العنوان <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="ادخل العنوان"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="ادخل رقم الهاتف"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
              required
            />
            <label className="font-bold text-[#183153]">
              شعار الجمعية <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
            />
          </div>
        </form>
        {message && (
          <div
            className={`text-center mt-4 p-3 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
