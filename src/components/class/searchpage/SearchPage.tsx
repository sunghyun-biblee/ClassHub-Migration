import React from "react";
import { ClassContainer } from "../Class";
import { ClassCategory } from "../ClassCategory";
import { ClassSearchBar } from "../ClassSearchBar";
import { ShowClass } from "../ShowClass";
import { SearchClass } from "./SearchClass";
import { SearchPageCategory } from "./SearchPageCategory";

export const SearchPage = () => {
  return (
    <ClassContainer
      className="lg:pt-[100px] md:pt-[100px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px]
 lg:grid grid-cols-[1fr,4fr] md:block mysm:block "
    >
      <SearchPageCategory></SearchPageCategory>
      <section className="flex flex-col px-5 ">
        <ClassSearchBar></ClassSearchBar>
        <SearchClass></SearchClass>
      </section>
    </ClassContainer>
  );
};
