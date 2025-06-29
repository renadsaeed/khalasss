import Logo from "../../../public/login.png";

import { Link } from "react-router-dom";
import Emailfiled from "./Formfileds";
import "./Singup.css";
export default function Singup() {
  return (
    <div className="landing ">
      <div className=".container mt-0 pt-0  flexcenter flex flex-col justify-center items-center rounded-md">
        <div className="container-contant min-[375px]:w-[350px] min-[375px]:mb-[50px] min-[375px]:p-[30px]   min-[540px]:w-[400px] sm:w-[400px] lg:w-[400px] xl:w-[30%] h-fit min-[540px]:mb-[80px] xl:mb-[90px] xl:pr-5 xl:pl-3  bg-white rounded-xl">
          <div className="container-contant-img w-[100%] h-fit  flex  justify-center">
            <img
              src={Logo}
              alt="hello"
              className="w-[40px] lg:pt-[4px] xl:pt-[10px] pt-[10px]"
            />
          </div>
          <div className="login-text w-[100%] flex flex-col items-center pt-[7px] justify-center ">
            <h2 className="font-bold text-xl">انشاء حساب</h2>
            <h3 className="text-xl pt-[7px]">
              لديك حساب؟{" "}
              <span>
                <Link to="/Login">تسجيل الدخول</Link>
              </span>
            </h3>
          </div>

          <Emailfiled />
        </div>
      </div>
    </div>
  );
}
