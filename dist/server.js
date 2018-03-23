"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(process.env);
console.log("=====");
process.env.NODE_ENV = "product";
console.log(process.env);
var express = require("express");
console.log(process.env);
console.log("------");
var index_1 = require("./server/index");
var dotenv = require("dotenv");
dotenv.config({ path: ".env." + process.env.NODE_ENV });
var app = express();
var server = new index_1.default(app);
//var port = process.env.PORT; //nconf.get("http:port");
var port = 5200;
app.listen(port, "localhost", function (err) {
    if (err)
        return err;
    console.info("Server running on : http://localhost:" + port);
});
//# sourceMappingURL=server.js.map