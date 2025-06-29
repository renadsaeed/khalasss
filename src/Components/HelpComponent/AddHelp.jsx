import React, { useState } from "react";
import {
  FiX,
  FiMaximize2,
  FiMinimize2,
  FiUpload,
  FiBarChart2,
  FiSmile,
  FiPlusCircle,
  FiFile,
  FiRefreshCw,
} from "react-icons/fi";
import Picker from "emoji-picker-react";

const AddHelp = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 ${
        isFullScreen ? "fixed inset-0 bg-white" : " "
      }`}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">إِنْشاء مساعدة</h2>
          <div className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
            <FiX
              onClick={() => alert("إغلاق النموذج")}
              className="hover:text-red-600"
            />
            {isFullScreen ? (
              <FiMinimize2
                onClick={() => setIsFullScreen(false)}
                className="hover:text-blue-600"
              />
            ) : (
              <FiMaximize2
                onClick={() => setIsFullScreen(true)}
                className="hover:text-blue-600"
              />
            )}
            <FiUpload className="hover:text-green-600" />
          </div>
        </div>

        {/* Form */}
        <div>
          <label className="block text-gray-600 mb-2">أضف عنوان</label>
          <input
            type="text"
            placeholder="اكتب العنوان هنا"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4 relative">
          <label className="block text-gray-600 mb-2">
            اذكر تفاصيل مساعدتك
          </label>
          <textarea
            placeholder="اكتب التفاصيل هنا"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center flex-row-reverse">
          <button className="bg-[#0d8f75] text-white px-6 py-2 rounded-full hover:bg-green-700 transition text-lg">
            انشر
          </button>
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <span>انشر في:</span>
            <span className="text-gray-700 font-semibold">مساعدات طبية</span>
            <span className="cursor-pointer">▼</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-gray-500 text-lg">
          <div className="flex gap-4">
            <FiBarChart2 className="cursor-pointer" />
            <FiSmile
              className="cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <FiPlusCircle className="cursor-pointer" />
            <FiFile className="cursor-pointer" />
            <FiRefreshCw className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHelp;
