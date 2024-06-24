import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentedItem, paymentResType } from "./PaymentedPage";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useAuth } from "hooks/AuthProvider";
import axios from "api/axios";
import requests from "api/requests";

export const MobilePaymented = () => {
  const { userId } = useAuth();
  const nav = useNavigate();
  const usePathQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = usePathQuery();
  const impId = query.get("imp_uid");
  const impSuccess = query.get("imp_success");
  const { data, isLoading, isError, error } = useQuery<paymentResType, Error>({
    queryKey: ["paymentedDetail", impId],
    queryFn: () => PaymentedItem(impId ? impId : ""),
  });
  //   const tes = "imp_042063947061";

  if (impSuccess === "true") {
    try {
      const reqeustBody = {
        userId: userId,
        impUid: impId,
      };
      axios.post(requests.payment.addPaymentInfo, reqeustBody);
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <div className="mt-[84px]">
      <div className="flex justify-center items-center pt-10">
        {data && (
          <section
            className=" border-2 lg:w-[50%] md:w-[70%] mysm:w-[100%]
border-dashed py-5 px-3 shadow-md"
          >
            <article className="flex flex-col ">
              <strong className=" py-2 bg-blue-400/30 rounded-md px-2 shadow-sm">
                주문 상품 : {data.response.name}
              </strong>
              <div className="max-h-[50dvh]">
                <div className="border-[1px] p-2 shadow-md rounded-md mt-3">
                  <ul>
                    <li>
                      <ul>
                        <Li>
                          <strong>주문번호:</strong>
                          <Span>{data.response.impUid.split("_")[1]}</Span>
                        </Li>
                        <Li>
                          <strong>구매자 명:</strong>
                          <Span>{data.response.buyerName}</Span>
                        </Li>
                        <Li>
                          <strong>구매자 이메일:</strong>
                          <Span>{data.response.buyerEmail}</Span>
                        </Li>
                        <Li>
                          <strong>구매자 연락처:</strong>
                          <Span>{data.response.buyerTel}</Span>
                        </Li>
                      </ul>
                    </li>
                    <Li>
                      <strong>결제여부:</strong>
                      <Span>
                        {data.response.status === "paid"
                          ? "결제완료"
                          : "결제실패"}
                      </Span>
                    </Li>
                    <Li>
                      <strong>결제수단:</strong>
                      <Span>
                        {data.response.cardName
                          ? data.response.cardName
                          : data.response.embPgProvider
                          ? data.response.embPgProvider
                          : "미제공"}
                      </Span>
                    </Li>

                    <Li>
                      <strong>카드번호:</strong>
                      <Span>
                        {data.response.cardNumber
                          ? data.response.cardNumber
                          : "카드번호 미제공"}
                      </Span>
                    </Li>
                    <Li>
                      <strong>결제승인:</strong>
                      <Span>
                        {data.response.paidAt.split("T")[0]}&nbsp;:&nbsp;
                        {data.response.paidAt.split("T")[1].split(".")[0]}
                      </Span>
                    </Li>
                    <Li>
                      <strong>결제금액:</strong>
                      <Span>{data.response.amount?.toLocaleString()}원</Span>
                    </Li>
                  </ul>
                </div>
              </div>
            </article>
            <article className="pt-5">
              <ul
                className="px-2 py-3 rounded-lg shadow-sm
            flex justify-between
            "
              >
                <li className="w-[45%]">
                  <button
                    className="rounded-lg text-center w-[100%] bg-blue-400/30 px-2 py-3 font-semibold"
                    onClick={() => nav("/")}
                  >
                    메인페이지로 이동
                  </button>
                </li>
                <li className="w-[45%]">
                  <button
                    className="rounded-lg text-center w-[100%] bg-blue-400/90 px-2 py-3 text-zinc-900 font-extrabold"
                    onClick={() => nav("/mypage")}
                  >
                    마이페이지로 이동
                  </button>
                </li>
              </ul>
            </article>
          </section>
        )}
      </div>
    </div>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
`;
const Span = styled.span`
  font-weight: 600;
  color: #454545;
`;
