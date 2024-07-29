import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async () => {
  const userID = localStorage.getItem("ClassHub_LUD");
  if (userID) {
    const docRef = doc(db, "users", userID);
    try {
      const result = (await getDoc(docRef)).data();
      if (result?.uid === userID) {
        return true;
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
