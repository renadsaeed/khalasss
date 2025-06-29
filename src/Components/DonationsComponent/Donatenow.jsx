import { loadStripe } from "@stripe/stripe-js";
import { useState, useRef, useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiGiftBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import IconEye from "../../assets/icon-eye.svg";
import IconUsers from "../../assets/icon-users.svg";
import Hand1 from "../../assets/hand1 1.svg";
import Group12130 from "../../assets/Group 12130.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";

// تهيئة Stripe بمفتاح API الخاص بك
const stripePromise = loadStripe(
  "pk_test_51RZ3hdDA4Wy2GWeknjsiBCPURn8YHuPDx0TFOKYdYuKzUcW78UUvxF9x2VgnSxCN0LSl01jn8jXAwboCBuBrhcLZ009AOVHDdr"
);

export default function DonateNow() {
  const location = useLocation();
  const { id } = location.state || {};

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [showAmount, setShowAmount] = useState(true);
  const [showOpportunity, setShowOpportunity] = useState(true);
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://waslalkhair.runasp.net/api/DonationOpportunity/${id}`)
        .then((res) => {
          setDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "An error occurred");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No ID provided to fetch details.");
    }
  }, [id]);

  // حالة إظهار فورم التبرع عن الأهل
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  // حالة إظهار فورم التبرع عن شخص آخر
  const [showOtherPersonForm, setShowOtherPersonForm] = useState(false);
  // مرجع لحقل المبلغ
  const inputfiled = useRef();

  if (loading) return <p className="text-center py-20">Loading details...</p>;
  if (error)
    return <p className="text-center py-20 text-red-500">Error: {error}</p>;
  if (!details) return <p className="text-center py-20">No details found.</p>;

  // تفاصيل الحالة
  const {
    title: Title,
    imageUrl: Image,
    description,
    collectedAmount,
    remainingAmount,
    pageVisits,
    numberOfDonors,
  } = details;
  const progress =
    (collectedAmount / (collectedAmount + (remainingAmount || 0))) * 100;

  // دالة التبرع
  const handleDonation = async () => {
    const stripe = await stripePromise;

    try {
      const amount = inputfiled.current.value || customAmount || 0;

      const requestData = {
        amount: amount,
        type: 3, // نوع الدفع
        opportunityId: id, // معرف الفرصة
        isGift: showFamilyForm, // هل هي هدية؟
      };

      // إذا كانت هدية، أضف تفاصيل الهدية
      if (showFamilyForm) {
        requestData.giftDetails = {
          recipientName: recipientName,
          recipientPhone: recipientPhone,
          showAmount: showAmount,
          showOpportunity: showOpportunity,
          donorName: donorName,
          donorPhone: donorPhone,
        };
      }

      const response = await axios.post(
        "https://waslalkhair.runasp.net/api/Payments/create-session",
        requestData
      );

      console.log("API Response:", response.data);

      const sessionId = response.data.stripeSessionId;

      if (!sessionId) {
        console.error("Invalid sessionId:", sessionId);
        alert("حدث خطأ أثناء إعداد جلسة الدفع. يرجى المحاولة مرة أخرى.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe Checkout Error:", error);
        alert("حدث خطأ أثناء إعادة التوجيه إلى الدفع.");
      }
    } catch (err) {
      console.error("Error creating payment session:", err);
      alert("حدث خطأ أثناء عملية الدفع. يرجى المحاولة لاحقًا.");
    }
  };

  // دالة لتحديد مبلغ سريع
  const handleQuickAmount = (amount) => {
    setCustomAmount("");
    if (inputfiled.current) {
      inputfiled.current.value = amount;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* عنوان الصفحة */}
      <p className="text-base sm:text-lg md:text-xl text-right font-medium p-3">
        تبرع الان/{details.category?.name || "عام"}/{Title || "فرصة تبرع"}
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* يمين الصفحة: تفاصيل الحالة */}
        <div className="w-full md:w-1/2 order-1 md:order-1 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg sm:text-xl font-bold">التفاصيل</p>
              <button className="text-[#159C88] text-2xl">
                <IoShareSocialOutline />
              </button>
            </div>
            {/* صورة الحالة */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 border-2 border-[#0D8F75] rounded-xl overflow-hidden mb-4">
              <img
                src={Image}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
            {/* شريط نسبة الإنجاز */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-[#159C88] h-3 rounded-full text-center text-white text-xs flex items-center justify-center"
                style={{ width: `${progress.toFixed(2)}%` }}
              >
                {progress.toFixed(2)}%
              </div>
            </div>
            {/* عنوان الحالة */}
            <p className="text-base sm:text-lg md:text-xl font-bold mb-1">
              {Title}
            </p>
            {/* وصف مختصر */}
            <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg">
              {description || "No description available."}
            </p>
            {/* إحصائيات مالية */}
            <div className="flex flex-col sm:flex-row justify-between bg-gray-50 rounded-lg p-3 mt-2 gap-4">
              <div className="text-center flex-1">
                <p className="text-gray-500 text-sm sm:text-base">تم جمع</p>
                <p className="text-[#159C88] font-bold text-lg">
                  {(collectedAmount || 0).toLocaleString()} جنيه
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-gray-500 text-sm sm:text-base">
                  المبلغ المتبقي
                </p>
                <p className="text-[#159C88] font-bold text-lg">
                  {(remainingAmount || 0).toLocaleString()} جنيه
                </p>
              </div>
            </div>
          </div>
          {/* إحصائيات إضافية */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex justify-around text-center">
              <div>
                <img
                  src={IconEye}
                  alt="visits"
                  className="mx-auto mb-2 w-8 h-8"
                />
                <p className="font-bold text-lg">{pageVisits || 0}</p>
                <p className="text-gray-500">مشاهدة</p>
              </div>
              <div>
                <img
                  src={IconUsers}
                  alt="donors"
                  className="mx-auto mb-2 w-8 h-8"
                />
                <p className="font-bold text-lg">{numberOfDonors || 0}</p>
                <p className="text-gray-500">متبرع</p>
              </div>
            </div>
          </div>
        </div>
        {/* يسار الصفحة: فورم التبرع */}
        <div className="w-full md:w-1/2 order-2 md:order-2 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            {/* مبلغ التبرع */}
            <p className="text-lg sm:text-xl font-bold mb-4 text-right">
              مبلغ التبرع
            </p>
            <div className="flex gap-2 mb-4 flex-col sm:flex-row">
              {/* أزرار مبالغ جاهزة */}
              {[10, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className="flex-1 border-2 border-gray-300 rounded-md py-2 text-base sm:text-lg font-semibold bg-white text-gray-800 hover:border-[#159C88] transition"
                  onClick={() => handleQuickAmount(amount)}
                >
                  <span className="ml-1">جنيه</span>
                  {amount}
                </button>
              ))}
            </div>
            {/* إدخال مبلغ آخر */}
            <div className="flex items-center mb-4">
              <input
                type="number"
                placeholder="قيمة المبلغ"
                ref={inputfiled}
                name="donation"
                className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0 text-base sm:text-lg"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
              <span className="mr-2 text-lg text-[#113452]">جنيه</span>
            </div>
            {/* تبرع عن الأهل */}
            <div className="mb-4 flex items-center w-full gap-2">
              <input
                type="checkbox"
                id="family-donation"
                className="accent-[#159C88] w-5 h-5 text-[#159C88]"
                checked={showFamilyForm}
                onChange={() => setShowFamilyForm((prev) => !prev)}
              />
              <span
                className={`font-semibold cursor-pointer leading-normal h-6 ${
                  showFamilyForm ? "text-[#117c6b]" : "text-[#159C88]"
                }`}
              >
                تبرع عن أهلك أو أصدقائك وشاركهم الأجر
              </span>
              <PiGiftBold className="text-2xl text-[#159C88] ml-6" />
            </div>

            {/* فورم التبرع عن الأهل */}
            {showFamilyForm && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 animate-fadeIn">
                {/* اسم المرسل */}
                <label className="block mb-1 font-bold text-right">
                  المرسل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="اسمك"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
                {/* رقم الجوال */}
                <label className="block mb-1 font-bold text-right">
                  رقم الجوال <span className="text-red-500">*</span>
                </label>
                <div className="flex mb-3">
                  <span className="flex items-center px-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700">
                    +20
                  </span>
                  <input
                    type="text"
                    placeholder="5XXXXXXXXX"
                    className="flex-1 border border-gray-300 rounded-r-md py-2 px-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    required
                  />
                </div>
                {/* اسم المرسل اليه */}
                <label className="block mb-1 font-bold text-right">
                  المرسل اليه<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="اسمه"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                />
                {/* رقم الجوال */}
                <label className="block mb-1 font-bold text-right">
                  رقم الجوال <span className="text-red-500">*</span>
                </label>
                <div className="flex mb-3">
                  <span className="flex items-center px-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700">
                    +20
                  </span>
                  <input
                    type="text"
                    placeholder="5XXXXXXXXX"
                    className="flex-1 border border-gray-300 rounded-r-md py-2 px-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    required
                  />
                </div>
                {/* خيارات رسالة التبرع */}
                <div className="mt-4">
                  <p className="font-bold text-right mb-2">
                    حدد ما تود إظهاره برسالة التبرع:
                  </p>
                  <div className="flex flex-wrap gap-4 items-center mb-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#159C88]"
                        checked={showAmount}
                        onChange={() => setShowAmount(!showAmount)}
                      />
                      إظهار مبلغ التبرع
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#159C88]"
                        checked={showOpportunity}
                        onChange={() => setShowOpportunity(!showOpportunity)}
                      />
                      إظهار اسم المشروع
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* زر تبرع الآن الكبير */}
            <button
              className={`w-full bg-[#159C88] text-white py-3 rounded-md font-bold mt-4 text-lg ${
                showFamilyForm &&
                (!donorName || !donorPhone || !recipientName || !recipientPhone)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleDonation}
              disabled={
                showFamilyForm &&
                (!donorName || !donorPhone || !recipientName || !recipientPhone)
              }
            >
              تبرع الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
