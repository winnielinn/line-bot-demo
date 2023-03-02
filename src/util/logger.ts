import log4js from 'log4js';
import * as config from '../config/log4js.config.json';

export const Logger = log4js.configure(config);

