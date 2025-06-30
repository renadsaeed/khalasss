import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Cardsedit from "./Cardsedit";
export default function Donationbranch() {
  const [user, setUser] = useState(null);
  const donations = useLoaderData();

  const { detailedDonations, setDetailedDonations } = useOutletContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 👈 استرجاع بيانات الجمعية
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (donations.length === 0) return;

      const token = localStorage.getItem("token"); // أو هات التوكن من مكان تاني لو بتخزنه بشكل مختلف

      const details = await Promise.all(
        donations.map(async (don) => {
          const res = await fetch(`/api/DonationOpportunity/${don.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return await res.json();
        })
      );

      setDetailedDonations(details);
    };

    fetchDetails();
  }, [donations]);
  console.log("donation details :::", detailedDonations);

  if (!user) {
    console.log("user is null");
    return <p>جاري التحميل...</p>;
  }
  console.log("user ID هو:");
  console.log(user.id);

  // console.log("opportunitiesdata :");
  // console.log(organizationData.donData);

  return (
    <div className="organization-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mt-4 font-bold mb-9 text-[#183153] text-3xl">
        <h3>الفرص المقدمة من {user.charityName}</h3>
      </div>
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {detailedDonations.map((data, index) => (
          <Cardsedit
            index={index}
            id={data.id}
            imageUrl={data.imageUrl}
            title={data.title}
            name={user.charityName}
            description={data.description}
            completionPercentage={data.completionPercentage}
            collectedAmount={data.collectedAmount}
            remainingAmount={data.remainingAmount}
            numberOfDonors={data.numberOfDonors}
            pageVisits={data.pageVisits}
            setDetailedDonation={setDetailedDonations}
          />
        ))}
      </div>
    </div>
  );
}
export async function Loader({ request, params }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Response("Charity not found", { status: 401 });
  }

  const user = JSON.parse(storedUser);
  const charityId = user.id;
  const status = 0;
  try {
    const response = await fetch(
      `/api/DonationOpportunity?charityId=${charityId}&status=${status}`
    );

    if (response.status === 404) {
      return []; // ← يرجّع مصفوفة فاضية بدل ما يرمي خطأ
    }

    if (!response.ok) {
      throw new Error("فشل تحميل فرص التبرع");
    }

    const donationsData = await response.json();
    console.log("donationsData ::::", donationsData);
    return donationsData;
    // ← ارجعه مباشرة
  } catch (err) {
    console.error(err);
    throw new Response(JSON.stringify({ message: "فشل في تحميل البيانات" }), {
      status: 500,
    });
  }
}
