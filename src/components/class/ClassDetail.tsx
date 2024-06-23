import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { selectClassinfo } from "./hooks/useGetArray";
import styled from "styled-components";
import axios from "api/axios";
import requests from "./../../api/requests";
import { useAuth } from "hooks/AuthProvider";
import { addCartItem } from "components/cart/hooks/addCartItem";
import { impCode } from "api/payment";
import { IClassType } from "./ShowClass";
import { formatVideoDuration } from "components/mypage/teacherPage/addclass/VideoInsert";
import preview from "assets/img/preview.jpg";
import { CartItemType } from "hooks/CartProvider";
import { addOrder } from "components/cart/hooks/addOrder";

type cartMutateType = {
  classId: number;
  userId: number;
};
interface ClassDetailData {
  classDetailId: number;
  classId: number;
  editDate: string | null;
  regdate: string | null;
  sectionTitle: string | null;
  title: string;
  video: string;
  videoLength: number;
}

export interface ClassDataType {
  classDetail: ClassDetailData[][];
  classInfo: IClassType;
  learningData: [];
  learningTime: number;
  percentage: number;
}
export const ClassDetail = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { userData } = useAuth();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[2], 10);
  const { data, isLoading, isError, error } = useQuery<ClassDataType, Error>({
    queryKey: ["classDeatil", id],
    queryFn: () => selectClassinfo(id),
  });

  const CartUpdateMutation = useMutation<
    void,
    Error,
    { classId: number; userId: number }
  >({
    mutationFn: ({ classId, userId }) => addCartItem(classId, userId),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["cartItemList"],
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["cartItemList"],
      });

      const prevData = queryClient.getQueryData(["cartItemList"]);

      await queryClient.setQueryData(
        ["cartItemList"],
        (oldData: CartItemType[] | undefined) => {
          if (oldData) {
            const newItem = {
              userId: userData.userId,
              classId: id,
            };
            const newData = [...oldData, newItem];
            return newData;
          }
          return oldData;
        }
      );
      return { prevData };
    },
  });

  if (data && data.classInfo) {
    document.title = data.classInfo.className;
  }

  const handleAddCart = (classId: number) => {
    if (!userData.userId) {
      alert("로그인 후 이용가능합니다");
      return;
    } else {
      CartUpdateMutation.mutate({ classId, userId: userData.userId });
    }
  };
  const handlePayMent = async () => {
    let paymentNumber;
    if (!userData) {
      return alert("로그인 후 이용가능합니다");
    }
    if (data?.classInfo.classId) {
      const res = await addOrder([data?.classInfo.classId], userData.userId);
      if (res && res.status === 200) {
        nav("/cart/order");
      }
    }

    // if (data && data.classInfo.classId) {
    //   const IMP = window.IMP;
    //   IMP.init(impCode);
    //   paymentNumber = data.classInfo.className;

    //   const callback = () => {};
    //   IMP.request_pay(
    //     {
    //       // param
    //       pg: "html5_inicis", //pg사
    //       pay_method: "card", //결제수단
    //       merchant_uid: `${paymentNumber}_${new Date().getTime()}`, // 주문번호
    //       name: data.classInfo.className, //주문명
    //       amount: 100, //결제금액
    //       buyer_email: "gildong@gmail.com", //구매자 이메일
    //       buyer_name: "홍길동", // 구매자 이름
    //       buyer_tel: "010-4242-4242", // 구매자 번호
    //       buyer_addr: "서울특별시 강남구 신사동", // 구매자 주소
    //       buyer_postcode: "01181", // 구매자 우편번호
    //       m_redirect_url: "https://devproject.store/mobile/payments",
    //     },
    //     callback
    //   );
    // }
  };

  const renderCategory = (value: number) => {
    switch (value) {
      case 1:
        return "개발 · 프로그래밍";

      case 2:
        return "게임 개발";

      case 3:
        return "인공 지능";

      case 4:
        return "보안 · 네트워크";

      default:
        break;
    }
  };

  return (
    <ClassDeatilContainer
      className="
    lg:max-w-[1200px] mysm:w-[100vw]  lg:pt-[110px] md:pt-[80px] mysm:pt-[80px]"
    >
      {!isLoading && data?.classInfo ? (
        <>
          <section className="mysm:w-[100vw] lg:max-w-[1200px] min-h-[100vh] block">
            <div className="  bg-[#002333] text-white font-semibold w-[100%]">
              <div
                className="flex lg:max-w-[1200px] w-[100vw] lg:px-10
              md:px-7
              mysm:px-3
              py-5 
              md:gap-0 
              mysm:gap-1 
              md:flex-nowrap
            mysm:flex-wrap
              "
              >
                <div
                  className="flex justify-center items-center w-[100%] md:mb-0 mysm:mb-2 
                 "
                >
                  <img
                    src={preview}
                    alt="classimg"
                    className=" rounded-md lg:w-[90%] md:w-[80%] mysm:w-[300px] md:h-[100%] mysm:h-[300px]"
                  />
                </div>
                <div className="flex justify-between flex-col lg:px-10 md:px-6 mysm:px-2 min-w-[50%] mysm:max-w-[100%] ">
                  <ul className="md:flex md:justify-between mysm:justify-between flex-col h-[100%] w-[100%]">
                    <li>
                      <div className="lg:text-3xl  py-2 md:text-2xl mysm:text-xl">
                        <p className=" break-words">
                          {data.classInfo.className} 반갑습니다[JS] Phaser 게임
                          제작 - 뱀파이어 서바이벌 클론
                        </p>
                      </div>
                      <div className="py-2 lg:text-xl md:text-lg mysm:text-md">
                        <span className="text-gray-400">
                          요약:&nbsp; {data.classInfo.summary}
                        </span>
                      </div>
                      <div className="lg:text-xl md:text-xl mysm:text-sm py-2">
                        <span className="text-gray-300">
                          {data.classInfo.name ? data.classInfo.name : "biblee"}
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center lg:pt-20 md:pt-10 mysm:pt-5 flex-row ">
                      <div className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-sm">
                        <span>
                          카테고리 : {renderCategory(data.classInfo.categoryId)}
                        </span>
                      </div>

                      <div className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-md">
                        <span>수강평 : {data.classInfo.reviewScore}</span>
                      </div>
                    </li>
                  </ul>
                  <ul className="bg-gray-600 p-5 rounded-md lg:block md:hidden  mysm:hidden">
                    <li className="pt-1 pb-3  px-3 text-2xl">
                      <p>{data.classInfo.price.toLocaleString()}원</p>
                    </li>
                    <li className="flex justify-between pt-3 px-2 w-[100%] ">
                      <div
                        className="p-2 border-2 border-solid border-gray-400/50 rounded-lg
                    "
                      >
                        <button
                          className="p-1"
                          onClick={() => handleAddCart(data.classInfo.classId)}
                        >
                          장바구니 담기
                        </button>
                      </div>
                      <div
                        className="p-2 border-2 border-solid border-gray-400/50 rounded-lg bg-blue-500 text-white
                    "
                      >
                        <button
                          className="p-1 "
                          onClick={() => handlePayMent()}
                        >
                          강의 신청하기
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="lg:max-w-[1200px] mysm:w-[100vw] pt-3">
                <h1 className="text-3xl py-3 px-2 lg:font-extrabold md:font-bold mysm:font-semibold">
                  강의 상세 정보
                </h1>
                <p className="text-3xl p-3">{data.classInfo.description}</p>
              </div>
              <div className="lg:pb-0 mysm:pb-40 md:pb-40 mysm:pt-10  flex justify-center flex-col items-center">
                <h1 className="text-3xl py-5 px-2 lg:font-extrabold md:font-bold mysm:font-semibold text-left w-[100%]">
                  커리큘럼
                </h1>
                <div
                  className=" flex 
            lg:max-w-[1200px] w-[calc(100vw-1.25rem)]
            items-center justify-center  rounded-md "
                >
                  <ul className="w-[100%] ">
                    {data.classDetail.map((section, index) => (
                      <li className="border-[1px] rounded-lg overflow-hidden mb-5 shadow-md">
                        <ul className="bg-[#F5F5F5] w-[100%] flex justify-between items-center p-3  ">
                          <li>
                            <h1 className=" text-left  font-semibold text-lg">
                              섹션{index}.
                              <span className="px-2">
                                {section[index].sectionTitle
                                  ? section[index].sectionTitle
                                  : " N번째"}
                              </span>
                            </h1>
                          </li>
                          <li className="font-semibold text-lg">
                            <span>{data.classDetail[index].length}강</span>
                            <span className="px-1">
                              · {getToSectionVideoTotalLength(section)}
                            </span>
                          </li>
                        </ul>
                        <ul>
                          {section.map((item) => (
                            <li className="flex justify-between p-3  font-medium border-b-[1px] cursor-pointer">
                              <span className="text-gray-600">
                                {item.title}
                              </span>
                              <span className=" text-gray-400">
                                {formatVideoDuration(item.videoLength)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <ul className="text-white bg-gray-600 p-5 rounded-md lg:hidden fixed bottom-0 w-[100%] mb-[40px] flex justify-between items-center">
                <li className="  px-2 text-2xl font-semibold ">
                  <p>{data.classInfo.price.toLocaleString()}원</p>
                </li>

                <div className="flex justify-between  md:w-[280px] mysm:w-[250px]">
                  <li
                    className="p-2 border-2 border-solid border-gray-400/50 rounded-lg
                      "
                  >
                    <button
                      className="p-1 mysm:p-0 mysm:w-[100px] text-sm"
                      onClick={() => handleAddCart(data.classInfo.classId)}
                    >
                      장바구니 담기
                    </button>
                  </li>
                  <li
                    className="p-2 border-2 border-solid border-gray-400/50 rounded-lg bg-blue-500 text-white
                      "
                  >
                    <button
                      className="p-1 mysm:p-0 mysm:w-[100px] text-sm"
                      onClick={() => handlePayMent()}
                    >
                      강의 신청하기
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </section>
        </>
      ) : (
        ""
      )}
    </ClassDeatilContainer>
  );
};

export const getToSectionVideoTotalLength = (
  section: ClassDetailData[]
): string => {
  let totalLength = 0;
  section.forEach((item) => {
    totalLength += item.videoLength;
  });
  const res = formatVideoDuration(totalLength);
  return res;
};
const ClassDeatilContainer = styled.div`
  margin: 0 auto;
`;
