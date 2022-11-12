import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetUser = (id_rol) => {
    const { data, error } = useSWR(`/rol/${id_rol}/users`, fetcher);
    return {
        users: data?.data,
        isLoading: !error && !data,
        isError: error
    }
}
