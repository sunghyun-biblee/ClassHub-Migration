import { formatVideoDuration } from "component/mypage/teacherPage/addclass/VideoInsert";
import React from "react";

export const LectureVideoList = () => {
  return (
    <div className="px-2 py-5 border-[1px] mt-5">
      <section>
        <article className="flex md:flex-row mysm:flex-col-reverse justify-between md:items-center mysm:items-start px-2">
          <h1
            className="lg:text-3xl mysm:text-2xl px-1 font-extrabold 
          md:pt-0 mysm:pt-5
          "
          >
            강의 목록
          </h1>
          <div className="flex md:justify-start mysm:justify-center">
            <ul className=" flex items-center  md:py-2 md:px-1 rounded-lg border-[1px] mysm:py-3">
              <li
                className="text-center md:px-5 md:mr-5 font-extrabold 
              md:text-2xl
              mysm:px-4 "
              >
                <h1>내 학습상황</h1>
              </li>
              <li className="flex">
                <div className="flex flex-col items-center px-5 ">
                  <span className="font-semibold md:text-3xl mysm:text-xl">
                    23/52
                  </span>
                  <p>완료된 강의</p>
                </div>
                <div className="flex flex-col items-center px-5 ">
                  <span className="font-semibold md:text-3xl mysm:text-xl">
                    0h11m
                  </span>
                  <p>총 학습시간</p>
                </div>
              </li>
            </ul>
          </div>
        </article>
        <article>
          <ul className="p-2 mt-3">
            {sectionArray.map((item, index) => (
              <li className="mb-2">
                <h1 className="bg-[#F5F5F5] px-3 py-4 text-xl font-semibold">
                  섹션{index}. {item.sectionName}
                </h1>
                <ul>
                  {item.video.map((item) => (
                    <li className="border-b-[1px] px-4 py-4 flex justify-between font-medium cursor-pointer">
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
      </section>
    </div>
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
