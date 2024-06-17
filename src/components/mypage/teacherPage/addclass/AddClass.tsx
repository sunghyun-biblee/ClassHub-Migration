import React, { useState } from "react";
import { VideoInsert, formatVideoDuration } from "./VideoInsert";

import left from "assets/img/carousel/leftArrow.svg";
import axios from "api/axios";
import requests from "api/requests";

export interface VideoInfo {
  VideoTitle: string;
  video: File | null;
  videoLength: number;
}

export interface SectionInfo {
  videosTotalLengths: number;
  sectiontitle: string;
  videos: VideoInfo[];
}
export interface Thumbnail {
  preview: string | undefined;
  fileImg: File | null;
}
export interface Material {
  id: string;
  material: File | null;
}

export type sectionvideoArraytype = {
  title: string;
  videoLength: number;
  video: string;
};
export type sectionstype = {
  sectionTitle: string;
  videos: sectionvideoArraytype[];
};

export let reqeustSections: sectionstype[] = [];

let i = 0;
export const AddClass = () => {
  const [isAddSectionOn, setIsAddSectionOn] = useState(true);
  const [classTitle, setClassTitle] = useState<string>("");
  const [classDescription, setClassDescription] = useState<string>("");
  const [overView, setOverView] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<Thumbnail>();
  const [category, setCategory] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [isEditSectionTitle, setIsEditSectionTitle] = useState(true);
  const [completeSectionArray, setCompleteSectionArray] =
    useState<SectionInfo[]>();
  const [isAddMaterial, setIsAddMaterial] = useState<boolean>(false);
  const [saveSectionTitle, setSaveSectionTitle] = useState<string>("");
  const [sectionArray, setSectionArray] = useState<SectionInfo[]>([]);
  const [uploadVideo, setUploadVideo] = useState<VideoInfo[]>([]);
  const [materialArray, setMaterialArray] = useState<Material[]>([]);
  const [showTargetSection, setShowTartgetSection] = useState<number | null>(
    null
  );

  const addSession = () => {
    if (sectionArray.length === 0) {
      setSectionArray([
        ...sectionArray,
        { sectiontitle: ``, videos: [], videosTotalLengths: 0 },
      ]);
    } else {
      setSectionArray([
        { sectiontitle: ``, videos: [], videosTotalLengths: 0 },
      ]);
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
  console.log(showTargetSection);
  const handleSaveSection = (index: number) => {
    const sectionData = [...sectionArray];
    sectionData[index].videos.push(...uploadVideo);
    if (uploadVideo.length === 0) {
      alert("등록된 영상이 없습니다");
      return;
    }
    if (completeSectionArray && completeSectionArray?.length >= 1) {
      setCompleteSectionArray([...completeSectionArray, ...sectionData]);
    } else {
      setCompleteSectionArray(sectionData);
    }

    setSectionArray([]);
    setUploadVideo([]);
    setIsEditSectionTitle(true);
    setIsAddSectionOn(true);
  };

  const addVideoToSession = (index: number, videoInfo: VideoInfo) => {
    const newSectionArray = [...sectionArray];
    newSectionArray[index].videos.push(videoInfo);
    setSectionArray(newSectionArray);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = parseInt(e.target.value);
    setPrice(data);
  };

  const handleClickShowSection = (index: number) => {
    if (showTargetSection === index) {
      setShowTartgetSection(null);
    } else {
      setShowTartgetSection(index);
    }
  };
  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const value = e.target.files[0];
      const previewString = window.URL.createObjectURL(value);
      setThumbnail({ preview: previewString, fileImg: value });
    }
  };

  console.log(completeSectionArray);
  console.log(uploadVideo);
  const postAddLecture = async () => {
    const formData = new FormData();
    const requestMaterial = {
      id: 123,
      files: [...materialArray],
    };
    const request = {
      instructorsId: 6,
      categoryId: category,
      className: classTitle,
      description: classDescription,
      summary: overView,
      price: price,
      thumnail: thumbnail?.preview,
    };
    console.log(request);

    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (completeSectionArray) {
      completeSectionArray.map((item) => {
        let sectionArray: sectionvideoArraytype[] = [];
        const sectiontitle = item.sectiontitle;
        item.videos.map((item) => {
          if (item.video) {
            sectionArray.push({
              title: item.VideoTitle,
              video: item.video?.name,
              videoLength: item.videoLength,
            });
          }
        });
        reqeustSections.push({
          sectionTitle: sectiontitle,
          videos: sectionArray,
        });
      });

      const sectionsArray = {
        title: classTitle,
        sections: reqeustSections,
      };

      console.log(sectionsArray);
      formData.append(
        "sections",
        new Blob([JSON.stringify(sectionsArray)], { type: "application/json" })
      );

      completeSectionArray.map((item) =>
        item.videos.map((item) => {
          if (item.video !== null) {
            console.log(item.video);
            formData.append("videos", item.video);
          }
        })
      );
    }

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    for (let value of formData.values()) {
      console.log(value);
    }

    try {
      const res = await axios.post(requests.lecture.addLecture, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const materialRes = await axios.post(
        requests.lecture.addLectureMaterial,
        requestMaterial
      );

      console.log(res);
      console.log(materialRes);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(parseInt(e.target.value));
  };
  const changeChangeMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const value = {
        id: `material${new Date().getTime()}${i}`,
        material: e.target.files[0],
      };
      setMaterialArray((prev) => [...prev, value]);
      i++;
    }
  };
  const handleDeleteMaterial = (materialId: string) => {
    if (materialId) {
      const newMaterialArr = materialArray.filter(
        (item) => item.id !== materialId
      );
      setMaterialArray(newMaterialArr);
    }
  };
  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
lg:flex flex-col mysm:hidden
md:mt-2
"
    >
      <section className="grid grid-cols-[1.2fr,3fr] h-[100%]  ">
        <article className="p-3 flex flex-col justify-between">
          <ul className=" flex flex-col">
            <li className="py-2">
              <h1 className="py-[2px] font-extrabold">강의 제목</h1>
              <input
                type="text"
                name=""
                id=""
                className="border-[1px] w-[100%] focus:outline-blue-400 rounded-md"
                onChange={handleChangeclassTitle}
                value={classTitle}
              />
            </li>
            <li className="py-2">
              <h1 className="py-[2px] font-extrabold">요약 설명</h1>
              <textarea
                name=""
                id=""
                className="resize-none border-[1px] w-[100%] focus:outline-blue-400 rounded-md"
                onChange={handleChangeoverView}
                value={overView}
              ></textarea>
            </li>
            <li>
              <h1 className="py-[2px] font-extrabold">상세정보</h1>
              <textarea
                name=""
                id=""
                className="resize-none border-[1px] w-[100%] min-h-[15vh] focus:outline-blue-400 rounded-md"
                onChange={handleChangeclassDescription}
                value={classDescription}
              ></textarea>
            </li>
            <li>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                onChange={handleChangeThumbnail}
              />
              <div className="flex justify-between items-center my-1">
                <h1 className="font-extrabold">썸네일 등록</h1>
                <label
                  htmlFor="thumbnail"
                  className="block py-1 border-[1px] px-2
                    bg-[#3B82F6]
                    text-white
                    text-sm
                    font-semibold
                    rounded-md
                     "
                >
                  {thumbnail ? "재등록" : "추가"}
                </label>
              </div>
              {thumbnail && (
                <div className="border-[1px] rounded-lg">
                  <img
                    src={thumbnail.preview}
                    alt="thumbnail"
                    className="w-[100%] h-[auto] rounded-lg"
                  ></img>
                </div>
              )}
            </li>
          </ul>
          <ul className="pt-3">
            <li className="flex justify-between py-2 px-1">
              <span>카테고리</span>
              <select
                name="category"
                id="classCategory"
                onChange={handleChangeCategory}
              >
                <option value="1">개발·프로그래밍</option>
                <option value="2">게임 개발</option>
                <option value="3">인공지능</option>
                <option value="4">보안·네트워크</option>
              </select>
            </li>
            <li className="flex justify-between py-2 px-1">
              <span>가격</span>
              <input
                type="number"
                value={price}
                onChange={handleChangePrice}
                className="border-[1px] w-[65%] text-sm pr-2 rounded-md text-right"
                placeholder="숫자만 입력해주세요"
                maxLength={6}
              />
            </li>
            <li className="flex justify-center py-2">
              <button
                className="py-2 px-5 border-[1px] rounded-lg
                  shadow-[0px_8px_24px_rgba(149,157,165,0.3)]
                  bg-[#3B82F6] text-white font-extrabold
                  "
                onClick={postAddLecture}
              >
                강의 등록하기
              </button>
            </li>
          </ul>
        </article>
        <article className="h-[100%]">
          <div className="grid grid-cols-[1.5fr,3fr] h-[100%]">
            <div className="bg-gray-100 h-[100%]  ">
              <div className="flex justify-between items-center py-1 px-2 my-2">
                <h1 className="px-2 py-1 font-extrabold">등록된 강의</h1>
                {isAddSectionOn && (
                  <button
                    onClick={addSession}
                    className="border-[1px] px-2 py-1
                    bg-[#3B82F6]
                    text-white
                    font-semibold
                    rounded-md
                    "
                  >
                    섹션추가
                  </button>
                )}
              </div>
              <div id="completeLecture" className="h-[90%]">
                <div
                  id="completeSectionArray"
                  className="h-[55%] border-b-[1px]"
                >
                  {completeSectionArray?.map((section, index) => (
                    <div className="px-3">
                      <div
                        className="flex justify-between py-1 border-[1px] px-2 rounded-sm"
                        onClick={() => handleClickShowSection(index)}
                      >
                        <h1 key={section.sectiontitle + index}>
                          섹션{index}.{section.sectiontitle}
                        </h1>
                        <img
                          src={left}
                          alt="dropDown"
                          className={` w-5 cursor-pointer transition-transform ${
                            showTargetSection === index
                              ? "rotate-90"
                              : "-rotate-90"
                          } `}
                        />
                      </div>
                      <ul
                        className={`px-2 ${
                          showTargetSection === index ? "block" : "hidden"
                        } `}
                      >
                        {section.videos.map((item) => (
                          <li className="flex justify-between py-1">
                            <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-32">
                              {item.VideoTitle}
                            </span>
                            <span>{formatVideoDuration(item.videoLength)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div id="completeMaterial">
                  <div className="px-4 py-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <h1 className="font-extrabold">등록된 강의 자료</h1>
                      <input
                        type="file"
                        id="material"
                        className="hidden"
                        onChange={changeChangeMaterial}
                      />
                      <label
                        // onClick={addSession}
                        htmlFor="material"
                        className="border-[1px] px-2 py-1 bg-[#3B82F6] text-white font-semibold rounded-md
                    "
                      >
                        추가
                      </label>
                    </div>
                    <ul className="mt-1">
                      {materialArray?.map((item) => (
                        <li className="py-1 flex justify-between items-center border-b-[1px]">
                          <span className="w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.material?.name}
                          </span>
                          <button
                            className="font-extrabold text-red-500"
                            onClick={() => handleDeleteMaterial(item.id)}
                          >
                            {"X"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[100%]">
              {!isAddSectionOn &&
                sectionArray?.map((section, index) => (
                  <div
                    className="flex px-2 py-1 h-[100%]"
                    key={`class${section.sectiontitle}`}
                  >
                    <div className="flex flex-col w-[100%]">
                      <div className="flex p-2 justify-between items-center">
                        {isEditSectionTitle ? (
                          <>
                            <div className="flex items-center">
                              <h1 className="font-semibold">섹션명</h1>
                              <input
                                type="text"
                                id={`section${index}`}
                                className="border-[1px] px-1 py-1 ml-2 rounded-md
                              w-[170px] text-sm
                              "
                                value={saveSectionTitle}
                                onChange={handleSectionTitleChange}
                                placeholder="섹션명을 입력해주세요"
                              />
                            </div>
                            <div className="flex ">
                              <button
                                onClick={() => handleSaveSectionTitle(index)}
                                className="px-3 py-1 border-[1px] rounded-md mr-2
                              bg-[#3B82F6] text-white font-semibold"
                              >
                                섹션명 저장
                              </button>
                              <button
                                onClick={() => {
                                  setIsAddSectionOn(true);
                                  setSectionArray([]);
                                  setSaveSectionTitle("");
                                }}
                                className="px-3 py-1 border-[1px] rounded-md bg-[#B5B8BF] text-black/70 font-semibold"
                              >
                                취소
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between items-center w-[100%]">
                            <h1 className="font-semibold">
                              섹션명 : {section.sectiontitle}
                            </h1>
                            <div>
                              <button
                                onClick={() => handleSaveSection(index)}
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

                      <VideoInsert
                        index={index}
                        setUploadVideo={setUploadVideo}
                        uploadVideo={uploadVideo}
                        addVideoToSession={addVideoToSession}
                      ></VideoInsert>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
