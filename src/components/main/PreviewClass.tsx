import React from "react";
import { PopularClass } from "./PopularClass";
import { NewClass } from "./NewClass";
import { IClassType } from "components/class/ShowClass";

type ClassData = {
  contents: IClassType[];
  currentPageNum: number;
  leftEndNum: number;
  rightEndNum: number;
  totalNum: number;
};
export interface classProp {
  data: ClassData;
  mainClassIsLoading: boolean;
  mainClassIsError: boolean;
  mainClassError: Error | null;
}

export const PreviewClass = ({
  data,
  mainClassIsLoading,
  mainClassIsError,
  mainClassError,
}: classProp) => {
  if (mainClassIsLoading) {
    return <div>로딩중</div>;
  }
  if (mainClassIsError) {
    return <span>{mainClassError?.message}</span>;
  }
  console.log(data);
  return (
    <div>
      <PopularClass
        data={data}
        mainClassIsLoading={mainClassIsLoading}
        mainClassIsError={mainClassIsError}
        mainClassError={mainClassError}
      ></PopularClass>
      <NewClass
        data={data}
        mainClassIsLoading={mainClassIsLoading}
        mainClassIsError={mainClassIsError}
        mainClassError={mainClassError}
      ></NewClass>
    </div>
  );
};
