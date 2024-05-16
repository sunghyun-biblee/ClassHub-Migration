import React from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";

export const Nav = () => {
  return (
    <>
      <NaviPC></NaviPC>
      <NaviMobile></NaviMobile>
    </>
  );
};
