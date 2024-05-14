import React, { useState } from "react";
import { VideoInfo } from "./AddClass";

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
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleVideoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value);
  };
  const handleChangeVideoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = e.target.files[0];
      const url = URL.createObjectURL(data);
      console.log(url);
      setVideoUrl(url);
    }
  };

  const saveVideo = () => {
    if (videoTitle && videoUrl) {
      if (uploadVideo.length >= 1) {
        setUploadVideo([
          ...uploadVideo,
          { VideoTitle: videoTitle, video: videoUrl },
        ]);
      } else {
        setUploadVideo([{ VideoTitle: videoTitle, video: videoUrl }]);
      }
      setVideoTitle("");
      setVideoUrl("");
    }
  };

  console.log(videoUrl);
  return (
    <div>
      <div className="flex py-5  px-5 bg-gray-500/50 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.3)]">
        <div className="flex w-[600px] md:justify-normal mysm:justify-between ">
          <div>
            <input
              type="file"
              name=""
              id="imgAdd"
              multiple
              className="hidden"
              onChange={handleChangeVideoUrl}
            />

            <label
              htmlFor="imgAdd"
              className={` justify-center items-center border-[1px] rounded-lg w-[150px] h-[150px] mx-1 bg-[#efefef]`}
            >
              영상추가
            </label>
            <input type="text" value={videoTitle} onChange={handleVideoTitle} />
            <div id="video">
              {videoUrl && <video src={videoUrl} controls></video>}
            </div>
            <button onClick={saveVideo}>저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
