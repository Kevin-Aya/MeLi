const path = require("path");

module.exports = {
  images: {
    loader: "imgix",
    path: "http://http2.mlstatic.com",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
