import React, { useEffect, useState } from "react";

interface ILectureInfo {
  title: string;
  text: string;
  summary: string;
  thumbnail: File | null;
  category: string | number;
  price: number;
  setEditTitle: (value: string) => void;
  setEditSummary: (value: string) => void;
  setEditText: (value: string) => void;
  setEditThumbnail: (value: File) => void;
  setEditCategory: (value: string) => void;
  setEditPrice: (value: number) => void;
}
export const LectureInfo = ({
  title,
  text,
  summary,
  thumbnail,
  category,
  price,
  setEditTitle,
  setEditSummary,
  setEditText,
  setEditThumbnail,
  setEditCategory,
  setEditPrice,
}: ILectureInfo) => {
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  const handleChangeSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditSummary(e.target.value);
  };
  const handleChangeTest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };
  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const value = e.target.files[0];
      setEditThumbnail(value);
    }
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditCategory(e.target.value);
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPrice(parseInt(e.target.value));
  };

  return (
    <>
      <ul className=" flex flex-col">
        <li className="py-2">
          <h1 className="py-[2px] font-extrabold">강의 제목</h1>
          <input
            type="text"
            name=""
            id=""
            className="border-[1px] w-[100%] focus:outline-blue-400 rounded-md"
            onChange={handleChangeTitle}
            value={title}
          />
        </li>
        <li className="py-2">
          <h1 className="py-[2px] font-extrabold">요약 설명</h1>
          <textarea
            name=""
            id=""
            className="resize-none border-[1px] w-[100%] focus:outline-blue-400 rounded-md"
            onChange={handleChangeSummary}
            value={summary}
          ></textarea>
        </li>
        <li>
          <h1 className="py-[2px] font-extrabold">상세정보</h1>
          <textarea
            name=""
            id=""
            className="resize-none border-[1px] w-[100%] min-h-[15vh] focus:outline-blue-400 rounded-md"
            onChange={handleChangeTest}
            value={text}
          ></textarea>
        </li>
        <li>
          <input
            type="file"
            id="thumbnail"
            className="hidden"
            onChange={handleChangeThumbnail}
          />
          <div className="flex justify-between items-center my-1">
            <h1 className="font-extrabold">썸네일 등록</h1>
            <label
              htmlFor="thumbnail"
              className="block py-1 border-[1px] px-2
            bg-[#3B82F6]
            text-white
            text-sm
            font-semibold
            rounded-md
             "
            >
              {thumbnail ? "재등록" : "추가"}
            </label>
          </div>
          {thumbnail && (
            <div className="border-[1px] rounded-lg">
              <img
                // src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
                className="w-[100%] h-[auto] rounded-lg"
              ></img>
            </div>
          )}
        </li>
      </ul>
      <ul className="pt-3">
        <li className="flex justify-between py-2 px-1">
          <span>카테고리</span>
          <select
            name="category"
            id="classCategory"
            onChange={handleChangeCategory}
            value={category}
          >
            <option value="1">개발·프로그래밍</option>
            <option value="2">게임 개발</option>
            <option value="3">인공지능</option>
            <option value="4">보안·네트워크</option>
          </select>
        </li>
        <li className="flex justify-between py-2 px-1">
          <span>가격</span>
          <input
            type="number"
            value={price}
            onChange={handleChangePrice}
            className="border-[1px] w-[65%] text-sm pr-2 rounded-md text-right"
            placeholder="숫자만 입력해주세요"
            maxLength={6}
          />
        </li>
      </ul>
    </>
  );
};
