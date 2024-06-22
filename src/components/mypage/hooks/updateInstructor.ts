import { userType } from "hooks/fetchUserData";
import axios from "api/axios";
import requests from "api/requests";
import { useNavigate } from "react-router-dom";

export const addInstructor = async (userData: userType) => {
  const requestBody = {
    userId: userData.userId,
    name: userData.name,
    text: "string",
    field: "개발 프로그래밍",
    userType: "1",
    requestStatus: "1",
  };
  try {
    await axios.post(requests.lecture.addInstructor, requestBody);
  } catch (error) {
    console.log(error);
  }
};
export const deleteInstructor = async (userData: userType) => {
  if (userData) {
    try {
      await axios.post(requests.lecture.deleteInstructor, "", {
        params: { userId: userData.userId },
      });
    } catch (error) {
      console.log(error);
    }
  }
};
