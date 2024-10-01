import { useLoaderData } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getUserOptions } from "@/features/dashboard/apis/get-user";
import { User } from "@/types/api";

export const dashboardLoader = (queryClient: QueryClient) => async () => {
  const query = getUserOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const DashboardRoute = () => {
  const user = useLoaderData() as AxiosResponse<User>;

  return (
    <div>
      <h1>Dashboard Page</h1>

      <div>
        <div>ID: {user.data.id}</div>
        <div>Email: {user.data.email}</div>
        <div>CreatedAt: {user.data.createdAt}</div>
      </div>
    </div>
  );
};
