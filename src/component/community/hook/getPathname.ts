import { useState } from "react";
import { useLocation } from "react-router-dom";

export function useGetpathname() {
  const { pathname } = useLocation();
  const data = pathname.split("/")[2];
  return data;
}
