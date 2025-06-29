import HomeSlider from "./HomeSlider";
import { MdOutlineVolunteerActivism } from "react-icons/md";

import { FaDove, FaHandsHelping } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeCards from "./HomeCards";
import VolanteringCards from "../Volanteringcomponent/VolanteringCards";
import Homehelp from "./Homehelp";

export default function Home() {
  const [activeButton, setActiveButton] = useState("volantering");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileds, setFileds] = useState({
    volantering: [],
    Donations: [],
    Helps: [],
  });
  const [buttonContant, setButtonContant] = useState([]);
  const [helpCategories, setHelpCategories] = useState([]);
  const [showHelpCategories, setShowHelpCategories] = useState(false);
  const navigate = useNavigate();

  function handelClick(category) {
    setActiveButton(category);

    if (category === "Helps") {
      fetchHelpCategories();
      setShowHelpCategories(true);
    } else {
      setShowHelpCategories(false);

      const selectedData = fileds[category];
      console.log("Selected Category:", category, "Data:", selectedData);

      if (selectedData && selectedData.length > 0) {
        setButtonContant(selectedData);
      } else {
        // إعادة التحميل لو البيانات فاضية
        if (category === "volantering") {
          fetchVolunteeringData();
        } else if (category === "Donations") {
          fetchDonationsData();
        }
      }
    }
  }

  function handleMoreProjectsClick() {
    let path = "/";
    if (activeButton === "volantering") {
      path = "/Volantering";
    } else if (activeButton === "Donations") {
      path = "/donate";
    } else if (activeButton === "Helps") {
      path = "/Help";
    }
    navigate(path);
  }

  const activeeffect = "buttonshadow text-[#214570]";
  const itemsToShow = buttonContant.slice(0, 6);
  const fetchHelpCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/Assistance/assistance-types");
      const data = await res.json();
      console.log("Returned helpData:", data);
      setButtonContant(data); // هنا هنخزنها مباشرة في buttonContant
    } catch (err) {
      console.error("فشل في جلب أنواع المساعدات:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchVolunteeringData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/Opportunities");
      const data = await res.json();
      const volunteeringWithSection = data.result.map((item) => ({
        ...item,
        secation: "volantering",
      }));
      setFileds((prev) => ({
        ...prev,
        volantering: volunteeringWithSection,
      }));
      setButtonContant(volunteeringWithSection);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonationsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://waslalkhair.runasp.net/api/DonationCategory");
      const data = await res.json();
      
      if (!data.result || !Array.isArray(data.result)) {
        setButtonContant([]);
        setLoading(false);
        return;
      }
      
      const donationsWithSection = data.result.map((item) => ({
        ...item,
        secation: "Donations",
        title: item.name,
        image: item.imageUrl,
        category: item.category?.name,
        orgName: item.organization?.name || "جمعية خيرية",
        pricenow: item.collectedAmount || 0,
        tragetprice: item.targetAmount || 0,
      }));
      setFileds((prev) => ({
        ...prev,
        Donations: donationsWithSection,
      }));
      setButtonContant(donationsWithSection);
    } catch (err) {
      setError(err.message);
      console.error("فشل في جلب فرص التبرع:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteeringData();
  }, []);

  console.log("data data ::", itemsToShow);
  return (
    <>
      <HomeSlider />
      <div className="homepage pt-[60px] pb-5">
        <div className="home-container w-full max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="text-center text-base sm:text-lg md:text-2xl font-semibold pb-5">
            من مجالات الخير
          </h2>
          <div className="buttons pt-2 mb-[-12px] flex flex-col sm:flex-row justify-center items-end gap-2 sm:gap-4">
            <button
              onClick={() => handelClick("volantering")}
              className={`flex items-center justify-center rounded-xl bg-[#eee] w-full sm:w-[180px] md:w-[230px] h-[45px] text-base sm:text-xl font-semibold border-0 outline-0 ${
                activeButton === "volantering" ? activeeffect : "text-slate-400"
              }`}
            >
              <p>التطوع</p>
              <MdOutlineVolunteerActivism className="mr-2" />
            </button>
            <button
              onClick={() => handelClick("Donations")}
              className={`flex items-center justify-center rounded-xl bg-[#eee] w-full sm:w-[180px] md:w-[230px] h-[45px] text-base sm:text-xl font-semibold border-0 outline-0 ${
                activeButton === "Donations" ? activeeffect : "text-slate-400"
              }`}
            >
              <p>التبرع</p>
              <FaDove className="mr-2" />
            </button>
            <button
              onClick={() => handelClick("Helps")}
              className={`flex items-center justify-center border-0 outline-0 rounded-xl bg-[#eee] w-full sm:w-[180px] md:w-[230px] h-[45px] text-base sm:text-xl font-semibold ${
                activeButton === "Helps" ? activeeffect : "text-slate-400"
              }`}
            >
              <p>المساعدات</p>
              <FaHandsHelping className="mr-2" />
            </button>
          </div>
          <div className="bg-[#eee] mt-5 rounded-xl">
            <div className="p-3 sm:p-5">
              <p className="text-base sm:text-lg md:text-2xl font-semibold text-center mt-5 mb-5">
                فرص الخير
              </p>
              {loading ? (
                <div className="text-center py-10 text-gray-500 text-lg">
                  جاري تحميل البيانات...
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500 text-lg">
                  حدث خطأ في تحميل البيانات: {error}
                </div>
              ) : itemsToShow.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-lg">
                  لا توجد فرص متاحة حالياً
                </div>
              ) : (
                <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeButton === "Helps"
                    ? itemsToShow.map((item, index) => (
                        <Homehelp key={index} id={item.id} title={item.name} />
                      ))
                    : itemsToShow.map((item, index) => {
                        if (item.secation === "volantering") {
                          return (
                            <VolanteringCards
                              key={index}
                              title={item.title}
                              id={item.id}
                              image={item.photoUrl}
                              name={item.createdBy.fullName}
                              phoneNumber={item.createdBy.phoneNumber}
                              email={item.createdBy.email}
                              isClosed={item.createdBy.isClosed}
                              description={item.description}
                              location={item.location}
                              startDate={item.startDate}
                              endDate={item.endDate}
                              requiredAge={item.requiredAge}
                              type={item.createdBy.role}
                              tasks={item.tasks}
                              seatsAvailable={item.seatsAvailable}
                              OfficialAuthority={item.createdBy.fullName}
                            />
                          );
                        } else if (item.secation === "Donations") {
                          return (
                            <HomeCards
                              key={index}
                              id={item.id}
                              title={item.title}
                              image={item.image}
                              category={item.category}
                              categoryId={item.categoryId}
                              secation={item.secation}
                              orgname={item.orgName}
                              pricenow={item.pricenow}
                              tragetprice={item.tragetprice}
                            />
                          );
                        }
                        return null;
                      })}
                </div>
              )}
              {buttonContant.length > 4 && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleMoreProjectsClick}
                    className="bg-[#0D8F75] text-white font-bold py-3 px-8 rounded-full text-lg transition hover:bg-green-800 shadow-lg"
                  >
                    المزيد من المشاريع
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}