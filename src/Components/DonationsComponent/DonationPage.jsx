import React, { useState, useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import DonateNow from "./DonateNow";

export default function Donation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/DonationCategory")
      .then((res) => {
        setData(res.data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">جار التحميل...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">خطأ: {error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0D8F75]">
        فرص الخير
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 flex flex-col"
          >
            <div className="p-4 flex justify-between items-center">
              <p className="font-semibold text-lg text-gray-800">{item.name}</p>
              <IoShareSocialOutline className="text-2xl text-[#0D8F75] cursor-pointer" />
            </div>
            <div className="px-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl"
              />
            </div>
            <div className="p-4 mt-auto flex justify-around">
              <Link
                to="/Donation/DonateNow"
                state={{
                  id: item.id,
                }}
              >
                <button className="w-32 h-10 bg-[#0D8F75] rounded-lg text-white font-semibold text-sm">
                  تبرع الآن
                </button>
              </Link>

              <Link
                to="/Donation/OrganizationDonations"
                state={{
                  id: item.id,
                  Title: item.name,
                  Image: item.imageUrl,
                  Category: item.category?.name,
                  secation: item.secation,
                }}
              >
                <button className="w-32 h-10 bg-[#0D8F75] rounded-lg text-white font-semibold text-sm">
                  تبرع مع جمعية
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
