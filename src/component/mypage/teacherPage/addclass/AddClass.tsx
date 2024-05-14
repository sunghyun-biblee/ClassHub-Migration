import React, { useEffect, useState } from "react";
import { VideoInsert } from "./VideoInsert";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export interface VideoInfo {
  VideoTitle: string;
  video: string;
}

interface SectionInfo {
  sectiontitle: string;
  videos: VideoInfo[];
}

let i = 0;
export const AddClass = () => {
  const [isAddSectionOn, setIsAddSectionOn] = useState(true);
  const [classTitle, setClassTitle] = useState<string>();
  const [classDescription, setClassDescription] = useState<string>();
  const [overView, setOverView] = useState<string>();
  const [isEditSectionTitle, setIsEditSectionTitle] = useState(true);
  const [completeSectionArray, setCompleteSectionArray] =
    useState<SectionInfo[]>();
  // [{ sectiontitle: "", videos: [] },]
  const [saveSectionTitle, setSaveSectionTitle] = useState<string>();
  const [sectionArray, setSectionArray] = useState<SectionInfo[]>([]);
  const [uploadVideo, setUploadVideo] = useState<VideoInfo[]>([]);

  const addSession = () => {
    if (sectionArray.length === 0) {
      setSectionArray([
        ...sectionArray,
        { sectiontitle: `섹션${i}.`, videos: [] },
      ]);
    } else {
      setSectionArray([{ sectiontitle: `섹션${i}.`, videos: [] }]);
    }
    i++;
    setIsAddSectionOn(false);
  };

  const handleChangeclassTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassTitle(e.target.value);
  };

  const handleChangeclassDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setClassDescription(e.target.value);
  };

  const handleChangeoverView = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverView(e.target.value);
  };

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveSectionTitle(e.target.value);
  };
  const handleSaveSectionTitle = (index: number) => {
    if (sectionArray) {
      const value = saveSectionTitle;
      const newSectionArray = [...sectionArray];
      newSectionArray[index].sectiontitle = value
        ? value
        : newSectionArray[index].sectiontitle;

      setSaveSectionTitle("");

      setIsEditSectionTitle(false);
    }
  };
  console.log(sectionArray);
  console.log(uploadVideo);
  const handleSaveSection = (index: number) => {
    const sectionData = [...sectionArray];
    sectionData[index].videos.push(...uploadVideo);

    if (completeSectionArray && completeSectionArray?.length >= 1) {
      setCompleteSectionArray([...completeSectionArray, ...sectionData]);
    } else {
      setCompleteSectionArray(sectionData);
    }

    setSectionArray([]);
    setIsAddSectionOn(true);
  };

  const addVideoToSession = (index: number, videoInfo: VideoInfo) => {
    const newSectionArray = [...sectionArray];
    newSectionArray[index].videos.push(videoInfo);
    setSectionArray(newSectionArray);
  };

  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
flex flex-col
md:mt-2
"
    >
      <section>
        <header>
          <div>
            <h1>강의 제목</h1>
            <input
              type="text"
              name=""
              id=""
              className="border-[1px]"
              onChange={handleChangeclassTitle}
              value={classTitle}
            />
          </div>
        </header>
        <article>
          <div>
            <h1>요약 설명</h1>
            <textarea
              name=""
              id=""
              className="resize-none border-[1px]"
              onChange={handleChangeoverView}
              value={overView}
            ></textarea>
          </div>
          <div>
            <h1>상세정보</h1>
            <textarea
              name=""
              id=""
              className="resize-none border-[1px]"
              onChange={handleChangeclassDescription}
              value={classDescription}
            ></textarea>
          </div>
        </article>
        <article>
          {isAddSectionOn ? <button onClick={addSession}>섹션추가</button> : ""}
          {completeSectionArray?.map((section, index) => (
            <div>
              <h1 key={section.sectiontitle + index}>
                섹션{index}.{section.sectiontitle}
              </h1>
              <ul>
                {section.videos.map((item) => (
                  <>
                    <li>{item.VideoTitle}</li>
                    <li>{item.video}</li>
                  </>
                ))}
              </ul>
            </div>
          ))}
          {sectionArray?.map((section, index) => (
            <div className="flex" key={`class${section.sectiontitle}`}>
              <div className="flex flex-col">
                <div className="flex">
                  {isEditSectionTitle ? (
                    <>
                      <h1>섹션명 :</h1>
                      <input
                        type="text"
                        id={`section${index}`}
                        className="border-[1px]"
                        value={saveSectionTitle}
                        onChange={handleSectionTitleChange}
                      />
                      <button onClick={() => handleSaveSectionTitle(index)}>
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setIsAddSectionOn(true);
                          setSectionArray([]);
                          setSaveSectionTitle("");
                        }}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <div className="flex">
                      <h1>{section.sectiontitle}</h1>
                      <button
                        onClick={() => setIsEditSectionTitle(true)}
                        className="mx-5"
                      >
                        수정하기
                      </button>
                    </div>
                  )}
                  <button onClick={() => handleSaveSection(index)}>
                    섹션 저장
                  </button>
                </div>
                <VideoInsert
                  index={index}
                  setUploadVideo={setUploadVideo}
                  uploadVideo={uploadVideo}
                  addVideoToSession={addVideoToSession}
                ></VideoInsert>
              </div>
            </div>
          ))}
        </article>
      </section>
    </div>
  );
};
