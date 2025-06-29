import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
export default function CustomDropdown({ newHelp, setNewHelp, categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      {/* زر القائمة */}
      <button
        className="w-full text-[#214570] flex justify-between text-base sm:text-lg p-2 border-b-1 border-blue-400 mb-2 text-right shadow-xs"
        onClick={() => setIsOpen(!isOpen)}
      >
        {categories.find((cat) => cat.id === newHelp.category)?.name ||
          "اختر فئة"}
        <IoMdArrowDropdown className="text-xl self-center" />
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="w-full max-w-xs bg-[#eee] custom-scrollbar text-base sm:text-lg text-[#214570] shadow-xs mt-1 max-h-[120px] overflow-auto z-50">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setNewHelp({ ...newHelp, category: cat.id });
                setIsOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}