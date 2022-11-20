// import { logger } from './utils/logger';
import { PORT } from './config/preload';
import { createServer } from './config/server';

const app = createServer();

app.listen(PORT || 3001);
