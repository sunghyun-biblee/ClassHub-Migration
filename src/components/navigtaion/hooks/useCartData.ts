import { useQuery } from "@tanstack/react-query";
import { getCartItemList } from "components/cart/hooks/getCartItemList";
import { fetchUserData, userType } from "hooks/fetchUserData";

export function useCartData(userId: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => getCartItemList(userId),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
}
