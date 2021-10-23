import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
const cors = require('cors');

const port = process.env.PORT || 3000;
const host = "localhost";

const app = express();
app.use(deserializeUser);
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port as number, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
