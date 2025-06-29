import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReportCard from "./ReportCard";
import { fetchItemsByType, searchLostFoundByImage } from "./lostFoundService.jsx";
import { FaSearch, FaPlus, FaImage, FaFont, FaTimes, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { fetchLostItems, fetchFoundItems } from './lostFoundService.jsx';
import {getAuthToken} from "../../util/auth";
const LostAndFoundPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState(0); // 0 = مفقودات, 1 = معثورات
  const [searchMode, setSearchMode] = useState("metadata"); // 'metadata', 'image'
  const [searchImagePreview, setSearchImagePreview] = useState(null);
  const [searchImage, setSearchImage] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchItemsByType(type)
      .then(data => setItems(data.map(item => ({
        ...item,
        type: type === 0 ? "lost" : "found" // أضف خاصية type يدويًا
      }))))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [type]);

  const filteredItems = items.filter((item) =>
    item.metadata?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
console.log("items :::" , items);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchMode === "image" && searchImage) {
      setLoading(true);
      console.log("searchImage:", searchImage);
      try {
        const results = await searchLostFoundByImage(searchImage);
        console.log("API results:", results);
        setItems(results);
      } catch (err) {
        console.error("API error:", err, err?.message, err?.stack);
        setItems([]);
        alert("فشل البحث بالصورة: " + (err?.message || err));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSearchImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSearchImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardClick = (item) => {
    if (item.type === 'found') {
      setSelectedItem(item);
      setShowContactModal(true);
    }
    // إذا كان'lost'، لا تفعل شيئاً هنا لأن ReportCard يعالجه بالـ Link
    console.log("USER DATA:", item.user);
  };

  const handleSubmit = async (e) => {
    const token = getAuthToken();
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("metadata", "أي بيانات إضافية");
    formData.append("location", location);
    formData.append("date", new Date(date).toISOString());
    formData.append("type", Number(type));
    formData.append("contactInfo", contactInfo || "0123456789");

    try {
      const response = await fetch("/api/LostItem/create", {
        method: "POST",
        headers: {
           Authorization: "Bearer " + token,
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("بلاغ جديد إنشاء بنجاح:", data);
        setItems([...items, data]);
      } else {
        const errorData = await response.json();
        alert(errorData.errorMessages ? errorData.errorMessages.join("\n") : "فشل إنشاء البلاغ");
        console.error("فشل إنشاء بلاغ:", errorData);
      }
    } catch (err) {
      alert("تعذر الاتصال بالخادم");
      console.error("خطأ عند إنشاء بلاغ:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Contact Info Modal */}
      {showContactModal && selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setShowContactModal(false)}
            >
              <FaTimes />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">بيانات التواصل</h2>
              <img src={selectedItem.user?.image} alt={selectedItem.user?.fullName} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-teal-500 p-1" />
              <p className="flex items-center justify-center gap-2 text-lg">
                <FaUser className="text-teal-500"/>
                {selectedItem.user?.fullName}
              </p>
              <div className="mt-4 text-right space-y-3">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-teal-500"/>
                  <strong>البريد الإلكتروني:</strong> 
                  <a href={`mailto:${selectedItem.user?.email}`} className="text-blue-600 hover:underline">{selectedItem.user?.email || "غير متوفر"}</a>
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-teal-500"/>
                  <strong>رقم الهاتف:</strong> 
                  <a href={`tel:${selectedItem.user?.phoneNumber}`} className="text-blue-600 hover:underline">{selectedItem.user?.phoneNumber || "غير متوفر"}</a>
                </p>
              </div>
              <div className="mt-6">
                <button
                  className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition-transform hover:scale-105"
                  onClick={() => {
                    alert("تم تسجيل الاسترجاع بنجاح!");
                    setShowContactModal(false);
                  }}
                >
                  تم الاسترجاع
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">المفقودات والمعثورات</h1>
          <p className="text-lg text-gray-600 mt-2">
            مكان واحد لمساعدتك في العثور على ما فقدته أو إعادة ما وجدته.
          </p>
        </div>

        {/* Advanced Search - Separate Row */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="mb-2 text-center text-gray-700 font-semibold">اختر طريقة البحث:</div>
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              className={`flex items-center gap-1 px-4 py-2 rounded-t-md font-semibold border-b-2 transition-colors ${searchMode === 'metadata' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-transparent bg-gray-100 text-gray-500'}`}
              onClick={() => setSearchMode('metadata')}
            >
              <FaFont /> بحث بالوصف
            </button>
            <button
              type="button"
              className={`flex items-center gap-1 px-4 py-2 rounded-t-md font-semibold border-b-2 transition-colors ${searchMode === 'image' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-transparent bg-gray-100 text-gray-500'}`}
              onClick={() => setSearchMode('image')}
            >
              <FaImage /> بحث بالصورة
            </button>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col items-center gap-2">
            {searchMode === "metadata" ? (
              <div className="flex w-full max-w-md gap-2">
                <input
                  type="text"
                  placeholder="ابحث عن عنصر بالوصف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pr-10 pl-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-transform hover:scale-105">
                  <FaSearch /> بحث
                </button>
              </div>
            ) : (
              <div className="flex w-full max-w-md gap-2 items-center justify-center">
                <label className="flex items-center cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <span className="bg-gray-200 px-3 py-2 rounded-md font-semibold flex items-center gap-1">
                    <FaImage /> اختر صورة
                  </span>
                </label>
                {searchImagePreview && (
                  <img src={searchImagePreview} alt="preview" className="h-12 w-12 rounded-md object-cover border" />
                )}
                <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-transform hover:scale-105">
                  <FaSearch /> بحث
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Controls: Filter and Add Button */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setType(0)}
              className={`px-4 py-2 rounded-md font-semibold ${type === 0 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              مفقودات
            </button>
            <button
              onClick={() => setType(1)}
             className={`px-4 py-2 rounded-md font-semibold ${type === 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
 >
              معثورات
            </button>
          </div>
          <Link to="/LostAndFoundPage/AddReportPage" className="w-full md:w-auto bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition-transform hover:scale-105">
            <FaPlus />
            <span>إضافة بلاغ جديد</span>
          </Link>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-16 text-xl text-gray-500">جاري التحميل...</div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ReportCard key={item.itemId} item={item} onCardClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">لا توجد عناصر تطابق بحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostAndFoundPage;