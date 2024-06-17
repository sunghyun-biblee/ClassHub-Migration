import React from "react";

interface Iiconprop {
  category: string | undefined;
  id: string;
}
export const Icon = ({ category, id }: Iiconprop) => {
  return (
    <div className="pr-3 lg:block md:hidden mysm:hidden">
      <svg width="10" height="10">
        <circle
          cx="5"
          cy="5"
          r="3"
          stroke="none"
          fill={category === id ? "#3B82F6" : "black"}
        />
      </svg>
    </div>
  );
};
