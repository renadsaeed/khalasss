import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Donations from "./Donations";
export default function HomeCards(props) {
  console.log("HomeCards props:", props); // للتأكد من البيانات الواردة

  return (
    <>
      <div className="Containerr border-1 border-gray-300 bg-white rounded-xl w-full max-w-sm mx-auto p-3 sm:p-4 shadow-md flex flex-col items-center">
        <div className="CardContant flex justify-between p-2 sm:p-3 mt-2 mx-2 font-semibold text-base sm:text-lg md:text-xl w-full">
          <p>{props.title}</p>
          <IoShareSocialOutline className="text-2xl text-[#0D8F75]" />
        </div>
        <div className="w-full mt-2">
          <img
            src={props.image}
            alt="img"
            className="w-full h-56 sm:h-64 md:h-72 mx-auto rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-row gap-2 w-full mt-4 mb-2">
          <Link
            to="/Donation/DonateNow"
            state={{
              id: props.id,
            }}
            className="flex-1"
          >
            <button className="w-full h-[38px] bg-[#0D8F75] rounded-2xl text-base sm:text-lg md:text-xl text-white font-bold transition hover:bg-[#117c6b]">
              تبرع الان
            </button>
          </Link>

          <Link
            to="/Donation/OrganizationDonations"
            state={{
              id: props.categoryId || props.id,
              Title: props.title,
              Image: props.image,
              Category: props.category,
            }}
            className="flex-1"
          >
            <button className="w-full h-[38px] bg-[#0D8F75] rounded-2xl text-base sm:text-lg md:text-xl text-white font-bold transition hover:bg-[#117c6b]">
              تبرع لجمعيه
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
