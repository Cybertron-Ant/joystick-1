import express from "express";
import middleware from "./middleware/index.js";
var initExpress_default = (onInit = () => {
}, options = {}) => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 2600;
    process.env.PORT = port;
    const app = express();
    const server = app.listen(port);
    const config = joystick?.settings?.config || {};
    middleware(app, port, config?.middleware);
    if (options?.middleware && options?.middleware instanceof Array) {
      options.middleware.forEach((middleware2) => {
        app.use(middleware2);
      });
    }
    const instance = {
      port,
      app,
      server
    };
    if (onInit) {
      onInit(instance);
    }
    return instance;
  } catch (exception) {
    console.warn(exception);
  }
};
export {
  initExpress_default as default
};
