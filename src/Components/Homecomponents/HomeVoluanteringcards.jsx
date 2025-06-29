import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Donations from "./Donations";
import OrganizationVoluantering from "./OrganizationDonations";
export default function HomeVoluanteringcards(props) {
  // console.log(props.title, props.image, props.category, "hiiii");
  return (
    <>
      <div className="Containerr border-1 border-gray-300 bg-white rounded-xl w-full max-w-xs mx-auto p-3 sm:p-4">
        <div className="CardContant flex justify-between p-2 sm:p-3 mx-2 font-semibold text-base sm:text-lg md:text-xl">
          <p>{props.title}</p>
          <IoShareSocialOutline className="text-2xl text-[#0D8F75]" />
        </div>
        <div className="w-full mt-2">
          <img
            src={props.image}
            alt="img"
            className="w-full h-40 sm:h-56 md:h-64 mx-auto rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4 mb-2 mx-2 gap-2">
          <Link
            to="/Donations"
            state={{
              Title: props.title,
              Image: props.image,
              Category: props.category,
            }}
          >
            <button className="w-full sm:w-[140px] md:w-[150px] flex justify-center items-center mr-0 sm:mr-2 h-[36px] bg-[#0D8F75] px-2 py-2 rounded-2xl text-base sm:text-lg md:text-xl text-white ">
              تطوع كفرد
            </button>
          </Link>

          <button className="w-full sm:w-[140px] md:w-[150px] flex justify-center items-center ml-0 sm:ml-2 h-[36px] bg-[#0D8F75] px-2 py-2 rounded-2xl text-base sm:text-lg md:text-xl text-white ">
            تطوع مع جمعيه
          </button>
        </div>
      </div>
    </>
  );
}
