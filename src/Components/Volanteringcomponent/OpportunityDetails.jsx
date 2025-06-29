import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaTasks,
  FaShareAlt,
} from "react-icons/fa";
import Form from "./VolunteerForm";
import { useLocation } from "react-router-dom";
import { GiSkills } from "react-icons/gi";
import Swal from "sweetalert2";

const OpportunityDetails = () => {
  const data = useLoaderData();
  const opportunitydeatils = data.result;
  console.log("opportunity data :");
  console.log(opportunitydeatils);
  const start = new Date(opportunitydeatils.startDate);
  const end = new Date(opportunitydeatils.endDate);
  const diffInMs = end - start;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const startdate = new Date(opportunitydeatils.startDate);
  const arabicstartDate = startdate.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: opportunity.title,
          text: `تعرف على فرصة التطوع في ${opportunity.title}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "success",
        title: "تم نسخ الرابط",
        text: "تم نسخ رابط الفرصة إلى الحافظة.",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={opportunitydeatils.photoUrl}
                alt="opportunity img"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {opportunitydeatils.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {opportunitydeatils.createdBy.fullName}
                </p>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-3 border-r-4 border-blue-900 pr-4">
                      تفاصيل الفرصة
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="ml-3 text-blue-900" />
                        <span> من {arabicstartDate}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="ml-3 text-blue-900" />
                        <span>{opportunitydeatils.location}</span>
                      </div>
                      <div className="flex items-center">
                        {!opportunitydeatils.isClosed ? (
                          <span className="text-green-600 font-semibold">
                            الفرصة متاحة الآن
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            تم إغلاق الفرصة
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="ml-3 text-blue-900" />
                        <span> {opportunitydeatils.seatsAvailable}مقعد</span>
                      </div>
                      <div className="flex items-center">
                        <FaUserCircle className="ml-3 text-blue-900" />
                        <span> {opportunitydeatils.requiredAge}سنة</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-3 border-r-4 border-blue-900 pr-4">
                      <FaTasks className="inline-block ml-2" />
                      مهام المتطوع
                    </h2>
                    <ul className="list-disc pr-5 text-gray-600 space-y-1">
                      <li>{opportunitydeatils.tasks}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                معلومات التواصل
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-center">
                  <FaUserCircle className="ml-3 text-blue-900" />
                  {opportunitydeatils.createdBy.fullName}
                </p>
                <p className="flex items-center">
                  <FaPhone className="ml-3 text-blue-900" />
                  {opportunitydeatils.createdBy.phoneNumber}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="ml-3 text-blue-900" />
                  {opportunitydeatils.createdBy.email}
                </p>
              </div>
              <div className="flex justify-around mt-6">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-700 transition"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={28} />
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition"
                  aria-label="Telegram"
                >
                  <FaTelegram size={28} />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                هل أنت مستعد للمساعدة؟
              </h2>
              <Link
                to={`/Volantering/${opportunitydeatils.id}/form`}
                className="w-full text-white py-3 px-6 rounded-lg text-lg font-semibold transition inline-block"
                style={{
                  background: "linear-gradient(135deg, #2E8B57, #20B2AA)",
                  border: "none",
                }}
              >
                انضم إلينا الآن
              </Link>
              <button
                onClick={handleShare}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 text-lg font-semibold transition mt-4 flex flex-row items-center justify-center gap-2 border border-black"
              >
                <FaShareAlt className="text-2xl" style={{ color: "#214570" }} />
                <span className="font-bold">مشاركة الفرصة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;

export async function loader({ params, request }) {
  const id = params.opportunityId;
  const response = await fetch("/api/Opportunities/" + id);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: " could not fetch opportunity deatils" }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
