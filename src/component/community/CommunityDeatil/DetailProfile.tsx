import React from "react";
import preview from "../../../assets/img/preview.jpg";
type IDetailProfileProp = {
  name: string;
  category: string;
};
export const DetailProfile = ({ name, category }: IDetailProfileProp) => {
  return (
    <div className="flex  lg:px-5 md:px-2 lg:py-8 md:py-5 flex-col mysm:py-2.5 ">
      <div
        className="flex md:justify-between border-[1px] lg:p-3 md:p-2 rounded-xl
        md:gap-1
      
   
    shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
      >
        <img
          src={preview}
          alt=""
          className="lg:w-44 md:w-28 mysm:w-[60px]
       md:h-auto mysm:h-[60px] object-cover rounded-2xl
       md:p-0
       mysm:p-2
     
       "
        />
        <div
          className=" flex md:flex-col justify-between 
       w-[100%]
        mysm:items-end md:p-0 mysm:p-3"
        >
          <p className="md:font-bold mysm:font-semibold lg:text-xl md:text-base mysm:text-3xl">
            {" "}
            {name}
          </p>
          <p className="lg:text-[16px] md:text-sm mysm:text-sm  font-semibold text-gray-400 text-right md:p-0 mysm:pt-1 md:m-0 mysm:mx-2">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};
