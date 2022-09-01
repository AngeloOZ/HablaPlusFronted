import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

/**
* @typedef {Object} ICategory
* @property {Number} [id_category] El Id de la categoria
* @property {String} description El nombre de la categoria
* @property {String} icon Url de la imagen de la categoria
*/

/**
* @typedef {Object} IuseGetCategories
* @property {Array[ICategory] | undefined} categories El Id de la categoria
* @property {Boolean} isLoading El nombre de la categoria
* @property {Boolean} isError Url de la imagen de la categoria
*/

/**
 * Hook que permite realizar una solicitud GET de las categorias
 * @returns {IuseGetCategories}
 */
export const useGetCategories = () => {
   const { data, error } = useSWR("/category", fetcher);
   return {
      categories: data?.data,
      isLoading: !error && !data,
      isError: error
   }
}
