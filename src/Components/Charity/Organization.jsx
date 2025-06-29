import { useLocation, useLoaderData } from "react-router-dom";
import Volanteringcards from "./Volanteringcards";
import { Link } from "react-router-dom";
import Donationcard from "./Donationcard";
export default function Organization() {
  const location = useLocation();
  const {
    charityName,
    id,
    key,
    address,
    charityMission,
    charityRegistrationNumber,
    email,
    establishedAt,
    phoneNumber,
    image,
  } = location.state || {};
  const startdate = new Date(establishedAt);
  const arabicstartDate = startdate.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const { opportunities, donations } = useLoaderData();
  console.log("opportunitiesdata :");
  console.log(opportunities);
  console.log("donations");
  console.log(donations);
  return (
    <>
      <div className="organiztioncontainer w-[90%] p-3  mx-auto  ">
        <div className="orginfo flex justify-between items-center max-[415px]:flex-col   ">
          <div className="orgtitle flex items-center max-[415px]:flex-col ">
            <div className="orgimg w-[150px]  h-[150px] max-[415px]:mt-2  border border-stone-200">
              <img src={image} alt="orgimg" className="shadow-md" />
            </div>
            <Link
              to="/Profile"
              //   state={{ OfficialAuthority: OfficialAuthority, Name: name }}
            >
              <h2 className="mr-5 text-3xl font-bold max-[415px]:mt-5">
                {charityName}
              </h2>
            </Link>
          </div>
          <button className="w-[200px] ml-2 shadow-md max-[415px]:mt-5  bg-[#0D8F75] rounded-sm text-white px-2 py-1 h-[40px] text-xl  ">
            تبرع الان
          </button>
        </div>

        <div className="orghistory tracking-wide rounded-sm bg-[#F9FAFB] text-black text-lg font-bold p-4 mt-6">
          <p>
            هي منظمة مصرية أهلية، لا تهدف إلى الربح ولا تخضع لضرائب على
            التبرعات، أنشئت عام {arabicstartDate} مقيدة برقم{" "}
            {charityRegistrationNumber} مركزية بوزارة التضامن الاجتماعي، تهدف
            إلى خدمة الفئات الأكثر احتياجا، دون أي تمييز ديني أو سياسي، وتعتمد
            الجمعية في تمويلها على التبرعات العينية والنقدية من المصريين داخل
            مصر وخارجها
          </p>
        </div>
        <div className="card-info">
          <h3 className="text-2xl  mt-8 font-semibold text-right mb-9 ">
            اوجه التبرع و التطوع
          </h3>
          {/* <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {opportunities && opportunities.length > 0 ? (
              opportunities.map((data, index) => (
                <Organizationcards
                  title={data.title}
                  id={data.id}
                  description={data.description}
                  role={data.createdBy.role}
                  fullName={data.createdBy.fullName}
                  phoneNumber={data.createdBy.phoneNumber}
                  orgimage={data.createdBy.image}
                  orgemail={data.createdBy.email}
                  orgid={data.createdBy.id}
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
              ))
            ) : (
              <p className="text-xl text-center text-gray-500">
                لا توجد فرص تطوع حالياً
              </p>
            )}
            {donations && donations.length > 0 ? (
              <>
                {donations.map((donation) => (
                  <Donationcard
                    key={donation.id}
                    title={donation.title}
                    imageUrl={donation.imageUrl}
                  />
                ))}
              </>
            ) : (
              <p className="text-xl text-center text-gray-500">
                لا توجد فرص تبرع حالياً
              </p>
            )}
          </div> */}
          <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(!opportunities || opportunities.length === 0) &&
            (!donations || donations.length === 0) ? (
              <p className="text-xl text-center text-gray-500 col-span-full">
                لا توجد فرص متاحة حالياً
              </p>
            ) : (
              <>
                {opportunities && opportunities.length > 0 ? (
                  opportunities.map((data, index) => (
                    <Volanteringcards
                      title={data.title}
                      id={data.id}
                      description={data.description}
                      role={data.createdBy.role}
                      fullName={data.createdBy.fullName}
                      phoneNumber={data.createdBy.phoneNumber}
                      orgimage={data.createdBy.image}
                      orgemail={data.createdBy.email}
                      orgid={data.createdBy.id}
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
                  ))
                ) : (
                  <p className="text-xl text-center text-gray-500 col-span-full">
                    لا توجد فرص تطوع حالياً
                  </p>
                )}

                {donations && donations.length > 0 ? (
                  donations.map((donation) => (
                    <Donationcard
                      key={donation.id}
                      title={donation.title}
                      imageUrl={donation.imageUrl}
                    />
                  ))
                ) : (
                  <p className="text-xl text-center text-gray-500 col-span-full">
                    لا توجد فرص تبرع حالياً
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// export async function Loader({ request, params }) {
//   const charityId = params.organizationId;

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
  const charityId = params.organizationId;

  try {
    const [opportunitiesRes, donationsRes] = await Promise.all([
      fetch(`/api/Opportunities?charityId=${charityId}`),
      fetch(`/api/DonationOpportunity?charityId=${charityId}`),
    ]);

    const opportunitiesData =
      opportunitiesRes.status === 404
        ? []
        : await opportunitiesRes.json().then((data) => data?.result || []);

    const donationsData =
      donationsRes.status === 404
        ? []
        : await donationsRes.json().then((data) => data || []);

    return {
      opportunities: opportunitiesData,
      donations: donationsData,
    };
  } catch (err) {
    console.error("خطأ في تحميل البيانات:", err);
    throw new Response(
      JSON.stringify({ message: "حدث خطأ أثناء تحميل البيانات" }),
      { status: 500 }
    );
  }
}
