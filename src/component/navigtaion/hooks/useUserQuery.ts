import { useQuery } from "@tanstack/react-query";
import { fetchUserData, userType } from "hooks/fetchUserData";

export function useUserQuery(userCookie: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["UserData"],
    queryFn: () => fetchUserData(userCookie),
  });

  return {
    userData: data,
    userIsLoading: isLoading,
    userIsError: isError,
    userError: error,
  };
}
