import React from "react";
import { HeartSVG } from "./HeartSVG";
import { paymentResType } from "components/cart/PaymentedPage";
import { paymentedItemType } from "./ShowList";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
interface IApplicationItemProp {
  data: paymentedItemType;
}

export const ApplicationItem = ({ data }: IApplicationItemProp) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["paymentedDetail", data.ordersId],
  });
  const nav = useNavigate();
  const handlePaymentedDeatil = (orderId: number) => {
    nav(`/cart/order/paymented/${orderId}`);
  };
  return (
    <div className=" border-[1px] py-2 px-1 mb-3 rounded-md ">
      <ul
        className="grid 
      md:grid-cols-[0.5fr,1.5fr,0.7fr,0.7fr,0.5fr,0.5fr]
     mysm:grid-cols-[0.5fr,1.3fr,0.7fr,0.7fr,0.5fr,0.8fr]
    
       text-center"
      >
        <li className="px-[5px] flex justify-center">
          <span>{data.ordersId}</span>
        </li>
        <li className="whitespace-nowrap overflow-hidden text-ellipsis px-[5px]">
          <span>{data.orderName}</span>
        </li>
        <li className="px-[5px] flex justify-center items-center">
          <p>{data.regdate.split("T")[0]}</p>
        </li>
        <li className="px-[5px] md:text-base mysm:text-sm flex justify-center items-center">
          <p>{data.totalPrice}원</p>
        </li>
        <li className="px-[5px] flex justify-center items-center">
          <p>{data.finalOrderStatus === 1 ? "✅" : "❌"}</p>
        </li>
        <li
          className="px-[5px] flex justify-center items-center cursor-pointer"
          onClick={() => handlePaymentedDeatil(data.ordersId)}
        >
          <p>{">"}</p>
        </li>
      </ul>
    </div>
  );
};
