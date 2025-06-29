import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Charitycard(props) {
  return (
    <div>
      <div
        className="card-container  mb-12 mt-4 items-center  flex flex-col justify-center border-0     "
        key={props.index}
      >
        <div className="  py-4 w-[320px] max-[321px]:w-[220px] mx-9  border mt-2  border-white border-t-[#eee] shadow-lg rounded-xl  ">
          <div className="img-container w-[100%]">
            <img
              src={props.img}
              alt="img"
              className=" w-[80%]  h-[230px] mx-auto rounded-sm"
            />
          </div>
          <p className="text-md text-stone-900 mt-6 px-2 text-center">
            {props.charityName}
          </p>
          <div className="flex items-center justify-center mt-4">
            <Link
              state={{
                charityName: props.charityName,
                id: props.id,
                key: props.key,
                address: props.address,
                charityMission: props.charityMission,
                charityRegistrationNumber: props.charityRegistrationNumber,
                email: props.email,
                establishedAt: props.establishedAt,
                phoneNumber: props.phoneNumber,
                image: props.img,
              }}
              to={`/charity/${props.id}`}
            >
              <button className="w-[200px] h-[35px] flex justify-center items-center px-4 py-3 rounded-md outline-0 border-0  align-center  text-center text-white bg-green-800">
                عرض الجمعيه
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
