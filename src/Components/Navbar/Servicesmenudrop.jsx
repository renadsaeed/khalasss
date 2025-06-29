import React, { useState } from "react";
import { Servicesmenu } from "./Volunteeringmenu";
import { Link } from "react-router-dom";
import "./Dropdown.css";
export default function Servicesmenudrop() {
  return (
    <ul
      className={
        "z-30 w-[200px]  services absolute left-[48%] top-[80px] flex flex-col justify-center"
      }
    >
      {Servicesmenu.map((item, index) => {
        return (
          <li
            key={index}
            className=" drop cursor-pointer hover:bg-[#8fb6ae] border-b-1 border-amber-100 "
          >
            <Link
              to={item.path}
              onClick={() => setMeanuClick(false)}
              className="block p-[16px] w-[100%] h-[100%]"
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
