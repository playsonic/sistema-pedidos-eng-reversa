import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { envConfig } from './shared/config/env.js';
import { ordersRouter } from './modules/orders/routes.js';
import { logger } from './shared/utils/logger.js';
import { errorHandlerGlobal } from './shared/middlewares/errorHandler.js';

dotenv.config();

let app = express();
let PORT = envConfig.port; 

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', ordersRouter);

app.use(errorHandlerGlobal);

apapp.listen(PORT, () => {logger.info(`Servidor rodando com sucesso na porta ${PORT}`);});