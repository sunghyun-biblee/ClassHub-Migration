const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.devproject.store",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      secure: false,
    })
  );
};
