import React from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";
import { NaviMobileBottom } from "./NaviMobileBottom";

export const Nav = () => {
  return (
    <>
      <NaviPC></NaviPC>
      <NaviMobile></NaviMobile>
    </>
  );
};
