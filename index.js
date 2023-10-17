import express from 'express'
import routerApi from "./routes/index.js";
import { logErrors, errorHandler, boomErrorHandler,ormErrorHandler } from './middlewares/error.handler.js'

const app = express();
const port = 3030;

app.use(express.json());

import './utils/auth/index.js';

routerApi(app)


app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => {
    console.log('Mi port ' + port)
})