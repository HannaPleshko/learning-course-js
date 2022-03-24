import * as appRoot from 'app-root-path';
import * as winston from 'winston';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.simple()
    ),
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger: winston.Logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
const myStream = {
  write: (message: string) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export { logger };
