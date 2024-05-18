import React, { useRef, useState } from "react";
import logo from "assets/img/Logo.png";

import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export interface ILoginProps {
  setPage: (page: number) => void;
}
export const LoginPage = () => {
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="lg:pt-[85px] md:pt-[75px] mysm:pt-[75px] max-w-[100vw] 
 flex flex-col md:justify-center items-center h-[90dvh]
 mysm:justify-center
      "
    >
      <section
        className="lg:grid lg:grid-cols-[1fr,600px] 
    
      mysm:flex
      mysm:flex-col
      lg:gap-0 md:gap-1
      lg:p-5  md:px-3  mysm:px-1
      md:h-auto
     items-center
      "
      >
        <article
          className={`flex mysm:justify-center items-center
          md:h-auto mysm:h-[250px] ${page === 2 && "mysm:hidden lg:block"} `}
        >
          <img
            src={logo}
            alt=""
            className="lg:h-[100%] md:h-[100%] mysm:h-[100%]
            lg:m-0
            md:mr-2
            "
          />
        </article>
        <article
          className={`flex overflow-hidden  md:w-[100%] mysm:w-[90vw] relative bg-[#1C8DCE] lg:py-5 mysm:py-3 px-3   rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.3)] text-[#efefef]  ${
            page === 0 ? " lg:h-[300px] " : ""
          }
          `}
        >
          <div className="flex w-[100%]" ref={ref}>
            <div
              className={`relative
            min-w-[100%] ${page === 0 ? "block" : "hidden"}`}
            >
              <h1
                className={`lg:m-2 lg:text-2xl md:text-xl opacity-0 font-extrabold transition-opacity animate-fade-in-1
              `}
              >
                ClassHub에 오신걸 환영합니다🎉
              </h1>
              <div className="flex flex-col justify-center lg:mt-14 md:my-7 md:h-auto mysm:h-48">
                <h2
                  className={` font-extrabold md:text-lg text-center   opacity-0 transition-opacity animate-fade-in-2`}
                >
                  아이디가 있으신가요?
                </h2>
                <div
                  className={`flex mysm:justify-center lg:p-5 mysm:py-4 transition-opacity
               opacity-0
               animate-fade-in-3
              
              `}
                >
                  <button
                    className="lg:py-3 mysm:py-2 mr-10 border-[1px] font-semibold border-zinc-400 rounded-xl lg:w-32 md:w-28 mysm:w-20"
                    onClick={() => setPage(1)}
                  >
                    네
                  </button>
                  <button
                    className="lg:py-3 mysm:py-2 border-[1px] font-semibold
                    border-zinc-400 rounded-xl lg:w-32 md:w-28 mysm:w-20"
                    onClick={() => setPage(2)}
                  >
                    아니요
                  </button>
                </div>
                <div
                  className={`absolute bottom-0 w-[100%] transition-opacity opacity-0 animate-fade-in-4`}
                >
                  <ul className="flex justify-end md:px-4 mysm:px-2">
                    <li className="text-gray-300/90 cursor-pointer text-sm text-center pr-5">
                      아이디 찾기
                    </li>
                    <li className="text-gray-300/90 cursor-pointer text-sm text-center">
                      비밀번호 찾기
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`min-w-[100%] ${page === 1 ? "block" : "hidden"}`}>
              <SignIn setPage={setPage}></SignIn>
            </div>
            <div className={`min-w-[100%] ${page === 2 ? "block" : "hidden"}`}>
              <SignUp setPage={setPage}></SignUp>
            </div>
          </div>
          {/* <img
            src={right}
            alt=""
            className={`w-5 absolute right-0 top-[50%] z-10 ${
              page === 2 ? "hidden" : "block"
            }`}
            onClick={nextClick}
          /> */}
        </article>
      </section>
    </div>
  );
};

// useEffect(() => {
//   if (ref.current !== null) {
//     ref.current.style.transform = `translateX(-${page}00%)`;
//   }
// }, [page]);

// const prevClick = () => {
//   if (ref.current !== null) {
//     ref.current.style.transition = `transform 0.6s`;
//     ref.current.style.transform = `translateX(${page}00%)`;
//   }
//   if (page === 0) {
//     return;
//   } else {
//     setPage((prev) => prev - 1);
//   }
// };

// const nextClick = () => {
//   if (ref.current !== null) {
//     ref.current.style.transition = `transform 0.5s`;
//     ref.current.style.transform = `translateX(${page}00%)`;
//   }
//   if (page === 2) {
//     return;
//   } else {
//     setPage((prev) => prev + 1);
//   }
// };
