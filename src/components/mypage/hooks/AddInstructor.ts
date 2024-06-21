import { userType } from "hooks/fetchUserData";
import axios from "api/axios";
import requests from "api/requests";

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
    const addInstrucRes = await axios.post(
      requests.lecture.addInstructor,
      requestBody
    );
    console.log(addInstrucRes);
  } catch (error) {
    console.log(error);
  }
};
