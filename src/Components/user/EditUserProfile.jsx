import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditUserProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzIyYmM5Yy03YWE2LTQ1N2QtODFmYy0zM2Y2NGUzMDhlM2QiLCJlbWFpbCI6Im5hYmlsbm9yaGFuMzI0QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTm9yaGFuIE5hYmlsIEFsaSBFbCBTYXllZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjE3MzUwMzEiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTc1MDk1ODUxNCwiZXhwIjoxNzUzNTUwNTE0LCJpYXQiOjE3NTA5NTg1MTQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMTMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDEzIn0.PuR2fDqDjdJUTVlDPQ9L_2mOaywgTsNOH6Wf56PtnGE";

  // State للبيانات
  const [userData, setUserData] = useState({
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
    image: "",
  });

  // جلب البيانات من الـ API
  useEffect(() => {
    // ضع التوكن الصحيح هنا
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzIyYmM5Yy03YWE2LTQ1N2QtODFmYy0zM2Y2NGUzMDhlM2QiLCJlbWFpbCI6Im5hYmlsbm9yaGFuMzI0QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTm9yaGFuIE5hYmlsIEFsaSBFbCBTYXllZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjE3MzUwMzEiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTc1MDk1ODUxNCwiZXhwIjoxNzUzNTUwNTE0LCJpYXQiOjE3NTA5NTg1MTQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMTMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDEzIn0.PuR2fDqDjdJUTVlDPQ9L_2mOaywgTsNOH6Wf56PtnGE";
    fetch(
      "https://waslalkhair.runasp.net/api/User/e3476806-880a-4a7d-87fb-093559f1f90f",
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setUserData({
            fullName: data.result.fullName || "",
            age: data.result.age || "",
            phoneNumber: data.result.phoneNumber || "",
            email: data.result.email || "",
            image: data.result.image || "",
          });
        }
      });
  }, []);

  // دالة لتغيير القيم في الفورم
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة حفظ التعديلات
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    console.log("userData:", userData);
    try {
      const response = await fetch(
        "https://waslalkhair.runasp.net/api/User/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      console.log("API response:", data);
      if (data.isSuccess) {
        alert("تم تحديث البيانات بنجاح");
      } else {
        alert("حدث خطأ أثناء التحديث: " + (data.message || ""));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("حدث خطأ أثناء الاتصال بالسيرفر");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-white rounded-2xl shadow-md w-4/5 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={userData.image || "/user.png"}
              alt="User"
              className="rounded-full w-20 h-20 object-cover border-2 border-gray-300"
            />
            <div>
              <h2 className="text-xl font-bold">{userData.fullName}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() =>
                  document.getElementById("profile-image-input").click()
                }
              >
                تعديل الصورة الشخصية
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#056B57")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0D8F75")
              }
              style={{ backgroundColor: "#0D8F75" }}
              className="text-white px-6 py-2 rounded-md shadow-md transition"
            >
              حفظ
            </button>
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-md hover:bg-gray-400">
              إلغاء
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-900 mb-2">اسمك</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              placeholder="أدخل اسمك"
              className="w-full border-transparent bg-gray-100 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-gray-900 mb-2">سنك</label>
            <input
              type="text"
              name="age"
              value={userData.age}
              onChange={handleChange}
              placeholder="أدخل سنك"
              className="w-full border-transparent bg-gray-100 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-gray-900 mb-2">رقم الهاتف</label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              placeholder="أدخل رقم الهاتف"
              className="w-full border-transparent bg-gray-100 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>

          {/* كلمة السر */}
          <div>
            <label className="block text-gray-900 mb-2">تغيير كلمة السر</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة السر"
                className="w-full border-transparent bg-gray-100 rounded-md p-2 pr-10 focus:outline-none focus:ring focus:ring-blue-100"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {/* تأكيد كلمة السر */}
          <div>
            <label className="block text-gray-900 mb-2">
              أعد إدخال كلمة السر الجديدة
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="أدخل كلمة السر الجديدة"
                className="w-full border-transparent bg-gray-100 rounded-md p-2 pr-10 focus:outline-none focus:ring focus:ring-blue-100"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">
            البريد الإلكتروني
          </h3>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-500">منذ شهر</p>
        </div>

        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default EditUserProfile;
