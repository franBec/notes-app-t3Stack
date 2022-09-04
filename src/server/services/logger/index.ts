import { createLogger, format, transports } from 'winston'

export default createLogger({
  //level: https://github.com/winstonjs/winston#logging-levels
  level: process.env.LOGGER_LEVEL,

  //format: formato que tiene el log
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(
      (info) =>
        `${info.timestamp} - ${info.level.toUpperCase().padEnd(7)}: ${
          info.message
        }`,
    ),
  ),

  //transportes: lugares donde loggear
  transports: [
    //loggear en un archivo
    new transports.File({
      maxsize: 2e7, //20mb
      filename: `logs/log-r2d2-${new Date().toISOString().split('T')[0]}.log`,
    }),

    //loggear en consola
    new transports.Console({}),
  ],
})
