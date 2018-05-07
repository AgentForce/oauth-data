import * as express from "express";
import { Application } from "express";
import { sequelize } from "./server/db/db";
import * as nconf from "nconf";
import Server from "./server/index";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

const app: Application = express();
const server: Server = new Server(app);
const port: number = process.env.PORT;//nconf.get("http:port");
// const port = 5200;
// console.log(process.env.PORT);
app.listen(port, "0.0.0.0", function (err: any) {
    if (err) return err;
    console.info(`Server running on : http://localhost:${port}`);
});
