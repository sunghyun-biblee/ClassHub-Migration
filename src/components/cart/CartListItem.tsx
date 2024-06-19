import { CartItemType } from "hooks/CartProvider";
import React from "react";
import exThumnail from "assets/img/preview.jpg";
import { renderCategoryText } from "./CartList";
interface ICartListItem {
  item: CartItemType;
  selectItem: CartItemType[];
  handleToggleCheckbox: (item: CartItemType) => void;
  handleDeleteItem: (cartId: number) => void;
}
export const CartListItem = ({
  item,
  selectItem,
  handleToggleCheckbox,
  handleDeleteItem,
}: ICartListItem) => {
  return (
    <li
      className="flex flex-col  items-start mb-10 md:p-0 md:mx-1 border-2 rounded-md shadow-[0px_1px_1px_rgba(149,157,165,0.3)]"
      key={item.cartId + item.userId}
    >
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
            <li className="text-[#959595] font-semibold py-1 flex justify-between">
              <span>주문번호 &nbsp;{item.cartId}</span>
              <button
                className="text-red-700/70 font-semibold"
                onClick={() => handleDeleteItem(item.cartId)}
              >
                삭제
              </button>
            </li>
            <li className="font-semibold py-1">
              강의명:&nbsp;{item.classResponseDTO.className}
            </li>
            <li className="text-[#959595] font-semibold py-1">
              {renderCategoryText(item.classResponseDTO.categoryId)}
            </li>
          </ul>
          <ul
            className=" border-l-[1px] py-1 px-1 flex flex-col justify-center items-center 

md:w-[7.5rem]
mysm:w-[6.9rem]
"
          >
            <li>
              <span className="font-semibold text-[#858585]">강의 가격</span>
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
  );
};
