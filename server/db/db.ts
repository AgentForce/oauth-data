
import * as ORM from "sequelize";
import { Sequelize, LoggingOptions } from "sequelize";
import * as dotenv from "dotenv";
process.env.NODE_ENV = "product";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

const dbUrl: string = process.env.PG_URI;
const options: LoggingOptions = { benchmark: true, logging: console.log };
export const sequelize: Sequelize = new ORM(dbUrl, options);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

