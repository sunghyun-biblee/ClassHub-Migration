import { db } from "../../../chFirebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth();

interface ClasHubUser extends User {
  ClassHubId?: string;
}
export const FireBaseLogin = async () => {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    const user: ClasHubUser = result.user;
    const userId = user.uid;
    const RandomNumber = Math.floor(Math.random() * 101).toString();
    console.log(RandomNumber);
    if (userId) {
      const saveUser = doc(db, "users", userId);
      await setDoc(saveUser, {
        uid: userId,
        ClassHubId: user.displayName + RandomNumber,
        email: user.email,
        displayName: user.displayName,
      });
      localStorage.setItem("ClassHub_LUD", userId);
    }

    return true;
  } catch (error) {
    return alert("로그인 과정에서 오류가 발생하였습니다.");
  }
};
