const path = require("path");

module.exports = {
  images: {
    loader: "imgix",
    domains: ["https://http2.mlstatic.com", "https://mla-s1-p.mlstatic.com/"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
