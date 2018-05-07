console.log("abc");
import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as fs from "fs";
import { WriteStream } from "fs";
import * as path from "path";
import { AppConfig } from "./config/config";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
process.env.NODE_ENV = "product";

const bearerToken = require('express-bearer-token');

import { unCoughtErrorHandler } from "./handlers/errorHandler";
import Routes from "./routes";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.product" });

export default class Server {

    constructor(app: Application) {
        this.config(app);
        var routes: Routes = new Routes(app);
    }
    
    public config(app: Application): void {
        // Connect to MongoDB
        const mongoUrl = process.env.MONGOLAB_URI;
        (<any>mongoose).Promise = bluebird;
        mongoose.connect(mongoUrl, {}).then(
        () => { 
            console.log("connect DB");
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
        ).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
        });
        
        AppConfig();
        var d = new Date();
        const date = [
          d.getFullYear(),
          ('0' + (d.getMonth() + 1)).slice(-2),
          ('0' + d.getDate()).slice(-2)
        ].join('-');    
        const accessLogStream: WriteStream = fs.createWriteStream(path.join(__dirname, "./logs/" + date + "-access.log"), { flags: "a" });
        app.use(morgan("combined", { stream: accessLogStream }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(bearerToken());
        app.use(unCoughtErrorHandler);
    }
}
