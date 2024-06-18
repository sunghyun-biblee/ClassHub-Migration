import React, { useState } from "react";
import { formatVideoDuration } from "components/mypage/teacherPage/addclass/VideoInsert";
import left from "assets/img/carousel/leftArrow.svg";

export const LearnVideoList = () => {
  const [showVideoList, setShowVideoList] = useState<number | null>(null);
  const handleClickVideoList = (index: number) => {
    if (showVideoList === index) {
      setShowVideoList(null);
    } else {
      setShowVideoList(index);
    }
  };
  return (
    <article className=" lg:mb-0 mysm:mb-[40px]  bg-[#BEC9CE] lg:rounded-lg">
      <ul
        className="p-2 border-t-2 lg:border-0 mysm:border-gray-400
       shadow-2xl  
      overflow-scroll max-h-[50vh]

      "
      >
        {sectionArray.map((item, index) => (
          <li className="mb-2 ">
            <div
              className={`bg-[#F5F5F5] px-3 py-4 flex justify-between
              border-b-[1px] border-[#2C3539]/30 
              ${showVideoList === index ? "  rounded-t-md" : "  rounded-md"}
            
              `}
              onClick={() => handleClickVideoList(index)}
            >
              <h1
                className="md:text-xl mysm:text-md font-semibold overflow-hidden
                whitespace-nowrap text-ellipsis
                min-w-[300px]
                lg:max-w-[500px]
              mysm:max-w-90vw
              "
              >
                섹션{index}. {item.sectionName}파이썬 프로그래밍 입문 - 강의
                소개
              </h1>
              <img
                src={left}
                alt="dropDown"
                className={` w-5 cursor-pointer transition-transform ${
                  showVideoList === index ? "rotate-90" : "-rotate-90"
                } `}
              />
            </div>
            <ul
              className={`${
                showVideoList === index
                  ? "block rounded-b-md overflow-hidden"
                  : "hidden"
              }`}
            >
              {item.video.map((item) => (
                <li className="border-b-[1px] border-[#2C3539]/30 px-4 py-4 flex justify-between font-medium cursor-pointer bg-[#efefef]">
                  <p className="text-gray-600 ">{item.videoTitle}</p>
                  <p className="text-gray-400">
                    {formatVideoDuration(item.videoLength)}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  );
};

const sectionArray = [
  {
    sectionName: "react1",
    video: [
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
    ],
  },
  {
    sectionName: "react2",
    video: [
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
    ],
  },
  {
    sectionName: "react3",
    video: [
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
    ],
  },
  {
    sectionName: "react4",
    video: [
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
    ],
  },
  {
    sectionName: "react5",
    video: [
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
      {
        videoTitle: "redux",
        videoURL: "recoil",
        videoLength: 340,
      },
    ],
  },
];
