import React, { useState } from "react";
import { Volunteeringmenu } from "./Volunteeringmenu";
import { Link } from "react-router-dom";
import "./Dropdown.css";
export default function Volunteeringdropdown() {
  return (
    <ul
      className={
        " z-30 w-[200px] absolute left-[-60px] top-[52px] flex flex-col justify-center"
      }
    >
      {console.log("v")}
      {Volunteeringmenu.map((item, index) => {
        return (
          <li
            key={index}
            className=" drop cursor-pointer border-b-1 border-amber-100 "
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
