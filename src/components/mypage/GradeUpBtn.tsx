import React from "react";
import requests from "api/requests";
import axios from "api/axios";
import { useAuth } from "hooks/AuthProvider";
import { addInstructor, deleteInstructor } from "./hooks/updateInstructor";
import { userType } from "hooks/fetchUserData";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const GradeUpBtn = () => {
  const { userData, logOut } = useAuth();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  /*
  queryKey: ["UserData"],
    queryFn: () => fetchUserData(userCookie),
  */
  const roleUpdateMutation = useMutation({
    mutationFn: (userData: userType) => addInstructor(userData),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["UserData"],
      });
    },
    onMutate: async (userdata) => {
      await queryClient.cancelQueries({
        queryKey: ["UserData"],
      });

      const prevData: userType | undefined = queryClient.getQueryData([
        "UserData",
      ]);
      await queryClient.setQueryData(["UserData"], () => {
        const newData = { ...prevData, role: "INSTRUCTOR" };
        return newData;
      });
      return prevData;
    },
  });
  const roleDeleteMutation = useMutation({
    mutationFn: (userData: userType) => deleteInstructor(userData),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["UserData"],
      });
    },
    onMutate: async (userdata) => {
      await queryClient.cancelQueries({
        queryKey: ["UserData"],
      });

      const prevData: userType | undefined = queryClient.getQueryData([
        "UserData",
      ]);
      await queryClient.setQueryData(["UserData"], () => {
        const newData = { ...prevData, role: "USER" };
        return newData;
      });
      return prevData;
    },
  });
  const AddInstructor = async (userData: userType) => {
    if (window.confirm("강사권한을 신청 하시겠습니까?")) {
      roleUpdateMutation.mutate(userData);
      nav("/mypage/teacherpage");
    } else {
      return;
    }
  };
  const InstructorOut = async (userData: userType) => {
    roleDeleteMutation.mutate(userData);

    nav("/mypage");
  };
  return (
    <div
      className="lg:flex lg:justify-between    lg:flex-row md:flex-col 
    mysm:flex-col 
   "
    >
      {userData && userData.role !== "INSTRUCTOR" ? (
        <button
          className=" border-none rounded-lg lg:p-2 md:p-1  lg:text-sm md:text-[12px]  bg-blue-500 text-gray-100 lg:font-semibold "
          onClick={() => AddInstructor(userData)}
        >
          강사 신청
        </button>
      ) : (
        <button
          className=" border-none rounded-lg lg:p-2 md:p-1  lg:text-sm md:text-[12px]  bg-indigo-400 text-gray-100 lg:font-semibold "
          onClick={() => InstructorOut(userData)}
        >
          강사 취소
        </button>
      )}
      <button
        className="   rounded-lg lg:p-2 lg:m-0 md:mt-1 md:p-1 lg:text-sm md:text-[12px]   text-gray-600 font-semibold border-[1px]"
        onClick={logOut}
      >
        로그아웃
      </button>
    </div>
  );
};

let newTdata = {
  id: "teacher1",
  type: true,
};

export const handleClick = async () => {
  const tdataString = localStorage.getItem("teacher");
  const tdata = tdataString ? JSON.parse(tdataString) : null;
  if (tdata) {
    localStorage.removeItem("teacher");
  } else {
    localStorage.setItem("teacher", JSON.stringify(newTdata));
  }
  const requestBody = {
    userId: 21111111,
    name: "123",
    field: "개발프로그래밍",
    text: "123",
    userType: "1",
    requestStatus: "1",
  };
  try {
    const res = await axios.post(requests.lecture.addInstructor, requestBody);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
