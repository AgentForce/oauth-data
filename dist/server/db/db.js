"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ORM = require("sequelize");
var dotenv = require("dotenv");
process.env.NODE_ENV = "product";
dotenv.config({ path: ".env." + process.env.NODE_ENV });
var dbUrl = process.env.PG_URI;
// const dbUrl = "postgres://oauth2:oauth2MNL@13.250.129.169:5432/oauth2";
// console.log("Load DB ===");
var options = { benchmark: true, logging: console.log };
exports.sequelize = new ORM(dbUrl, options);
exports.sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=db.js.map