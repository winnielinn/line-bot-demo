import log4js from 'log4js';

const configure = {
  appenders: {
    info: { type: 'console' },
  },
  categories: {
    default: { appenders: ['info'], level: 'debug' },
  },
};

export const Logger = log4js.configure(configure);
