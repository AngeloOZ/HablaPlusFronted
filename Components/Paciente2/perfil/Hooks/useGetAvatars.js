import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetAvatars = () => {
   const { data, error } = useSWR("/avatar/user", fetcher);
   return {
      avatars: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
