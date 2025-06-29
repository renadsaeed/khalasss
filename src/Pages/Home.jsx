import Error from "../Pages/ErrorPage";
import { useEffect, useState } from "react";
export default function Home() {
  // const [AvailablePlaces, setAvaliablePlaces] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("api/Opportunities");
  //       console.log(response);
  //       const resData = await response.json();
  //       console.log("resdata");
  //       console.log(resData.result);

  //       if (!response.ok) {
  //         throw new Error("failed ");
  //       }
  //     } catch (error) {
  //       setError({
  //         message: error.message || "could not fetch places try agin later",
  //       });
  //       setIsLoading(false);
  //     }

  //     setIsLoading(false);
  //   }
  //   fetchPlaces();
  // }, []);

  // if (error) {
  //   return <Error title="An Error Occured" message={error.message} />;
  // }

  return (
    <>
      <p>Home page</p>
    </>
  );
}
