import React from "react";
import logo from "assets/img/Logo.png";
interface ICartHeader {
  progress: string;
}

export const CartHeader = ({ progress }: ICartHeader) => {
  return (
    <div className="w-[100%] md:text-base mysm:text-sm">
      <ul className="grid grid-cols-3  text-center gap-5 mx-1">
        <li className="flex justify-center items-center  border-2 py-3">
          <p>1.&nbsp; 장바구니</p>
        </li>
        <li className="flex justify-center items-center  border-2 py-3">
          <p>2.&nbsp; 주문/결제하기</p>
        </li>

        <li className="flex justify-center items-center  border-2 py-3">
          <p>3.&nbsp; 결제완료</p>
        </li>
      </ul>
    </div>
  );
};
