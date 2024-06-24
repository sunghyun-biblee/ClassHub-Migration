import React from "react";

import { CommuInfo } from "../hooks/useTargetPost";
import person from "assets/img/person.png";

type IDetailProfileProp = {
  role: string;
  postData: CommuInfo;
};
export const DetailProfile = ({ role, postData }: IDetailProfileProp) => {
  const renderRole = (roleType: string) => {
    switch (roleType) {
      case "USER":
        return "학생";
      case "INSTRUCTOR":
        return "강사";
      default:
        return "학생";
    }
  };

  return (
    <div className="flex  lg:px-5 md:px-2 lg:py-8 md:py-5 flex-col mysm:py-2.5 ">
      <div
        className="flex md:justify-between border-[1px] lg:p-3 md:p-2 rounded-xl
      md:gap-1 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
      >
        <img
          src={
            postData && postData.profilePicture
              ? postData.profilePicture
              : person
          }
          alt="profileIMg"
          className="lg:w-36 md:w-20 mysm:w-[60px]
       md:h-auto mysm:h-[60px] object-cover rounded-2xl
       md:p-0
       mysm:p-2
     
       "
        />
        <div
          className=" flex md:flex-col justify-between md:items-end
       w-[100%]
        mysm:items-center md:p-0 mysm:p-2"
        >
          <p className="md:font-bold mysm:font-semibold lg:text-lg md:text-base mysm:text-xl">
            {postData && postData.nickname ? (
              postData.nickname
            ) : (
              <span className="text-gray-400">탈퇴한 회원</span>
            )}
          </p>
          <p className="lg:text-[16px] md:text-sm mysm:text-sm  font-semibold text-gray-400 text-right md:p-0 mysm:pt-1 md:m-0 mysm:mx-2 flex justify-end md:w-10 lg:w-[100%]">
            <span>{role && renderRole(role)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
