import React, { useState } from "react";
import DonationChart from "../Chart/DonationChart";
import StatCard from "../Chart/StatCard";
import { LuSquareCheckBig } from "react-icons/lu";
import { PiMoneyWavyThin } from "react-icons/pi";
import { CiStopSign1 } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import SummaryStats from "../Chart/SummaryStats";
import { IoCheckmark } from "react-icons/io5";
const Statistics = () => {
  const chartData = [
    { name: "صحة ١٥٪", value: 15, color: "#d3a4ff" },
    { name: "تعليم ٢٠٪", value: 20, color: "#77dd77" },
    { name: "غذاء ١٥٪", value: 15, color: "#ff7f7f" },
    { name: "إسكان ٢٥٪", value: 25, color: "#89cff0" },
    { name: "أخرى ٢٥٪", value: 25, color: "#ffb347" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f7] mt-7 pb-12">
      {/* Decorative elements */}

      {/* Header */}
      <div className="  pt-12 pb-6 w-[90%] p-3  mx-auto   ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">إحساننا لعام 2025</h1>
          <p className="text-muted-foreground">
            إحصائيات تعكس أثر عطائنا من مؤسسة وصال الخير لعام 2025
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6  ">
          <StatCard
            title="إجمالي فرص التطوع المتاحة"
            value="20"
            unit="فرصة"
            icon={<LuSquareCheckBig />}
            className="bg-white rounded-xl  border-stone-200 p-2 flex justify-between text-black"
          />
          <StatCard
            title="إجمالي التبرعات المالية"
            value="12345"
            unit="جنية مصري"
            icon={<PiMoneyWavyThin />}
            className="bg-white rounded-xl  border-stone-200 p-2 flex justify-between text-black shadow-md"
          />
        </div>
        {/* Middle Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="عدد المتطوعين"
            value="12345"
            unit="متطوع"
            icon={<IoPersonOutline />}
            className="bg-white rounded-xl  border-stone-200 p-2 flex justify-between text-black shadow-md"
          />
          <StatCard
            title="إجمالي الفرص المكتملة"
            value="20"
            unit="فرصة"
            icon={<LuSquareCheckBig />}
            className="bg-white rounded-xl  border-stone-200 p-2 flex justify-between text-black shadow-md"
          />
          <StatCard
            title="عمليات التبرعات"
            value="12345"
            unit="عملية"
            icon={<CiMail />}
            className="bg-white rounded-xl  border-stone-200 p-2 flex justify-between text-black shadow-md"
          />
        </div>
        {/* Chart Section */}
        <div className=" bg-white p-6 rounded-lg  shadow-sm">
          <button className="w-[140px] bg-[#0D8F75] text-white px-6 text-lg rounded-sm mb-3 py-2 hover:bg-[#5ea295] ">
            المجالات
          </button>
          <div className="grid  grid-cols-1  md:grid-cols-3 gap-6">
            <div className="md:col-span-2 ">
              <DonationChart data={chartData} />
            </div>
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-right mb-4">
                إحصائيات عامة حسب المجالات المدعومة
              </h2>

              <SummaryStats
                title="إجمالي التبرعات"
                value="1234"
                unit="جنية مصري"
                icon={<CiStopSign1 />}
                className="text-green-600 "
              />

              <SummaryStats
                title="إجمالي فرص التبرع"
                value="1234"
                unit="فرصة"
                icon={<IoCheckmark />}
                className="text-blue-600"
              />

              <SummaryStats
                title="إجمالي المستفيدين"
                value="1234"
                unit="فرد"
                icon={<IoCheckmark />}
                className="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
