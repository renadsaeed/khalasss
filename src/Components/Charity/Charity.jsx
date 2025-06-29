import { useLoaderData } from "react-router-dom";
import Charitycard from "./Charitycard";
export default function Charity() {
  const data = useLoaderData();
  const Charityes = data.result;
  console.log("charities :");
  console.log(Charityes);
  return (
    <>
      <div className="organiztioncontainer w-[90%] p-3  mx-auto  ">
        <div className="page-info pt-[40px] pb-[20px] px-3 ">
          <span className="font-bold text-2xl">الصفحه الرئيسية/</span>
          <span className="text-xl">الجمعيات</span>
        </div>
        <div className="orghistory tracking-wide rounded-sm bg-[#F9FAFB] text-black text-lg font-bold p-4 mt-2">
          <h2 className="text-2xl font-normal p-2">
            الجمعيات والموسسات الخيريه فى مصر
          </h2>
          <p>
            موقع <span>وصل الخير</span> هو منصة إلكترونية تهدف إلى ربط
            المتبرعين، والمتطوعين، والجهات الخيرية في مصر في مكان واحد. انطلق
            الموقع برؤية دعم العمل الخيري والمجتمعي، من خلال توفير وسيلة سهلة
            وآمنة للمشاركة في الأعمال الخيرية. من خلال <span>وصل الخير</span>،
            يمكن للأفراد تصفح الفرص التطوعية والمساعدات المتاحة، بالإضافة إلى
            التبرع مباشرة للجمعيات الخيرية الموثوقة. كما يتيح الموقع للجمعيات
            تسجيل بياناتها وعرض أنشطتها وفرص التعاون معها. يهدف الموقع إلى تسهيل
            الوصول للخير، وتعزيز ثقافة التطوع والتكافل في المجتمع المصري، مع
            ضمان الشفافية والموثوقية في كل خطوة.
          </p>
        </div>
        <div className="cards grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {Charityes.map((data, index) => (
            <Charitycard
              charityName={data.charityName}
              address={data.address}
              charityMission={data.charityMission}
              charityRegistrationNumber={data.charityRegistrationNumber}
              email={data.email}
              establishedAt={data.establishedAt}
              phoneNumber={data.phoneNumber}
              id={data.id}
              img={data.image}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function Loader() {
  const response = await fetch("/api/Charity");
  console.log("Charitys");
  console.log(response);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "could not fetch Charitys" }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
