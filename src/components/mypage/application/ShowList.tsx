import React, { useEffect, useState } from "react";
import right from "assets/img/carousel/rigthArrow.svg";
import { ApplicationItem } from "./ApplicationItem";
import { PageNation } from "component/class/PageNation";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentedList } from "component/community/hooks/fetchCommuArray";
import { useAuth } from "hooks/AuthProvider";
import { paymentResType } from "component/cart/PaymentedPage";

export type paymentedItemType = {
  ordersId: number;
  userId: number;
  orderName: string;
  totalPrice: number;
  finalOrderStatus: number;
  regdate: string;
};
export type paymentedListType = {
  data: paymentedItemType[];
};
export const ShowList = () => {
  const { userData } = useAuth();
  const [propsArray, setPropsArray] = useState(examApp);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paymentedList"],
    queryFn: () => fetchPaymentedList(userData.userId),
  });
  console.log(data);
  return (
    <div>
      <div>
        {data?.data.map((item: paymentedItemType) => (
          <ApplicationItem data={item} key={item.ordersId}></ApplicationItem>
        ))}
      </div>
      {/* <PageNation
        page={page}
        listLength={propsArray.length}
        setPage={setPage}
        postLimit={postLimit}
      ></PageNation> */}
    </div>
  );
};

const examApp = [
  {
    id: "examApp1",
    likes: true,
    title: "React-Qury-TanstackQuery5",
    name: "admin",
    price: "9,999",
    payment: true,
    detail: right,
  },
  {
    id: "examApp2",
    likes: true,
    title: "TypeScript - JavaScript++",
    name: "admin",
    price: "9,999",
    payment: true,
    detail: right,
  },
  {
    id: "examApp3",
    likes: true,
    title: "JavaScript - 코어 자바스크립트",
    name: "admin",
    price: "9,999",
    payment: false,
    detail: right,
  },
  {
    id: "examApp4",
    likes: false,
    title: "HTML5,CSS3 기초",
    name: "admin",
    price: "9,999",
    payment: true,
    detail: right,
  },
  {
    id: "examApp5",
    likes: false,
    title: "Recoil - 얼굴책에서 나온 상태관리",
    name: "admin",
    price: "9,999",
    payment: true,
    detail: right,
  },
  {
    id: "examApp6",
    likes: false,
    title: "Java-SpringBoot",
    name: "admin",
    price: "9,999",
    payment: false,
    detail: right,
  },
  {
    id: "examApp7",
    likes: true,
    title: "Redux - 상태관리 라이브러리",
    name: "admin",
    price: "9,999",
    payment: true,
    detail: right,
  },
];
