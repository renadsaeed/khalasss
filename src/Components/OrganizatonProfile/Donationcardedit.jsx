import React, { useState, useEffect } from "react";
import Cardsedit from "./Cardsedit";

// Mock data for UI testing
// const mockDonationOpportunities = {
//   organizationName: "جمعية الأورمان",
//   opportunities: [
//     {
//       id: 1,
//       title: "توزيع شنط رمضان",
//       image: "/b3w.jpg",
//       pricenow: 15000,
//       tragetprice: 20000,
//       donorsCount: 120,
//       pageVisits: 1500,
//       lastDonation: "منذ ساعة",
//     },
//     {
//       id: 2,
//       title: "ملابس العيد",
//       image: "/P100.jpg",
//       pricenow: 25000,
//       tragetprice: 50000,
//       donorsCount: 85,
//       pageVisits: 950,
//       lastDonation: "منذ 3 ساعات",
//     },
//     {
//       id: 3,
//       title: "مخيم إيواء",
//       image: "/camp.png",
//       pricenow: 750000,
//       tragetprice: 1000000,
//       donorsCount: 450,
//       pageVisits: 2300,
//       lastDonation: "منذ يوم",
//     },
//   ],
// };

export default function Profile({
  index,
  title,
  id,
  setOrganizationData,
  imageUrl,
}) {
  // const [organizationData, setOrganizationData] = useState(
  //   mockDonationOpportunities.opportunities
  // );
  // const [officialAuthority, setOfficialAuthority] = useState(
  //   mockDonationOpportunities.organizationName
  // );
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const dialog = useRef();
  console.log("donation card data");
  console.log(index, title, id, imageUrl);
  async function handleDeleteConfirmed() {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/DonationOpportunity/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        let message = "حدث خطأ أثناء حذف الفرصة.";
        try {
          const errorData = await response.json();
          message = errorData.message || message;
        } catch (jsonError) {
          // رد غير صالح كـ JSON
        }

        setDeleteError(message);
        return;
      }

      setOrganizationData((prev) => ({
        ...prev,
        donData: prev.donData.filter((item) => item.id !== id),
      }));
      setDeleteError(""); // تأكد من تصفير الخطأ لو العملية نجحت
      setShowConfirm(false);
    } catch (err) {
      setDeleteError("فشل الاتصال بالخادم. حاول مرة أخرى.");
      console.error("خطأ في الاتصال:", err);
    }
  }

  return (
    <div
      key={index}
      className="organization-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="text-center mt-4 font-bold mb-9 text-[#183153] text-3xl">
        <h3>الفرص المقدمة من {officialAuthority}</h3>
      </div>
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizationData.map((data, index) => (
          <Cardsedit
            key={index}
            id={data.id}
            img={data.image}
            title={data.title}
            name={officialAuthority}
            pricenow={data.pricenow}
            targetprice={data.tragetprice}
            donorsCount={data.donorsCount}
            pageVisits={data.pageVisits}
            lastDonation={data.lastDonation}
            setOrganizationData={setOrganizationData}
          />
        ))}
      </div>
    </div>
  );
}
