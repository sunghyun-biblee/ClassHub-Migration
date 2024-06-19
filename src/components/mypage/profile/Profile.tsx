import React, { useEffect, useState } from "react";
import myIMG from "assets/img/preview.jpg";
import { useAuth } from "hooks/AuthProvider";
import axios from "api/axios";
import requests from "api/requests";

export const Profile = () => {
  const { userData, userIsLoading, userIsError, userError } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [editIntroduce, setEditIntroduce] = useState<string>("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editImg, setEditImg] = useState<string>();
  useEffect(() => {
    if (userData && userData.userId) {
      setEditName(userData.name);
      setEditEmail(userData.email);
      setEditIntroduce(userData.introduce ? userData.introduce : "");
    }
  }, [userData]);

  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  if (userIsError) {
    return <span>{userError?.message}</span>;
  }
  const handleCompleteEdit = async () => {
    if (userData && userData.userId) {
      const requestBody = {
        ...userData,
        name: editName,
        email: editEmail,
        introduce: editIntroduce,
      };
      try {
        const res = await axios.post(requests.user.updateUser, requestBody);
        console.log(res);
        setIsEdit((prev) => !prev);
        return window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeProfileImg = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.files && (e.target.files[0] as Blob);
    if (value) {
      const fileUrl = URL.createObjectURL(value);
      setEditImg(fileUrl);
    }
    const formData = new FormData();
    if (e.target.files) {
      const value = e.target.files[0];

      formData.append("multipartFile", value);
    }

    if (userData && userData.userName)
      try {
        const res = await axios.post(
          `${requests.user.updateUserImg}/${userData.userName}`,
          formData,
          { params: { userName: userData.userName } }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg flex flex-col md:mt-2">
      {userData && userData.userId && (
        <section className="md:py-10 md:px-5 mysm:py-5 mysm:px-3 flex flex-col gap-y-3">
          <article className="flex md:flex-row mysm:flex-col md:gap-5 mysm:gap-2 relative">
            <div className="md:w-[40%] mysm:w-[55%]shadow-[0px_8px_24px_rgba(149,157,165,0.3)] h-[300px]">
              <input
                type="File"
                id="changeImg"
                className="hidden"
                onChange={handleChangeProfileImg}
              />
              <label htmlFor="changeImg">
                {editImg ? (
                  <img
                    src={editImg}
                    alt="profileIMG"
                    className=" rounded-3xl object-cover w-[100%] h-[100%] border-[1px]"
                  />
                ) : (
                  <img
                    src={userData.profilePicture ? userData.profilePicture : ""}
                    alt="profileIMG"
                    className=" rounded-3xl object-cover w-[100%] h-[100%] border-[1px]"
                  />
                )}
              </label>
            </div>

            <ul className="md:p-3 mysm:p-2  flex flex-col justify-between relative">
              <ul className="flex flex-col justify-between">
                <li className="py-5 border-b-[1px]">
                  <span className="text-md font-semibold">닉네임</span>
                  <input
                    className="shadow-[0px_1px_10px_rgba(149,157,165,0.3)] md:ml-7 mysm:ml-7 border-[1px] py-1 px-3 rounded-md"
                    value={isEdit ? editName : userData.name}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={!isEdit}
                  />
                </li>
                <li className="py-5 border-b-[1px] flex ">
                  <span className="text-md font-semibold">이메일</span>
                  <input
                    className="shadow-[0px_1px_10px_rgba(149,157,165,0.3)] md:ml-7 mysm:ml-7 border-[1px] py-1 px-3 rounded-md  max-h-[31px] overflow-hidden 
            md:min-w-[250px] mysm:min-w-[210px]
              text-ellipsis"
                    value={isEdit ? editEmail : userData.email}
                    onChange={(e) => setEditEmail(e.target.value)}
                    disabled={!isEdit}
                  />
                </li>
                <li className="py-5 border-b-[1px] ">
                  <span className="text-md font-semibold">전화번호</span>
                  <span className="ml-3  py-1 px-3 rounded-md">
                    010-0000-0000
                  </span>
                </li>
              </ul>
              {isEdit ? (
                <li className="flex">
                  <button
                    className="border-[1px] py-1 px-2.5 rounded-xl
              shadow-[0px_1px_10px_rgba(149,157,165,0.3)]
             md:max-w-[100%]
             mysm:max-w-26
             md:font-normal
             mysm:font-semibold"
                    onClick={handleCompleteEdit}
                  >
                    수정완료
                  </button>
                </li>
              ) : (
                <li>
                  <div
                    className="md:justify-between mysm:flex 
           mysm:justify-end
      flex-row
              md:static
              md:text-base
              mysm:text-[12px]
              md:mt-0
              mysm:mt-4
            right-0 
            lg:gap-4
            "
                  >
                    <button
                      className="border-[1px] py-1 px-2.5 rounded-xl
              shadow-[0px_1px_10px_rgba(149,157,165,0.3)]
             md:max-w-[100%]
             mysm:max-w-26
             md:font-normal
             mysm:font-semibold"
                      onClick={() => setIsEdit((prev) => !prev)}
                    >
                      수정하기
                    </button>
                    <button
                      className="border-[1px] py-1 px-2.5 rounded-xl
              shadow-[0px_1px_10px_rgba(149,157,165,0.3)]
             md:max-w-[100%]
             mysm:max-w-26
             md:font-normal
             mysm:font-semibold
             md:mt-0
             md:mx-2
             mysm:mx-2
              "
                    >
                      비밀번호 수정 및 찾기
                    </button>
                    <button
                      className="border-[1px] py-1 px-2.5 rounded-xl
              shadow-[0px_1px_10px_rgba(149,157,165,0.3)] bg-red-300 font-semibold
              md:max-w-[100%]
             mysm:max-w-26
             md:mt-0
              "
                    >
                      회원탈퇴
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </article>
          <article>
            <div className="p-3 mt-3 flex flex-col justify-between">
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-lg font-semibold">소개</h1>
              </div>
              {isEdit ? (
                <textarea
                  name=""
                  id=""
                  value={editIntroduce}
                  onChange={(e) => setEditIntroduce(e.target.value)}
                  placeholder={
                    userData.introduce
                      ? userData.introduce
                      : "자기소개를 작성해주세요"
                  }
                  className="p-3 border-[1px] lg:min-h-[10dvh] md:min-h-[20dvh] overflow-y-scroll lg:max-h-[15dvh] md:max-h-[30dvh] rounded-l-lg"
                />
              ) : (
                <p className="p-3 border-[1px] lg:min-h-[10dvh] md:min-h-[20dvh] overflow-y-scroll lg:max-h-[15dvh] md:max-h-[30dvh] rounded-l-lg">
                  {userData.introduce
                    ? userData.introduce
                    : "작성된 자기소개가 없습니다"}
                </p>
              )}
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
