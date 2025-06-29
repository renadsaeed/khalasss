import { useState, useEffect } from "react";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./Formfileds.css";
import Login from "../Login/Loginpage";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Formfileds() {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    confirmPassword: "",
  });
  const navigat = useNavigation();
  const isSub = navigat.state === "submitting";
  const navigate = useNavigate();
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backerror, setBackerror] = useState({
    email: "",
    fullName: "",
    password: "",
    age: "",
    phoneNumber: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  useEffect(() => {
    setErrors({});
  }, [steps]);

  const validate = (step) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+20|0)?(10|11|12|15)\d{8}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+|~=\-{}[\]:";'<>?,./]{6,}$/;

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

    if (step === 1) {
      if (!formValue.email) {
        newErrors.email = "البريد الإلكتروني مطلوب";
      } else if (!emailRegex.test(formValue.email)) {
        newErrors.email = "البريد الإلكتروني غير صحيح";
      }
    }

    if (step === 2) {
      if (!formValue.username) {
        newErrors.username = "اسم المستخدم مطلوب";
      } else if (!usernameRegex.test(formValue.username)) {
        newErrors.username =
          "اسم المستخدم غير صحيح (يجب أن يبدأ بحرف ويحتوي على حروف وأرقام و _ فقط)";
      }

      if (!formValue.phone) {
        newErrors.phone = "رقم الهاتف مطلوب";
      } else if (!phoneRegex.test(formValue.phone)) {
        newErrors.phone = "رقم الهاتف غير صحيح";
      }

      if (!formValue.age) {
        newErrors.age = "العمر مطلوب";
      } else if (formValue.age < 10) {
        newErrors.age = "العمر يجب أن يكون اكبر من 10 سنوات";
      }
    }

    if (step === 3) {
      if (!formValue.password) {
        newErrors.password = "كلمة المرور مطلوبة";
      } else if (!passwordRegex.test(formValue.password)) {
        newErrors.password =
          "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، تشمل حرفًا ورقمًا.";
      }

      if (formValue.password !== formValue.confirmPassword) {
        newErrors.confirmPassword = "كلمة المرور غير متطابقة";
      }
    }

    return newErrors;
  };
  const getStepFromField = (field) => {
    switch (field) {
      case "email":
        return 1;
      case "username":
      case "phone":
      case "age":
        return 2;
      case "password":
      case "confirmPassword":
        return 3;
      default:
        return 1;
    }
  };
  const detectFieldFromError = (errorMessage) => {
    const lowerError = errorMessage.toLowerCase();
    console.log("errormassage" + lowerError);
    if (
      lowerError.includes("email") ||
      lowerError.includes("user is already exist")
    ) {
      console.log("innnn");
      return "email";
    }

    if (lowerError.includes("username") || lowerError.includes("name"))
      return "username";
    if (lowerError.includes("phone")) return "phone";
    if (lowerError.includes("age")) return "age";
    if (lowerError.includes("confirm")) return "confirmPassword"; // مهم
    if (lowerError.includes("password")) return "password";
    return null;
  };

  const submitToBackend = async () => {
    console.log("Data being sent:", {
      email: formValue.email,
      fullName: formValue.username,
      password: formValue.password,
      age: Number(formValue.age),
      phoneNumber: formValue.phone,
    });

    try {
      const response = await fetch("/api/Authentication/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValue.email,
          fullName: formValue.username,
          password: formValue.password,
          age: Number(formValue.age),
          phoneNumber: formValue.phone,
        }),
      });

      const data = await response.json();
      console.log("Response data from server:", data);

      // لو فيه خطأ من الباك
      if (!response.ok || data.isSuccess === false) {
        const errorText =
          (data.errorMessages && data.errorMessages[0]) || "حدث خطأ غير متوقع";

        const errorField = detectFieldFromError(errorText);
        const targetStep = getStepFromField(errorField);
        console.log("errorField" + errorField);

        // دمج الخطأ الجديد مع الأخطاء الموجودة
        setSteps(targetStep);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [errorField]: errorText,
        }));
        setBackerror((prevErrors) => ({
          ...prevErrors,
          [errorField]: errorText,
        }));

        console.log("backerror" + backerror.email);
        // console.log("error text" + errorText);

        return;
      }
      // لو كله تمام
      setSteps(4);
    } catch (error) {
      navigate("/error", {
        state: { message: "تعذر إرسال البيانات، حاول مرة أخرى لاحقًا." },
      });
    }
  };

  const handelSteps = async (e) => {
    e.preventDefault();

    const validationErrors = validate(steps);

    if (Object.keys(validationErrors).length === 0) {
      if (steps < 3) {
        setSteps((prev) => prev + 1);
      } else if (steps === 3) {
        // آخر خطوة، ابعت الداتا للباك اند
        await submitToBackend();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  // if (backerror === "User is already exist.") {

  // }

  return (
    <>
      <div className="steps w-[100%] border border-b-1 mt-4 border-white border-b-[#214570] pt-[10px] flex justify-between relative">
        <span className="step active right-0 ">1</span>
        <span
          className={
            steps >= 2 ? "step active right-[50%] " : "step right-[50%]"
          }
        >
          2
        </span>
        <span
          className={
            steps >= 3
              ? "step  active  right-[95%] md:right-[97.50%] xl:right-[95.50%] "
              : "step last right-[95%] sm:right-[95%] md:right-[97.50%] xl:right-[95.75%]"
          }
        >
          3
        </span>
      </div>

      <form onSubmit={handelSteps}>
        {steps === 1 && (
          <div className="step1 ">
            <div className="filed mt-5 lg:pb-5 xl:pb-0  frist">
              <label>البريد الالكتروني</label>
              <input
                type="text"
                value={formValue.email}
                placeholder="ادخل البريد الالكتروني"
                onChange={handelChange}
                name="email"
                className={errors.email && "error"}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
              {backerror.email && (
                <span className="error-message">
                  البريد الالكتروني مستخدم بالفعل
                </span>
              )}
            </div>
          </div>
        )}

        {steps === 2 && (
          <div className="step2">
            <div className="filed frist">
              <label>اسم المستخدم</label>
              <input
                type="text"
                value={formValue.username}
                placeholder="ادخل اسم المستخدم"
                name="username"
                onChange={handelChange}
                className={errors.username && "error"}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
              {backerror.fullName && (
                <span className="error-message">يجب ادخال اسم مستخدم صحيح</span>
              )}
            </div>

            <div className="filed">
              <label>رقم الهاتف</label>
              <input
                type="tel"
                value={formValue.phone}
                placeholder="ادخل رقم الهاتف"
                onChange={handelChange}
                name="phone"
                className={errors.phone && "error"}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
              {backerror.phoneNumber && (
                <span className="error-message">يجب ادخال رقم صحيح</span>
              )}
            </div>

            <div className="filed">
              <label>العمر</label>
              <input
                type="number"
                value={formValue.age}
                placeholder="ادخل عمرك"
                onChange={handelChange}
                name="age"
                className={errors.age && "error"}
              />
              {errors.age && (
                <span className="error-message">{errors.age}</span>
              )}
              {backerror.age && (
                <span className="error-message">يجب ان لا يقل العمر عن 18</span>
              )}
            </div>
          </div>
        )}
        {steps === 3 && (
          <div className="step3">
            {/* حقل كلمة المرور */}
            <div className="filed first relative pt-3">
              <label>كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formValue.password}
                  placeholder="ادخل كلمة المرور"
                  onChange={handelChange}
                  name="password"
                  className={`w-full p-2 border ${
                    errors.password
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300"
                  } rounded-md focus:outline-none pr-10`}
                />
                <span
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {/* حقل تأكيد كلمة المرور */}
            <div className="filed lg:pb-3 xl:p-0 relative">
              <label>تأكيد كلمة المرور</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="قم بإعادة إدخال كلمة السر"
                  onChange={handelChange}
                  name="confirmPassword"
                  className={`w-full p-2 border ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300"
                  } rounded-md focus:outline-none pr-10`}
                />
                <span
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
        )}
        {steps > 3 ? (
          <div className=" hidden justify-center  min-[375px]:py-[10px] min-[540px]:p-[30px] xl:p-[70px]">
            <button
              type="submit"
              disabled={isSub}
              className="btn w-[200px] h-[50px] min-[375px]:w-[150px]  text-lg font-bold outline-0 rounded-full bg-[#0D8F75]"
            >
              {steps === 3 ? "...إنشاء الحساب" : "...التالي"}
            </button>
          </div>
        ) : (
          <div className="flex justify-center min-[320px]:pt-[50px]  min-[320px]:pb-[100px] min-[375px]:py-[10px] min-[540px]:p-[30px] lg:p-2 xl:p-[40px]">
            <button
              type="submit"
              disabled={isSub}
              className="btn w-[200px] h-[50px]  text-lg font-bold outline-0 rounded-full bg-[#0D8F75]"
            >
              {steps === 3 ? "إنشاء الحساب" : "التالي"}
            </button>
          </div>
        )}

        {steps === 4 && !isSub && (
          <div className="flex justify-center flex-col items-center ">
            <div className="finsh-text pt-[60px]">
              {" "}
              <FaRegCheckCircle className="inline-block text-4xl text-[#0D8F75] " />
              <span className="text-lg"> تم انشاءالحساب بنجاح</span>
            </div>
            <div className="flex justify-center min-[320px]:py-[150px] min-[375px]:py-[50px] min-[540px]:p-[30px] xl:p-[70px]">
              <button
                type="submit"
                className="btn w-[200px] h-[50px]  text-lg font-bold outline-0 rounded-full bg-[#0D8F75]"
              >
                <Link to="/login">تسجيل الدخول</Link>
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
