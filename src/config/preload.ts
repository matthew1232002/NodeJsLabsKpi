import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const { PORT, HOSTNAME, LOG_LEVEL } = env;
