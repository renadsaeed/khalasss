import React from "react";
import { Form, useActionData, useNavigation, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const VolunteerForm = () => {
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  console.log("Validation errors:", JSON.stringify(errors, null, 2));
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <h2 className="text-center text-2xl font-bold text-[#234876] mb-6">
          املأ البيانات وانضم إلينا
        </h2>
        <Form method="post">
          {/* الحقل الأول */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="أدخل اسمك"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* الحقل الثاني */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="أدخل رقم هاتفك"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              العنوان
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="أدخل عنوانك"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
          </div>
          {errors?.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
          {/* الحقل الثالث */}
          <div className="mb-4">
            <label
              htmlFor="nationalid"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الرقم القومي
            </label>
            <input
              type="text"
              id="nationalid"
              name="nationalid"
              placeholder="أدخل رقمك القومي المكون من 16 رقم"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
            {errors?.nationalid && (
              <p className="text-red-500 text-sm mt-1">{errors.nationalid}</p>
            )}
          </div>

          {/* الحقل الرابع */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* الحقل الخامس */}
          <div className="mb-4">
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              التخصص
            </label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              placeholder="أدخل تخصصك"
              className="w-full border rounded-lg p-2 text-right"
              required
            />
            {errors?.specialty && (
              <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
            )}
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#234876] text-white py-2 px-4 rounded-lg hover:bg-[#1d3a5f] transition text-lg font-semibold"
          >
            {isSubmitting ? "...جاري الإرسال" : "انضم إلينا"}
          </button>
          {actionData?.success && (
            <p className="text-green-600 text-center mt-4 font-semibold">
              تم إرسال البيانات بنجاح
            </p>
          )}

          {actionData?.error && (
            <p className="text-red-600 text-center mt-4 font-semibold">
              {actionData.error}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default VolunteerForm;

export async function formAction({ request, params }) {
  console.log("formAction fired");
  const data = await request.formData();
  const name = data.get("name") || "";
  const phonenumber = data.get("phone") || "";
  const email = data.get("email") || "";
  const address = data.get("address") || "";
  const nationalid = data.get("nationalid") || "";
  const specialty = data.get("specialty") || "";
  const opportunityId = params.opportunityId;
  const errors = {};
  if (!name.trim()) errors.name = "الاسم مطلوب";
  if (!address.trim()) errors.address = "العنوان مطلوب";
  if (!phonenumber.match(/^\d{11}$/)) errors.phone = "رقم الهاتف غير صحيح";
  if (!nationalid.match(/^\d{14}$/))
    errors.nationalid = "الرقم القومي يجب أن يكون 14 رقمًا";
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "البريد الإلكتروني غير صحيح";
  if (!specialty.trim()) errors.specialty = "التخصص مطلوب";
  console.log("formAction fired after val");
  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);

    return { errors };
  }
  console.log("formAction fired check");
  try {
    const token = getAuthToken();
    console.log(token);
    const response = await fetch(
      `/api/opportunities/${opportunityId}/participation`,
      {
        method: "POST",
        body: JSON.stringify({
          fullName: name,
          phoneNumber: phonenumber,
          email: email,
          address: address,
          nationalId: nationalid,
          specialization: specialty,
          opportunityId: opportunityId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("Body being sent:", {
      fullName: name,
      phoneNumber: phonenumber,
      email: email,
      address: address,
      nationalId: nationalid,
      specialization: specialty,
      opportunityId: opportunityId,
    });
    console.log("response");
    console.log(response);
    if (!response.ok) {
      if (response.status === 401) {
        return { error: "يجب عليك تسجيل الدخول أولاً لإرسال الطلب." };
      }
      if (response.status === 409) {
        return { error: "لقد قمت بالتقديم على هذه الفرصة من قبل." };
      }

      const errorText = await response.text();
      return { error: errorText || "حدث خطأ أثناء الإرسال." };
    }

    return { success: true };
  } catch (err) {
    return { error: "could not connect to server" };
  }
  return redirect("/Volantering");
}
