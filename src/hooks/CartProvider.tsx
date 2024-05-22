// 인터페이스 정의

import { ReactNode, createContext, useContext, useState } from "react";

export interface CartItemType {
  cartId: number;
  userId: number;
  classId: number;
  regdate: string;
  orderStatus: string;
  classResponseDTO: {
    classId: number;
    instructorsId: number;
    categoryId: number;
    className: string;
    description: string;
    summary: string;
    price: number;
    thumnail: string;
    totalVideoLength: number;
    regdate: string;
    editDate: string;
  };
}

interface CartContext {
  cartList: CartItemType[];
  orderList: CartItemType[];
  addItemOrderList: (item: CartItemType) => void;
}

// 기본 상태값
const initialState: CartContext = {
  cartList: [],
  orderList: [],
  addItemOrderList: () => {},
};

const CartContext = createContext<CartContext>(initialState);

type CartContextType = {
  children: ReactNode;
};
export const CartProvider = ({ children }: CartContextType) => {
  const [cartList, setCartList] = useState<CartItemType[]>([]);
  const [orderList, setOrderList] = useState<CartItemType[]>([]);
  // 로그인 함수
  const addItemOrderList = (item: CartItemType) => {
    setOrderList((prevOrderList) => [...prevOrderList, item]);
  };
  return (
    <CartContext.Provider value={{ cartList, orderList, addItemOrderList }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
