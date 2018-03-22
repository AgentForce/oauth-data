"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./server/index");
var dotenv = require("dotenv");
dotenv.config({ path: ".env." + process.env.NODE_ENV });
console.log(process.env);
var app = express();
var server = new index_1.default(app);
var port = process.env.PORT; //nconf.get("http:port");
app.listen(port, "localhost", function (err) {
    if (err)
        return err;
    console.info("Server running on : http://localhost:" + port);
});
//# sourceMappingURL=server.js.map