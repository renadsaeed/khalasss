import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrganizationDonations() {
  const location = useLocation();
  const categoryId = location.state?.id;
  const categoryName = location.state?.Title;

  const [opportunities, setOpportunities] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      axios
        .get(`/api/DonationCategory/${categoryId}`)
        .then((res) => {
          console.log("API Response:", res.data);
          setOpportunities(res.data.result?.donationOpportunities || []);
          setCategoryDescription(res.data.result?.description || "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setOpportunities([]);
          } else {
            setError(err.message || "An error occurred");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
      setOpportunities([]);
    }
  }, [categoryId]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  }

  console.log("opportunities", opportunities);

  return (
    <>
      <div className="page-container w-[85%] p-3 mx-auto">
        <div className="p-6 mb-9 mt-4">
          <h2 className="text-semibold text-2xl">
            تبرع لمشاريع {categoryName || "الجمعيات"}
          </h2>
          <p className="mt-1 text-xl">{categoryDescription}</p>
        </div>
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.length > 0 ? (
            opportunities.map((item) => (
              <div
                className="card-container mb-12 items-center flex flex-col justify-center border-0"
                key={item.id}
              >
                <div className="py-4 w-[320px] max-[321px]:w-[220px] mx-9 border mt-2 border-white border-t-[#eee] shadow-lg rounded-xl">
                  <div className="img-container w-[100%]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-[80%] h-[230px] mx-auto rounded-sm object-contain"
                    />
                  </div>
                  <p className="text-md text-stone-900 mt-6 px-2 text-center">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    <Link
                      state={{
                        id: item.id,
                      }}
                      to="/Donation/DonateNow"
                    >
                      <button className="w-[200px] h-[35px] flex justify-center items-center px-4 py-3 rounded-md outline-0 border-0 align-center text-center text-white bg-green-800">
                        تبرع الان
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-xl">
              لا توجد فرص تبرع لهذه الفئة حالياً.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
