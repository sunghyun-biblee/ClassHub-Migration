import { useQuery } from "@tanstack/react-query";
import { fetchUserData, userType } from "hooks/fetchUserData";

export function useUserQuery(userSnsId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["UserData", userSnsId],
    queryFn: () => fetchUserData(userSnsId),
  });

  return {
    userData: data,
    userIsLoading: isLoading,
    userIsError: isError,
    userError: error,
  };
}
