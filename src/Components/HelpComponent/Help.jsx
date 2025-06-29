import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBarChartSharp } from "react-icons/io5";
import { categories, initialData } from "./HelpsData";
import CustomDropdown from "./CustomDropdown";
import { LuImagePlus } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import Helpsbox from "./Helpsbox";
import Model from "./Model";
import "./Help.css";

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [loadingHelps, setLoadingHelps] = useState(true);
  const [errorHelps, setErrorHelps] = useState(null);
  const [helpData, setHelpData] = useState(initialData);
  const [newHelp, setNewHelp] = useState({
    email: "",
    phone: "",
    availableSpots: null,
    title: "",
    details: "",
    category: "medical",
  });
  // const [showModal, setShowModal] = useState(false);
  const dialog = useRef();

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch("/api/Assistance/assistance-types");
        if (!response.ok) {
          throw new Error("فشل في جلب أنواع المساعدات");
        }
        const data = await response.json();
        console.log("categories");
        console.log(data);
        setCategories(data);

        // ✅ هنا نجيب النوع من الـ URL:
        const typeFromQuery = searchParams.get("type");

        if (data.length > 0) {
          const defaultCategory = typeFromQuery
            ? data.find((cat) => cat.name === typeFromQuery)
            : data[0];

          if (defaultCategory) {
            setSelectedCategory({
              id: defaultCategory.id,
              name: defaultCategory.name,
            });
          }
        }
      } catch (err) {
        setErrorCategories("حدث خطأ أثناء تحميل الأنواع، حاول لاحقًا.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchedHelpdata = async () => {
      try {
        setLoadingHelps(true);
        setHelpData([]);
        const response = await fetch(
          `/api/Assistance/SearchByAssistanceType/${selectedCategory.id}`
        );
        if (!response.ok) {
          throw new Error("فشل في جلب أنواع المساعدات");
        }
        const data = await response.json();
        console.log("helpdata");
        console.log(data);
        setHelpData(data.assistances);
        console.log("sethelpdata :");
        console.log(data.assistances);
      } catch (err) {
        setErrorHelps("حدث خطأ أثناء تحميل الأنواع، حاول لاحقًا.");
      } finally {
        setLoadingHelps(false);
      }
    };
    fetchedHelpdata();
  }, [selectedCategory]);

  const handleAddHelp = () => {
    if (newHelp.title && newHelp.details) {
      setHelpData((prev) => ({
        ...prev,
        [newHelp.category]: [
          ...prev[newHelp.category],
          { id: Date.now(), ...newHelp },
        ],
      }));
      dialog.current.close();
      setNewHelp({
        email: "",
        phone: "",
        title: "",
        availableSpots: null,
        details: "",
        category: "medical",
      });
    }
  };
  function rest() {
    dialog.current.close();
    setNewHelp({
      email: "",
      phone: "",
      title: "",
      availableSpots: null,
      details: "",
      category: "medical",
    });
  }
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     console.log(imageUrl);
  //     setSelectedImage(imageUrl);
  //     setNewHelp({ ...newHelp, image: imageUrl });
  //   }
  // };
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-5 mb-8 gap-4">
            <div className="help-label-info w-full">
              <h2 className="font-bold text-2xl sm:text-3xl text-gray-800 pb-2">
                المساعدات
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                هنا يمكنك الحصول على الدعم والتواصل مع المتبرعين والتطوع لإحداث
                فرق حقيقي.
              </p>
            </div>
            <div className="help-label-button w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() => dialog.current.showModal()}
                className="w-full sm:w-auto px-6 py-3 text-white bg-[#0D8F75] hover:bg-green-800 transition-colors duration-300 font-semibold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg"
              >
                أضف مساعدة
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-bold text-lg text-gray-700 pb-4">
                  اختر نوع المساعدة
                </p>
                <ul>
                  {loadingCategories ? (
                    <p className="text-gray-500 text-center">
                      جاري تحميل الأنواع...
                    </p>
                  ) : errorCategories ? (
                    <p className="text-red-500 text-center">
                      {errorCategories}
                    </p>
                  ) : (
                    categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          className={`filter-button flex items-center ${
                            selectedCategory.id === cat.id ? "selected" : ""
                          }`}
                          onClick={() =>
                            setSelectedCategory({ id: cat.id, name: cat.name })
                          }
                        >
                          <span className="self-center text-2xl ml-3">
                            {cat.icon}
                          </span>
                          <span className="font-medium">{cat.name}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-6">
                {loadingCategories ? (
                  <p className="text-gray-500 text-center">
                    جاري تحميل الأنواع...
                  </p>
                ) : errorCategories ? (
                  <p className="text-red-500 text-center">{errorCategories}</p>
                ) : helpData.length > 0 ? (
                  helpData.map((chance, index) => (
                    <Helpsbox
                      key={index}
                      id={chance.id}
                      userimage={chance.createdByProfilePic}
                      title={chance.title}
                      details={chance.daysSinceLastUpdate}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    لا توجد مساعدات متاحة في هذا القسم حاليًا.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Model
          rest={rest}
          newHelp={newHelp}
          setNewHelp={setNewHelp}
          fileInputRef={fileInputRef}
          categories={categories}
          ref={dialog}
        />
      </div>
    </>
  );
}
