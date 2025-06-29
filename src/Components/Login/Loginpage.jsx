import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import "./login.css";
import { Link, redirect } from "react-router-dom";

const Login = () => {
  const [view, setView] = useState("login"); // "login" | "forgotPassword" | "resetPassword"

  const handleForgotPassword = () => setView("forgotPassword");
  const handleResetPassword = () => setView("resetPassword");
  const handleBackToLogin = () => setView("login");

  return (
    <>
      {view === "login" && (
        <LoginForm onForgotPassword={handleForgotPassword} />
      )}
      {view === "forgotPassword" && (
        <ForgotPasswordForm onNext={handleResetPassword} />
      )}
      {view === "resetPassword" && (
        <ResetPasswordForm onBackToLogin={handleBackToLogin} />
      )}
    </>
  );
};

export default Login;

// export async function action({ request, params }) {
//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };
//   const response = await fetch("/api/Authentication/Login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(authData),
//   });
//   console.log(response);
//   if (response.status === 422 || response.status === 401) {
//     console.log("422 401");
//     return response;
//   }
//   if (!response.ok) {
//     console.log("500");
//     throw new Response(JSON.stringify({ message: "could not fetch data" }), {
//       status: 500,
//     });
//   }
//   const resData = await response.json();
//   console.log(resData);
//   const token = resData.token;
//   console.log("token" + token);
//   localStorage.setItem("token", token);
//   return redirect("/");
// }

// export async function action({ request }) {
//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   const response = await fetch("/api/Authentication/Login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: "user@example.com",
//       password: "123456",
//     }),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw new Response(JSON.stringify({ message: "could not fetch data" }), {
//       status: 500,
//     });
//   }

//   // 👇 هنا نقرأ الـ text ونحاول نحوله لـ JSON
//   const responseText = await response.text();
//   let resData;
//   try {
//     resData = JSON.parse(responseText);
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     throw new Response(JSON.stringify({ message: "Invalid response format" }), {
//       status: 500,
//     });
//   }

//   // 👇 استخدم result لو فيه توكن أو بيانات
//   const token = resData.result;
//   localStorage.setItem("token", token);

//   return redirect("/");
// }
export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("/api/Authentication/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401 || response.status === 400) {
    const errorText = await response.text();

    console.log("errortext", errorText);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (err) {
      errorData = { message: "حدث خطأ غير متوقع" };
    }

    const message =
      errorData.message ||
      (Array.isArray(errorData.errorMessages)
        ? errorData.errorMessages[0]
        : "حدث خطأ غير متوقع");

    console.log("final", message);

    // ترجم الرسالة حسب المحتوى
    if (message.includes("User not found")) {
      return {
        errors: {
          email: "المستخدم غير موجود",
        },
      };
    } else if (message.includes("Incorrect Email or Password")) {
      return {
        errors: {
          email: "يجب إدخال بريد إلكتروني صحيح",
          password: "يجب إدخال كلمة مرور صحيحه",
        },
      };
    }
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "could not fetch data 500" }),
      {
        status: 500,
      }
    );
  }

  const responseText = await response.text();

  let resData;
  try {
    resData = JSON.parse(responseText);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Response(JSON.stringify({ message: "Invalid response format" }), {
      status: 500,
    });
  }
  console.log("charitydata :");
  console.log(resData);
  const token = resData.result.token;
  const role = resData.result.role;
  const user = resData.result.user;
  console.log("token" + token);
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("user", JSON.stringify(user));
  console.log("user :");
  console.log(user);

  if (role === "Charity") {
    return redirect("/DashboardLayout");
  } else {
    return redirect("/");
  }
}
