import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../util/auth";
const ChangePassword = () => {
  //   const [form, setForm] = useState({
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmNewPassword: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm({ ...form, [name]: value });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (form.newPassword !== form.confirmNewPassword) {
  //       alert("كلمة المرور الجديدة غير متطابقة");
  //       return;
  //     }
  //     // هنا تضع منطق تغيير كلمة المرور
  //     alert("تم تغيير كلمة المرور (وهمية)");
  //   };
  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ← هنا
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 👈 استرجاع بيانات الجمعية
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setError("");
    setIsLoading(true); // ← بدأ الإرسال

    try {
      const token = getAuthToken();
      console.log("change :", user.email, token, form.newPassword);
      const res = await fetch("/api/Authentication/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: user.email,
          token: token,
          password: form.newPassword,
        }),
      });

      const data = await res.json();
      console.log("🔁 API Response:", data);
      if (!res.ok) throw new Error(data.message || "فشل تغيير كلمة المرور");

      setSuccess("تم تغيير كلمة المرور بنجاح");
      setForm({ newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // ← خلص الإرسال
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#183153]">
        تغيير كلمة المرور
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-bold text-[#183153]">كلمة المرور الجديدة</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
          required
        />
        <label className="font-bold text-[#183153]">
          تأكيد كلمة المرور الجديدة
        </label>
        <input
          type="password"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#0D8F75] outline-none"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0D8F75] text-white font-bold rounded-xl px-8 py-2 text-lg transition hover:bg-[#0a6b58] mt-4"
        >
          {isLoading ? "جاري الإرسال..." : "حفظ التغيير"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
