import React, { useState } from "react";
import Logo from "../../../public/login.png";
import ResetPasswordForm from "./ResetPasswordForm";
import "./background.css";
import { Link, useActionData, Form } from "react-router-dom";
const ForgotPasswordForm = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // const validateEmail = () => {
  //   if (!email.includes("@")) {
  //     setError("يرجى إدخال بريد إلكتروني صحيح");
  //   } else {
  //     setError("");
  //     onNext();
  //   }
  // };
  const actionData = useActionData();

  return (
    <div className="login-container">
      <div className="login-box ">
        <div className="login-header">
          <div className="container-contant-img w-[100%] h-fit  flex  justify-center">
            <img
              src={Logo}
              alt="hello"
              className="w-[40px] lg:pt-[4px] xl:pt-[10px] pt-[10px]"
            />
          </div>
          <h2>هل نسيت كلمة المرور؟</h2>
          <p>
            "لا تقلق، نحن هنا لمساعدتك! إذا كنت تتذكر بريدك الإلكتروني، أدخل
            بياناتك واضغط على التالي."
          </p>
        </div>
        <Form method="post" className="login-form">
          <label htmlFor="reset-email">أدخل البريد الإلكتروني *</label>
          <input
            type="email"
            name="email"
            id="reset-email"
            placeholder="أدخل البريد الإلكتروني المسجل لإعادة تعيين كلمة المرور"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          {actionData?.error && (
            <p className="error-message">{actionData.error}</p>
          )}
          {actionData?.success && (
            <p style={{ color: "green" }}>{actionData.success}</p>
          )}
          <button type="submit" className="login-button">
            التالي
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

// actions/forgotPasswordAction.js
export async function forgotPasswordAction({ request }) {
  console.log("hello");
  const formData = await request.formData();
  const email = formData.get("email");

  const response = await fetch("/api/Authentication/ForgotPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  console.log(response);

  const result = await response.json();
  console.log(result);
  if (!response.ok) {
    return {
      error: result.message || "حدث خطأ، حاول مرة أخرى.",
    };
  }

  return {
    success: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.",
  };
}
