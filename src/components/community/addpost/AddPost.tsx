import React, { useRef, useState } from "react";

import { SelectCategory } from "./SelectCategory";

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../chFirebase";

// import axios from "axios";

export const AddPost = () => {
  const nav = useNavigate();
  const user = auth && auth.currentUser;
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [previmg, setPrevimg] = useState<File[] | null>(null);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !title || !text || category === "none" || !category) {
      return alert("제목과 내용, 카테고리를 확인해주세요.");
    }

    try {
      const photoURLs = [];

      const postRef = await addDoc(collection(db, `Posts`), {
        postTitle: title,
        postText: text,
        postCategory: category,
        createAt: Date.now(),
        timeStamp: serverTimestamp(),
        userName: user.displayName,
        userId: user.uid,
      });
      if (imgFiles) {
        const imgLocationRef = ref(storage, `Posts/${user.uid}/${postRef.id}`);
        for (const file of imgFiles) {
          console.log(file.name);
          const result = await uploadBytes(imgLocationRef, file);
          console.log("File uploaded: ", result.ref.fullPath);
          const url = await getDownloadURL(result.ref);
          photoURLs.push(url);
          console.log(url);
        }
        await updateDoc(postRef, { photos: photoURLs });
        setText("");
        setTitle("");
        setCategory("");
        setPrevimg(null);
        setImgFiles([]);
      }
      // nav("/community/qna");

      alert("글이 작성되었습니다.");
    } catch (error) {
    } finally {
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const leftClick = () => {
    if (imgBoxRef.current) {
      imgBoxRef.current.scrollLeft -= window.innerWidth - 10;
    }
  };

  const RightClick = () => {
    if (imgBoxRef.current) {
      imgBoxRef.current.scrollLeft += window.innerWidth + 10;
    }
  };

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files as FileList;

    const selectFiles = Array.from(data);
    if (selectFiles.length >= 4) {
      return alert("이미지는 최대 3개까지 등록 가능합니다");
    }
    setImgFiles((prev) => [...prev, ...selectFiles]);
  };

  const modifyFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.name;

    const newArray = imgFiles.filter((item) => item.name !== target);
    setImgFiles(newArray);
  };
  const modalOn = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget.id;
    console.log(target);
    const selectItem = imgFiles.filter((item) => item.name === target);
    setPrevimg(selectItem);
  };

  return (
    <div className="relative">
      <form
        onSubmit={onSubmit}
        className=" lg:max-w-[1200px]  mysm:w-[100%]
        flex flex-col mysm:items-center lg:items-baseline
        "
      >
        {/* encType은 데이터를 백엔드로 보낼때 데이터들을 문자열이 아닌 여러형태의 자료(문자/바이너리)를 전송하기위한 전송 형태이다 */}
        <div
          className="flex justify-between md:items-center
        md:flex-row mysm:flex-col
        lg:max-w-[1150px] mysm:w-[100%]
        pb-5
        px-2"
        >
          <div className="flex  justify-between items-center md:m-0 mysm:mb-5">
            <h1 className="mysm:font-semibold md:mr-2">제목</h1>
            <input
              type="text"
              className="border-[1px] lg:w-[550px] md:w-[350px] mysm:w-[350px]
              focus:outline-blue-500
              rounded-md
              lg:px-2 py-1
              mysm:px-1 
              "
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <SelectCategory
            mainCategory={category}
            setMainCategory={setCategory}
            createAt={null}
          ></SelectCategory>
        </div>
        <div className="flex flex-col justify-center lg:items-baseline mysm:items-center mysm:w-[calc(100%-8px)]">
          <textarea
            name="overview"
            id="overview"
            className="resize-none border-[1px] lg:max-w-[1150px] mysm:w-[calc(100%-16px)]
          h-[30dvh] outline-blue-500 p-5 rounded-lg overflow-x-hiddenoverflow-y-scroll "
            placeholder="궁금한 점이나 취미들을 공유해주세요 &#13;
            -글 작성 시 주의해야할 점
            -글 내용에 개인정보가 들어나면 안됩니다
            -개인정보가 포함된 글을 작성 후 문제발생시 모든책임은 글 작성자에게 있습니다
            -불건전한 게시글은 작성을 금지합니다
            "
            maxLength={3000}
            value={text}
            onChange={handleChangeText}
          ></textarea>
          <div
            className="flex w-[calc(100%-16px)] justify-between
          lg:flex-row
          mysm:flex-col
          "
          >
            <div className="flex relative justify-center lg:w-[600px] mysm:w-[100%] mt-5 ">
              <div
                className="w-10 z-10 absolute left-0  cursor-pointer h-[100%]
            bg-[#B5B8BF]
            flex justify-center items-center
            rounded-lg
            "
                onClick={leftClick}
              >
                <Left />
              </div>
              <div
                className="flex overflow-x-scroll overflow-y-hidden lg:w-[600px]  mysm:w-[100%] z-0 py-5  px-10 bg-gray-500/50 rounded-lg
            shadow-[0px_8px_24px_rgba(149,157,165,0.3)] "
                ref={imgBoxRef}
              >
                <ul className="flex w-[600px] md:justify-normal mysm:justify-between ">
                  {imgFiles?.map((item, index) => (
                    <li
                      className="relative max-w-[150px] h-[150px] mx-3"
                      key={"@@!!" + index}
                    >
                      <img
                        src={URL.createObjectURL(item)}
                        alt="selectimg"
                        id={item.name}
                        onClick={modalOn}
                        className="min-w-[150px] h-[150px] rounded-lg "
                      />
                      <button
                        className="absolute top-0 right-2 text-red-600 font-extrabold"
                        onClick={modifyFile}
                        name={item.name}
                      >
                        {"X"}
                      </button>
                    </li>
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

                    <label
                      htmlFor="imgAdd"
                      className={` justify-center items-center border-[1px] rounded-lg w-[150px] h-[150px] mx-1 bg-[#efefef]
                    ${imgFiles.length < 3 ? "flex" : "hidden"}
                    `}
                    >
                      이미지 등록
                    </label>
                  </div>
                </ul>
              </div>
              <div
                className="w-10 z-10 absolute right-0  cursor-pointer flex h-[100%] items-center justify-center
            bg-[#B5B8BF] rounded-lg
            "
                onClick={RightClick}
              >
                <Right />
              </div>
            </div>
            <div
              className="mt-5 flex items-end
            mysm:justify-end
            
            "
            >
              <input type="submit" value="" id="submitBtn" />
              <label
                htmlFor="submitBtn"
                className=" border-[1px] px-3 py-2  rounded-md text-white bg-[#3B82F6] cursor-pointer"
              >
                작성하기
              </label>
            </div>
          </div>
        </div>
        {previmg && (
          <div
            className={`absolute -top-5 lg:-left-5 z-10 lg:max-w-[1200px] mysm:w-[100vw] lg:h-[calc(100dvh-185px)] mysm:h-[calc(100dvh-192px)] flex flex-col justify-center items-center bg-[#333B3D]/90 
            backdrop-blur-sm`}
          >
            <div
              className="relative  md:max-h-[80%] md:w-[70%] 
           px-[auto] 
             flex justify-center"
            >
              <img
                src={URL.createObjectURL(previmg[0])}
                alt="previmg"
                className="w-full object-cover shadow-lg shadow-gray-700"
              />
              <button
                className="absolute top-[1%] right-[1%] text-white bg-[#1F38A1] w-20 h-8 rounded-lg"
                onClick={() => setPrevimg(null)}
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

export const Left = () => {
  return (
    <div className="w-10">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="#5c6177"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        ></path>
      </svg>
    </div>
  );
};

export const Right = () => {
  return (
    <div className="w-10">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="#5c6177"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        ></path>
      </svg>
    </div>
  );
};
