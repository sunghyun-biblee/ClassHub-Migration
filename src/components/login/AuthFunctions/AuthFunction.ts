import { db } from "../../../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth();

export const FireBaseLogin = async () => {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    const user: User = result.user;
    const userId = user.uid;
    if (userId) {
      const saveUser = doc(db, "users", userId);
      await setDoc(saveUser, {
        uid: userId,
        email: user.email,
        displayName: user.displayName,
      });
      localStorage.setItem("ClassHub_LUD", userId);
    }

    return userId;
  } catch (error) {
    return alert("로그인 과정에서 오류가 발생하였습니다.");
  }
};
