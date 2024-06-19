import React, { createContext, useContext, useEffect, useState } from "react";

import { CartHeader } from "./CartHeader";
import { CartProvider } from "hooks/CartProvider";
import { Outlet, useLocation } from "react-router-dom";

interface PathMap {
  [key: string]: string;
}
export const Cart = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState("cart");
  // export const exam=createContext("_")
  useEffect(() => {
    console.log(pathname);
    const pathMap: PathMap = {
      "/cart": "cart",
      "/cart/order": "order",
      "/cart/order/paymented": "paymented",
    };

    // Check if the pathname exists in the pathMap
    if (pathMap[pathname]) {
      setProgress(pathMap[pathname]);
    } else {
      // Handle unexpected paths or default case
      setProgress("cart");
    }
  }, [pathname]);
  console.log(progress);
  return (
    <CartProvider>
      <div className="lg:pt-[90px] md:pt-[90px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1500px] my-0 md:mx-auto  mysm:mx-1 min-h-[100vh] flex flex-col  lg:h-[100vh] lg:pb-0">
        <CartHeader progress={progress} />
        <Outlet></Outlet>
      </div>
    </CartProvider>
  );
};
