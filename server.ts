process.env.NODE_ENV = "product";
import * as express from "express";
import { Application } from "express";
console.log(process.env);
console.log("------");
import { sequelize } from "./server/db/db";
import * as nconf from "nconf";

import Server from "./server/index";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

const app: Application = express();
const server: Server = new Server(app);
const port: number = process.env.PORT;//nconf.get("http:port");
app.listen(port, "localhost", function (err: any) {
    if (err) return err;
    console.info(`Server running on : http://localhost:${port}`);
});
