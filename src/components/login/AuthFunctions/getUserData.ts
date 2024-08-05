import { User } from "firebase/auth";
import { db } from "../../../chFirebase";
import { doc, getDoc } from "firebase/firestore";
import { FbUserType } from "./../../../recoilAtoms/loginState";

export const getUserData = async () => {
  const userID = localStorage.getItem("ClassHub_LUD");
  if (userID) {
    const docRef = doc(db, "users", userID);
    try {
      const result = (await getDoc(docRef)).data();

      if (result?.uid === userID) {
        return result as FbUserType;
      } else {
        return false;
      }
    } catch (error) {
      alert("로그인에 실패하였습니다");
      return false;
    }
  } else {
    return false;
  }
};
