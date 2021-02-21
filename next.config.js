const path = require("path");

module.exports = {
  images: {
    loader: "imgix",
    domains: ["http://http2.mlstatic.com", "http://mla-s1-p.mlstatic.com/"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
