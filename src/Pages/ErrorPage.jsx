import Navbar from "./Navbar";
import { useLocation, useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const customMessage = location.state?.message;
  console.log(error.message);
  let title = "An Error Occured !";
  let message = "some Thing went wrong";
  if (error.status === 500) {
    message = error.data?.message || "An Error Occured !";
  }
  if (error.status === 400) {
    message = error.data?.message || "An Error Occured pass !";
  }
  if (error.status === 401) {
    message = error.data?.message || "An Error Occured !";
  }
  if (error.status === 404) {
    title = "Not found";
    message = " could not find page or rescorse";
  }
  return (
    <>
      <Navbar />
      <div>
        <h1>{title}</h1>
        <p>{message}* </p>
      </div>
    </>
  );
}
