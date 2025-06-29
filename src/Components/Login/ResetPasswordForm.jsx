import React, { useState, useEffect } from "react";
import Logo from "../../../public/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./background.css";
import "./login.css";
const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
      navigate("/ResetPassword", { replace: true });
    }
  }, []);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  console.log("token:" + token);
  // const handlePasswordChange = (event) => {
  //   event.preventDefault();

  //   if (newPassword.length < 6) {
  //     setErrorMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setErrorMessage("كلمتا المرور غير متطابقتين");
  //     return;
  //   }

  //   setErrorMessage("");
  //   setShowAlert(true);

  //   // إعادة التوجيه بعد عرض رسالة النجاح
  //   setTimeout(() => {
  //     setShowAlert(false);
  //     onBackToLogin();
  //   }, 3000);
  // };
  const resetPassword = async ({ email, token, password }) => {
    const response = await fetch("/api/Authentication/ResetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token, password }),
    });

    const result = await response.json();
    console.log("🔁 API Response:", result);
    console.log("token:" + token);
    if (!response.ok) {
      throw new Error(
        result.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور"
      );
    }

    return result;
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setErrorMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    setErrorMessage(""); // مسح أي رسالة قديمة

    try {
      await resetPassword({ email, token, password: newPassword });
      setShowAlert(true);

      // توجيه المستخدم بعد النجاح
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login"); // أو أي صفحة تسجيل دخول
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="container-contant-img w-[100%] h-fit  flex  justify-center">
            <img
              src={Logo}
              alt="hello"
              className="w-[40px] lg:pt-[4px] xl:pt-[10px] pt-[10px]"
            />
          </div>
          <h2>إعادة تعيين كلمة المرور</h2>
        </div>
        <form
          method="post"
          className="login-form"
          onSubmit={handlePasswordChange}
        >
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="email" value={email} />
          <label htmlFor="newPassword">أدخل كلمة المرور الجديدة *</label>
          <div className="password-input">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="ادخل كلمة السر"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleNewPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showNewPassword ? faEye : faEyeSlash}
                aria-hidden="true"
              />
            </button>
          </div>

          <label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة *</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="قم بإعادة إدخال كلمة السر"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                aria-hidden="true"
              />
            </button>
          </div>

          {errorMessage && (
            <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
          )}
          <button type="submit" className="login-button mt-3">
            تغيير كلمة المرور
          </button>
        </form>

        {showAlert && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "1rem",
              border: "1px solid #c3e6cb",
            }}
          >
            تم تغيير كلمة المرور بنجاح!
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
