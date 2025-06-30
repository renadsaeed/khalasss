import React, { useState, useEffect, useRef } from "react";
import Helpdetails from "../HelpComponent/Helpdetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../util/auth";
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

export default function UserProfile() {
  const navigate = useNavigate();
  const [showDonations, setShowDonations] = useState(true);
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [showVolunteering, setShowVolunteering] = useState(true);
  const [showHelps, setShowHelps] = useState(true);
  const [volunteering, setVolunteering] = useState([]);
  const [loadingVolunteering, setLoadingVolunteering] = useState(true);
  const [helps, setHelps] = useState([]);
  const [loadingHelps, setLoadingHelps] = useState(true);
  const [lostItems, setLostItems] = useState({ results: [] });
  const [loadingLostItems, setLoadingLostItems] = useState(true);
  const [showLostItems, setShowLostItems] = useState(true);
  const [showLost, setShowLost] = useState(true);
  const [showFound, setShowFound] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({
    name: "اسم المستخدم",
    img: "/user.png",
  });
  const token = getAuthToken();
  const detailsRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    detailsRef.current?.showModal();
  };

  const closeModal = () => {
    detailsRef.current?.close();
  };
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
  // useEffect(() => {
  //   fetch(`https://waslalkhair.runasp.net/api/User/${user.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.result) {
  //         setUser({
  //           name: data.result.fullName,
  //           img: data.result.image || "/user.png",
  //         });
  //       }
  //     });

  //   fetch("https://waslalkhair.runasp.net/api/Donation", {
  //     headers: {
  //       Authorization: ` Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(async (res) => {
  //       const text = await res.text();
  //       if (!text) return [];
  //       return JSON.parse(text);
  //     })
  //     .then((data) => {
  //       console.log("Fetched donations from API:", data);
  //       setDonations(Array.isArray(data.donations) ? data.donations : []);
  //       setLoadingDonations(false);
  //     })
  //     .catch((err) => {
  //       setLoadingDonations(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("https://waslalkhair.runasp.net/api/Users/participations", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(async (res) => {
  //       const text = await res.text();
  //       if (!text) return [];
  //       return JSON.parse(text);
  //     })
  //     .then((data) => {
  //       console.log("Fetched volunteering:", data); // عرض بيانات التطوع في الكونسول
  //       setVolunteering(data);
  //       setLoadingVolunteering(false);
  //     })
  //     .catch((err) => {
  //       setLoadingVolunteering(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   const userId = "6722bc9c-7aa6-457d-81fc-33f64e308e3d";
  //   fetch(
  //     `https://waslalkhair.runasp.net/api/Assistance/GetAssistancesByUser/${user.id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //       },
  //     }
  //   )
  //     .then(async (res) => {
  //       const text = await res.text();
  //       if (!text) return [];
  //       return JSON.parse(text);
  //     })
  //     .then((data) => {
  //       console.log("Fetched helps:", data.assistances); // عرض بيانات المساعدات في الكونسول
  //       setHelps(data.assistances || []);
  //       setLoadingHelps(false);
  //     })
  //     .catch((err) => {
  //       setLoadingHelps(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("https://waslalkhair.runasp.net/api/LostItem/my-items", {
  //     headers: {
  //       Authorization: ` Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(async (res) => {
  //       const text = await res.text();
  //       if (!text) return [];
  //       return JSON.parse(text);
  //     })
  //     .then((data) => {
  //       console.log("Fetched lost items:", data);
  //       setLostItems({ results: data.results || [] }); // ✅ التعديل هنا
  //       setLoadingLostItems(false);
  //     })
  //     .catch((err) => {
  //       setLoadingLostItems(false);
  //     });
  // }, []);

  const totalDonations = donations.reduce(
    (sum, don) => sum + (don.amount || 0),
    0
  );
  const totalVolunteering = volunteering.length;
  const totalHelps = helps.length;

  const handleDelete = async (itemId) => {
    console.log("TOKEN USED FOR DELETE:", token);
    try {
      await axios.delete(
        `https://waslalkhair.runasp.net/api/LostItem/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      // تحديث الـ state لإزالة العنصر من الصفحة
      setLostItems((prev) => ({
        ...prev,
        results: prev.results.filter((item) => item.itemId !== itemId),
      }));
    } catch (error) {
      console.error("AxiosError:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const handleMarkResolved = async (itemId) => {
    try {
      await axios.put(
        `https://waslalkhair.runasp.net/api/LostItem/${itemId}/mark-resolved`,
        {}, // إذا كان الـ API لا يحتاج body أرسل {}
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // تحديث الـ state محلياً ليظهر "تم الاسترجاع"
      setLostItems((prev) => ({
        ...prev,
        results: prev.results.map((item) =>
          item.itemId === itemId ? { ...item, isResolved: true } : item
        ),
      }));
    } catch (error) {
      console.error("Axios error:", error, error?.response);
      alert(
        "حدث خطأ أثناء التحديث: " +
          (error?.response?.status
            ? error.response.status +
              " - " +
              (error.response.data?.message || "")
            : error.message)
      );
    }
  };
  useEffect(() => {
    if (!user?.id) return;
    const fetchAllData = async () => {
      try {
        // 1️⃣ بيانات المستخدم
        const userRes = await fetch(`/api/User/${user.id}`);
        const userData = await userRes.json();
        if (userData.result) {
          setUser({
            name: userData.result.fullName,
            img: userData.result.image || "/user.png",
          });
        }
        console.log("userData", userData.result);

        // 2️⃣ التبرعات
        const donationRes = await fetch("/api/Donation", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        console.log("donationData ", donationRes);
        const donationText = await donationRes.text();
        console.log("donationData text", donationText);
        const donationData = donationText ? JSON.parse(donationText) : [];
        console.log("donationData1111", donationData);
        setDonations(
          Array.isArray(donationData.donations) ? donationData.donations : []
        );
        console.log("donationData", donationData.donations);
        setLoadingDonations(false);

        // 3️⃣ التطوع
        const volRes = await fetch("/api/Users/participations", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const volText = await volRes.text();
        const volData = volText ? JSON.parse(volText) : [];
        setVolunteering(volData);
        console.log("volantering data ", volData);
        setLoadingVolunteering(false);

        // 4️⃣ المساعدات
        const helpsRes = await fetch(
          `/api/Assistance/GetAssistancesByUser/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const helpsText = await helpsRes.text();
        const helpsData = helpsText ? JSON.parse(helpsText) : [];
        setHelps(helpsData.assistances || []);
        console.log("helpsData", helpsData.assistances);
        setLoadingHelps(false);

        // 5️⃣ المفقودات
        const lostRes = await fetch("/api/LostItem/my-items", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const lostText = await lostRes.text();
        const lostData = lostText ? JSON.parse(lostText) : [];
        setLostItems({ results: lostData.results || [] });
        console.log("setLostItems", lostData.results);
        setLoadingLostItems(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [user?.id]);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = () => {
    if (!user?.id) return;
    const token = getAuthToken();

    fetch(`https://waslalkhair.runasp.net/api/Reviews/${user.id}`, {
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

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      {/* User Info & Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={user.img}
            alt="user"
            className="w-36 h-36 rounded-full border-4 border-white shadow-md"
          />
          <div className="text-right md:mr-4">
            <div className="font-bold text-2xl md:text-3xl text-[#113452]">
              {user.name}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button
            className="bg-[#159C88] text-white px-6 py-2 rounded-md font-bold border border-[#117c6b] hover:bg-[#117c6b] transition-colors"
            onClick={() => navigate(`/EditUserProfile/${user?.id}`)}
          >
            تعديل الملف الشخصي
          </button>
        </div>
      </div>
      {/* Donations Section */}
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 focus:outline-none"
          onClick={() => setShowDonations((prev) => !prev)}
        >
          <span className="text-2xl font-bold text-[#214570]">تبرعاتي</span>
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              showDonations ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showDonations && (
          <>
            {/* عرض عدد التبرعات والإجمالي */}
            <div className="flex flex-col items-center mb-4">
              <div className="text-xl font-bold text-[#113452]">
                عدد التبرعات: {Array.isArray(donations) ? donations.length : 0}
              </div>
              <div className="text-xl font-bold text-[#159C88]">
                إجمالي التبرعات:{" "}
                {Array.isArray(donations)
                  ? donations.reduce((sum, don) => sum + (don.amount || 0), 0)
                  : 0}{" "}
                جنيه
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingDonations ? (
                <div>جاري تحميل التبرعات...</div>
              ) : Array.isArray(donations) && donations.length === 0 ? (
                <div>لا توجد تبرعات حتى الآن.</div>
              ) : (
                Array.isArray(donations) &&
                donations.map((don, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 border border-gray-200"
                  >
                    <img
                      src={don.opportunityImage || "/ormanlogo.png"}
                      alt="donation"
                      className="w-40 h-32 object-contain mb-4"
                    />
                    <div className="font-bold text-center mb-4 text-[#113452]">
                      {don.opportunityTitle || don.title}
                    </div>
                    <div className="text-gray-500 mb-2">{don.amount} جنيه</div>
                    <button className="bg-[#159C88] text-white px-8 py-2 rounded-md font-bold hover:bg-[#117c6b] transition-colors">
                      تبرعت
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      {/* Volunteering Section */}
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 focus:outline-none"
          onClick={() => setShowVolunteering((prev) => !prev)}
        >
          <span className="text-2xl font-bold text-[#214570]">تطوعت في</span>
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              showVolunteering ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {showVolunteering && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingVolunteering ? (
              <div>جاري تحميل بيانات التطوع...</div>
            ) : volunteering.length === 0 ? (
              <div>لا توجد مشاركات تطوعية حتى الآن.</div>
            ) : (
              volunteering.map((vol, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-8 min-w-[270px] border border-gray-200"
                >
                  <img
                    src={vol.image || "/OIP.jpg"}
                    alt="volunteering"
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                  />
                  <div className="font-bold text-center text-lg mb-2 text-[#113452]">
                    {vol.title}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm justify-between w-full mb-2">
                    <span>
                      📅 {vol.startDate} - {vol.endDate}
                    </span>
                  </div>
                  <button className="bg-[#159C88] text-white px-8 py-2 rounded-md font-bold border border-[#117c6b] mt-2 cursor-default">
                    {vol.status || "مكتمل"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* Helps Section */}
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 focus:outline-none"
          onClick={() => setShowHelps((prev) => !prev)}
        >
          <span className="text-2xl font-bold text-[#214570]">مساعداتك</span>
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              showHelps ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {showHelps && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {loadingHelps ? (
              <div>جاري تحميل المساعدات...</div>
            ) : helps.length === 0 ? (
              <div>لا توجد مساعدات حتى الآن.</div>
            ) : (
              helps.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#bdbdbd] flex flex-col min-h-[260px] w-full max-w-md mx-auto overflow-hidden bg-[#f7f8fa]"
                >
                  <div
                    className="flex-1 w-full flex flex-col items-center justify-center"
                    style={{
                      // backgroundImage: `url(${imageUrl})`,
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
              ))
            )}
          </div>
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

      {/* Lost Items Section */}
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 focus:outline-none"
          onClick={() => setShowLost((prev) => !prev)}
        >
          <span className="text-2xl font-bold text-[#214570]">
            مفقودات ومعثورات
          </span>
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              showLost ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {showLost && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingLostItems ? (
              <div>جاري تحميل البيانات...</div>
            ) : lostItems.results.length === 0 ? (
              <div>لا توجد معثورات أو مفقودات حتى الآن.</div>
            ) : (
              lostItems.results.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 border border-gray-200"
                >
                  <img
                    src={item.imagePath || "/default.png"}
                    alt="lost"
                    className="w-40 h-32 object-contain mb-4"
                  />
                  <div className="font-bold text-center mb-2 text-[#113452]">
                    {item.title}
                  </div>
                  <div className="text-gray-500 mb-2">{item.description}</div>
                  <div className="text-gray-400 text-sm mb-2">
                    {item.isResolved ? "تم الاسترجاع" : "مفقود"}
                  </div>
                  <div className="flex gap-2 w-full justify-center mt-2">
                    <button
                      className="bg-[#159C88] text-white px-8 py-2 rounded-md font-bold hover:bg-[#117c6b] transition-colors"
                      onClick={() => handleDelete(item.itemId)}
                    >
                      حذف
                    </button>
                    <button
                      className="bg-[#159C88] text-white px-8 py-2 rounded-md font-bold hover:bg-[#117c6b] transition-colors"
                      onClick={() => handleMarkResolved(item.itemId)}
                      disabled={item.isResolved}
                    >
                      تم الاسترجاع
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* Impact Section */}
      <div className="w-full mt-12">
        <h2 className="text-3xl font-bold text-[#214570] text-center mb-2">
          تأثيرك
        </h2>
        <div className="text-center text-lg mb-8 font-semibold text-[#159C88]">
          شاهد كيف تحدث فرقاً
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#214570] mb-1">
              {totalDonations} جنيه
            </div>
            <div className="text-gray-500">مبلغ التبرع</div>
          </div>
          <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#214570] mb-1">
              {totalVolunteering} مرات
            </div>
            <div className="text-gray-500">عدد مرات التطوع</div>
          </div>
          <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#214570] mb-1">
              {totalHelps} مرات
            </div>
            <div className="text-gray-500">عدد المساعدات</div>
          </div>
        </div>
        {/* User Reviews */}
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
    </div>
  );
}
