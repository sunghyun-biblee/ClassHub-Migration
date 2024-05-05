import React from "react";
import { PopularClass } from "./PopularClass";
import { NewClass } from "./NewClass";

export interface classProp {
  classList: {
    img: string;
    title: string;
    name: string;
    price: string;
    score: string;
    id: number;
    overview: string;
  }[];
}

export const PreviewClass = ({ classList }: classProp) => {
  return (
    <div>
      <PopularClass classList={classList}></PopularClass>
      <NewClass classList={classList}></NewClass>
    </div>
  );
};
