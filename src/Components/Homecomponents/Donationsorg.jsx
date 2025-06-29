import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiGiftBold } from "react-icons/pi";
import IconEye from '../../assets/icon-eye.svg';
import IconUsers from '../../assets/icon-users.svg';
import Hand1 from '../../assets/hand1 1.svg';
import Group12130 from '../../assets/Group 12130.svg';

export default function Donationsorg() {
  const location = useLocation();
  const state = location.state || {};
  // نفس منطق Donations
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [showOtherPersonForm, setShowOtherPersonForm] = useState(false);
  const [recipients, setRecipients] = useState([{ name: '', phone: '', amount: '' }]);
  const inputfiled = useRef();

  if (!state || !state.title) {
    return <div className="text-center text-red-500 mt-10">لا توجد بيانات لعرضها</div>;
  }

  // بيانات الحالة من state
  const Title = state.title;
  const Image = state.image;
  const Category = state.category;
  const caseNumber = state.id || '---';
  const progress = state.tragetprice && state.pricenow ? Math.round((state.pricenow / state.tragetprice) * 100) : 0;
  const collected = state.pricenow || 0;
  const remaining = state.tragetprice && state.pricenow ? state.tragetprice - state.pricenow : 0;
  // بيانات إحصائية افتراضية (يمكن ربطها لاحقاً)
  const visits = 845;
  const lastDonation = 2;
  const operations = 1024;
  const beneficiaries = 41;
  const totalBeneficiaries = 225;

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* عنوان الصفحة */}
      <p className="text-lg text-right font-medium p-3">
        تبرع الان/{Category}/{Title}
      </p>
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* يمين الصفحة: تفاصيل الحالة */}
        <div className="w-full lg:w-1/2 order-1 lg:order-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl font-bold">التفاصيل</p>
              <button className="text-[#159C88] text-2xl"><IoShareSocialOutline /></button>
            </div>
            {/* صورة الحالة */}
            <div className="relative w-full h-full border-2 border-[#0D8F75] rounded-xl overflow-hidden mb-4">
              <img src={Image} alt="img" className="w-full h-48 object-cover" />
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
            {/* عنوان الحالة مع مقدمة من الجمعية */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-lg font-bold mb-0">{Title} مع</p>
              <Link to="/Organization" className="text-[#159C88] font-bold text-lg hover:underline cursor-pointer">
                جمعية {state.organization}
              </Link>
            </div>
            <p className="text-gray-500 mb-2">رقم الحالة: <span className="text-[#159C88] font-bold">{caseNumber}</span></p>
            {/* وصف مختصر */}
            <p className="text-gray-700 mb-4">
              {state.description || 'يسعى المشروع الى توفير السلال الغذائيه للاسر المتعففه ساهم بتبرعك الى توفير مواد الغذاء الاساسيه'}
            </p>
            {/* إحصائيات مالية */}
            <div className="flex justify-between bg-gray-50 rounded-lg p-3 mt-2">
              <div className="text-center">
                <p className="text-gray-500">تم جمع</p>
                <p className="text-[#159C88] font-bold text-lg">{collected.toLocaleString()} جنيه</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">المبلغ المتبقي</p>
                <p className="text-[#159C88] font-bold text-lg">{remaining.toLocaleString()} جنيه</p>
              </div>
            </div>
          </div>
        </div>
        {/* يسار الصفحة: فورم التبرع */}
        <div className="w-full lg:w-1/2 order-2 lg:order-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {/* مبلغ التبرع */}
            <p className="text-xl font-bold mb-4 text-right">مبلغ التبرع</p>
            <div className="flex gap-2 mb-4">
              {[10, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className="flex-1 border-2 border-gray-300 rounded-md py-2 text-lg font-semibold bg-white text-gray-800 hover:border-[#159C88] transition"
                >
                  <span className="ml-1">جنيه</span>{amount}
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
                className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
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
                className={`font-semibold cursor-pointer leading-normal h-6 ${showFamilyForm ? 'text-[#117c6b]' : 'text-[#159C88]'}`}
              >
                تبرع عن أهلك أو أصدقائك وشاركهم الأجر
              </span>
            </div>
            {/* فورم التبرع عن الأهل */}
            {showFamilyForm && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 animate-fadeIn">
                {/* اسم المرسل */}
                <label className="block mb-1 font-bold text-right">المرسل <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="اسمك"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                />
                {/* رقم الجوال */}
                <label className="block mb-1 font-bold text-right">رقم الجوال <span className="text-red-500">*</span></label>
                <div className="flex mb-3">
                  <span className="flex items-center px-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700">+20</span>
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
                      <span className="ml-1">جنيه</span>{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="مبلغ آخر"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                />
                {/* خيارات رسالة التبرع */}
                <div className="mt-4">
                  <p className="font-bold text-right mb-2">حدد ما تود إظهاره برسالة التبرع:</p>
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
                <button className="w-full bg-[#159C88] text-white py-3 rounded-md font-bold mt-4 text-lg">تبرع الآن</button>
              </div>
            )}
            {/* فورم التبرع عن شخص آخر */}
            {showOtherPersonForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">للمرسل إليه</span>
                  <button onClick={() => setShowOtherPersonForm(false)} className="text-xl text-gray-400">×</button>
                </div>
                <input
                  type="text"
                  placeholder="اسم التبرع عنه"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:ring-2 focus:ring-[#159C88] focus:border-[#159C88] transition outline-0"
                />
                <label className="block mb-1 font-bold text-right">رقم الجوال <span className="text-red-500">*</span></label>
                <div className="flex mb-3">
                  <span className="flex items-center px-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700">+20</span>
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
                      <span className="ml-1">جنيه</span>{amount}
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
                <button className="w-full bg-[#159C88] text-white py-2 rounded-md font-bold flex items-center justify-center"
                  onClick={() => setShowOtherPersonForm(false)}>
                  <span className="ml-2">تبرع الآن</span>
                  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 10l-4 4-4-4"/></svg>
                </button>
              </div>
            )}
          </div>
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
              <img src={Group12130} alt="operations icon" className="w-8 h-8 ml-3" />
              <div>
                <p className="text-gray-500 text-sm">عدد عمليات التبرع</p>
                <p className="font-bold text-lg">{operations} عملية</p>
              </div>
            </div>
            <div className="sm:col-span-2 flex justify-center">
              <div className="w-full sm:w-[calc(50%-0.5rem)]">
                <div className="bg-white border-l-4 border-[#41C1A6] rounded-lg p-3 shadow-sm flex items-center">
                  <img src={Hand1} alt="donation icon" className="w-8 h-8 ml-3" />
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
