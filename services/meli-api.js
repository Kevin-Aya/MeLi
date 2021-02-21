import axios from "axios";
import constants from "./../constants";

/**
 * @description Obtener item por id
 * @param {object} req Request
 * @param {string} id id item
 * @returns {object} item obtenido por la api de mercado libre
 */
export async function getItemById(req, id) {
  const API_URL = `${constants.SERVER_MODE}://${req.headers.host}`;
  let props;
  try {
    const item = await axios
      .get(`${API_URL}/api/items/${id}`)
      .then(({data}) => data);
    props = {
      item,
      notFound: !!item?.error,
    };
  } catch (error) {
    props = {
      notFound: true,
    };
  }
  console.log("propssss by id", props);
  return props;
}

/**
 * @description Obtener items por busqueda
 * @param {object} req Request
 * @param {string} search texto a buscar
 * @returns {object} items obtenido por la api de mercado libre
 */
export async function getItems(req, search) {
  const API_URL = `${constants.SERVER_MODE}://${req.headers.host}`;
  let props;
  try {
    if (search && search.length) {
      const {data} = await axios.get(`${API_URL}/api/items?search=${search}`);

      props = {
        data,
        notFound: !data?.items.length,
      };
    } else {
      throw "";
    }
  } catch (error) {
    props = {
      notFound: true,
    };
  }
  console.log("propssss items", props);
  return props;
}
