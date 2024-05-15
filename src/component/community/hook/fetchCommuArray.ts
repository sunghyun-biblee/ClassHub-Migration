import axios from "../../../api/axios";
import requests from "./../../../api/requests";
import { Community } from "./../Community";

export interface Icommuitem {
  id: number;
  title: string;
  name: string;
  likes: string;
  category: string;
  comment: string;
  overview: string;
}

export async function fetchCommuList() {
  const data = await axios.get(requests.community.getQuestionList, {
    params: {
      page: 1,
    },
  });
  return data;
}
export async function selectCommuinfo(CommunityId: number) {
  const data = await axios.get(
    `${requests.community.getQuestionPost}/${CommunityId}`
  );

  return data.data.data;
}
const commnuArr = [
  {
    id: 1,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 2,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "취미",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 3,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "개인",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 4,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 5,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 6,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 7,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 8,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 9,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 10,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 11,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
  {
    id: 12,
    title: "안녕하세요 테스트 게시글입니다.",
    name: "admin",
    likes: "10",
    category: "공부",
    comment: "3",
    overview:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt iste dolor consequuntur ducimus unde minima aliquid. Perferendis, maxime saepe explicabo voluptate numquam error quos tempora, facere distinctio, cumque vel aut.",
  },
];
