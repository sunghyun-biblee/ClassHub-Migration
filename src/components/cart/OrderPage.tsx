import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getOrderList } from "./hooks/getOrderList";
import { useAuth } from "hooks/AuthProvider";
import preview from "assets/img/preview.jpg";
import { RequestPayResponse, impCode } from "api/payment";
import axios from "api/axios";
import requests from "api/requests";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();
  const { userData } = useAuth();
  const { data, isLoading, isError, error } = useQuery<orderItemType[], Error>({
    queryKey: ["orderList"],
    queryFn: () => getOrderList(userData.userId),
  });

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
  const handlePayMent = async () => {
    if (!userData.userId) {
      alert("로그인 후 이용가능합니다");
      return;
    }
    console.log(data);

    if (data && data.length >= 1) {
      const IMP = window.IMP;
      IMP.init(impCode);

      const payPrice = data.reduce(
        (total, item) => total + item.classResponseDTO.price,
        0
      );
      // const paymentNumber = data[0].classResponseDTO.className;
      const merchantUid = `${new Date().getTime()}+${data[0].classId}`;
      const requestName =
        data && data.length >= 2
          ? data[0].classResponseDTO.className + `외 ${data.length - 1} 건`
          : data[0].classResponseDTO.className;

      const callback = async (res: RequestPayResponse) => {
        console.log(res);
        if (res.success && userData.userId) {
          // 결제 성공시 처리
          try {
            const { imp_uid, merchant_uid } = res;
            const reqeustBody = {
              userId: userData.userId,
              impUid: imp_uid,
            };
            const completePayment = await axios.post(
              requests.payment.addPaymentInfo,
              reqeustBody
            );
            console.log(completePayment);
            alert("결제가 완료되었습니다.");
            nav(`paymented/${imp_uid}`);
          } catch (error) {
            console.log(error);
          }
        } else {
          // 결제 실패시 처리
        }
      };

      try {
        const prePareResponse = await axios.post(requests.payment.prepare, {
          merchantUid: merchantUid,
          amount: payPrice,
        });
        console.log(prePareResponse);
        if (prePareResponse.status === 200) {
          IMP.request_pay(
            {
              // param
              pg: "html5_inicis", //pg사
              pay_method: "card", //결제수단
              merchant_uid: merchantUid, // 주문번호
              name: requestName, //주문명
              amount: payPrice, //결제금액
              buyer_email: userData.email, //구매자 이메일
              buyer_name: userData.name, // 구매자 이름
              buyer_tel: "010-0000-0000", // 구매자 번호
            },
            callback
          );
        }
      } catch (error) {
        console.log("결제 시도중 오류 발생", error);
        alert("결제 시도시 문제가 발생하였습니다.");
      }
    } else {
      alert("IMP.init 초기화 과정에서 오류가 발생하였습니다.");
    }
  };
  return (
    <div className="flex justify-center items-center mt-10">
      <section
        className=" border-2 w-[50%]
      border-dashed py-5 px-3 shadow-md"
      >
        <article className="flex flex-col ">
          <b className="pb-5 ">주문자명 : {userData && userData.name}</b>
          <strong className=" py-2 bg-blue-400/30 rounded-md px-2 shadow-sm">
            주문 상품
          </strong>
          <div className="max-h-[50dvh]">
            {data?.map((item) => (
              <div
                className="border-[1px] p-2 shadow-md rounded-md mt-3"
                key={item.orderDetailId + item.classResponseDTO.className}
              >
                <div className="flex justify-between">
                  <img
                    src={preview}
                    alt="orderItemImg"
                    className="mysm:w-[100px] h-auto rounded-md"
                  />
                  <ul className="text-right">
                    <li className="py-1">
                      <span className="text-gray-400 font-semibold">
                        주문번호 &nbsp;{item.orderDetailId}
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
                {data && data.length >= 2
                  ? data[0].classResponseDTO.className +
                    ` 외 ${data.length - 1} 건`
                  : data && data[0].classResponseDTO.className}
              </strong>
            </li>
            <li className="flex justify-between py-1">
              <b>총 금액</b>
              <strong>{renderTotalPrice()}원</strong>
            </li>
          </ul>
          <button
            className="text-center w-[100%]  py-3 bg-blue-400 rounded-b-lg text-black/80 font-semibold text-lg"
            onClick={handlePayMent}
          >
            결제하기
          </button>
        </article>
      </section>
    </div>
  );
};
