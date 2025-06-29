import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

const DonationChart = ({ data }) => {
  console.log(data);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 415);
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-2 pr-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-lg mr-2 text-gray-800">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {isMobile ? (
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              content={renderCustomLegend}
            />
          ) : (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={renderCustomLegend}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;
