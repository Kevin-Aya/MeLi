import constants from "./../constants";
import axios from "axios";

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

export const getItemById = async (id) => {
  try {
    let [item, description] = await Promise.all([
      axios
        .get(`${constants.API_CONSTANTS.URL_MELI_API}/items/${id}`)
        .then(({ data }) => data),
      axios
        .get(`${constants.API_CONSTANTS.URL_MELI_API}/items/${id}/description`)
        .then(({ data }) => data),
    ]);

    let schema = schemaDetailItem(item, description);

    return schema;
  } catch (error) {
    return {
      error: error.response.data || "Internal Server Error",
      message: error.message || "Internal Server Error",
      status: error.response.status || 500,
    };
  }
};

//Transformers
const transformNumberToCurrency = (num) => {
  //Number to Currency | expected format: ["$ x.xxx.xxx","$ xx.xxx","$ xxxx"]
  let number = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(num);
  //  With this condition will fix thousand numbers decimals
  let thousandFormatNumbers =
    number.length == 6 && `${number.slice(0, 3)}.${number.slice(3)}`;

  return thousandFormatNumbers || number;
};

//helpers
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
      thumbnail = thumbnail.replace("http", "https").replace("I.jpg", "V.webp");
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
    categories: ["", "", ""], //🤔 Param disordered or confused
    items,
  };
};

const schemaDetailItem = (item, description) => {
  let {
    id,
    title,
    price,
    currency_id,
    pictures,
    condition,
    sold_quantity,
    shipping: { free_shipping },
  } = item;
  let { plain_text, error } = description;

  //Get first pic
  let pictureTransformed = pictures.length && pictures.shift()?.url;
  // .Webp format has the best resolution
  pictureTransformed = pictureTransformed.replace(".jpg", ".webp");

  return {
    ...constants.API_CONSTANTS.AUTHOR,
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: transformNumberToCurrency(price),
        decimals: "Number", //🤔 Param Not Found
      },
      picture: pictureTransformed,
      condition: condition,
      free_shipping,
      sold_quantity,
      description: error
        ? "No hay descripción del producto"
        : plain_text.replace(/\r?\n/g, "<br>"),
    },
  };
};
