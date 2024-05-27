import { CartItemType, useCart } from "hooks/CartProvider";
import React, { useContext, useState } from "react";
import exThumnail from "assets/img/preview.jpg";
import { useNavigate } from "react-router-dom";
export const CartList = () => {
  const [selectItem, setSelectItem] = useState<CartItemType[]>([]);
  const nav = useNavigate();
  const { cartList, orderList, addItemOrderList } = useCart();
  // const arr=useContext("")
  const renderCategortText = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return "개발 프로그래밍";

      case 2:
        return "게임 개발";

      case 3:
        return "인공지능";

      case 4:
        return "보안 네크워크";

      default:
        break;
    }
  };
  const handleToggleCheckbox = (item: CartItemType) => {
    if (selectItem.includes(item)) {
      // 이미 체크된 아이템일 경우 제거
      setSelectItem(selectItem.filter((selectedItem) => selectedItem !== item));
    } else {
      // 체크되지 않은 아이템일 경우 추가
      setSelectItem([...selectItem, item]);
    }
  };
  const selectItemTotalPrice = () => {
    const totalPrice = selectItem.reduce(
      (total, item) => total + item.classResponseDTO.price,
      0
    );
    return totalPrice.toLocaleString();
  };
  return (
    <div>
      <h1 className="text-center text-3xl md:p-10 mysm:p-7 font-extrabold">
        장바구니
      </h1>
      <div className="flex md:flex-row mysm:flex-col justify-around">
        <ul className="lg:w-[65%] md:w-[70%] md:h-[70vh] mysm:h-[50vh] border-t-[1px] pt-2 overflow-scroll">
          {examCartList.map((item) => (
            <li className="flex flex-col  items-start mb-10 md:p-0 md:mx-1 border-2 rounded-md shadow-[0px_1px_1px_rgba(149,157,165,0.3)]">
              <div className="flex md:flex-row mysm:flex-col w-[100%] h-[100%] ">
                <div className="lg:w-[100px]  md:w-[70px]  mysm:w-[100%] py-3  md:px-0 mysm:px-3 flex mysm:justify-start md:justify-center items-center bg-[#F8F8F8]">
                  <input
                    type="checkbox"
                    onChange={() => handleToggleCheckbox(item)}
                    checked={selectItem.includes(item)}
                  />
                </div>
                <div id="lectureInfo" className="flex justify-between w-[100%]">
                  <div className="flex items-center justify-center">
                    <img
                      src={exThumnail}
                      alt="lectrueImg"
                      className=" lg:h-[200px] 
                    md:h-[130px]
                    mysm:h-[100px]
                    p-2  rounded-xl"
                    />
                  </div>
                  <ul className="flex flex-col justify-between p-3 w-[50%] ">
                    <li className="text-[#959595] font-semibold py-1">
                      주문번호 &nbsp;{item.cartId}
                    </li>
                    <li className="font-semibold py-1">
                      강의명:&nbsp;{item.classResponseDTO.className}
                    </li>
                    <li className="text-[#959595] font-semibold py-1">
                      {renderCategortText(item.classResponseDTO.categoryId)}
                    </li>
                  </ul>
                  <ul
                    className=" border-l-[1px] py-1 px-1 flex flex-col justify-center items-center 
                  lg:w-[110px]
                  md:w-[100px]
                  mysm:w-[100px]
                  "
                  >
                    <li>
                      <span className="font-semibold text-[#858585]">
                        강의 가격
                      </span>
                    </li>
                    <li className="mt-2">
                      <strong className="min-w-[80px]  md:p-2 mysm:p-0">
                        {item.classResponseDTO.price.toLocaleString()}원
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul
          className="py-2 px-3 md:w-[25%] mysm:w-[100%] h-[100%] border-2 rounded-md 
       shadow-[0px_8px_12px_rgba(149,157,165,0.3)]
        "
        >
          <li className="py-2 flex justify-between font-semibold">
            <span>총 수량</span>
            <span>{selectItem.length} 개</span>
          </li>
          <li className="py-2 flex justify-between font-bold ">
            <span>결제금액</span>
            <span> {selectItemTotalPrice()} 원</span>
          </li>
          <li>
            <button
              className="p-3 text-center w-[100%] border-[1px] rounded-lg
            bg-blue-500/80 text-white font-semibold md:mt-10 mysm:mt-6
            "
              onClick={() => nav("order")}
            >
              주문 하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const examCartList = [
  {
    cartId: 1,
    userId: 6,
    classId: 100,
    regdate: "2024-05-22T13:51:53.379Z",
    orderStatus: "2",
    classResponseDTO: {
      classId: 100,
      instructorsId: 200,
      categoryId: 1,
      className: "react",
      description: "string",
      summary: "string",
      price: 1000,
      thumnail: "string",
      totalVideoLength: 0,
      regdate: "2024-05-22T13:51:53.379Z",
      editDate: "2024-05-22T13:51:53.379Z",
    },
  },
  {
    cartId: 2,
    userId: 6,
    classId: 101,
    regdate: "2024-05-22T13:51:53.379Z",
    orderStatus: "2",
    classResponseDTO: {
      classId: 101,
      instructorsId: 201,
      categoryId: 2,
      className: "redux",
      description: "string",
      summary: "string",
      price: 10000,
      thumnail: "string",
      totalVideoLength: 0,
      regdate: "2024-05-22T13:51:53.379Z",
      editDate: "2024-05-22T13:51:53.379Z",
    },
  },
  {
    cartId: 3,
    userId: 6,
    classId: 102,
    regdate: "2024-05-22T13:51:53.379Z",
    orderStatus: "2",
    classResponseDTO: {
      classId: 102,
      instructorsId: 202,
      categoryId: 3,
      className: "recoil",
      description: "string",
      summary: "string",
      price: 2000,
      thumnail: "string",
      totalVideoLength: 0,
      regdate: "2024-05-22T13:51:53.379Z",
      editDate: "2024-05-22T13:51:53.379Z",
    },
  },
  {
    cartId: 4,
    userId: 6,
    classId: 103,
    regdate: "2024-05-22T13:51:53.379Z",
    orderStatus: "2",
    classResponseDTO: {
      classId: 103,
      instructorsId: 203,
      categoryId: 4,
      className: "react-query",
      description: "string",
      summary: "string",
      price: 3000,
      thumnail: "string",
      totalVideoLength: 0,
      regdate: "2024-05-22T13:51:53.379Z",
      editDate: "2024-05-22T13:51:53.379Z",
    },
  },
  {
    cartId: 5,
    userId: 6,
    classId: 104,
    regdate: "2024-05-22T13:51:53.379Z",
    orderStatus: "2",
    classResponseDTO: {
      classId: 104,
      instructorsId: 204,
      categoryId: 1,
      className: "typeScript",
      description: "string",
      summary: "string",
      price: 4000,
      thumnail: "string",
      totalVideoLength: 0,
      regdate: "2024-05-22T13:51:53.379Z",
      editDate: "2024-05-22T13:51:53.379Z",
    },
  },
];
