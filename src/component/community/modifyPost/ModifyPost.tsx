import React, { useEffect, useRef, useState } from "react";
import { SelectCategory } from "../addpost/SelectCategory";
import { Left, Right } from "../addpost/AddPost";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";
import { useTargetPost } from "../hooks/useTargetPost";
interface selectImgType {
  id: string;
  img: string;
}

export const ModifyPost = () => {
  const { pathname } = useLocation();
  const { postData, isPostLoading, isPostError, postError } = useTargetPost(
    parseInt(pathname.split("/")[3])
  );

  const nav = useNavigate();
  const { userData } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string | null>(null);
  const [requestImgId, setRequestImgId] = useState<number[]>([]);
  const [previmg, setPrevimg] = useState<selectImgType[] | undefined>();
  const [imgArray, setImgArray] = useState<selectImgType[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  let i = 0;
  useEffect(() => {
    if (postData) {
      const newImgData = postData.image.map((item, index) => ({
        id: postData.imageIds[index].toString(),
        img: item,
      }));
      setImgArray([...newImgData]);
      setTitle(postData.title);
      setText(postData.text);
    }
  }, [postData]);
  if (isPostLoading) {
    return <p>로딩중</p>;
  }
  if (isPostError) {
    return <p>{postError?.message}</p>;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(requestImgId);
    e.preventDefault();
    let customCommunityType;

    switch (mainCategory) {
      case "질문답변":
        customCommunityType = "1";
        break;
      case "스터디":
        customCommunityType = "2";
        break;
      case null:
        alert("카테고리를 지정해주세요");
        return;
      default:
        console.log("error");
        break;
    }

    const communityObject = {
      userId: userData.userId,
      communityType: customCommunityType,
      title: title,
      text: text,
      communityImageIds: requestImgId,
    };

    console.log(communityObject);
    await axios
      .post(`${requests.community.addPost}`, communityObject)
      .then((res) => {
        console.log(res);
        nav("/community");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const leftClick = () => {
    if (ref.current) {
      console.log(ref.current.scrollLeft);
      ref.current.scrollLeft -= window.innerWidth - 10;
    }
  };

  const RightClick = () => {
    if (ref.current) {
      ref.current.scrollLeft += window.innerWidth + 10;
    }
  };

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files as FileList;

    const selectFiles = Array.from(data);
    if (selectFiles.length >= 4) {
      alert("이미지는 최대 3개까지 등록 가능합니다");
      return;
    }

    const formData = new FormData();
    selectFiles?.forEach((file) => {
      formData.append("multipartFiles", file);
    });

    if (selectFiles) {
      try {
        const requestData = await axios.post("/community/postImage", formData);
        console.log(requestData.data.data);

        if (requestImgId && requestImgId?.length >= 1) {
          const newArray = [...requestImgId, ...requestData.data.data];
          setRequestImgId(newArray);
        } else {
          setRequestImgId([...requestData.data.data]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const selectFilesArray = selectFiles.map((item) => {
      return { id: `addimg${++i}`, img: URL.createObjectURL(item) };
    });

    setImgArray((prev) => [...prev, ...selectFilesArray]);
  };

  const modifyFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.toString();

    if (postData?.imageIds.includes(parseInt(target))) {
      try {
        const res = await axios.post(`${requests.community.deleteImg}`, null, {
          params: {
            removeFileId: parseInt(target),
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      const newArray = imgArray.filter((item) => item.id !== target);
      setImgArray(newArray);
    } else {
      const newArray = imgArray.filter((item) => item.id !== target);
      setImgArray(newArray);
    }
  };
  const modalOn = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget.id;
    const selectItem = imgArray.filter((item) => item.id === target);
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
        <header
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
              placeholder={postData?.title}
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <SelectCategory
            mainCategory={mainCategory}
            setMainCategory={setMainCategory}
          ></SelectCategory>
        </header>
        <main className="flex flex-col justify-center lg:items-baseline mysm:items-center mysm:w-[calc(100%-8px)]">
          <textarea
            name="overview"
            id="overview"
            className="resize-none border-[1px] lg:max-w-[1150px] mysm:w-[calc(100%-16px)]
          h-[30dvh] outline-blue-500 p-5 rounded-lg overflow-x-hiddenoverflow-y-scroll "
            placeholder={postData?.text}
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
                ref={ref}
              >
                <div className="flex w-[600px] md:justify-normal mysm:justify-between ">
                  {imgArray.map((item, index) => (
                    <div
                      className="relative max-w-[150px] h-[150px] mx-3"
                      key={`${item} + "@@!!"`}
                    >
                      <img
                        src={`${item.img}`}
                        alt="selectimg"
                        id={item.id}
                        onClick={modalOn}
                        className="min-w-[150px] h-[150px] rounded-lg "
                      />
                      <button
                        className="absolute top-0 right-2 text-red-600 font-extrabold"
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

                    <label
                      htmlFor="imgAdd"
                      className={` justify-center items-center border-[1px] rounded-lg w-[150px] h-[150px] mx-1 bg-[#efefef]
                    ${imgArray.length < 3 ? "flex" : "hidden"}
                    `}
                    >
                      이미지 등록
                    </label>
                  </div>
                </div>
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
        </main>
        {previmg && (
          <div
            className={`absolute -top-5 lg:-left-5 z-10 lg:max-w-[1200px] mysm:w-[100vw] lg:h-[calc(100dvh-185px)] mysm:h-[calc(100dvh-192px)] flex flex-col justify-center items-center bg-[#333B3D]/90 
            backdrop-blur-sm`}
          >
            <div className="relative">
              <img
                src={`https://devproject.store${previmg[0].img}`}
                alt="previmg"
                className="px-2"
              />
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
