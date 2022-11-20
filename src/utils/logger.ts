import log4js from 'log4js';
import morgan from 'morgan';
import { LOG_LEVEL } from '../config/preload';

export const logger = log4js.getLogger();
export const loggerMiddleware = morgan('combined', {
	stream: {
		write(str) {
			logger.info(str);
		},
	},
});

logger.level = LOG_LEVEL as string;
