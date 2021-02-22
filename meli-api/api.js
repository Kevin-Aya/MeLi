import constants from "./../constants";
import axios from "axios";

/**
 * @description Servicio que se encarga de obtener la lista de items según el texto de busqueda
 * @param {String} searchText
 */
export const getItems = async (searchText) => {
  try {
    searchText = encodeURI(searchText);
    let { data } = await axios.get(
      `${constants.API_CONSTANTS.URL_MELI_API}/sites/MLA/search?q=${searchText}`,
    );

    let items = data?.results.slice(0, 4);
    const schema = await schemaItems(items);
    return schema;
  } catch (error) {
    return {
      error: error.response.data || "Internal Server Error",
      message: error.message || "Internal Server Error",
      status: error.response.status || 500,
    };
  }
};
/**
 * @description Servicio que se encarga de obtener el item seleccionado
 * @param {String} id
 */
export const getItemById = async (id) => {
  try {
    let item = await axios
      .get(`${constants.API_CONSTANTS.URL_MELI_API}/items/${id}`)
      .then(({ data }) => data);
    let schema = await schemaDetailItem(item);

    return schema;
  } catch (error) {
    return {
      error: error.response.data || "Internal Server Error",
      message: error.message || "Internal Server Error",
      status: error.response.status || 500,
    };
  }
};

/**
 * @description Servicio que se encarga de obtener las categorias a las que pertence el item
 * @param {String} categoryId
 */
const getCategories = async (categoryId) => {
  try {
    let categories = await axios
      .get(`${constants.API_CONSTANTS.URL_MELI_API}/categories/${categoryId}`)
      .then(({ data }) => data);
    return categories?.path_from_root;
  } catch (error) {
    return [];
  }
};

/**
 * @description Servicio que se encarga de obtener la descripcion de un item
 * @param {String} id
 */
const getDescription = async (id) => {
  try {
    let data = await axios
      .get(`${constants.API_CONSTANTS.URL_MELI_API}/items/${id}/description`)
      .then(({ data }) => data);
    return data.plain_text.replace(/\r?\n/g, "<br>");
  } catch (error) {
    return "No hay descripción del producto";
  }
};

//Transformers
/**
 * @description Se encarga de recibir un numero y convertirlo a un formato legible
 * @param {Number} num
 */
const transformNumberToCurrency = (num) => {
  //Number to Currency | expected format: ["$ x.xxx.xxx","$ xx.xxx","$ xxxx"]
  let number = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
  //  With this condition will fix thousand numbers decimals
  let thousandFormatNumbers =
    number.length == 6 && `${number.slice(0, 3)}.${number.slice(3)}`;

  return thousandFormatNumbers || number;
};
/**
 *@description funcion que se encarga de corregir la url
 * para obtener la mejor imagen del servidor
 * @param {String} picture url imagen
 * @param {Boolean} items se encarga de saber de que Schema viene
 */
const transformPicture = (picture, items = false) => {
  picture = picture.replace("http", "https");
  picture = items
    ? picture.replace("I.jpg", "V.webp")
    : picture.replace(".jpg", ".webp");
  return picture;
};

//helpers
/**
 * @description Schema que obtiene y transforma lo necesario para app
 * @param {Array} items
 * @returns {Array} items convertido
 */
let schemaItems = (items) => {
  items = items.map(
    ({
      id,
      title,
      price,
      currency_id: currency,
      prices,
      condition,
      thumbnail,
      shipping: { free_shipping },
      address: { state_name },
    }) => {
      prices = (prices?.prices && prices?.prices.shift()) ?? {
        amount: price,
        currency_id: currency,
      };
      let { amount, currency_id } = prices;
      // .Webp format has the best resolution
      thumbnail = transformPicture(thumbnail, true);
      return {
        id,
        title,
        price: {
          currency: currency_id,
          amount: transformNumberToCurrency(amount),
          decimals: "",
        },
        picture: thumbnail,
        condition,
        free_shipping,
        state_name,
      };
    },
  );

  return {
    ...constants.API_CONSTANTS.AUTHOR,
    items,
  };
};
/**
 * @description Schema que obtiene y transforma lo necesario para app
 * @param {Object} items
 * @returns {Array} item convertido
 */
const schemaDetailItem = async (item) => {
  let {
    id,
    title,
    price,
    currency_id,
    pictures,
    condition,
    sold_quantity,
    shipping: { free_shipping },
    category_id,
  } = item;
  let description = await getDescription(id);

  //Get first pic
  let pictureTransformed = pictures.length && pictures.shift()?.url;
  // .Webp format has the best resolution
  pictureTransformed = transformPicture(pictureTransformed);

  return {
    ...constants.API_CONSTANTS.AUTHOR,
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: transformNumberToCurrency(price),
        decimals: "Number",
      },
      picture: pictureTransformed,
      condition: condition,
      free_shipping,
      sold_quantity,
      description,
      categories: await getCategories(category_id),
    },
  };
};
