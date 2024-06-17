import React from "react";

import logo from "assets/img/Logo.png";

export const Footer = () => {
  return (
    <footer
      className="bg-[#36454F] text-[#efefef] w-[100vw] text-sm 

      "
    >
      <div className={`p-3 mysm:pb-[40px] lg:pb-0 `}>
        <ul className="lg:max-w-[1200px] mx-auto my-0 flex justify-between ">
          <li>
            <ul className="flex items-center ">
              <li>
                <img src={logo} alt="footerLogo" className="w-14" />
              </li>
              <li className="px-[6px] border-r-2 border-gray-400">
                개인정보처리 방침
              </li>
              <li className="px-[6px] border-r-2 border-gray-400">이용약관</li>
              <li className="px-[6px] border-r-2 border-gray-400">채용정보</li>
            </ul>
            <ul className="flex flex-col">
              <li>
                <span className="px-1 border-r-2 border-gray-400">
                  클래스허브
                </span>
                <span className="px-1 border-r-2 border-gray-400">
                  대표자:OOO
                </span>
                <span className="px-1 border-r-2 border-gray-400">
                  주소: 00시00구00동 0층
                </span>
                <span className="px-1 border-r-2 border-gray-400">
                  대표 전화번호:000-0000-0000
                </span>
              </li>
              <li>
                <span className="px-1 border-r-2 border-gray-400">
                  사업자 등록번호:000
                </span>
                <span className="px-1 border-r-2 border-gray-400">
                  통신판매업 신고:000동 -0000호
                </span>
                <span className="px-1 border-r-2 border-gray-400">
                  대표 이메일:classhub@*****.***
                </span>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h1>고객센터</h1>
                <ul>
                  <li>전화번호 : 000-0000-0000</li>
                  <li>이메일 : helpClassHub@****.***</li>
                  <li>상담가능시간 : 오전 00시 ~ 오후 00시</li>
                  <li>점심시간 : 오전 00시 ~ 오후 00시</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col justify-between h-[100%]">
              <li>카카오톡</li>
              <li>깃허브</li>
              <li>인스타그램</li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

// footer에 포함될 내용
// 고객센터 정보
// 전화번호
// 이메일
// 카카오톡 ID
// 상담가능시간 오전 00시 부터 오후 00시

// 회사정보
// 상호 클래스허브
// 대표 OOO
// 주소 00시00구00동 0층
// 개인정보관리 책임자  000
// 사업자 등록번호 000
// 통신판매업 신고 000동 -0000호

// 이용가능시간 오전 00시 부터 오후 00시
// 점심시간 오전 00시 부터 오후 00시
// 고객센터 오전 00시 부터 오후 00시
