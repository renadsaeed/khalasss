// import React from "react";
// import { Card, CardContent } from "@/component/ui/card";
// import { cn } from "@/lib/utils";

// const StatCard = ({ title, value, unit, icon, className }) => {
//   return (
//     <Card className={cn("overflow-hidden", className)}>
//       <CardContent className="p-6 flex justify-between items-center">
//         <div className="text-right">
//           <h3 className="font-bold text-lg mb-1">{title}</h3>
//           <div className="flex items-center justify-end gap-1">
//             <p className="text-xl font-bold">{value}</p>
//             {unit && (
//               <span className="text-sm text-muted-foreground">{unit}</span>
//             )}
//           </div>
//         </div>
//         <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatCard;

export default function StatCard({ title, value, unit, icon, className }) {
  return (
    <div className={className}>
      <div className="cardinfo  mt-2 grow mr-3 ">
        <h3 className="font-light text-2xl mb-1">{title}</h3>
        <div className="flex mt-3">
          <p className="text-2xl font-bold">{value}</p>
          {unit && <span className="text-md mr-2 text-stone-500">{unit}</span>}
        </div>
      </div>
      <div className="  w-[80px] flex justify-center items-center">
        <div className="bg-[#e2f4e8] text-[#0D8F75] text-2xl p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}
