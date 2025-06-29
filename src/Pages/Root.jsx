import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import FloatingDonateButton from "../Components/FloatingDonateButton/FloatingDonateButton";
export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FloatingDonateButton />
    </>
  );
}
