import { useNavigate } from "react-router-dom";
export default function Homehelp(props) {
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    // هنضيف النوع (props.title) في الكويري ?type=
    navigate(`/Help?type=${encodeURIComponent(props.title)}`);
  };

  return (
    <>
      <div className="card-container max-[321px]:w-[280px] mb-3 max-[376px]:w-[320px] xl:w-[350px] max-[415px]:w-[350px] lg:w-[290px] mx-auto  border border-stone-300 shdow-sm  rounded-xl ">
        <div className="card-contant flex flex-col ">
          <div className=" card-top w-[95%] text-center mx-auto p-2    ">
            <div
              style={{
                backgroundImage: `url("/help.png")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="w-[100%] h-[200px]  rounded-xl mt-1 "
            >
              <div className=" flex justify-center items-center h-[100%]  ">
                <div className="w-[90%] bg-white h-[60px] text-md text-black rounded-lg flex items-center justify-center ">
                  {props.title}
                </div>
              </div>
            </div>
          </div>
          <div className="card-bottom mt-2 border-t-1 rounded-xl rounded-0 flex justify-center items-center py-2 border-stone-300 ">
            <button
              onClick={handleDetailsClick}
              className="text-center text-black text-[20px] border-0 outline-0"
            >
              التفاصيل
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
