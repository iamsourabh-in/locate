import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger.json')

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
