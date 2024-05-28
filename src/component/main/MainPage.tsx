import React from "react";
import styled from "styled-components";
import { Carousel } from "./Carousel";
import { PreviewClass } from "./PreviewClass";
import { PreviewCommu } from "./PreviewCommu";
import carousel_one from "assets/img/carousel/carousel_one.jpg";
import carousel_two from "assets/img/carousel/carousel_two.jpg";
import carousel_three from "assets/img/carousel/carousel_three.jpg";
import preview from "assets/img/preview.jpg";
import { fetchClassList } from "component/class/hooks/useGetArray";
import { useQuery } from "@tanstack/react-query";
import { useClassList } from "./hooks/useClassList";
import { useMainCommuList } from "./hooks/useMainCommuList";
export const MainPage = () => {
  const {
    mainClassList,
    mainClassIsLoading,
    mainClassIsError,
    mainClassError,
  } = useClassList();

  const { mainCommuList, MCommuIsLoading, MCommuIsError, MCommuError } =
    useMainCommuList();

  if (mainClassIsLoading && MCommuIsLoading) {
    return <div>로딩중</div>;
  }
  if (mainClassIsError && MCommuIsError) {
    return (
      <div>
        <p>
          {mainClassError?.message}
          {MCommuError?.message}
        </p>
      </div>
    );
  }
  return (
    <MainPageContainer className=" flex items-center flex-col lg:max-w-[1200px]  md:max-w-[100vw] mysm:max-w-[100vw] lg:pt-[84px] mysm:pt-[68px]">
      <Carousel carouselList={examArr}></Carousel>
      <PreviewClass
        data={mainClassList}
        mainClassIsLoading={mainClassIsLoading}
        mainClassIsError={mainClassIsError}
        mainClassError={mainClassError}
      ></PreviewClass>

      <PreviewCommu
        mainCommuList={mainCommuList}
        MCommuIsLoading={MCommuIsLoading}
        MCommuIsError={MCommuIsError}
        MCommuError={MCommuError}
      ></PreviewCommu>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  margin: 0 auto;
`;
const examArr = [
  { img: carousel_one },
  { img: carousel_two },
  { img: carousel_three },
];
const classArr = [
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 123,
    title: "1 번째 테스트 강의",
    name: "성현",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1234,
    title: "2 번째 테스트 강의1",
    name: "성현1",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1235,
    title: "3 번째 테스트 강의2",
    name: "성현2",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1236,
    title: "4 번째 테스트 강의3",
    name: "성현3",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1237,
    title: "5 번째 테스트 강의입니다 잘 부탁드려요 ㅎㅎ",
    name: "성현4",
    price: "9,999원",
    score: "4.6",
  },
];

const commuArr = [
  {
    title: "테스트 글제목",
    overview:
      "저는 이러이러한 고민이 있습니다. 그런데 어떻게 해결해야할지 모르겠어요. ",
    name: "TEST15",
    category: "공부",
    id: 334,
  },
  {
    title: "테스트 글제목",
    overview:
      "저는 이러이러한 고민이 있습니다. 그런데 어떻게 해결해야할지 모르겠어요. 도움 부탁드립니다",
    name: "TEST2",
    category: "공부",
    id: 335,
  },
  {
    title: "테스트 글제목",
    overview:
      "저는 이러이러한 고민이 있습니다. 그런데 어떻게 해결해야할지 모르겠어요. 도움 부탁드립니다..댓글 부탁드려요",
    name: "TEST3",
    category: "공부",
    id: 336,
  },
  {
    title: "테스트 글제목",
    overview:
      "저는 이러이러한 고민이 있습니다. 그런데 어떻게 해결해야할지 모르겠어요. 도움 부탁드립니다... 다른분들은 어떻게 해결하셨나요?",
    name: "TEST4",
    category: "공부",
    id: 337,
  },
];
