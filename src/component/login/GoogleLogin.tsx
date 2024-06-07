import React from "react";
import google from "assets/img/SNSIMG/web_light_sq_na.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GoogleLoginBtn = () => {
  const nav = useNavigate();
  const Login = () => {
    window.location.href =
      "https://api.devproject.store/oauth2/authorization/google";
  };
  const googleLoginFn = useGoogleLogin({
    onSuccess: async (res) => {
      if (res) {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${res.access_token}` } }
        );
        const requestBody = {
          snsId: userInfo.data.sub,
          accessToken: res.access_token,
          name: userInfo.data.name,
          nickname: userInfo.data.name,
          email: userInfo.data.email,
          profilePicture: userInfo.data.picture,
        };
        try {
          const result = await axios.post(
            "https://devproject.store/join",
            requestBody
          );
          localStorage.setItem("user", JSON.stringify(requestBody));
          console.log(result.data);
          if (result.data.statusCode === 200) {
            nav("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
      // nav("/");
    },
    onError: (error) => console.log(error),
  });
  return (
    <div id="google" className="flex rounded-md">
      <img src={google} alt="" className="lg:my-1 h-[40px]" />
      <button
        className=" z-10 bg-[#FFFFFF] px-2 border-y-[1px] border-r-[1px] border-[#747775] rounded-r-[4px] text-gray-500 translate-x-[-5px] font-semibold text-[12px] lg:my-1 w-[8.1rem] max-h-[40px]"
        onClick={() => Login()}
      >
        Google 로그인
      </button>
      {/* <GoogleLogin
        onSuccess={(response) => {
          console.log(response);
        }}
        onError={() => {
          console.error("Failed Login..");
        }}
      ></GoogleLogin> */}
    </div>
  );
};

// const registrationId = "google";
// try {
//   // const request = await axios.get(
//   //   `https://devproject.store/login/oauth2/code/${registrationId}`,
//   //   {
//   //     params: {
//   //       code: res.code,
//   //       registrationId: "google",
//   //     },
//   //   }
//   // );
//   // console.log(request.data);
// } catch (error) {
//   console.log(error);
// }
