export default {
  TRANSALATE: {
    CONDICION: {new: "Nuevo", used: "Usado"},
  },
  API_CONSTANTS: {
    URL_MELI_API: "https://api.mercadolibre.com",
    AUTHOR: {
      author: {
        name: "Kevin",
        lastname: "Aya",
      },
    },
  },
  SERVER_MODE: process.env.NODE_ENV === "development" ? "http" : "https",
};
