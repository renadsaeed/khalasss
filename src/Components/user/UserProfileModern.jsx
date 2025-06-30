import React, { useEffect, useState, useRef } from "react";
import Helpdetails from "../HelpComponent/Helpdetails";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdPersonSearch } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { Link } from "react-router-dom";
import tyarijatBg from "../tyarijat.png";
import { getAuthToken } from "../../util/auth";
import { useParams } from "react-router-dom";

const StarRow = ({ rating }) => (
  <div style={{ display: "flex", flexDirection: "row-reverse", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        style={{ color: i <= rating ? "#009688" : "#ccc", fontSize: 24 }}
      >
        ★
      </span>
    ))}
  </div>
);

const UserProfileModern = () => {
  const [user, setUser] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [loadingParticipations, setLoadingParticipations] = useState(true);
  const [assistances, setAssistances] = useState([]);
  const [loadingAssistances, setLoadingAssistances] = useState(true);
  const detailsRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 👈 استرجاع بيانات الجمعية
    }
  }, []);

  if (!user) {
    console.log("user is null");
  }
  console.log("user ID هو:");

  const openModal = (item) => {
    setSelectedItem(item);
    detailsRef.current?.showModal();
  };

  const closeModal = () => {
    detailsRef.current?.close();
  };
  useEffect(() => {
    const token = getAuthToken();

    fetch("https://waslalkhair.runasp.net/api/Users/participations", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const text = await res.text();
        if (!text) return [];
        return JSON.parse(text);
      })
      .then((data) => {
        setParticipations(data);
        setLoadingParticipations(false);
      })
      .catch((err) => {
        setLoadingParticipations(false);
      });
    console.log("participations info", participations);
    // جلب المساعدات
    // استبدليه بالـ id الديناميكي إذا كان متوفر

    // جلب بيانات المستخدم
    fetch(`https://waslalkhair.runasp.net/api/User/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setUser(data.result);
      });
  }, []);
  useEffect(() => {
    if (!user?.id) return;

    const token = getAuthToken();

    fetch(
      `https://waslalkhair.runasp.net/api/Assistance/GetAssistancesByUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
      .then(async (res) => {
        const text = await res.text();
        if (!text) return [];
        return JSON.parse(text);
      })
      .then((data) => {
        setAssistances(data.assistances || []);
        setLoadingAssistances(false);
      })
      .catch((err) => {
        setLoadingAssistances(false);
      });
  }, [user]);

  console.log("assistances info", assistances);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = () => {
    if (!user?.id) return;
    const token = getAuthToken();

    fetch(`https://waslalkhair.runasp.net/api/Reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const text = await res.text();
        if (!text) return [];
        return JSON.parse(text);
      })
      .then((data) => {
        setReviews(data.result || []);
        setLoadingReviews(false);
      })
      .catch((err) => {
        setLoadingReviews(false);
      });
  };

  useEffect(() => {
    if (user?.id) {
      fetchReviews();
    }
  }, [user?.id]);
  console.log("reviwes", reviews);

  // بعد إضافة تقييم جديد بنجاح:
  const handleAddReview = () => {
    // ... كود الإضافة
    // بعد نجاح الإضافة:
    fetchReviews(); // إعادة جلب التقييمات
  };

  return (
    <div>
      {/* معلومات المستخدم والتقييم */}
      {user ? (
        <div className="flex justify-start items-center my-10">
          <div className="flex flex-row items-center gap-10">
            <img
              src={user?.image || "صورة"}
              alt="user"
              className="w-32 h-32 rounded-full object-cover mr-6 border-4 border-white shadow-lg"
            />
            <div className="text-right">
              <div className="font-bold text-3xl text-[#183153]">
                {user.fullName || "اسم المستخدم"}
              </div>
              <div className="text-xl my-2">
                {user.phoneNumber || "رقم الهاتف"}
              </div>
              <div className="text-gray-500 text-lg">
                {user.email || "الإيميل"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center my-10 text-gray-500 text-xl">
          جاري تحميل بيانات المستخدم...
        </div>
      )}

      <h2
        style={{
          textAlign: "center",
          color: "#183153",
          fontWeight: "bold",
          fontSize: 32,
          margin: "30px 0",
        }}
      >
        قدم
      </h2>

      {/* كروت المشاركات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loadingParticipations ? (
          <div>جاري تحميل المشاركات...</div>
        ) : participations.length === 0 ? (
          <div>لا توجد مشاركات حتى الآن.</div>
        ) : (
          participations.map((item) => (
            <div key={item.id} className="card shadow-md rounded-lg bg-white">
              <h2 className="text-2xl font-bold text-center mt-4 mb-2 text-[#183153]">
                {item.title}
              </h2>
              <img
                src={item.photoUrl}
                alt={item.title}
                className="w-full h-60 object-cover rounded"
              />
              <div className="flex justify-between p-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-xl text-[#183153]" />
                    <span>
                      {item.startDate
                        ? new Date(item.startDate).toLocaleString("ar-EG", {
                            month: "long",
                          })
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiLocationOn className="text-xl text-[#183153]" />
                    <span>{item.location || "غير محدد"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPersonSearch className="text-xl text-[#183153]" />
                    <span>
                      {item.seatsAvailable
                        ? `${item.seatsAvailable} مقعد`
                        : "غير محدد"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoFlag className="text-xl text-[#183153]" />
                    <span>{item.createdBy?.fullName || "المنظم غير محدد"}</span>
                  </div>
                </div>
                <div className="self-center">
                  <Link to={`/Volantering/${item.id}`}>
                    <FaCircleArrowLeft className="text-3xl text-[#183153]" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* كروت المساعدات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loadingAssistances ? (
          <div>جاري تحميل المساعدات...</div>
        ) : assistances.length === 0 ? (
          <div>لا توجد مساعدات حتى الآن.</div>
        ) : (
          assistances.map((item) => {
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#bdbdbd] flex flex-col min-h-[260px] w-full max-w-md mx-auto overflow-hidden bg-[#f7f8fa]"
              >
                <div
                  className="flex-1 w-full flex flex-col items-center justify-center"
                  style={{
                    backgroundImage: `url(${tyarijatBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="bg-white rounded-lg px-4 py-6 text-center text-md font-bold w-[80%] z-10 text-[#183153]">
                    {item.title}
                  </div>
                </div>

                <button
                  onClick={() => openModal(item)}
                  className="w-full border-t border-[#bdbdbd] bg-white py-3 font-bold text-black rounded-b-2xl hover:bg-gray-100"
                >
                  عرض التفاصيل
                </button>
              </div>
            );
          })
        )}
      </div>
      {selectedItem && (
        <Helpdetails
          id={selectedItem.id}
          title={selectedItem.title}
          ref={detailsRef}
          rest={closeModal}
        />
      )}

      {/* 🟢 أضف Helpdetails هنا مباشرة بعد الmap */}

      <h2 className="text-2xl font-bold my-6 text-center text-[#183153]">
        التقييمات
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loadingReviews ? (
          <div>جاري تحميل التقييمات...</div>
        ) : reviews.length === 0 ? (
          <div>لا توجد تقييمات حتى الآن.</div>
        ) : (
          reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-6 min-w-[320px] max-w-[400px] flex flex-col items-start border border-[#f0f0f0] transition-transform hover:scale-105"
              style={{ boxShadow: "0 8px 24px #0001" }}
            >
              <div className="flex items-center gap-3 mb-2 w-full">
                <img
                  src={review.userImageUrl}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
                <span className="font-bold text-lg text-[#183153]">
                  {review.userName}
                </span>
              </div>
              <div className="flex justify-start w-full mb-2">
                <StarRow rating={review.rating} />
              </div>
              <div className="text-gray-600 text-md text-right w-full mt-2">
                {review.comment}
              </div>
              <div className="text-gray-400 text-xs mt-2">
                {new Date(review.createdAt).toLocaleDateString("ar-EG")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfileModern;
