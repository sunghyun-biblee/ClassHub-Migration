import React from "react";
import { PopularClass } from "./PopularClass";
import { NewClass } from "./NewClass";
import { IClassType } from "component/class/ShowClass";

export interface classProp {
  data: IClassType[];
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
