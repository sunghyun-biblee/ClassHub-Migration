import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { editSectionInfo, resVideoInfo } from "./EditClass";
import { PlusIcon } from "../addclass/PlusIcon";
import { formatVideoDuration } from "../addclass/VideoInsert";

interface IUpdateVideo {
  seletedSection: editSectionInfo;
  completeSectionArray: editSectionInfo[];
  setCompleteSectionArray: Dispatch<SetStateAction<editSectionInfo[]>>;
}
export const UpdateVideo = ({
  seletedSection,
  completeSectionArray,
  setCompleteSectionArray,
}: IUpdateVideo) => {
  const [editSectionTitle, setEditSectionTitle] = useState("");
  const [editSectionVideos, setEditSEctionVideos] = useState<resVideoInfo[]>(
    []
  );
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [videoLength, setVideoLength] = useState<number | null>();
  const [prevVideoArray, setPrevVideoArray] = useState<resVideoInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEditSectionTitle, setIsEditSectionTitle] = useState(true);
  console.log(seletedSection);
  console.log(completeSectionArray);
  useEffect(() => {
    setEditSectionTitle(seletedSection.sectionTitle);
    setEditSEctionVideos([...seletedSection.videos]);
    setPrevVideoArray(seletedSection.videos);
  }, []);
  console.log(editSectionVideos);
  console.log(editSectionTitle);
  console.log(isEditSectionTitle);
  return (
    <div>
      <div
        className="flex px-2 py-1 h-[100%]"
        //   key={`class${section.sectiontitle}`}
      >
        <div className="flex flex-col w-[100%]">
          <div className="flex p-2 justify-between items-center">
            {isEditSectionTitle ? (
              <>
                <div className="flex items-center">
                  <h1 className="font-semibold">섹션명</h1>
                  <input
                    type="text"
                    //   id={`section${index}`}
                    className="border-[1px] px-1 py-1 ml-2 rounded-md
                              w-[170px] text-sm
                              "
                    value={editSectionTitle}
                    onChange={(e) => setEditSectionTitle(e.target.value)}
                    placeholder="섹션명을 입력해주세요"
                  />
                </div>
                <div className="flex ">
                  <button
                    onClick={() => setIsEditSectionTitle(false)}
                    className="px-3 py-1 border-[1px] rounded-md mr-2
                              bg-[#3B82F6] text-white font-semibold"
                  >
                    섹션명 저장
                  </button>
                  <button
                    onClick={() => {
                      // setIsAddSectionOn(true);
                      // setSectionArray([]);
                      // setSaveSectionTitle("");
                    }}
                    className="px-3 py-1 border-[1px] rounded-md bg-[#B5B8BF] text-black/70 font-semibold"
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center w-[100%]">
                <h1 className="font-semibold">섹션명 : {editSectionTitle}</h1>
                <div>
                  <button
                    //   onClick={() => handleSaveSection(index)}
                    className="px-3 py-1 border-[1px] rounded-md mr-2 bg-[#3B82F6] text-white font-semibold"
                  >
                    섹션 저장
                  </button>
                  <button
                    onClick={() => setIsEditSectionTitle(true)}
                    className="px-3 py-1 border-[1px] rounded-md 
                            bg-[#B5B8BF] text-black/70 font-semibold"
                  >
                    섹션명 수정
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex py-3  px-5 bg-[#d8d9db] rounded-lg min-h-[45dvh]">
            <div className="flex w-[100%] flex-col ">
              <div className="flex  items-center justify-between">
                <h1 className="mr-5 text-lg font-semibold text-zinc-900">
                  영상 제목
                </h1>
                <input
                  type="text"
                  value={videoTitle}
                  // onChange={handleVideoTitle}
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
                //   onChange={handleChangeVideoUrl}
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
                    //   onLoadedMetadata={handleLoadMetaData}
                    controls
                    className="w-[100%] h-[350px]"
                  ></video>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  // onClick={saveVideo}
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
                        // <video src={URL.createObjectURL(item.video)}></video>
                        <p>{item.title}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
