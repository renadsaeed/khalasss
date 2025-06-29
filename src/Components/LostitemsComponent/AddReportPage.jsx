import React, { useState } from "react";
import { useActionData, useNavigation, Form } from "react-router-dom";
import { FaPaperPlane, FaFileUpload, FaMapMarkerAlt } from "react-icons/fa";
import { getAuthToken } from "../../util/auth";

const AddReportPage = () => {
  const [type, setType] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          إضافة بلاغ جديد
        </h1>
        <p className="text-center text-gray-500 mb-8">
          املأ النموذج التالي لمساعدتنا في العثور على ما يخصك أو ما وجدته.
        </p>
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          {/* image */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              صورة العنصر
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-48 w-auto rounded-md"
                  />
                ) : (
                  <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none"
                  >
                    <span>قم برفع ملف</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImagePreview(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                  <p className="pl-1">أو اسحبه وأفلته هنا</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {actionData?.errors?.image && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* نوع البلاغ */}
          <input type="hidden" name="type" value={type} />
          <div className="text-center">
            <div className="inline-flex rounded-lg shadow-sm">
              <button
                type="button"
                onClick={() => setType(0)}
                className={`px-6 py-3 font-semibold rounded-r-lg transition-colors ${
                  type === 0
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                مفقود
              </button>
              <button
                type="button"
                onClick={() => setType(1)}
                className={`px-6 py-3 font-semibold rounded-l-lg transition-colors ${
                  type === 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                معثور عليه
              </button>
            </div>
          </div>
          {/* metadata */}
          <div>
            <label
              htmlFor="metadata"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              وصف العنصر
            </label>
            <textarea
              id="metadata"
              name="metadata"
              rows="3"
              className="w-full p-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-teal-500"
              placeholder="أضف تفاصيل تساعد في التعرف على العنصر..."
              required
            ></textarea>
            {actionData?.errors?.metadata && (
              <p className="text-red-500 text-sm">
                {actionData.errors.metadata}
              </p>
            )}
          </div>
          {/* location */}
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              مكان الفقد أو العثور
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full h-12 px-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-teal-500"
              placeholder="مثال: أمام بوابة الجامعة"
              required
            />
            {actionData?.errors?.location && (
              <p className="text-red-500 text-sm">
                {actionData.errors.location}
              </p>
            )}
          </div>

          {/* date */}
          <div>
            <label
              htmlFor="date"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              التاريخ
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              className="w-full h-12 px-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-teal-500"
              required
            />
            {actionData?.errors?.date && (
              <p className="text-red-500 text-sm">{actionData.errors.date}</p>
            )}
          </div>
          {/* contactInfo */}
          <div>
            <label
              htmlFor="contactInfo"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              بيانات التواصل
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              className="w-full h-12 px-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-teal-500"
              placeholder="رقم هاتف أو بريد إلكتروني"
              required
            />
            {actionData?.errors?.contactInfo && (
              <p className="text-red-500 text-sm">
                {actionData.errors.contactInfo}
              </p>
            )}
          </div>
          {/* زر الإرسال */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-1/2 bg-teal-600 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 hover:bg-teal-700 transition-transform hover:scale-105"
            >
              <FaPaperPlane />
              <span>{isSubmitting ? "جاري الإرسال..." : "إرسال البلاغ"}</span>
            </button>
            {actionData?.message && (
              <p className="text-red-500 text-sm mt-2">{actionData.message}</p>
            )}
            {actionData?.success && (
              <p className="text-green-500 text-sm mt-2">
                تم إرسال البلاغ بنجاح!
              </p>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddReportPage;

// داخل AddReportPage.jsx أو ملف منفصل مثلاً actions/AddReportAction.js

export async function addReportAction({ request }) {
  const formData = await request.formData();

  const image = formData.get("image");
  const metadata = formData.get("metadata");
  const location = formData.get("location");
  const date = formData.get("date");
  const contactInfo = formData.get("contactInfo");
  const type = formData.get("type");
  console.log("formdata :", image, metadata, location, date, contactInfo, type);
  const errors = {};

  if (!image || image.size === 0) errors.image = "هذا الحقل مطلوب";
  if (!metadata) errors.metadata = "هذا الحقل مطلوب";
  if (!location) errors.location = "هذا الحقل مطلوب";
  if (!date) errors.date = "هذا الحقل مطلوب";
  if (!contactInfo) errors.contactInfo = "هذا الحقل مطلوب";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  console.log("formd :", formData.entries());
  try {
    const response = await fetch("/api/LostItem/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "فشل في إرسال البلاغ.");
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.message || "حدث خطأ غير متوقع.",
    };
  }
}
