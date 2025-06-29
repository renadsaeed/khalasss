import { useState, useRef } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiGiftBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import IconEye from "../../assets/icon-eye.svg";
import IconUsers from "../../assets/icon-users.svg";
import Hand1 from "../../assets/hand1 1.svg";
import Group12130 from "../../assets/Group 12130.svg";

export default function Donations() {
  // حالة إظهار فورم التبرع عن الأهل
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  // حالة إظهار فورم التبرع عن شخص آخر
  const [showOtherPersonForm, setShowOtherPersonForm] = useState(false);
  // حالة إظهار زر تبرع عن شخص آخر
  const [showOtherButton, setShowOtherButton] = useState(false);
  // مرجع لحقل المبلغ
  const inputfiled = useRef();
  // مصفوفة المرسل إليهم
  const [recipients, setRecipients] = useState([
    { name: "", phone: "", amount: "" },
  ]);

  // بيانات وهمية للعرض (يمكنك ربطها بالداتا الحقيقية)
  const Title = "الأجهزة التعليمية للطلاب المتعففين";
  const Image = "https://images.unsplash.com/photo-1513258496099-48168024aec0";
  const Category = "تعليم";
  const caseNumber = "P50664";
  const progress = 19; // نسبة الإنجاز
  const collected = 37533;
  const remaining = 164967;
  const visits = 845;
  const lastDonation = 2; // بالدقائق
  const operations = 1024;
  const beneficiaries = 41;
  const totalBeneficiaries = 225;

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* عنوان الصفحة */}
      <p className="text-base sm:text-lg md:text-xl text-right font-medium p-3">
        تبرع الان/{Category}/{Title}
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
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            {/* عنوان الحالة */}
            <p className="text-base sm:text-lg md:text-xl font-bold mb-1">
              {Title}
            </p>
            <p className="text-gray-500 mb-2 text-sm sm:text-base">
              رقم الحالة:{" "}
              <span className="text-[#159C88] font-bold">{caseNumber}</span>
            </p>
            {/* وصف مختصر */}
            <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg">
              يهدف المشروع إلى توفير الأجهزة التعليمية للطلاب والطالبات من أبناء
              الأسر المتعففة. ساهم بتبرعك في توفيرها لهم لتعينهم على إكمال
              مسيرتهم التعليمية.
            </p>
            {/* إحصائيات مالية */}
            <div className="flex flex-col sm:flex-row justify-between bg-gray-50 rounded-lg p-3 mt-2 gap-4">
              <div className="text-center flex-1">
                <p className="text-gray-500 text-sm sm:text-base">تم جمع</p>
                <p className="text-[#159C88] font-bold text-lg">
                  {collected.toLocaleString()} جنيه
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-gray-500 text-sm sm:text-base">
                  المبلغ المتبقي
                </p>
                <p className="text-[#159C88] font-bold text-lg">
                  {remaining.toLocaleString()} جنيه
                </p>
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
                  />
                </div>
                <button className="w-full bg-[#159C88] text-white py-2 rounded-md font-bold mb-4">
                  إرسال رمز التحقق
                </button>
                {/* فورمات المرسل إليهم */}
                {recipients.map((recipient, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-4 mb-4 relative"
                  >
                    <label className="block mb-1 font-bold text-right">
                      المرسل إليه <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="اسم التبرع عنه"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                    />
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
                      />
                    </div>
                    {/* مبلغ التبرع */}
                    <p className="font-bold mb-2">مبلغ التبرع</p>
                    <div className="flex gap-2 mb-3">
                      {[10, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          className="flex-1 border-2 border-gray-300 rounded-md py-2 text-lg font-semibold bg-white text-gray-800 hover:border-[#159C88] transition"
                        >
                          <span className="ml-1">جنيه</span>
                          {amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="مبلغ آخر"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                    />
                    {/* زر حذف فورم المرسل إليه إذا كان أكثر من واحد */}
                    {recipients.length > 1 && (
                      <button
                        type="button"
                        className="absolute left-2 top-2 text-red-500 text-xl font-bold"
                        onClick={() =>
                          setRecipients(recipients.filter((_, i) => i !== idx))
                        }
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {/* خيارات رسالة التبرع */}
                <div className="mt-4">
                  <p className="font-bold text-right mb-2">
                    حدد ما تود إظهاره برسالة التبرع:
                  </p>
                  <div className="flex flex-wrap gap-4 items-center mb-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" className="accent-[#159C88]" />
                      إظهار مبلغ التبرع
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" className="accent-[#159C88]" />
                      إظهار اسم المشروع
                    </label>
                  </div>
                </div>
                {/* زر تبرع الآن الكبير */}
                <button className="w-full bg-[#159C88] text-white py-3 rounded-md font-bold mt-4 text-lg">
                  تبرع الآن
                </button>
              </div>
            )}
            {/* فورم التبرع عن شخص آخر */}
            {showOtherPersonForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">للمرسل إليه</span>
                  <button
                    onClick={() => setShowOtherPersonForm(false)}
                    className="text-xl text-gray-400"
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="اسم التبرع عنه"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                />
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
                  />
                </div>
                {/* مبلغ التبرع */}
                <p className="font-bold mb-2">مبلغ التبرع</p>
                <div className="flex gap-2 mb-3">
                  {[10, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      className="flex-1 border-2 border-gray-300 rounded-md py-2 text-lg font-semibold bg-white text-gray-800 hover:border-[#159C88] transition"
                    >
                      <span className="ml-1">جنيه</span>
                      {amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="مبلغ آخر"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                />
                {/* خيارات رسالة التبرع */}
                <div className="flex flex-wrap gap-4 items-center mb-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="accent-[#159C88]" />
                    إظهار مبلغ التبرع
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="accent-[#159C88]" />
                    إظهار اسم المشروع
                  </label>
                </div>
                <button
                  className="w-full bg-[#159C88] text-white py-2 rounded-md font-bold flex items-center justify-center"
                  onClick={() => setShowOtherPersonForm(false)}
                >
                  <span className="ml-2">تبرع الآن</span>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M16 10l-4 4-4-4" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {/* إحصائيات الحالة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* عدد الزيارات */}
            <div className="bg-white border-l-4 border-[#41C1A6] rounded-lg p-3 shadow-sm flex items-center">
              <img src={IconEye} alt="eye icon" className="w-8 h-8 ml-3" />
              <div>
                <p className="text-gray-500 text-sm">الزيارات</p>
                <p className="font-bold text-lg">{visits} زيارة</p>
              </div>
            </div>

            {/* عدد عمليات التبرع */}
            <div className="bg-white border-l-4 border-[#41C1A6] rounded-lg p-3 shadow-sm flex items-center">
              <img
                src={Group12130}
                alt="operations icon"
                className="w-8 h-8 ml-3"
              />
              <div>
                <p className="text-gray-500 text-sm">عدد عمليات التبرع</p>
                <p className="font-bold text-lg">{operations} عملية</p>
              </div>
            </div>

            {/* آخر عملية تبرع (Centered) */}
            <div className="sm:col-span-2 flex justify-center">
              <div className="w-full sm:w-[calc(50%-0.5rem)]">
                <div className="bg-white border-l-4 border-[#41C1A6] rounded-lg p-3 shadow-sm flex items-center">
                  <img
                    src={Hand1}
                    alt="donation icon"
                    className="w-8 h-8 ml-3"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">آخر عملية تبرع قبل</p>
                    <p className="font-bold text-lg">{lastDonation} دقيقة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
