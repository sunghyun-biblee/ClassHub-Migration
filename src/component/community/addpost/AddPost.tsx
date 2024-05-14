import React, { useRef, useState } from "react";

import preview from "../../../assets/img/preview.jpg";
import styled from "styled-components";
import { SelectCategory } from "./SelectCategory";

interface selectImgType {
  id: string;
  img: string;
}

export const AddPost = () => {
  const [mainCategory, setMainCategory] = useState<string>();
  const [subcategory, setSubCategory] = useState<string>();
  const [previmg, setPrevimg] = useState<selectImgType[] | undefined>();
  const [imgArray, setImgArray] = useState<selectImgType[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("게시글작성완료");
  };
  const ref = useRef<HTMLDivElement>(null);
  let i = 0;

  const leftClick = () => {
    if (ref.current) {
      ref.current.scrollLeft -= window.innerWidth - 80;
    }
  };

  const RightClick = () => {
    if (ref.current) {
      ref.current.scrollLeft += window.innerWidth + 80;
    }
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files as FileList;
    const selectFiles = Array.from(data);
    if (selectFiles.length >= 4) {
      alert("이미지는 최대 3개까지 등록 가능합니다");
      return;
    }
    const selectFilesArary = selectFiles.map((item) => {
      return { id: `addimg${++i}`, img: URL.createObjectURL(item) };
    });

    setImgArray((prev) => [...prev, ...selectFilesArary]);
  };
  const modifyFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id;
    const newArray = imgArray.filter((item) => item.id !== target);
    setImgArray(newArray);
  };
  const modalOn = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget.id;
    const selectItem = imgArray.filter((item) => item.id === target);
    setPrevimg(selectItem);
    console.log(...selectItem);
    console.log(e.currentTarget.id);
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit} encType="multipart/form-data">
        {/* encType은 데이터를 백엔드로 보낼때 데이터들을 문자열이 아닌 여러형태의 자료(문자/바이너리)를 전송하기위한 전송 형태이다 */}
        <header className="flex justify-between  flex-col">
          <div className="flex lg:h-[100px]">
            <h1>제목</h1>
            <input type="text" className="border-[1px]" />
          </div>
          <SelectCategory
            mainCategory={mainCategory}
            setMainCategory={setMainCategory}
            setSubCategory={setSubCategory}
          ></SelectCategory>
        </header>
        <textarea
          name="overview"
          id="overview"
          className="resize-none border-[1px] lg:max-w-[1150px] mysm:w-[100vw]
          h-[30dvh] outline-blue-500 p-5 rounded-lg overflow-x-hidden overflow-y-scroll"
          placeholder="궁금한 점이나 취미들을 공유해주세요 &#13;
            -글 작성 시 주의해야할 점
            -글 내용에 개인정보가 들어나면 안됩니다
            -개인정보가 포함된 글을 작성 후 문제발생시 모든책임은 글 작성자에게 있습니다
            -불건전한 게시글은 작성을 금지합니다
            "
          maxLength={3000}
        ></textarea>
        <div className="flex relative">
          <div className="w-10 z-10 absolute left-0" onClick={leftClick}>
            <Left />
          </div>
          <div
            className="flex overflow-hidden w-[600px] relative z-0"
            ref={ref}
          >
            <div className="flex w-[600px] h-[300px]">
              {imgArray?.map((item) => (
                <div className="relative">
                  <img
                    key={item.id}
                    src={item.img}
                    alt=""
                    id={item.id}
                    onClick={modalOn}
                    className="w-[150px] h-[150px] rounded-lg mx-1"
                  />
                  <button
                    className="absolute top-0 right-3 text-red-600"
                    onClick={modifyFile}
                    id={item.id}
                  >
                    {"X"}
                  </button>
                </div>
              ))}
              <div>
                <input
                  type="file"
                  name=""
                  id="imgAdd"
                  multiple
                  className="hidden"
                  onChange={addFile}
                  accept="image/*"
                />
                {imgArray.length < 3 ? (
                  <label
                    htmlFor="imgAdd"
                    className="flex justify-center items-center border-[1px] rounded-lg w-[150px] h-[150px] mx-1"
                  >
                    이미지 등록
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="w-10 z-10 absolute right-0" onClick={RightClick}>
            <Right />
          </div>
        </div>

        {previmg && (
          <div
            className={`absolute -top-5 z-10 max-w-[100vw] lg:h-[calc(100dvh-185px)] mysm:h-[calc(100dvh-172px)] flex flex-col justify-center items-center bg-[#333B3D]/90 backdrop-blur-sm`}
          >
            <div className="relative">
              <img src={previmg[0].img} alt="previmg" className="px-1" />
              <button
                className="absolute top-[1%] right-[1%] text-white bg-[#1F38A1] w-20 h-8 rounded-lg"
                onClick={() => setPrevimg(undefined)}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const Left = () => {
  return (
    <div>
      <svg
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="#FFD7DE"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        ></path>
      </svg>
    </div>
  );
};

const Right = () => {
  return (
    <div>
      <svg
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="#FFD7DE"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        ></path>
      </svg>
    </div>
  );
};
