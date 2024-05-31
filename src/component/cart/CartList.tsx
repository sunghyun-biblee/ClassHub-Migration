import { CartItemType, useCart } from "hooks/CartProvider";
import React, { useContext, useState } from "react";
import exThumnail from "assets/img/preview.jpg";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/AuthProvider";
import { getCartItemList } from "./hooks/getCartItemList";

import { addOrder } from "./hooks/addOrder";
import { cartClear, deleteCartItem } from "./hooks/deleteCartItem";
import { deleteOrder } from "./hooks/deleteOrder";
export const CartList = () => {
  const queryClient = useQueryClient();
  const { userData, userIsLoading, userIsError, userError } = useAuth();
  const [selectItem, setSelectItem] = useState<CartItemType[]>([]);
  const [selectItemId, setSelectItemId] = useState<number[]>([]);
  const [isAllSelect, setIsAllSelect] = useState(false);
  const nav = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => getCartItemList(userData.userId),
  });
  console.log(data);
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
      deleteOrder(item.classId, userData.userId);
      setSelectItem(selectItem.filter((selectedItem) => selectedItem !== item));
      setSelectItemId(selectItemId.filter((id) => id !== item.classId));
    } else {
      // 체크되지 않은 아이템일 경우 추가

      addOrder([...selectItemId, item.classId], userData.userId);
      setSelectItem([...selectItem, item]);
      setSelectItemId([...selectItemId, item.classId]);
    }
  };
  const selectItemTotalPrice = () => {
    const totalPrice = selectItem.reduce(
      (total, item) => total + item.classResponseDTO.price,
      0
    );
    return totalPrice.toLocaleString();
  };

  const CartClearMutation = useMutation({
    mutationFn: cartClear,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["cartItemList"],
      });
    },
    onMutate: async (cartid) => {
      await queryClient.cancelQueries({
        queryKey: ["cartItemList"],
      });
      const prevData = queryClient.getQueryData(["cartItemList"]);
      queryClient.setQueryData(["cartItemList"], (oldData: CartItemType[]) => {
        if (oldData) {
          const newData: CartItemType[] = [];
          console.log(newData);
          return newData;
        }
        return oldData;
      });
      return { prevData };
    },
    onSuccess: () => {
      setSelectItem([]);
      setSelectItemId([]);
    },
  });
  const EachDeleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["cartItemList"],
      });
    },
    onMutate: async (cartid) => {
      await queryClient.cancelQueries({
        queryKey: ["cartItemList"],
      });
      const prevData = queryClient.getQueryData(["cartItemList"]);
      queryClient.setQueryData(["cartItemList"], (oldData: CartItemType[]) => {
        if (oldData) {
          const newData = oldData.filter((item) => item.cartId !== cartid);
          console.log(newData);
          return newData;
        }
        return oldData;
      });
      return { prevData };
    },
    onSuccess: () => {
      setSelectItem([]);
      setSelectItemId([]);
    },
  });
  if (isError) {
    return <span>{error.message}</span>;
  }
  const allSelect = () => {
    if (!isAllSelect && data) {
      setSelectItem([...data]);
      let classids: number[] = [];
      data.map((item: CartItemType) => {
        classids.push(item.classId);
      });
      addOrder(classids, userData.userId);
      setSelectItemId(classids);
      setIsAllSelect(true);
    } else {
      setSelectItem([]);
      setSelectItemId([]);
      setIsAllSelect(false);
    }
  };
  const handleDeleteItem = (cartid: number) => {
    EachDeleteMutation.mutate(cartid);
  };
  const handleCartClear = (userid: number) => {
    CartClearMutation.mutate(userid);
  };
  const handleOrderClick = () => {
    if (selectItemId.length < 1) {
      alert("선택된 강의가 없습니다");
      return;
    }
    try {
      // addOrder(selectItemId, userData.userId);
      nav("order");
    } catch (error) {
      console.log(error);
      return;
    }
  };
  console.log(selectItemId);
  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  return (
    <div>
      <h1 className="text-center text-3xl md:p-10 mysm:p-7 font-extrabold">
        장바구니
      </h1>

      <div className="lg:px-8 md:px-5 mysm:px-3 pb-2 font-semibold text-gray-500">
        <button onClick={allSelect} className="hover:text-black transition-all">
          전체 선택
        </button>
        <button
          className="px-5  hover:text-black transition-all"
          onClick={() => handleCartClear(userData.userId)}
        >
          전체 삭제
        </button>
      </div>

      <div className="flex md:flex-row mysm:flex-col justify-around">
        <ul className="lg:w-[65%] md:w-[70%] md:h-[70vh] mysm:h-[50vh] border-t-[1px] pt-2 overflow-scroll">
          {isLoading ? (
            <div>
              <h1 className="text-9xl">로딩중</h1>
            </div>
          ) : (
            data &&
            data.map((item: CartItemType) => (
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
                  <div
                    id="lectureInfo"
                    className="flex justify-between w-[100%]"
                  >
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
            ))
          )}
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
              onClick={handleOrderClick}
            >
              주문 하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
