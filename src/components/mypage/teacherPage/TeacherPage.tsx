import React from "react";
import { MobileTPage } from "./MobileTPage";
import { PCTpage } from "./PCTpage";

export const TeacherPage = () => {
  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
flex flex-col
md:mt-2
"
    >
      <PCTpage></PCTpage>
      <MobileTPage></MobileTPage>
    </div>
  );
};
