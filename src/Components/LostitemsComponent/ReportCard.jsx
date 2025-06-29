import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const IMAGE_BASE_URL = "https://waslalkhair.runasp.net/images/";
const DEFAULT_ITEM_IMAGE = "/public/images.png"; // adjust path if needed
const DEFAULT_AVATAR = "/public/profile-icon-9.png"; // adjust path if needed

const ReportCard = ({ item, onCardClick }) => {
  // Normalize type (backend may send 0/1 or 'lost'/'found')
  const isLost = item.type === 0 || item.type === "lost";
  const cardBorderColor = isLost ? "border-red-500" : "border-green-500";
  const cardTagColor = isLost ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";
  const cardTagText = isLost ? "مفقود" : "تم العثور عليه";

  // Handle image URL
  let imageUrl = item.image;
  if (!imageUrl) {
    imageUrl = DEFAULT_ITEM_IMAGE;
  } else if (!imageUrl.startsWith("http")) {
    imageUrl = IMAGE_BASE_URL + imageUrl;
  }

  // Handle user avatar
  let userAvatar = item.user?.avatar;
  if (!userAvatar) {
    userAvatar = DEFAULT_AVATAR;
  } else if (!userAvatar.startsWith("http")) {
    userAvatar = IMAGE_BASE_URL + userAvatar;
  }

  // User name/email/phone fallback
  const userName = item.user?.name || item.user?.fullName || "مستخدم مجهول";
  const userEmail = item.user?.email || item.contactInfo || "غير متوفر";
  const userPhone = item.user?.phone || item.user?.phoneNumber || item.contactInfo || "غير متوفر";
  // تاريخ البلاغ
  const reportDate = item.date || "غير متوفر";

  const CardContent = () => (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-t-4 ${cardBorderColor}`}
      onClick={() => onCardClick(item)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.imagePath}
          alt={item.title || "صورة العنصر"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={e => { e.target.src = DEFAULT_ITEM_IMAGE; }}
        />
        <div
          className={`absolute top-2 right-2 text-xs font-bold py-1 px-3 rounded-full ${cardTagColor}`}
        >
          {cardTagText}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {item.title || item.metadata || "---"}
        </h3>
        <p className="text-sm text-gray-500 mt-2 flex items-center">
          <FaMapMarkerAlt className="ml-2 text-gray-400" />
          {item.location || "---"}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <img src={userAvatar} alt={userName} className="w-6 h-6 rounded-full ml-2 object-cover" onError={e => { e.target.src = DEFAULT_AVATAR; }} />
            <span>{userName}</span>
          </div>
          <span>{reportDate}</span>
        </div>
        <div className="flex flex-col gap-1 mt-2 text-xs text-gray-600 pl-8">
          {userEmail && (
            <span className="flex items-center">
              <FaEnvelope className="ml-1 text-green-700" />
              {userEmail}
            </span>
          )}
          {userPhone && (
            <span className="flex items-center">
              <FaPhone className="ml-1 text-green-700" />
              {userPhone}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // إذا كان العنصر مفقوداً، يظل الرابط فعالاً. إذا تم العثور عليه، يفتح المودال.
  return isLost ? (
    <Link to={`/report-details/${item.id || item.itemId}`} className="block group">
      <CardContent />
    </Link>
  ) : (
    <div className="block group cursor-pointer">
      <CardContent />
    </div>
  );
};

export default ReportCard;