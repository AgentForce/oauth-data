
import * as ORM from "sequelize";
import { Sequelize, LoggingOptions } from "sequelize";
import * as dotenv from "dotenv";
process.env.NODE_ENV = "product";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

const dbUrl: string = process.env.PG_URI;
// const dbUrl = "postgres://oauth2:oauth2MNL@13.250.129.169:5432/oauth2";
console.log("Load DB ===");
const options: LoggingOptions = { benchmark: true, logging: console.log };
export const sequelize: Sequelize = new ORM(dbUrl, options);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

