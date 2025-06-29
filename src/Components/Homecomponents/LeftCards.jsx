export default function LeftCards({ title, value, unit, icon, className }) {
  return (
    <div className={className + " flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 sm:p-4"}>
      <div className="cardinfo mt-2 grow sm:mr-3 w-full">
        <h3 className="font-light text-base sm:text-lg md:text-xl text-[#0D8F75] mb-1 text-center sm:text-right">
          {title}
        </h3>
        <div className="flex flex-col sm:flex-row mt-3 items-center sm:items-start justify-center sm:justify-start">
          <p className="text-base sm:text-lg md:text-xl font-bold text-center sm:text-right">{value}</p>
          {unit && (
            <span className="text-sm sm:text-base md:text-lg mr-0 sm:mr-2 text-stone-500 text-center sm:text-right">
              {unit}
            </span>
          )}
        </div>
      </div>
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center mb-2 sm:mb-0">
        <div className="bg-[#e2f4e8] text-[#0D8F75] text-xl sm:text-2xl p-3 rounded-full flex items-center justify-center w-full h-full">
          {icon}
        </div>
      </div>
    </div>
  );
}
