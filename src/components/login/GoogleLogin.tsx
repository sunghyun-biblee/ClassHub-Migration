import google from "assets/img/SNSIMG/web_light_sq_na.svg";

import { useNavigate } from "react-router-dom";

import { FireBaseLogin } from "./AuthFunctions/AuthFunction";

export const GoogleLoginBtn = () => {
  const nav = useNavigate();

  const handleLogin = async () => {
    const prevData = localStorage.getItem("ClassHub_LUD");
    if (prevData) return nav("/");

    const result = await FireBaseLogin();
    if (result) {
      return nav("/");
    } else {
      return alert("오류가 발생하였습니다.");
    }
  };
  return (
    <div id="google" className="flex rounded-md">
      <img src={google} alt="" className="lg:my-1 h-[40px]" />
      <button
        className=" z-10 bg-[#FFFFFF] px-2 border-y-[1px] border-r-[1px] border-[#747775] rounded-r-[4px] text-gray-500 translate-x-[-5px] font-semibold text-[12px] lg:my-1 w-[8.1rem] max-h-[40px]"
        onClick={handleLogin}
      >
        Google 로그인
      </button>
    </div>
  );
};
