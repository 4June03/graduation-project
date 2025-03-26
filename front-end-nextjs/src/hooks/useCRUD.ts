import React from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosRequestConfig } from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export type ResponseData<T> = {
  data: T;
  message: string;
  statusCode: number;
};

interface mutationInputs {
  url: string;
  data: any;
  config?: AxiosRequestConfig;
}

export const useFetchData = <DataResponse>(
  queryKey: string[],
  url: string,
  options: Omit<UseQueryOptions<DataResponse>, "queryKey" | "queryFn"> = {},
  config?: AxiosRequestConfig
) => {
  return useQuery<DataResponse>({
    queryKey,
    queryFn: async () => {
      const res = await axiosInstance.get<DataResponse>(url, config);
      return res.data;
    },
    ...options,
  });
};

export const useDataMutation = <TResponse>(queryKey: string[]) => {
  const queryClient = useQueryClient();

  const useCreate = useMutation<TResponse, Error, mutationInputs>({
    mutationFn: async ({ url, data, config }: mutationInputs) => {
      const res = await axiosInstance.post(url, data, config);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.log("Lỗi create, " + error.message);
    },
  });

  const useUpdate = useMutation<TResponse, Error, mutationInputs>({
    mutationFn: async ({ url, data, config }: mutationInputs) => {
      const res = await axiosInstance.put(url, data, config);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.log("Lỗi update, " + error.message);
    },
  });

  const usePartialUpdate = useMutation<TResponse, Error, mutationInputs>({
    mutationFn: async ({ url, data, config }: mutationInputs) => {
      const res = await axiosInstance.patch(url, data, config);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.log("Lỗi update, " + error.message);
    },
  });

  const useDelete = useMutation<TResponse, Error, Omit<mutationInputs, "data">>(
    {
      mutationFn: async ({ url, config }: Omit<mutationInputs, "data">) => {
        const res = await axiosInstance.delete(url, config);
        return res.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey });
      },
    }
  );

  return {
    useCreate,
    useDelete,
    useUpdate,
  };
};
