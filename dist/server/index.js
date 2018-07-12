"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("abc");
var bodyParser = require("body-parser");
var config_1 = require("./config/config");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
process.env.NODE_ENV = "product";
var bearerToken = require('express-bearer-token');
var errorHandler_1 = require("./handlers/errorHandler");
var routes_1 = require("./routes");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.product" });
var Server = /** @class */ (function () {
    function Server(app) {
        this.config(app);
        var routes = new routes_1.default(app);
    }
    Server.prototype.config = function (app) {
        // Connect to MongoDB
        var mongoUrl = process.env.MONGOLAB_URI;
        mongoose.Promise = bluebird;
        mongoose.connect(mongoUrl, {}).then(function () {
            console.log("connect DB");
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        }).catch(function (err) {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });
        config_1.AppConfig();
        var d = new Date();
        var date = [
            d.getFullYear(),
            ('0' + (d.getMonth() + 1)).slice(-2),
            ('0' + d.getDate()).slice(-2)
        ].join('-');
        // const accessLogStream: WriteStream = fs.createWriteStream(path.join(__dirname, "./logs/" + date + "-access.log"), { flags: "a" });
        // app.use(morgan("combined", { stream: accessLogStream }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(bearerToken());
        app.use(errorHandler_1.unCoughtErrorHandler);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=index.js.map