import React, { useRef, useState } from "react";
import { resVideoInfo } from "./EditClass";
import { formatVideoDuration } from "../addclass/VideoInsert";
import { PlusIcon } from "../addclass/PlusIcon";

interface IvideoProp {
  index: number;
  uploadVideo: resVideoInfo[];
  setUploadVideo: (VideoInfo: resVideoInfo[]) => void;
}
export const EditVideoInsert = ({
  index,
  setUploadVideo,
  uploadVideo,
}: IvideoProp) => {
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [videoLength, setVideoLength] = useState<number | null>();
  const [prevVideoArray, setPrevVideoArray] = useState<resVideoInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setVideoTitle(e.target.value);
  };
  const handleChangeVideoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = e.target.files[0];
      const url = URL.createObjectURL(data);
      console.log(url);
      setVideoUrl(data);
    }
  };
  const handleLoadMetaData = () => {
    if (videoRef.current) {
      console.log("영상의 길이(초):", videoRef.current.duration);
      setVideoLength(Math.round(videoRef.current.duration));
    }
  };
  const saveVideo = () => {
    if (prevVideoArray.length >= 3) {
      alert("섹션당 최대 3개까지 등록가능합니다");
      return;
    }
    if (!videoTitle) {
      alert("영상제목을 입력해주세요");
      return;
    }
    if (!videoUrl) {
      alert("영상을 선택해주세요");
      return;
    }

    if (videoTitle && videoUrl && videoLength) {
      if (uploadVideo.length >= 1) {
        setUploadVideo([
          ...uploadVideo,
          {
            title: videoTitle,
            video: videoUrl,
            videoLength: videoLength,
            classDetailId: 0,
            classId: 0,
            sectionTitle: "",
            regdate: "",
            editDate: "",
          },
        ]);
      } else {
        setUploadVideo([
          {
            title: videoTitle,
            video: videoUrl,
            videoLength: videoLength,
            classDetailId: 0,
            classId: 0,
            sectionTitle: "",
            regdate: "",
            editDate: "",
          },
        ]);
      }
      if (prevVideoArray.length >= 1) {
        setPrevVideoArray([
          ...prevVideoArray,
          {
            title: videoTitle,
            video: videoUrl,
            videoLength: videoLength,
            classDetailId: 0,
            classId: 0,
            sectionTitle: "",
            regdate: "",
            editDate: "",
          },
        ]);
      } else {
        setPrevVideoArray([
          {
            title: videoTitle,
            video: videoUrl,
            videoLength: videoLength,
            classDetailId: 0,
            classId: 0,
            sectionTitle: "",
            regdate: "",
            editDate: "",
          },
        ]);
      }
      setVideoTitle("");
      setVideoUrl(null);
      setVideoLength(null);
    }
  };
  // shadow-[0px_8px_24px_rgba(149,157,165,0.3)]
  console.log(videoUrl);
  return (
    <div>
      <div className="flex py-3  px-5 bg-[#d8d9db] rounded-lg min-h-[45dvh]">
        <div className="flex w-[100%] flex-col ">
          <div className="flex  items-center justify-between">
            <h1 className="mr-5 text-lg font-semibold text-zinc-900">
              영상 제목
            </h1>
            <input
              type="text"
              value={videoTitle}
              onChange={handleVideoTitle}
              placeholder="영상제목을 입력해주세요"
              className="text-black px-2 py-1 rounded-md
                w-[60%]
                "
            />
          </div>
          <input
            type="file"
            name="imgAdd"
            id="imgAdd"
            multiple
            className="hidden"
            onChange={handleChangeVideoUrl}
          />

          <label
            htmlFor="imgAdd"
            className={`${
              videoUrl ? "hidden" : "flex"
            } mt-5 justify-center items-center  rounded-lg w-[100%] border-2 border-gray-400/70`}
          >
            <PlusIcon />
          </label>

          <div id="video" className="pt-5 flex justify-center items-center">
            {videoUrl && (
              <video
                ref={videoRef}
                src={URL.createObjectURL(videoUrl)}
                onLoadedMetadata={handleLoadMetaData}
                controls
                className="w-[100%] h-[350px]"
              ></video>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveVideo}
              className="mt-2 px-2 py-1 bg-[#3B82F6] text-white font-semibold rounded-md mr-3"
            >
              섹션에 영상추가
            </button>
            <button
              className="mt-2 px-2 py-1  bg-[#B5B8BF] text-black/70 font-semibold rounded-md"
              onClick={() => {
                setVideoUrl(null);
              }}
            >
              재등록
            </button>
          </div>
          <div className="flex flex-col mt-5  border-t-[1px] border-gray-400/60">
            <h1 className="text-zinc-900 font-extrabold text-lg pt-2">
              섹션에 추가된 영상
            </h1>
            <div className="grid grid-cols-3 gap-3">
              {prevVideoArray?.map((item, index) => (
                <div
                  className="flex flex-col text-zinc-900 font-semibold "
                  key={item.title + index + "C"}
                >
                  <p className="flex justify-between ">
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden w-15">
                      {item.title}
                    </span>
                    <span>{formatVideoDuration(item.videoLength)}</span>
                  </p>
                  {item.video && (
                    <video src={URL.createObjectURL(item.video)}></video>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
