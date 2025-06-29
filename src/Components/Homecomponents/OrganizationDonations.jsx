import { useState } from "react";
import { Organizationsdata } from "../Organizations/Organizationdata";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import IconEye from '../../assets/icon-eye.svg';
import IconUsers from '../../assets/icon-users.svg';
import Hand1 from '../../assets/hand1 1.svg';
import Group12130 from '../../assets/Group 12130.svg';

export default function OrganizationDonations() {
  const location = useLocation();
  const state = location.state || {}; // fallback فاضي لو مفيش داتا

  // console.log("Received state:", state); // اطبعها في الكونسول عشان تتأكد

  const allData = Object.values(Organizationsdata).flatMap((org) => org.data);

  const filteredData = allData.filter(
    (item) => item.category === state.Category
  );
  console.log(filteredData);

  return (
    <>
      <div className="page-container  w-[85%] p-3  mx-auto   ">
        <div className=" p-6 mb-9 mt-4">
          <h2 className="text-semibold text-2xl">
            تبرع لمشاريع {state.Category}
          </h2>
          <p className="mt-1 text-xl">
            تبرعك اليوم يساهم في تخفيف معاناه الاسر المحتاجه ويمنحهم الامل ف
            حياه كريمه
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col items-center p-6 sm:p-8 mb-8 hover:shadow-lg transition-all w-full max-w-xs mx-auto"
            >
              {/* شعار الجمعية */}
              <img
                src={Organizationsdata[item.organization]?.logo}
                alt="logo"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mb-4 mt-2"
              />
              {/* عنوان المشروع */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                {item.title}
              </h3>
              {/* وصف مختصر */}
              <p className="text-gray-600 text-center mb-6 min-h-[60px] text-sm sm:text-base md:text-lg">
                {item.description || "ساهم مع الجمعية في دعم الأسر الفقيرة وتوصيل المياه أو الغذاء أو الرعاية لهم."}
              </p>
              {/* زر التبرع */}
              <Link
                state={{
                  title: item.title,
                  category: item.category,
                  place: item.place,
                  id: item.id,
                  tragetprice: item.tragetprice,
                  pricenow: item.pricenow,
                  organization: item.organization,
                  secation: item.secation,
                  image: item.image,
                  number: item.number,
                }}
                to="/Donationsorg"
                className="block w-full"
              >
                <button className="w-full max-w-xs mx-auto bg-[#159C88] text-white font-bold py-3 rounded-xl text-base sm:text-lg md:text-xl hover:bg-[#0D8F75] transition-colors duration-200 mt-2">
                  تبرع الآن
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
