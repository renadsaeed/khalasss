// import React from "react";
// import { Card, CardContent } from "@/component/ui/card";
// import { Check, Coins } from "lucide-react";

// const SummaryStats = ({ title, value, unit, icon }) => {
//   const getIcon = () => {
//     switch (icon) {
//       case "donations":
//         return <Coins className="h-5 w-5 text-green-600" />;
//       case "beneficiaries":
//         return <Check className="h-5 w-5 text-blue-600" />;
//       case "projects":
//         return <Check className="h-5 w-5 text-purple-600" />;
//       default:
//         return <Check className="h-5 w-5 text-primary" />;
//     }
//   };

//   return (
//     <Card className="border-0 shadow-none bg-gray-50">
//       <CardContent className="p-4 flex items-center justify-between">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <div className="flex items-center gap-1 mt-1">
//             <p className="text-lg font-bold">{value}</p>
//             <span className="text-xs text-muted-foreground">{unit}</span>
//           </div>
//         </div>
//         <div className="bg-white p-2 rounded-full shadow-sm">{getIcon()}</div>
//       </CardContent>
//     </Card>
//   );
// };

// export default SummaryStats;
export default function SummaryStats({ title, value, unit, icon, className }) {
  return (
    <div className="border-0 shadow-none text-stone-600 bg-[#f3f5f7] ">
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-lg text-muted-foreground">{title}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-lg text-black font-bold">{value}</p>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="bg-white p-2 rounded-full flex justify-center items-center shadow-sm ">
          <div
            className={`h-5 w-5 text-xl  flex justify-center items-center  ${className} `}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
