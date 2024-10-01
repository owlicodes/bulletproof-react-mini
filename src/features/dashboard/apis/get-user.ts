import { queryOptions } from "@tanstack/react-query";

import { User } from "@/types/api";
import { api } from "@/lib/api-client";

export const getUser = (): Promise<User> => {
  return api.get("/v1/users/me");
};

export const getUserOptions = () => {
  return queryOptions({
    queryKey: ["loggedInUser"],
    queryFn: getUser,
  });
};
