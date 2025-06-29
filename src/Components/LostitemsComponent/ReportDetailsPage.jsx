import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockItems, mockMatches } from "./data.js";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaInfoCircle,
  FaBrain,
  FaComments,
} from "react-icons/fa";

const ReportDetailsPage = () => {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id);
  const matches = mockMatches[id] || [];

  if (!item) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">لم يتم العثور على العنصر</h1>
        <Link to="/lost-and-found" className="text-teal-600 hover:underline mt-4 inline-block">
          العودة إلى صفحة المفقودات
        </Link>
      </div>
    );
  }

  const isLost = item.type === "lost";
  const cardTagColor = isLost ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";
  const cardTagText = isLost ? "مفقود" : "تم العثور عليه";
  const isOwner = true;

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
              <span className={`py-1 px-4 rounded-full text-sm font-semibold ${cardTagColor}`}>
                {cardTagText}
              </span>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3">
                <FaTag className="text-teal-500" />
                <strong>الفئة:</strong> {item.category}
              </p>
              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-teal-500" />
                <strong>تاريخ البلاغ:</strong> {item.date}
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-teal-500" />
                <strong>الموقع:</strong> {item.location}
              </p>
              <p className="flex items-center gap-3">
                <FaComments className="text-teal-500" />
                <strong>بيانات التواصل:</strong> {item.contactInfo || '---'}
              </p>
              <div className="pt-4 border-t">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><FaInfoCircle/> الوصف</h2>
                <p className="leading-relaxed">{item.metadata || item.description}</p>
              </div>
              {isOwner && (
                <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-transform hover:scale-105">
                  <span>تم الاسترجاع</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Matches Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBrain className="text-teal-500" />
              نتائج المطابقة
            </h2>
            {matches.length > 0 ? (
              <div className="space-y-4">
                {matches.map((match) => (
                  <div key={match.id} className="bg-gray-50 rounded-lg p-3 flex items-center gap-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <img src={match.imageUrl} alt={match.title} className="w-16 h-16 rounded-md object-cover"/>
                    <div className="flex-grow">
                      <h4 className="font-bold">{match.title}</h4>
                      <p className="text-sm text-gray-500">{match.location}</p>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-teal-600">{match.matchPercentage}%</div>
                        <div className="text-xs text-gray-500">تطابق</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                لا توجد عناصر مطابقة في الوقت الحالي. سيتم إشعارك عند وجود تطابق.
              </p>
            )}
             <button className="w-full mt-6 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition-transform hover:scale-105">
                <FaComments/>
                <span>تواصل مع المبلغ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsPage; 