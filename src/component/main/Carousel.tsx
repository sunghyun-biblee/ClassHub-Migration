import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import leftArrow from "../../assets/img/carousel/leftArrow.svg";
import rightArrow from "../../assets/img/carousel/rigthArrow.svg";

interface Icarousel {
  img: string;
}

interface CarouselProps {
  carouselList: { img: string }[];
}

export const Carousel = ({ carouselList }: CarouselProps) => {
  const [currentList, setCurrentList] = useState<Icarousel[]>();
  const [currSlide, setCurrSlide] = useState(1);
  const showRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showRef.current !== null) {
      showRef.current.style.transform = `translateX(-${currSlide}00%)`;
    }
  }, [currSlide]);

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrentList(newList);
    }
  }, [carouselList]);

  const prevClick = () => {
    if (currSlide === 1 && currentList) {
      setTimeout(() => {
        if (showRef.current !== null && currentList) {
          showRef.current.style.transition = `none`;
          showRef.current.style.transform = `translateX(-${
            currentList?.length - 1
          }00%)`;
        }
        setCurrSlide(currentList?.length - 2);
      }, 500);
    }

    if (showRef.current !== null) {
      showRef.current.style.transition = `transform 0.6s`;
      showRef.current.style.transform = `translateX(-${currSlide}00%)`;
    }
    setCurrSlide((prev) => prev - 1);
  };

  const nextClick = () => {
    if (
      showRef.current &&
      currentList &&
      currSlide === currentList?.length - 2
    ) {
      showRef.current.style.transition = `transform 0.5s`;
      setTimeout(() => {
        if (showRef.current !== null) {
          showRef.current.style.transition = `none`;
          showRef.current.style.transform = `translateX(-100%)`;
        }
        setCurrSlide(1);
      }, 500);
    } else {
      if (showRef.current !== null) {
        showRef.current.style.transition = `transform 0.5s`;
        showRef.current.style.transform = `translateX(-${currSlide}00%)`;
      }
    }

    setCurrSlide((prev) => prev + 1);
  };

  const renderText = () => {
    const lastpage = currentList && currentList?.length - 2;
    let currentpage = currSlide;
    if (currentpage === 4) {
      return <p>1/{lastpage}</p>;
    }
    if (currentpage === 0) {
      return <p>3/{lastpage}</p>;
    }
    return (
      <>
        <span className="text-zinc-600">{currentpage}</span>/
        <span className="text-zinc-600">{lastpage}</span>
      </>
    );
  };

  return (
    <div className="flex items-center flex-col mt-1 relative ">
      <div
        className={`flex overflow-hidden max-w-[100vw] lg:h-[300px] md:h-[250px] mysm:h-[180px]`}
      >
        <Show
          offset={currSlide}
          ref={showRef}
          className={`min-w-[100%]  flex items-center `}
        >
          {currentList?.map((item, index) => {
            return (
              <img
                key={"carousel" + index}
                src={item.img}
                alt="carousel_IMG"
                className="object-cover  lg:mt-[40px] md:mt-[40px] mysm:mt-[80px]"
              />
            );
          })}
        </Show>
      </div>
      <div className="flex w-24 justify-between items-center border-solid border-2 bottom-1 right-1 absolute border-gray-300 rounded-xl bg-zinc-300/75 hover:border-gray-400 transition-all">
        <Button onClick={prevClick}>
          <img src={leftArrow} alt="leftArrow" className="object-cover" />
        </Button>
        <p className="font-semibold lg:text-xl md:text-base mysm:text-sm ">
          {renderText()}{" "}
        </p>
        <Button onClick={nextClick}>
          <img src={rightArrow} alt="rightArrow" className="object-cover" />
        </Button>
      </div>
    </div>
  );
};

const Show = styled.div<{ offset?: number }>`
  transition: transform 1s;
  transform: ${(props) =>
    props.offset ? `translateX(-${props.offset * 100}%)` : "translateX(0)"};
`;

const Button = styled.button`
  width: 28px;
  height: auto;
  border-radius: 10px;
`;
