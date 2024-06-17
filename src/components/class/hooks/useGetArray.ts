import requests from "api/requests";
import preview from "../../../assets/img/preview.jpg";
import axios from "api/axios";

export interface Iclassitem {
  img: string;
  title: string;
  name: string;
  price: string;
  score: string;
  id: number;
  overview: string;
}
export async function fetchClass() {
  let newClassArr: Iclassitem[];
  newClassArr = classArr.slice();
  return newClassArr;
}
export async function fetchClassList(categoryType: number, page: number) {
  try {
    if (categoryType === 0) {
      const res = await axios.get(requests.lecture.getAllLecture, {
        params: {
          page: page,
        },
      });
      console.log(res.data.contents);
      return res.data;
    } else {
      const res = await axios.get(requests.lecture.getLectureListCategory, {
        params: {
          categoryId: categoryType,
          page: page,
        },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function selectClassinfo(id: number) {
  try {
    const res = await axios.get(`${requests.lecture.getTargetLecture}/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
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
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1238,
    title: "6 번째 테스트 강의",
    name: "성현",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1239,
    title: "7 번째 테스트 강의1",
    name: "성현1",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1230,
    title: "8 번째 테스트 강의2",
    name: "성현2",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 124,
    title: "9 번째 테스트 강의3",
    name: "성현3",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1241,
    title: "10 번째 테스트 강의입니다 잘 부탁드려요 ㅎㅎ",
    name: "성현4",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1242,
    title: "11 번째 테스트 강의",
    name: "성현",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1243,
    title: "12 번째 테스트 강의1",
    name: "성현1",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1244,
    title: "13 번째 테스트 강의2",
    name: "성현2",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1245,
    title: "14 번째 테스트 강의3",
    name: "성현3",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1246,
    title: "15 번째 테스트 강의입니다 잘 부탁드려요 ㅎㅎ",
    name: "성현4",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1247,
    title: "16 번째 테스트 강의",
    name: "성현",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1248,
    title: "17 번째 테스트 강의1",
    name: "성현1",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1249,
    title: "18 번째 테스트 강의2",
    name: "성현2",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1250,
    title: "19 번째 테스트 강의3",
    name: "성현3",
    price: "9,999원",
    score: "4.6",
  },
  {
    img: preview,
    overview:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus culpa atque quis ullam nihil quibusdam ab consequatur veritatis sapiente eveniet, corrupti consequuntur quaerat nisi modi, saepe, vero doloribus repudiandae omnis.",
    id: 1251,
    title: "20 번째 테스트 강의입니다 잘 부탁드려요 ㅎㅎ",
    name: "성현4",
    price: "9,999원",
    score: "4.6",
  },
];
