import { AxiosError } from "axios";
import { useState, useTransition } from "react";
interface UseQueryProps<T, Q> {
  query: (queryData: Q) => Promise<T | null>;
}

interface UseQueryReturn<T, Q> {
  data: T | null;
  onQuery: (queryData: Q) => Promise<T | null>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
}

export const useCustomQuery = <T, Q>({
  query,
}: UseQueryProps<T, Q>): UseQueryReturn<T, Q> => {
  const [data, setData] = useState<T | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const onQuery = async (queryData: Q): Promise<T | null> => {
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const result = await query(queryData);
      setIsLoading(false);
      setIsSuccess(true);
      setData(result);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) setError(error.message);
      return null;
    }
  };
  return { data, isLoading, isSuccess, error, onQuery };
};
