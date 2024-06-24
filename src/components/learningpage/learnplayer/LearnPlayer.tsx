import React, { useEffect, useState } from "react";
import { LearnVideo } from "./LearnVideo";
import { LearnVideoList } from "./LearnVideoList";
import hamburgerIcon from "assets/img/MenuBar.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import { selectClassinfo } from "components/class/hooks/useGetArray";
import { useLocation } from "react-router-dom";
import { ClassDataType } from "components/class/ClassDetail";
import requests from "api/requests";

export const LearnPlayer = () => {
  const [isShowSection, setIsShowSection] = useState(false);
  const [VideoData, setVideoData] = useState<string | null>(null);
  const classId = parseInt(useLocation().pathname.split("/")[2]);
  const classDetailId = parseInt(useLocation().pathname.split("/")[3]);
  const { data, isLoading, isError, error } = useQuery<ClassDataType, Error>({
    queryKey: ["classDeatil", classId],
    queryFn: () => selectClassinfo(classId),
  });

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${requests.lecture.getTargetLectureLearningData}/${classDetailId}`
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchData();
  const renderVideo = (VideoData: string | null) => {
    if (VideoData) {
      return (
        <LearnVideo
          videoData={VideoData}
          classDetailId={classDetailId}
        ></LearnVideo>
      );
    } else {
      return <div>로딩중</div>;
    }
  };
  useEffect(() => {
    if (data) {
      data?.classDetail.map((arr, index) => {
        arr.map((item) => {
          console.log("calssdetailid", item.classDetailId);
          if (item.classDetailId === classDetailId) {
            return setVideoData(item.video);
          }
        });
      });
    } else {
      return;
    }
  }, [classDetailId, data]);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError || !data) {
    return <div>{error && error.message}</div>;
  }

  return (
    <div
      className="lg:mt-[84px] md:mt-[72px] mysm:mt-[72px] max-w-[100vw]  my-0 mx-auto  bg-[#2E2E2E] flex justify-center  lg:pb-0
    lg:mb-0 mysm:mb-[50px] lg:h-[calc(100vh-84px)] mysm:h-[calc(100vh-112px)]
    relative
    "
    >
      <div className="w-[100%] h-[100%] lg:max-w-[2000px] ">
        <section
          className="flex w-[100%] lg:flex-row mysm:flex-col 
        
        lg:justify-between
        "
        >
          {renderVideo(VideoData)}
          <div className="mysm:block lg:hidden">
            <LearnVideoList data={data} />
          </div>
          <div
            className={`absolute top-2 right-2  lg:block mysm:hidden  lg:rounded-lg m-2 overflow-hidden  
           
          transition-colors
          `}
          >
            <div
              className={`${
                isShowSection ? "translate-x-0" : "translate-x-[101%]"
              } transition-all bg-[#BEC9CE] z-10 relative`}
            >
              <LearnVideoList data={data} />
              <div className="w-[100%] flex justify-center items-center bg-[#BEC9CE]">
                <button
                  onClick={() => setIsShowSection(false)}
                  className="px-3 py-2 border-[1px] mb-2 w-20 rounded-md
                    bg-[#F5F5F5]  font-semibold"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex absolute top-2 right-2 m-2
             overflow-hidden z-0 lg:block mysm:hidden
            `}
          >
            <button
              onClick={() => setIsShowSection((prev) => !prev)}
              className={`w-20 h-20
 bg-white rounded-md
                ${
                  isShowSection ? "-translate-y-[100%]" : "translate-y-0"
                } transition-transform
                `}
            >
              <img
                src={hamburgerIcon}
                alt="menu"
                className="h-[100%] rounded-md"
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// 다크 그레이 (Dark Gray): 완전한 검은색보다 밝아서 눈에 덜 피로합니다.
// HEX: #2E2E2E

// 건메탈 (Gunmetal): 어두운 회색 계열로 눈에 덜 피로감을 줍니다.
// HEX: #2C3539

// 차콜 그레이 (Charcoal Gray): 검은색과 회색의 중간 정도로 눈에 편안합니다.
// HEX: #36454F

// 에보니 (Ebony): 약간의 브라운 톤이 섞여 있어 눈에 부드럽습니다.
// HEX: #555D50
