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
  let newClassArr: Icommuitem[];
  newClassArr = commnuArr.slice();
  return newClassArr;
}
export async function selectCommuinfo(id: number) {
  const newDate = commnuArr.filter((item) => item.id === id);

  return newDate;
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
