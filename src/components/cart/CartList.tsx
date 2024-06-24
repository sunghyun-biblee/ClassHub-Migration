import { CartItemType } from "hooks/CartProvider";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/AuthProvider";
import { getCartItemList } from "./hooks/getCartItemList";

import { addOrder } from "./hooks/addOrder";
import { cartClear, deleteCartItem } from "./hooks/deleteCartItem";
import { deleteOrder } from "./hooks/deleteOrder";
import { CartListItem } from "./CartListItem";
import styled from "styled-components";
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
    if (data.length === 0) {
      alert("장바구니에 추가된 강의가 없습니다");
      return;
    }
    if (window.confirm("장바구니를 비우시겠습니까?")) {
      CartClearMutation.mutate(userid);
    } else {
      return;
    }
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

  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    console.log(error.message);
    return null;
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
        {data === null || data === undefined || data.length === 0 ? (
          <li className="flex justify-center items-center min-h-[300px]">
            <h1 className="lg:text-4xl md:text-3xl mysm:text-[1.35rem] [text-shadow:_2px_2px_2px_#d5d5d5] text-gray-500 font-semibold ">
              장바구니에 상품이 존재하지 않습니다
            </h1>
          </li>
        ) : (
          <Ul className="lg:w-[65%] md:w-[70%] md:h-[70vh] mysm:h-[50vh] border-t-[1px] pt-2 overflow-x-hidden overflow-y-scroll">
            {data &&
              data.map((item: CartItemType) => (
                <CartListItem
                  item={item}
                  selectItem={selectItem}
                  handleToggleCheckbox={handleToggleCheckbox}
                  handleDeleteItem={handleDeleteItem}
                ></CartListItem>
              ))}
          </Ul>
        )}

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

export const Ul = styled.ul`
  max-height: 500px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: block !important;
    width: 6px;
    height: 1px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #549bff;

    border-radius: 10px;
  }
`;
export const renderCategoryText = (categoryId: number) => {
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
      return "";
  }
};
