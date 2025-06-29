import React, { useState } from "react";
import { Link, Form, useNavigation, useActionData } from "react-router-dom";
import Logo from "../../../public/login.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigat = useNavigation();
  const isSub = navigat.state === "submitting";
  const navigate = useNavigate();
  const actionData = useActionData();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("البريد الإلكتروني غير صالح");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      // ✨ بعت الفورم عشان يروح للـ action
      e.target.submit();
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
          <h2>تسجيل الدخول</h2>
        </div>

        <Form method="post" className="login-form">
          <label htmlFor="email">أدخل البريد الإلكتروني *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ادخل البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {actionData?.errors?.email && (
            <p className="error-message">{actionData.errors.email}</p>
          )}
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">أدخل كلمة المرور *</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="ادخل كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                aria-hidden="true"
              />
            </button>
          </div>
          {actionData?.errors?.password && (
            <p className="error-message">{actionData.errors.password}</p>
          )}
          {passwordError && <p className="error-message">{passwordError}</p>}

          <Link
            to="/forgotpassword"
            className="forgot-password"
            onClick={onForgotPassword}
          >
            نسيت كلمة السر؟
          </Link>

          <button type="submit" className="login-button">
            تسجيل دخول
          </button>
        </Form>

        <div className="sign-up-link">
          <p>
            ليس لديك حساب؟ <Link to="/singup">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
