import React, { useEffect, useState } from "react";
import right from "assets/img/carousel/rigthArrow.svg";
import { ApplicationItem } from "./ApplicationItem";
import { PageNation } from "component/class/PageNation";

type IShowListProp = {
  filter: string;
};
export const ShowList = ({ filter }: IShowListProp) => {
  const [propsArray, setPropsArray] = useState(examApp);
  const [page, setPage] = useState(1);
  const postLimit = 5;
  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치

  useEffect(() => {
    switch (filter) {
      case "all":
        setPropsArray(examApp);
        break;
      case "cart":
        break;
      case "likeClass":
        const likeFilterArray = examApp.filter((app) => app.likes === true);
        setPropsArray(likeFilterArray);
        break;
      case "paymented":
        const paymentFilterArray = examApp.filter(
          (app) => app.payment === true
        );
        setPropsArray(paymentFilterArray);
        break;
      default:
        console.log("Error");
        break;
    }
  }, [filter]);
  return (
    <div>
      <div>
        {propsArray.slice(pageOfFirst, pageOfLast).map((item) => (
          <ApplicationItem item={item} key={item.id}></ApplicationItem>
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
