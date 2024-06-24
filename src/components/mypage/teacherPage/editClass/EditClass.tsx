import { useQuery } from "@tanstack/react-query";
import { useUpdateLectureVideo } from "components/mypage/hooks/useUpdateLectureData";
import React, { useEffect, useState } from "react";
import { LectureInfo } from "./LectureInfo";
import { useTargetLectureData } from "components/mypage/hooks/useTargetLectureData";
import {
  Material,
  sectionstype,
  sectionvideoArraytype,
} from "../addclass/AddClass";
import left from "assets/img/carousel/leftArrow.svg";
import { formatVideoDuration } from "../addclass/VideoInsert";
import { EditVideoInsert } from "./EditVideoInsert";
import { UpdateVideo } from "./UpdateVideo";
import requests from "api/requests";
import axios from "api/axios";

let i = 0;
export interface resVideoInfo {
  classDetailId: number;
  classId: number;
  sectionTitle: string;
  title: string;
  video: File | null;
  videoLength: number;
  regdate: string;
  editDate: string | null;
}
export interface editSectionInfo {
  sectionTitle: string;
  videos: resVideoInfo[];
}

export const EditClass = () => {
  const [selectEditSection, setSelectEditSection] = useState<editSectionInfo>({
    sectionTitle: "",
    videos: [],
  });
  const [seledtEditSectionIndex, setSelectEditSectionIndex] =
    useState<number>(0);
  const [isAddSectionOn, setIsAddSectionOn] = useState(true);
  const [isEditSectionOn, setIsEditSectionOn] = useState(false);
  const [isEditSectionTitle, setIsEditSectionTitle] = useState(true);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editText, setEditText] = useState("");
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [completeSectionArray, setCompleteSectionArray] = useState<
    editSectionInfo[]
  >([]);
  // const [isAddMaterial, setIsAddMaterial] = useState<boolean>(false);
  const [saveSectionTitle, setSaveSectionTitle] = useState<string>("");
  const [sectionArray, setSectionArray] = useState<editSectionInfo[]>([]);
  const [uploadVideo, setUploadVideo] = useState<resVideoInfo[]>([]);
  const [materialArray, setMaterialArray] = useState<Material[]>([]);
  const [showTargetSection, setShowTartgetSection] = useState<number | null>(
    null
  );
  const {
    lectureVideoData,
    VideoDataIsLoading,
    VideoDataIsError,
    VideoDataError,
  } = useUpdateLectureVideo(120);
  const { lectureData, lectureIsLoading, lectureIsError, lectureError } =
    useTargetLectureData(120);

  useEffect(() => {
    if (lectureData && lectureVideoData) {
      setEditTitle(lectureData.classInfo.className);
      setEditText(lectureData.classInfo.description);
      setEditSummary(lectureData.classInfo.summary);
      setEditCategory(lectureData.classInfo.categoryId.toString());
      setEditThumbnail(lectureData.classInfo.thumnail);
      setEditPrice(lectureData.classInfo.price);
      setCompleteSectionArray([...lectureVideoData.sections]);
      setSectionArray([...lectureVideoData.sections]);
    }
  }, [lectureData, lectureVideoData]);

  const addSession = () => {
    if (sectionArray.length === 0) {
      setSectionArray([...sectionArray, { sectionTitle: ``, videos: [] }]);
    } else {
      setSectionArray([{ sectionTitle: ``, videos: [] }]);
    }
    i++;
    setIsAddSectionOn(false);
  };
  const handleSaveSectionTitle = (index: number) => {
    if (sectionArray) {
      const value = saveSectionTitle;
      const newSectionArray = [...sectionArray];
      newSectionArray[index].sectionTitle = value
        ? value
        : newSectionArray[index].sectionTitle;

      setSaveSectionTitle("");

      setIsEditSectionTitle(false);
    }
  };

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

  // const addVideoToSession = (index: number, videoInfo: resVideoInfo) => {
  //   const newSectionArray = [...sectionArray];
  //   newSectionArray[index].videos.push(videoInfo);
  //   setSectionArray(newSectionArray);
  // };

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveSectionTitle(e.target.value);
  };
  const handleClickShowSection = (index: number) => {
    if (showTargetSection === index) {
      setShowTartgetSection(null);
    } else {
      setShowTartgetSection(index);
    }
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

  const postUpdateLecture = async () => {
    const formData = new FormData();
    let reqeustSections: sectionstype[] = [];
    const requestMaterial = {
      id: 123,
      files: [...materialArray],
    };

    if (lectureData && lectureVideoData) {
      const request = {
        classId: lectureData?.classInfo.classId,
        instructorsId: 6,
        categoryId: editCategory,
        thumnail: editThumbnail,
        className: editTitle,
        description: editText,
        summary: editSummary,
        price: editPrice,
        // editDate:
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" })
      );
      if (completeSectionArray) {
        completeSectionArray.map((item) => {
          let sectionArray: sectionvideoArraytype[] = [];

          const sectiontitle = item.sectionTitle;
          item.videos.map((item) => {
            if (item.video) {
              sectionArray.push({
                title: item.title,
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
          title: editTitle,
          sections: reqeustSections,
        };
        console.log(requestMaterial);
        console.log(request);
        console.log(sectionsArray);
        formData.append(
          "sections",
          new Blob([JSON.stringify(sectionsArray)], {
            type: "application/json",
          })
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
    }
  };
  if (VideoDataIsLoading || lectureIsLoading) {
    return <div>로딩중</div>;
  }
  if (VideoDataIsError || lectureIsError) {
    return (
      <div>
        <span>videoError:{VideoDataError?.message}</span>
        <span>lectureError:{lectureError?.message}</span>
      </div>
    );
  }

  return (
    <div className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg lg:flex flex-col mysm:hidden md:mt-2">
      {lectureVideoData && lectureData && (
        <section className="grid grid-cols-[1.2fr,3fr] h-[100%]  ">
          <article className="p-3 flex flex-col justify-between">
            <LectureInfo
              title={editTitle}
              text={editText}
              summary={editSummary}
              thumbnail={editThumbnail}
              category={editCategory}
              price={editPrice}
              setEditTitle={setEditTitle}
              setEditSummary={setEditSummary}
              setEditText={setEditText}
              setEditThumbnail={setEditThumbnail}
              setEditCategory={setEditCategory}
              setEditPrice={setEditPrice}
            ></LectureInfo>
            <div className="flex justify-center py-2">
              <button
                className="py-2 px-5 border-[1px] rounded-lg
          shadow-[0px_8px_24px_rgba(149,157,165,0.3)]
          bg-[#3B82F6] text-white font-extrabold
          "
                onClick={postUpdateLecture}
              >
                강의 수정하기
              </button>
            </div>
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
                          onClick={() => {
                            handleClickShowSection(index);
                            setSelectEditSection(section);
                            setSelectEditSectionIndex(index);
                            setIsEditSectionOn(true);
                          }}
                        >
                          <h1 key={section.sectionTitle + index}>
                            섹션{index}.{section.sectionTitle}
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
                                {item.title}
                              </span>
                              <span>
                                {formatVideoDuration(item.videoLength)}
                              </span>
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
                      key={`class${section.sectionTitle}`}
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
                                섹션명 : {section.sectionTitle}
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

                        <EditVideoInsert
                          index={index}
                          setUploadVideo={setUploadVideo}
                          uploadVideo={uploadVideo}
                        ></EditVideoInsert>
                      </div>
                    </div>
                  ))}
                {isEditSectionOn && (
                  <UpdateVideo
                    completeSectionArray={completeSectionArray}
                    setCompleteSectionArray={setCompleteSectionArray}
                    seletedSection={selectEditSection}
                    setSelectEditSection={setSelectEditSection}
                    seledtEditSectionIndex={seledtEditSectionIndex}
                    setSelectEditSectionIndex={setSelectEditSectionIndex}
                    setIsEditSectionOn={setIsEditSectionOn}
                  ></UpdateVideo>
                )}
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
