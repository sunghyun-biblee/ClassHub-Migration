import { atom } from "recoil";

export const LoginDataState = atom({
  key: "LoginDataState",
  default: false,
});

export const LoginLoadingState = atom({
  key: "LoginLoadingState",
  default: false,
});
