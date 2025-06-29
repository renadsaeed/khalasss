import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Volanteringcards(props) {
  return (
    <div className="shadow-sm" key={props.key}>
      <div className="container  border border-stone-200  p-3 rounded-md  ">
        <div className="title flex justify-between  p-1 mb-1">
          <p className="text-xl font-medium text-black">{props.title}</p>
          <p className="text-xl text-[#52dcc0]">
            <IoShareSocialOutline />
          </p>
        </div>
        <div className="imgcard    ">
          <img
            src={props.photoUrl}
            alt="imgCard"
            className="w-[100%] h-[270px]"
          />
        </div>
        <div className="flex justify-center">
          <Link to={`/Volantering/${props.id}`} >
          <button  className="w-[200px]  shadow-md   bg-[#0D8F75] mt-4 text-center rounded-md text-white px-2 py-1 h-[40px] text-xl  ">
            تطوع الان
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
