const { createLogger, format, transports } = require("winston");

const productLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/products.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "logs/products-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const authLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/auth.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "logs/auth-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "logs/auth-warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { productLogger, authLogger };
