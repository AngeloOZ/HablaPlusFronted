import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetSentences = () => {
   const { data, error } = useSWR("/sentences", fetcher);
   return {
      sentences: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
