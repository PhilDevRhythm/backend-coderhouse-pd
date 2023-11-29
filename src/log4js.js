import log4js from "log4js";

export const loggerStart = () => {
  log4js.configure({
    appenders: {
      fileAppender: { type: "file", filename: "./logs/logger.log" },
      console: { type: "console" },
    },
    categories: {
      default: { appenders: ["fileAppender", "console"], level: "trace" },
      dev: { appenders: ["fileAppender"], level: "warn" },
      console: { appenders: ["console"], level: "fatal" },
    },
  });

  const logger = log4js.getLogger("default");

  logger.trace("Log Nivel 1");
  logger.debug("Error Debug Nivel 2");
  logger.info("Error Info Nivel 3");
  logger.warn("Error Alerta Nivel 4");
  logger.error("Error grave Nivel 5");
  logger.fatal("Error Fatal Nivel 6");
};
