import React from "react";
import rightArrow from "../../assets/img/carousel/rigthArrow.svg";

interface commnuProp {
  commnuList: {
    category: string;
    title: string;
    overview: string;
    name: string;
  }[];
}

export const PreviewCommu = ({ commnuList }: commnuProp) => {
  const renderText = (overview: string) => {
    const text = overview;
    let newText;
    if (text.length > 20) {
      newText = text.slice(0, 20) + "...";
      console.log(newText);
      return newText;
    }

    return text;
  };
  return (
    <div className=" pt-10 px-5 lg:max-w-[1200px] md:px-3 mysm:px-2 ">
      <div className="flex justify-between lg:pb-2  mysm:pb-1">
        <h1 className=" font-extrabold ">📋 커뮤니티 </h1>
        <div className="pb-3 flex items-center cursor-pointer">
          <p>더보기</p>
          <img src={rightArrow} alt="" className="w-5 h-auto ml-2" />
        </div>
      </div>
      <section className="grid grid-cols-5 gap-3 pb-5">
        {commnuList.map((item) => (
          <article
            className="flex flex-col "
            key={`${item.title}+${item.name}`}
          >
            <div className="px-[5px]">
              <h1 className="h-auto font-bold text-sm mysm:text-[12px]">
                {item.title}
              </h1>
              <p className="h-20 pt-1  font-medium  md:text-base mysm:text-[11px]  ">
                {renderText(item.overview)}
              </p>
            </div>
            <div className="flex justify-between items-center pl-1 pr-3 mysm:pr-1">
              <h3 className="p-1 md:text-sm mysm:text-[11px] p-[1px]">
                {item.name}
              </h3>
              <h4 className="text-zinc-500 md:text-sm mysm:text-[8px]">
                {item.category}
              </h4>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
