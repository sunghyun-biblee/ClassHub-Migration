import React, { useState } from "react";
import { formatVideoDuration } from "component/mypage/teacherPage/addclass/VideoInsert";
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
    <article>
      <ul className="p-2 mt-3">
        {sectionArray.map((item, index) => (
          <li className="mb-2">
            <div
              className="bg-[#F5F5F5] px-3 py-4 flex justify-between
              border-b-[1px] border-[#2C3539]/30
              "
              onClick={() => handleClickVideoList(index)}
            >
              <h1 className="text-xl font-semibold ">
                섹션{index}. {item.sectionName}
              </h1>
              <img
                src={left}
                alt="dropDown"
                className={` w-5 cursor-pointer transition-transform ${
                  showVideoList === index ? "rotate-90" : "-rotate-90"
                } `}
              />
            </div>
            <ul className={`${showVideoList === index ? "block" : "hidden"}`}>
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
