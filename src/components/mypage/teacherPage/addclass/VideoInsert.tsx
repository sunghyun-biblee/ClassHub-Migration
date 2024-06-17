import React, { useRef, useState } from "react";
import { VideoInfo } from "./AddClass";
import plus from "assets/img/Plus.svg";
import { PlusIcon } from "./PlusIcon";

interface IvideoProp {
  index: number;
  uploadVideo: VideoInfo[];
  setUploadVideo: (VideoInfo: VideoInfo[]) => void;
  addVideoToSession: (index: number, VideoInfo: VideoInfo) => void;
}
export const VideoInsert = ({
  index,
  setUploadVideo,
  uploadVideo,
}: IvideoProp) => {
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [videoLength, setVideoLength] = useState<number | null>();
  const [prevVideoArray, setPrevVideoArray] = useState<VideoInfo[]>([]);
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
          { VideoTitle: videoTitle, video: videoUrl, videoLength: videoLength },
        ]);
      } else {
        setUploadVideo([
          { VideoTitle: videoTitle, video: videoUrl, videoLength: videoLength },
        ]);
      }
      if (prevVideoArray.length >= 1) {
        setPrevVideoArray([
          ...prevVideoArray,
          { VideoTitle: videoTitle, video: videoUrl, videoLength: videoLength },
        ]);
      } else {
        setPrevVideoArray([
          { VideoTitle: videoTitle, video: videoUrl, videoLength: videoLength },
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
                  key={item.VideoTitle + index + "C"}
                >
                  <p className="flex justify-between ">
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden w-15">
                      {item.VideoTitle}
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
export const formatVideoDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

// ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} 이 부분은 영상의 길이를 "00:00" 형식으로 변환하기 위해 사용되는 코드입니다.

// String(minutes): minutes 변수를 문자열로 변환합니다. 이 부분에서 문자열로 변환하는 이유는 padStart 함수를 사용하기 위해서입니다.

// .padStart(2, '0'): 문자열의 시작 부분에 0을 추가하여 지정된 길이(여기서는 2)가 될 때까지 문자열을 채웁니다. 즉, 만약 minutes가 한 자리 수라면 시작 부분에 0을 추가하여 두 자리 수로 만듭니다. 예를 들어, 5분은 "05"로 표시됩니다.

// String(seconds): seconds 변수를 문자열로 변환합니다.

// .padStart(2, '0'): 분과 마찬가지로 초에 대해서도 두 자리 수로 만들어 줍니다. 만약 초가 한 자리 수라면 시작 부분에 0을 추가합니다.
