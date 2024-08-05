import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";

export interface FbUserType {
  ClassHubId: string;
  displayName: string;
  email: string;
  uid: string;
}

export const LoginDataState = atom({
  key: "LoginDataState",
  default: false,
});

export const LoginLoadingState = atom({
  key: "LoginLoadingState",
  default: false,
});

export const FbUserData = atom<FbUserType | boolean>({
  key: "FbUserData",
  default: false,
});
