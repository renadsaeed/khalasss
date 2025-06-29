import { useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import Helpdetails from "./Helpdetails";
import "./Help.css"; // Import the new CSS

export default function Helpsbox(props) {
  const detailsmodel = useRef();

  function handelrest() {
    detailsmodel.current.close();
  }

  return (
    <>
      <div className="help-card">
        <div className="card-header">
          <div className="card-user-info">
            <img
              src={props.userimage}
              alt="User"
              className="card-user-avatar"
            />
            <div>
              <p className="card-user-name">{props.title}</p>
              {/* You can add a subtitle here if available, e.g., "متبرع" */}
            </div>
          </div>
          <button
            onClick={() => detailsmodel.current.showModal()}
            className="card-menu-btn"
          >
            <HiDotsVertical size={22} />
          </button>
        </div>

        <div className="card-body">
          <p className="tracking-wider text-lg">
            قام بتغيير التفاصيل قبل{props.details} ايام
          </p>
        </div>
      </div>

      <Helpdetails
        id={props.id} // Use a unique id for the key
        ref={detailsmodel}
        rest={handelrest}
        title={props.title}
      />
    </>
  );
}
