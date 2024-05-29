import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getOrderList } from "./hooks/getOrderList";
import { useAuth } from "hooks/AuthProvider";
import preview from "assets/img/preview.jpg";
interface orderItemType {
  orderDetailId: number;
  ordersId: number;
  classId: number;
  classResponseDTO: {
    classId: number;
    instructorsId: number;
    name: string;
    categoryId: number;
    className: string;
    description: string;
    summary: string;
    price: number;
    thumnail: string;
    totalVideoLength: number;
    reviewScore: number;
    regdate: string;
    editDate: string | null;
  };
}
export const OrderPage = () => {
  const { userData } = useAuth();
  const { data, isLoading, isError, error } = useQuery<orderItemType[], Error>({
    queryKey: ["orderList"],
    queryFn: () => getOrderList(userData.userId),
  });
  console.log(data);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  const renderTotalPrice = () => {
    if (data) {
      const totalPrice = data.reduce(
        (total, item) => total + item.classResponseDTO.price,
        0
      );
      return totalPrice.toLocaleString();
    }
  };
  return (
    <div className="flex justify-center items-center mt-10">
      <section
        className=" border-[1px] w-[50%]
      border-dashed py-5 px-3
     
      "
      >
        <article className="flex flex-col ">
          <b className="pb-5 ">주문자명 : {userData.name}</b>
          <strong className="mb-2 py-2 bg-blue-400/30 rounded-md px-2 shadow-sm">
            주문 상품
          </strong>
          <div className="max-h-[50dvh]">
            {data?.map((item) => (
              <div className="border-[1px] p-2 shadow-md rounded-md">
                <div className="flex justify-between">
                  <img
                    src={preview}
                    alt="orderItemImg"
                    className="mysm:w-[100px] h-auto rounded-md"
                  />
                  <ul className="text-right">
                    <li className="py-1">
                      <span className="text-gray-400 font-semibold">
                        주문번호 &nbsp;{item.ordersId}
                      </span>
                    </li>
                    <li className="py-1">
                      <strong>{item.classResponseDTO.className}</strong>
                    </li>
                    <li className="py-1 font-semibold">
                      {item.classResponseDTO.price.toLocaleString()}원
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="pt-10">
          <ul className="bg-blue-400/30 px-2 py-3 rounded-t-lg shadow-sm">
            <li className="flex justify-between py-1">
              <b>주문명</b>
              <strong>
                {data && data[0].classResponseDTO.className} 외 {data?.length}건
              </strong>
            </li>
            <li className="flex justify-between py-1">
              <b>총 금액</b>
              <strong>{renderTotalPrice()}원</strong>
            </li>
          </ul>
          <button className="text-center w-[100%]  py-3 bg-blue-400 rounded-b-lg text-black/80 font-semibold text-lg">
            결제하기
          </button>
        </article>
      </section>
    </div>
  );
};
