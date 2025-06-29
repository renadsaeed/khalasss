import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeSlider() {
  return (
    <div className="h-[500px] text-right">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        dir="rtl" // التأكد من أن الاتجاه من اليمين لليسار
        className="h-[500px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full border-2 border-[#0D8F75] rounded-xl overflow-hidden">
            <img
              src="/camp.png"
              alt="Slide 1"
              className="object-cover w-full h-full"
            />
            <div
              className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#0D8F75]/80 to-transparent p-10 flex flex-col justify-center items-end text-right"
              style={{
                zIndex: 10,
                direction: "rtl",
              }}
            >
              <h2 className="text-white text-3xl font-bold mb-2">فرصة</h2>
              <p className="text-white text-lg mb-4">للخير بين يديك</p>
              <button className="bg-white text-[#0D8F75] px-8 py-2 rounded-full font-bold text-lg shadow">
                تبرع الآن
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full border-2 border-[#0D8F75] rounded-xl overflow-hidden">
            <img
              src="/mosque.jpg"
              alt="Slide 2"
              className="object-cover w-full h-full"
            />
            <div
              className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#0D8F75]/80 to-transparent p-10 flex flex-col justify-center items-end text-right"
              style={{
                zIndex: 10,
                direction: "rtl",
              }}
            >
              <h2 className="text-white text-3xl font-bold mb-2">التطوع بصمة مُخلدة</h2>
              <p className="text-white text-lg mb-4">ابدأ رحلتك</p>
              <button className="bg-white text-[#0D8F75] px-8 py-2 rounded-full font-bold text-lg shadow">
                تطوع الآن
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full border-2 border-[#0D8F75] rounded-xl overflow-hidden">
            <img
              src="/slider3.jpg"
              alt="Slide 3"
              className="object-cover w-full h-full"
            />
            <div
              className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#0D8F75]/80 to-transparent p-10 flex flex-col justify-center items-end text-right"
              style={{
                zIndex: 10,
                direction: "rtl",
              }}
            >
              <h2 className="text-white text-3xl font-bold mb-2">مشاركة الحب تصنع الفرق</h2>
              <p className="text-white text-lg mb-4">كن جزءًا من التغيير</p>
              <button className="bg-white text-[#0D8F75] px-8 py-2 rounded-full font-bold text-lg shadow">
                شارك الآن
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
