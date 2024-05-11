import React from "react";
import { ILoginProps } from "./LoginPage";

export const SignUp = ({ setPage }: ILoginProps) => {
  return (
    <div>
      <button onClick={() => setPage(0)}>처음으로</button>
      <button onClick={() => setPage(1)}>로그인</button>
    </div>
  );
};
