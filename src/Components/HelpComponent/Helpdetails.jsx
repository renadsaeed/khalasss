import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories, initialData } from "./HelpsData";
import { AiOutlineClose } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import {
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaChevronDown,
} from "react-icons/fa";
import { getAuthToken } from "../../util/auth";

export default function Helpdetails({ id, ref, rest, title }) {
  const [rating, setRating] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false); // State for review section
  const [details, setDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);
  const [reviewMessage, setReviewMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const detailsdata = async () => {
      try {
        setLoadingDetails(true);
        const response = await fetch(
          `/api/Assistance/AssistanceWithCreatorDetails/${id}`
        );
        if (!response.ok) {
          throw new Error("فشل في جلب  تفاصيل المساعده");
        }

        const data = await response.json();
        console.log("detailsData :");
        console.log(data);
        setDetails(data.assistance);
        setCreatedAt(data.assistance.createdAt);

        console.log("details :");
      } catch (err) {
        setErrorDetails("حدث خطأ أثناء تحميل الأنواع، حاول لاحقًا.");
      } finally {
        setLoadingDetails(false);
      }
    };
    detailsdata();
  }, []);
  console.log("date :", createdAt);
  const handleSubmitReview = async () => {
    const comment = reviewe.current?.value?.trim();
    const token = getAuthToken();
    if (!comment || rating === 0) {
      setReviewMessage("يرجى إدخال تعليق وتقييم قبل الإرسال.");
      return;
    }

    try {
      setIsSubmitting(true);
      setReviewMessage(null);
      console.log("send :");
      console.log(rating, comment, details.createdById);
      const response = await fetch("/api/Reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify({
          targetUserId: details.createdById,
          rating,
          comment,
        }),
      });
      if ([401, 403, 500].includes(response.status)) {
        navigate("/error", {
          state: {
            message:
              "حدث خطأ أثناء المعالجة. الرجاء تسجيل الدخول أو المحاولة لاحقًا.",
          },
        });
      }

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setReviewMessage(" تم إرسال التقييم بنجاح.");
        reviewe.current.value = "";
        setRating(0);
        setIsReviewOpen(false); // تغلق بعد الإرسال لو حابب
      } else if (data?.errorMessages?.length > 0) {
        setReviewMessage(data.errorMessages[0]); // ❗ إظهار أول رسالة من السيرفر
      } else {
        setReviewMessage(" حدث خطأ أثناء إرسال التقييم.");
      }
    } catch (err) {
      setReviewMessage(" فشل الاتصال بالخادم.");
    } finally {
      setIsSubmitting(false);
    }
  };
  function formatDateToArabic(dateStr) {
    const date = new Date(dateStr);

    // تحويل التاريخ لأجزاء
    const day = date.getDate();
    const month = date.toLocaleString("ar-EG", { month: "long" });
    const year = date.getFullYear();

    return `تم النشر في ${day} ${month} ${year}`;
  }
  console.log("details :", details);

  const reviewe = useRef();
  return (
    <dialog
      ref={ref}
      className={`details-modal w-full max-w-2xl mx-auto mt-[40px] border-0 outline-0 custom-scrollbar p-0`}
    >
      {loadingDetails ? (
        <p className="text-gray-500 text-center">جاري تحميل الأنواع...</p>
      ) : errorDetails ? (
        <p className="text-red-500 text-center">{errorDetails}</p>
      ) : details && details.createdByName ? (
        <div className="relative rounded-2xl bg-white shadow-2xl px-8 sm:px-14 py-10 sm:py-12">
          <button
            onClick={rest}
            className="absolute left-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow text-gray-400 hover:text-red-500 hover:bg-gray-200 transition-all duration-200 focus:outline-none z-10"
          >
            <AiOutlineClose size={24} />
          </button>
          <div className="flex flex-col items-center mb-8 gap-2">
            <span className="text-[#0D8F75] text-4xl">
              {/* {categories.find((cat) => cat.id === category)?.icon} */}
            </span>
            <h2 className="text-2xl sm:text-3xl text-[#183153] font-black tracking-tight">
              {details.typeOfThisAssistance}
            </h2>
          </div>
          <div className="flex flex-col items-center gap-3 mb-6">
            <Link to={`/user/profile/${details.createdById}`}>
              <img
                src={details.createdByProfilePic || "/default-user.png"}
                alt="person"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-[#0D8F75] shadow transition-transform duration-300 hover:scale-110"
              />
            </Link>
            <Link
              to={`/user/${details.createdById}`}
              className="text-lg font-bold text-[#183153] hover:text-[#0D8F75] hover:underline"
            >
              {details.createdByName}
            </Link>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info-section bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-bold text-[#183153] mb-3 text-center">
              معلومات التواصل
            </h3>
            <div className="flex justify-around items-center">
              <a
                href={`tel:${details.contactInfo.phone}`}
                className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#0D8F75] transition-colors"
              >
                <FaPhoneAlt size={24} />
                <span className="text-sm font-medium">اتصال</span>
              </a>
              <a
                href={`mailto:${details.contactInfo.email}`}
                className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#0D8F75] transition-colors"
              >
                <FaEnvelope size={24} />
                <span className="text-sm font-medium">بريد إلكتروني</span>
              </a>
            </div>
          </div>
          {details.createdAt && (
            <div className="flex flex-row items-center gap-2 mb-3">
              <span className="text-[#214570] text-lg font-bold">
                تاريخ النشر
              </span>
              <span className="text-lg text-stone-700 font-medium">
                {formatDateToArabic(details.createdAt)}
              </span>
            </div>
          )}
          <div className="flex flex-row items-center gap-2 mb-3">
            <span className="text-[#214570] text-lg font-bold">
              عنوان الفرصة:
            </span>
            <span className="text-lg text-stone-700 font-medium">{title}</span>
          </div>
          <div className="flex flex-row items-start gap-2 mb-6">
            <span className="text-[#214570] text-lg font-bold">التفاصيل:</span>
            <span className="text-lg text-stone-700 font-medium">
              {details.description}
            </span>
          </div>

          <div className="hidden">
            <img
              alt="no-image"
              className="w-full max-w-xs border border-[#eee] shadow-2xl mt-6"
            />
          </div>

          {/* --- Review Toggle Button --- */}
          <button
            onClick={() => setIsReviewOpen(!isReviewOpen)}
            className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-lg text-gray-700 font-bold my-4 transition"
          >
            <span>لديك تجربة مع مقدم الفرصة</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isReviewOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* --- Collapsible Review Section --- */}
          {isReviewOpen && (
            <div className="review-section bg-gray-50 rounded-xl p-4">
              <div className="mb-6">
                <textarea
                  placeholder="اكتب تجربتك هنا..."
                  ref={reviewe}
                  className="w-full custom-scrollbar resize-none rounded-xl bg-white border border-gray-200 focus:border-[#0D8F75] focus:ring-2 focus:ring-[#0D8F75] outline-none transition min-h-[80px] text-lg shadow-sm placeholder-gray-400 text-[#183153] py-3 pr-3 text-right placeholder:text-right"
                ></textarea>
              </div>
              <div className="mb-6">
                <span className="text-[#214570] text-lg font-bold">
                  تقييم مقدم الفرصة:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={starValue}
                          className="hidden"
                          onClick={() => setRating(starValue)}
                        />
                        <FaStar
                          size={32}
                          color={starValue <= rating ? "#ffc107" : "#e4e5e9"}
                          className="cursor-pointer transition-transform duration-150 hover:scale-125"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="w-full bg-[#0D8F75] text-white py-3 rounded-md font-bold text-lg hover:bg-green-800 transition-colors"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
              </button>
              {reviewMessage === " تم إرسال التقييم بنجاح." ? (
                <p className="text-center mt-4 text-sm font-medium text-green-600">
                  {reviewMessage}
                </p>
              ) : (
                <p className="text-center mt-4 text-sm font-medium text-red-600">
                  {reviewMessage}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-500 text-center">
          لا توجد بيانات لعرضها حاليًا.
        </p>
      )}
    </dialog>
  );
}
