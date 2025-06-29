import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import VolanteringCards from "./VolanteringCards";
// import VolanteringCards from "../Volanteringcomponent/VolanteringCards"; // Import the new card component

// Mock data for testing UI

const Volunteering = () => {
  const [user, setUser] = useState(null);
  const opportunities = useLoaderData();
  const [organizationData, setOrganizationData] = useState({
    volData: opportunities.result || [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 👈 استرجاع بيانات الجمعية
    }
  }, []);

  if (!user) {
    console.log("user is null");
    return <p>جاري التحميل...</p>;
  }
  console.log("user ID هو:");
  console.log(user.id);

  console.log("opportunitiesdata :");
  console.log(organizationData.volData);

  return (
    <div className="profile-container p-4 sm:p-6 md:p-8">
      <h1 className="profile-header text-center text-3xl font-bold mb-8 text-[#183153]">
        فرص التطوع المقدمة من {user.charityName}
      </h1>
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizationData.volData.length > 0 ? (
          organizationData.volData.map((data, index) => (
            <VolanteringCards
              title={data.title}
              id={data.id}
              setOrganizationData={setOrganizationData}
              description={data.description}
              image={data.image}
              benefits={data.benefits}
              endDate={data.endDate}
              isClosed={data.isClosed}
              location={data.location}
              photoUrl={data.photoUrl}
              requiredAge={data.requiredAge}
              seatsAvailable={data.seatsAvailable}
              startDate={data.startDate}
              orgname={user.charityName}
              tasks={data.tasks}
              key={index}
              pricenow={data.pricenow}
              targetprice={data.tragetprice}
              type={data.type}
            />
          ))
        ) : (
          <p>لم يتم العثور على فرص تطوع.</p>
        )}
      </div>
    </div>
  );
};

export default Volunteering;

export async function Loader({ request, params }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Response("Charity not found", { status: 401 });
  }

  const user = JSON.parse(storedUser);
  const charityId = user.id;

  try {
    const response = await fetch(`/api/Opportunities?charityId=${charityId}`);

    if (response.status === 404) {
      return []; // ← يرجّع مصفوفة فاضية بدل ما يرمي خطأ
    }

    if (!response.ok) {
      throw new Error("فشل تحميل فرص التطوع");
    }

    const opportunitiesData = await response.json();
    return opportunitiesData; // ← ارجعه مباشرة
  } catch (err) {
    console.error(err);
    throw new Response(JSON.stringify({ message: "فشل في تحميل البيانات" }), {
      status: 500,
    });
  }
}
