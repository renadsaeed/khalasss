import { useLocation, useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Donationcardedit from "./Donationcardedit";
import Statistics from "./Statistics";
import Cardsedit from "./Cardsedit";

// import Cardsedit from "./Cardsedit";
export default function Profile() {
  const [user, setUser] = useState(null);
  const { opportunities, donations } = useLoaderData();
  const [organizationData, setOrganizationData] = useState({
    volData: opportunities || [],
    donData: donations || [],
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
  console.log("donations");
  console.log(organizationData.donData);
  return (
    <>
      <div className="organiztioncontainer w-[90%] p-3  mx-auto  ">
        <div className="orginfo flex justify-between items-center max-[415px]:flex-col   ">
          <div className="orgtitle flex items-center max-[415px]:flex-col ">
            <div className="orgimg w-[150px]  h-[150px] max-[415px]:mt-2  border border-stone-200">
              <img src={user.image} alt="orgimg" className="shadow-md" />
            </div>
            <h2 className="mr-5 text-3xl font-bold max-[415px]:mt-5">
              {user.charityName}
            </h2>
          </div>
          <Link to="/charitydashboard/edit">
            <button className="w-[200px] ml-2 shadow-md max-[415px]:mt-5  bg-[#0D8F75] rounded-sm text-white px-2 py-1 h-[40px] text-xl  ">
              تعديل الملف الشخصي
            </button>
          </Link>
        </div>
        <div className="text-center mt-10 font-normal mb-9  text-black text-2xl ">
          <h3>الفرص المقدمه من {user.charityName}</h3>
        </div>
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {organizationData.volData && organizationData.volData.length > 0 && (
            <>
              {organizationData.volData.map((data, index) => (
                <Cardsedit
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
                  tasks={data.tasks}
                  key={index}
                  pricenow={data.pricenow}
                  targetprice={data.tragetprice}
                  type={data.type}
                />
              ))}
            </>
          )}
          {organizationData.donData && organizationData.donData.length > 0 && (
            <>
              {organizationData.donData.map((donation, index) => (
                <Donationcardedit
                  index={index}
                  title={donation.title}
                  id={donation.id}
                  setOrganizationData={setOrganizationData}
                  imageUrl={donation.imageUrl}
                />
              ))}
            </>
          )}
        </div>
        <Statistics />
      </div>
    </>
  );
}

// export async function Loader({ request, params }) {
//   const storedUser = localStorage.getItem("user");

//   if (!storedUser) {
//     throw new Response("Charity not found", { status: 401 });
//   }

//   const user = JSON.parse(storedUser);
//   const charityId = user.id;
//   const [opportunitiesRes, donationsRes] = await Promise.all([
//     fetch(`/api/Opportunities?charityId=${charityId}`),
//     fetch(`/api/DonationOpportunity?charityId=${charityId}`),
//   ]);
//   if (!opportunitiesRes.ok || !donationsRes.ok) {
//     throw new Response(JSON.stringify({ message: "فشل في تحميل البيانات" }), {
//       status: 500,
//     });
//   }
//   const opportunitiesData = await opportunitiesRes.json();
//   const donationsData = await donationsRes.json();
//   return {
//     opportunities: opportunitiesData.result,
//     donations: donationsData,
//   };
// }
export async function Loader({ request, params }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Response("Charity not found", { status: 401 });
  }

  const user = JSON.parse(storedUser);
  const charityId = user.id;

  let opportunitiesData = [];
  let donationsData = [];

  try {
    const [opportunitiesRes, donationsRes] = await Promise.all([
      fetch(`/api/Opportunities?charityId=${charityId}`),
      fetch(`/api/DonationOpportunity?charityId=${charityId}`),
    ]);

    // ✳️ معالجة الـ 404 كأنه لا توجد فرص
    if (opportunitiesRes.status === 404) {
      opportunitiesData = { result: [] };
    } else if (!opportunitiesRes.ok) {
      throw new Error("فشل تحميل فرص التطوع");
    } else {
      opportunitiesData = await opportunitiesRes.json();
    }

    if (donationsRes.status === 404) {
      donationsData = [];
    } else if (!donationsRes.ok) {
      throw new Error("فشل تحميل فرص التبرع");
    } else {
      donationsData = await donationsRes.json();
    }
  } catch (err) {
    console.error(err);
    throw new Response(JSON.stringify({ message: "فشل في تحميل البيانات" }), {
      status: 500,
    });
  }

  return {
    opportunities: opportunitiesData.result,
    donations: donationsData,
  };
}
