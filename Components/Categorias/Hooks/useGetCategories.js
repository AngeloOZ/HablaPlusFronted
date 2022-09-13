import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetCategories = () => {
   const { data, error } = useSWR("/category", fetcher);
   return {
      categories: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
