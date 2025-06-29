import { useState } from "react";
import { data } from "./data";
import { IoSearchOutline } from "react-icons/io5";
import "./Searchbar.css";
export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const handelicon = () => setClick(!click);
  return (
    <>
      {click ? (
        <div className="sm:hidden xl:block  self-center xl:pr-0 xl:ml-[60px] 2xl:pr-[10px] search  2xl:ml-[82px] border-l-2 flex justify-between rounded-xs">
          <input
            type="text"
            placeholder="ابحث"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className=" bar xl:w-[120px]  2xl:w-[180px] ml-[30px] xl:mr-0 mr-[50px] border-b-1 border-[#0D8F75] outline-0"
          />
          {/* <div className="w-[30px] pr-[10px]">
            <IoSearchOutline
              className={
                "xl:hidden  2xl:inline-block text-2xl   text-[#0D8F75] w-[20px]  "
              }
            />
          </div> */}
        </div>
      ) : (
        <div className="self-center search   pl-[60px] border-l-2 flex justify-between rounded-xs">
          <IoSearchOutline
            onClick={handelicon}
            className={"inline-block text-3xl  text-[#0D8F75]  "}
          />
        </div>
      )}

      <ul className="absolute top-[50%]">
        {data
          .filter((item) => {
            return search === " " ? item : item.title.includes(search);
          })
          .map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
      </ul>
    </>
  );
}
