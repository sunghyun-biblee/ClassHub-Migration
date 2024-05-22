import React, { createContext, useContext, useState } from "react";
import { CartList } from "./CartList";
import { CartHeader } from "./CartHeader";
import { CartProvider } from "hooks/CartProvider";
import { Outlet } from "react-router-dom";

export const Cart = () => {
  const [progress, setProgress] = useState("cart");
  // export const exam=createContext("_")
  return (
    <CartProvider>
      <div className="lg:pt-[90px] md:pt-[90px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1500px] my-0 md:mx-auto  mysm:mx-1 min-h-[100vh] flex flex-col  lg:h-[100vh] lg:pb-0">
        <CartHeader progress={progress} setProgress={setProgress} />
        <Outlet></Outlet>
      </div>
    </CartProvider>
  );
};
