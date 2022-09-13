import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetWords = (id) => {
   const { data, error } = useSWR(`/category/${id}/words`, fetcher, { errorRetryInterval: 5000, });
   return {
      words: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
