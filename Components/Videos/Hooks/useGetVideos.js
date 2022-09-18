import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetVideos = () => {
   const { data, error } = useSWR("/video", fetcher);
   return {
      videos: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
