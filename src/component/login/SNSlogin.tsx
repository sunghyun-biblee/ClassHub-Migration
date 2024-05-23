import React from "react";

import { KakaoLogin } from "./KakaoLogin";
import { GoogleLoginBtn } from "./GoogleLogin";

export const SNSlogin = () => {
  return (
    <div className="py-2 md:border-0 mysm:border-t-2">
      <h1
        className="text-left md:py-3 md:px-2 mysm:py-2 mysm:px-1
       text-xl font-semibold md:hidden mysm:block"
      >
        SNS로그인
      </h1>
      <div
        className="flex
    md:flex-col
    mysm:flex-row
    md:items-start
    md:justify-normal
    mysm:justify-around
    lg:py-5
    mysm:py-3 "
      >
        <KakaoLogin></KakaoLogin>
        <GoogleLoginBtn></GoogleLoginBtn>
      </div>
    </div>
  );
};
