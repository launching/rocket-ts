const devServerPort = 9527; // TODO: get this variable from setting.ts
const mockServerPort = 9528;

module.exports = {
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${mockServerPort}/mock-api/v1`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
};
