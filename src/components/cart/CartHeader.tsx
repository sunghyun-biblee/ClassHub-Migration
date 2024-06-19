import React from "react";
import logo from "assets/img/Logo.png";
import { useNavigate } from "react-router-dom";

interface ICartHeader {
  progress: string;
}

export const CartHeader = ({ progress }: ICartHeader) => {
  const nav = useNavigate();
  const handleMoveClick = (location: string) => {
    nav(`${location}`);
  };
  return (
    <div className="w-[100%] md:text-base mysm:text-sm">
      <ul className="grid grid-cols-3  text-center gap-5 mx-1">
        <li
          className={`flex justify-center items-center py-3 cursor-pointer ${
            progress === "cart"
              ? "text-blue-500 font-semibold border-2 border-blue-500"
              : "border-[1px] font-medium"
          }`}
          onClick={() => handleMoveClick("/cart")}
        >
          <p>1.&nbsp; 장바구니</p>
        </li>
        <li
          className={`flex justify-center items-center py-3  ${
            progress === "order"
              ? "text-blue-500 font-semibold border-2 border-blue-500"
              : "border-[1px] font-medium"
          }`}
        >
          <p>2.&nbsp; 주문/결제하기</p>
        </li>

        <li
          className={`flex justify-center items-center py-3 ${
            progress === "paymented"
              ? "text-blue-500 font-semibold border-2 border-blue-500"
              : "border-[1px] font-medium"
          }`}
        >
          <p>3.&nbsp; 결제완료</p>
        </li>
      </ul>
    </div>
  );
};
