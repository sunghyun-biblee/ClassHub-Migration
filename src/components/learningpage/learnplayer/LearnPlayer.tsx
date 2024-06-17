import React from "react";
import { LearnVideo } from "./LearnVideo";
import { LearnVideoList } from "./LearnVideoList";

export const LearnPlayer = () => {
  return (
    <div className="lg:pt-[90px] md:pt-[90px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1500px] my-0 mx-auto h-[100%] bg-[#2C3539] flex justify-center items-center pb-[40px] lg:h-[100vh] lg:pb-0">
      <div className="w-[100%]">
        <header>안녕하세요</header>
        <section className="lg:grid lg:grid-cols-[4fr,1fr] w-[100%] mysm:flex mysm:flex-col gap-1 relative">
          <LearnVideo></LearnVideo>
          <LearnVideoList></LearnVideoList>
        </section>
      </div>
    </div>
  );
};

// 다크 그레이 (Dark Gray): 완전한 검은색보다 밝아서 눈에 덜 피로합니다.
// HEX: #2E2E2E

// 건메탈 (Gunmetal): 어두운 회색 계열로 눈에 덜 피로감을 줍니다.
// HEX: #2C3539

// 차콜 그레이 (Charcoal Gray): 검은색과 회색의 중간 정도로 눈에 편안합니다.
// HEX: #36454F

// 에보니 (Ebony): 약간의 브라운 톤이 섞여 있어 눈에 부드럽습니다.
// HEX: #555D50
