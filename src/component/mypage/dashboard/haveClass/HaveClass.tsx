import React from "react";
import { fetchClass } from "../../../class/hook/useGetArray";
import { useQuery } from "@tanstack/react-query";

export const HaveClass = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classList", 1],
    queryFn: fetchClass,
  });
  console.log(data);
  return (
    <div className="py-3">
      <div className="grid md:grid-cols-3 mysm:grid-cols-3 md:gap-3 mysm:gap-5">
        {data?.slice(0, 3).map((item) => (
          <div className="flex flex-col">
            <img src={item.img} alt="" className="w-[100%] rounded-md mb-1" />
            <b className="whitespace-nowrap overflow-hidden text-ellipsis ">
              {item.title}
            </b>
            <h1 className="py-1 mysm:text-sm mysm:font-semibold mysm:text-gray-500">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};
