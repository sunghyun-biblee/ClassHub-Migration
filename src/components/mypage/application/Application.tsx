import React, { useState } from "react";
import img1 from "assets/img/carousel/carousel_one.jpg";
import img2 from "assets/img/carousel/carousel_two.jpg";
import img3 from "assets/img/carousel/carousel_three.jpg";
import { ApplicationNav } from "./ApplicationNav";
import { ApplicationFilter } from "./ApplicationFilter";
import { ShowList } from "./ShowList";
export const Application = () => {
  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
    flex flex-col
    md:mt-2
    "
    >
      <section className="md:p-5 mysm:px-2 mysm:py-5">
        <header className="flex justify-between items-center">
          <h1 className="md:text-xl font-semibold mysm:text-xl">구매내역</h1>
          {/* <ApplicationFilter setFilter={setFilter} /> */}
        </header>
        <article>
          <ApplicationNav />
          <ShowList />
        </article>
      </section>
    </div>
  );
};
