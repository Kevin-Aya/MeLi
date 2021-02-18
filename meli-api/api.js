import constants from "./../constants";

export const getItems = async (searchText) => {
  try {
    let res = await fetch(
        `${constants.URL_MELI_API}/sites/MLA/search?q=${searchText}`,
      ),
      data = await res.json();

    if (data?.error) {
      throw { error: item.error, message: error.message, status: item.status };
    }
    let items = data?.results.slice(0, 4);
    const schema = await schemaItems(items);

    return schema;
  } catch (error) {
    return error;
  }
};

export const getItemById = async (id) => {
  try {
    let [item, description] = await Promise.all([
      fetch(`${constants.URL_MELI_API}/items/${id}`).then((res) => res.json()),
      fetch(`${constants.URL_MELI_API}/items/${id}/description`).then((res) =>
        res.json(),
      ),
    ]);

    if (item?.error) {
      throw { error: item.error, message: error.message, status: item.status };
    }

    let schema = schemaDetailItem(item, description);

    return schema;
  } catch (error) {
    return error;
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
      prices,
      condition,
      thumbnail,
      shipping: { free_shipping },
      address: { state_name },
    }) => {
      let { amount, currency_id } = prices?.prices.shift();
      // .Webp format has the bes resolution
      thumbnail = thumbnail
        .substr(thumbnail.lastIndexOf("/"))
        .replace("I.jpg", "V.webp");
      return {
        id,
        title,
        price: {
          currency: currency_id,
          amount: transformNumberToCurrency(amount),
          decimals: "Number",
        },
        picture: thumbnail,
        condition,
        free_shipping,
        state_name,
      };
    },
  );

  return {
    author: {
      name: "John", //🤔 Param Not Found
      lastname: "Doe", //🤔 Param Not Found
    },
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
  let { plain_text } = description;

  //Get first pic
  let pictureTransformed = pictures.length && pictures.shift()?.url;
  // .Webp format has the best resolution
  pictureTransformed = pictureTransformed
    .substr(pictureTransformed.lastIndexOf("/"))
    .replace(".jpg", ".webp");

  return {
    author: {
      name: "String", //🤔 Param Not Found
      lastname: "String", //🤔 Param Not Found
    },
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
      description: plain_text,
    },
  };
};
