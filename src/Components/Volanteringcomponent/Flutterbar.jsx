import { useState } from "react";
import { opportunities } from "./Dataset";
import { MdFilterList } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import HomeCards from "./VolanteringCards";
import { useLoaderData } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
const filters = [
  { label: "المكان", value: "Location" },
  { label: "النوع", value: "Type" },
  { label: "تاريخ البداية", value: "StartDate" },
  { label: "تاريخ النهاية", value: "EndDate" },
  { label: "الحد الأدنى للعمر", value: "MinAge" },
  { label: "عدد المقاعد", value: "MaxSeats" },
  { label: "الحالة (true / false)", value: "IsOpen" },
];

export default function Flutterbar() {
  const fetchdata = useLoaderData();
  console.log("fetch data");
  console.log(fetchdata);
  const opportunitiesdata = fetchdata.result;
  const [hasSearched, setHasSearched] = useState(false);
  const [type, setType] = useState("جمعيه");
  const defaultData = opportunitiesdata.filter(
    (data) => data.createdBy.role === type
  );
  const [data, setData] = useState(defaultData);

  const handleData = (selector) => {
    setType(selector);
    const filteredData = opportunitiesdata.filter(
      (data) => data.createdBy.role === selector
    );
    setData(filteredData);
  };

  // console.log(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("Location");

  function isValidDate(str) {
    return /^\d{4}-\d{2}-\d{2}$/.test(str);
  }

  function isNumber(str) {
    return !isNaN(str) && str.trim() !== "";
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setHasSearched(true); // ✅ تم تنفيذ بحث

    setLoading(true);
    try {
      let filtered = data;
      const term = searchTerm.trim();
      if (filterType === "Location") {
        filtered = data.filter(
          (item) =>
            item.location &&
            item.location.toLowerCase().includes(term.toLowerCase())
        );
        console.log("بحث في Location عن:", term);
        console.log(
          "النتائج:",
          data.filter((item) => item.location).map((item) => item.location)
        );
      } else if (filterType === "MinAge") {
        if (isNumber(term)) {
          filtered = data.filter(
            (item) => Number(item.requiredAge) >= Number(term)
          );
        } else {
          filtered = [];
        }
      } else if (filterType === "MaxSeats") {
        if (isNumber(term)) {
          filtered = data.filter(
            (item) => Number(item.seatsAvailable) <= Number(term)
          );
        } else {
          filtered = [];
        }
        console.log(
          "كل المقاعد:",
          data.map((d) => d.seatsAvailable)
        );
      } else if (filterType === "StartDate") {
        if (isValidDate(term)) {
          filtered = data.filter(
            (item) => item.startDate && item.startDate.startsWith(term)
          );
        } else {
          filtered = [];
        }
      } else if (filterType === "EndDate") {
        if (isValidDate(term)) {
          filtered = data.filter(
            (item) => item.endDate && item.endDate.startsWith(term)
          );
        } else {
          filtered = [];
        }
      } else if (filterType === "IsOpen") {
        if (term.toLowerCase() === "true" || term.toLowerCase() === "false") {
          const boolVal = term.toLowerCase() === "true";
          filtered = data.filter((item) => {
            if (item.isOpen !== undefined) return item.isOpen === boolVal;
            if (item.createdBy.isClosed !== undefined)
              return !item.createdBy.isClosed === boolVal;
            return false;
          });
        } else {
          filtered = [];
        }
      } else if (filterType === "Type") {
        filtered = data.filter(
          (item) =>
            item.createdBy.role &&
            item.createdBy.role.toLowerCase().includes(term.toLowerCase())
        );
      } else {
        // fallback: search in title/description
        filtered = data.filter(
          (item) =>
            (item.title &&
              item.title.toLowerCase().includes(term.toLowerCase())) ||
            (item.description &&
              item.description.toLowerCase().includes(term.toLowerCase()))
        );
      }
      setResults(filtered);
    } catch (err) {
      console.error("حصل خطأ أثناء البحث:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flutter-bar-page px-3">
        <div className="flutter-bar relative mb-8 flex items-center justify-between w-[98%]   bg-white shadow-md rounded-[5px] p-2">
          <form onSubmit={handleSearch} className="w-[100%] ">
            <div className="flex justify-between items-center  w-[100%] ">
              <div>
                <input
                  type="text"
                  placeholder={`ابحث حسب ${filterType}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 border-none focus:outline-0 rounded-full px-4 text-xl"
                />
              </div>
              <div className=" flex justify-between items-center  w-[25%] ">
                <div className="relative w-60 mb-4">
                  <Listbox value={filterType} onChange={setFilterType}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-white py-2 pl-4 pr-10 text-left border border-gray-300 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
                        {filters.find((f) => f.value === filterType)?.label ||
                          "اختر الفلتر"}
                        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
                          <FaChevronDown className="h-4 w-4 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {filters.map((filter, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                active
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={filter.value}
                          >
                            {filter.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>

                <button
                  size="icon"
                  variant="ghost"
                  type="submit"
                  className="text-gray-500 flex justify-center items-center w-[15%] mr-2   text-2xl"
                >
                  <CiSearch className="text-gray-500 ml-2 text-2xl" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="home-secation">
        <div className="home-label p-[15px] flex flex-col justify-center items-center">
          <div className="label">
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl ">
              اختر الفرصة التطوعية
            </h1>
          </div>
          <div className="switches mt-[20px] p-[30px] relative  w-[400px] ">
            <span className="ml-[160px] mr-[-10px]">
              <button
                onClick={() => handleData("فرد")}
                className={`w-[200px] h-[40px] rounded-full text-2xl outline-0 absolute z-1 ${
                  type === "فرد" ? "bg-[#214570] text-amber-50" : "bg-[#eee]"
                }`}
              >
                افراد
              </button>
            </span>
            <span className="">
              <button
                onClick={() => handleData("جمعيه")}
                className={`w-[200px] h-[40px] rounded-full text-2xl absolute z-2 outline-0 ${
                  type === "جمعيه" ? "bg-[#214570] text-amber-50" : "bg-[#eee]"
                }`}
              >
                جمعيات
              </button>
            </span>
          </div>
          {!loading && hasSearched && results.length === 0 && (
            <p className="text-center text-xl text-red-500 mt-10 mb-10">
              لا توجد نتائج مطابقة للبحث.
            </p>
          )}

          <div className="home-contant  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(results.length > 0 ? results : data).map((opportunity, index) =>
              opportunity.createdBy.type === "جمعيه" ? (
                <HomeCards
                  key={index}
                  title={opportunity.title}
                  id={opportunity.id}
                  image={opportunity.photoUrl}
                  name={opportunity.createdBy.fullName}
                  phoneNumber={opportunity.createdBy.phoneNumber}
                  email={opportunity.createdBy.email}
                  isClosed={opportunity.createdBy.isClosed}
                  description={opportunity.description}
                  location={opportunity.location}
                  startDate={opportunity.startDate}
                  endDate={opportunity.endDate}
                  requiredAge={opportunity.requiredAge}
                  type={opportunity.createdBy.role}
                  tasks={opportunity.tasks}
                  seatsAvailable={opportunity.seatsAvailable}
                  OfficialAuthority={opportunity.createdBy.fullName}
                />
              ) : (
                <HomeCards
                  key={index}
                  title={opportunity.title}
                  image={opportunity.photoUrl}
                  id={opportunity.id}
                  name={opportunity.createdBy.fullName}
                  location={opportunity.location}
                  isClosed={opportunity.isClosed}
                  description={opportunity.description}
                  requiredAge={opportunity.requiredAge}
                  endDate={opportunity.endDate}
                  phoneNumber={opportunity.createdBy.phoneNumber}
                  email={opportunity.createdBy.email}
                  tasks={opportunity.tasks}
                  startDate={opportunity.startDate}
                  type={opportunity.createdBy.role}
                  seatsAvailable={opportunity.seatsAvailable}
                  OfficialAuthority={opportunity.createdBy.fullName}
                />
              )
            )}
          </div>
          {/* {!loading && searchTerm.trim() && results.length === 0 && (
            <p className="text-center text-xl text-red-500 mt-6">
              لا توجد نتائج مطابقة للبحث.
            </p>
          )} */}
          {loading && <p className="mt-4 text-lg">جاري تحميل النتائج...</p>}
        </div>
      </div>
    </>
  );
}
