import { MdOutlineVolunteerActivism } from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import { PiMosqueThin } from "react-icons/pi";
import { GiOpenBook } from "react-icons/gi";
import { FaDog } from "react-icons/fa6";
export const categories = [
  { id: "medical", name: "مساعدات طبية", icon: <MdOutlineVolunteerActivism /> },
  { id: "food", name: "مساعدات غذائية", icon: <MdOutlineRestaurant /> },
  { id: "relgine", name: "مساعدات دينية", icon: <PiMosqueThin /> },
  { id: "education", name: "مساعدات تعليمية", icon: <GiOpenBook /> },
  { id: "animals", name: "مساعدات بيطريه", icon: <FaDog /> },
];

export const initialData = {
  medical: [
    {
      id: 1,
      title: "طبيب أسنان مجاني",
      details: "متاح 3 أيام بالأسبوع",
      image: "../../../public/OIP.jpg",
      adress: "القاهره",
      userimage: "../../../public/profile-icon-9.png",
      type: "medical",
      secation: "Helps",
    },
    {
      id: 2,
      title: "طبيب عيون",
      details: "متاح 8 أيام بالأسبوع",
      image: "../../../public/OIP.jpg",
      adress: "الجيزه",
      userimage: "../../../public/profile-icon-9.png",
      type: "medical",
      secation: "Helps",
    },
    {
      id: 3,
      title: "طبيب عيون",
      details: "متاح 8 أيام بالأسبوع",
      image: "../../../public/OIP.jpg",
      adress: "الفيوم",
      userimage: "../../../public/profile-icon-9.png",
      type: "medical",
      secation: "Helps",
    },
    {
      id: 4,
      title: "طبيب عيون",
      details:
        " هناك اربع ايام اشوفله معاد يعني لو عايز لو مش عايز خلاص يعني  فاضيين لو حد عايز يجي يحجز يقولي متاح 8 أيام بالأسبوع",
      image: "../../../public/OIP.jpg",
      adress: "دمياط",
      userimage: "../../../public/profile-icon-9.png",
      type: "medical",
      secation: "Helps",
    },
    {
      id: 5,
      title: "طبيب عيون",
      details: "متاح 8 أيام بالأسبوع",
      image: "../../../public/OIP.jpg",
      adress: "المنصوره",
      userimage: "../../../public/profile-icon-9.png",
      type: "medical",
      secation: "Helps",
    },
  ],
  food: [
    {
      id: 2,
      title: "وجبات مجانية",
      details: "مطعم يقدم وجبات مجانية يوميًا",
      image: "../../../public/OIP.jpg",
      adress: "الوادي الجديد",
      userimage: "../../../public/profile-icon-9.png",
      type: "food",
      secation: "Helps",
    },
  ],
  education: [
    {
      id: 3,
      title: "كورسات برمجة",
      details: "دورة مجانية لتعلم React",
      image: "../../../public/OIP.jpg",
      adress: "المنوفيه",
      userimage: "../../../public/profile-icon-9.png",
      type: "eduction",
      secation: "Helps",
    },
  ],
  relgine: [
    {
      id: 4,
      title: "تحفيظ قران",
      details: "تحفيظ قران مجانا",
      image: "../../../public/OIP.jpg",
      adress: "المنوفيه",
      userimage: "../../../public/profile-icon-9.png",
      type: "relgine",
      secation: "Helps",
    },
  ],
  animals: [
    {
      id: 5,
      title: "تطعيم بطري ببلاش",
      details: "اي حد عنده كلب يجيبه",
      image: "../../../public/OIP.jpg",
      adress: "القاهره",
      userimage: "../../../public/profile-icon-9.png",
      type: "animals",
      secation: "Helps",
    },
  ],
};

export const mergedData = [
  ...initialData.medical,
  ...initialData.relgine,
  ...initialData.animals,
  ...initialData.food,
  ...initialData.education,
];