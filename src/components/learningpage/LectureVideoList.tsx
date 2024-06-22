import React from "react";
import { ILearnHeaderProp } from "./LearnHeader";
import { formatVideoDuration } from "components/mypage/teacherPage/addclass/VideoInsert";
import { getToSectionVideoTotalLength } from "components/class/ClassDetail";
import { useNavigate } from "react-router-dom";

export const LectureVideoList = ({ data }: ILearnHeaderProp) => {
  const nav = useNavigate();
  const totalVideo = () => {
    if (data) {
      const totalCount = data.classDetail.reduce(
        (acc, curr) => acc + curr.length,
        0
      );
      return totalCount;
    } else {
      return null;
    }
  };

  const handleMoveTargetVideo = (classId: number, classDetailId: number) => {
    nav(`/learnplay/${classId}/${classDetailId}`);
  };
  return (
    <div className="px-2 py-5 border-b-[1px] mt-5">
      <section>
        <article className="flex justify-between items-center md:flex-row mysm:flex-col-reverse  px-2">
          <h1
            className="lg:text-3xl mysm:text-2xl p-1 font-extrabold 
          md:w-[30%]
          mysm:w-[100%]
          md:mt-0
          mysm:mt-3
          "
          >
            강의 목록
          </h1>

          <div
            className="flex md:justify-start mysm:justify-center  
            lg:max-w-[50%]
            md:max-w-[70%]
          mysm:w-[100%]
          "
          >
            <ul
              className=" flex items-center
    shadow-lg
         justify-between
            md:py-2 md:px-1  rounded-lg border-[1px] mysm:p-2 w-[100%]"
            >
              <li
                className="text-center md:px-5  font-extrabold 
              md:text-2xl
             mysm:text-lg
            
              "
              >
                <h1
                  className="px-1 [text-shadow:_1px_1px_2px_#c0c0c0]
    tracking-tighter
                  "
                >
                  내 학습상황
                </h1>
              </li>
              <li className="flex ">
                <div className="flex flex-col items-center md:px-5 md:mr-0 mysm:px-2 mysm:mr-1 border-r-2">
                  <span className="font-semibold md:text-2xl mysm:text-xl  ">
                    {data.learningData.length}/{totalVideo()}
                  </span>
                  <p className="py-1  ">완료된 강의</p>
                </div>
                <div className="flex flex-col items-center md:px-5 mysm:px-2">
                  <span className="font-semibold md:text-2xl mysm:text-xl  tracking-tight">
                    {formatTime(data.learningTime)}
                  </span>
                  <p className="py-1 ">총 학습시간</p>
                </div>
              </li>
            </ul>
          </div>
        </article>
        <article>
          <ul className="p-2 mt-3">
            {data.classDetail.map((section, index) => (
              <li className="mb-2 border-[1px] rounded-lg overflow-hidden">
                <div
                  className="bg-[#F5F5F5] px-3 py-4 text-xl font-semibold
                flex justify-between"
                >
                  <h1>
                    섹션{index}.{" "}
                    {section[index].sectionTitle
                      ? section[index].sectionTitle
                      : " N번째"}
                  </h1>
                  <p className="font-semibold text-lg">
                    <span>{data.classDetail[index].length}강</span>
                    <span className="px-1">
                      · {getToSectionVideoTotalLength(section)}
                    </span>
                  </p>
                </div>
                <ul>
                  {section.map((item, index) => (
                    <li
                      className="border-b-[1px] px-4 py-4 flex justify-between font-medium cursor-pointer"
                      key={item.classDetailId + index.toString()}
                      onClick={() =>
                        handleMoveTargetVideo(item.classId, item.classDetailId)
                      }
                    >
                      <p className="text-gray-600 ">{item.title}</p>
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
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}m ${String(secs).padStart(2, "0")}s`;
}
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
