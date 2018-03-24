"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: ".env." + process.env.NODE_ENV });
var d = new Date();
var date = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
].join('-');
winston.add(winston.transports.File, {
    filename: path.join(__dirname, "../logs/" + date + "_error.log"),
    level: process.env.LOGGER,
    handleExceptions: true,
    humanReadableUnhandledException: true
});
function unCoughtErrorHandler(err, req, res, next) {
    winston.error(JSON.stringify(err));
    res.end({ error: err });
}
exports.unCoughtErrorHandler = unCoughtErrorHandler;
// winston.error("Lỗi");
// winston.info("Info");
// winston.warn("cảnh ebáo");
winston.error("lỗi");
function apiErrorHandler(err, req, res, message) {
    try {
        var error = { "Message": message, "Request": "req", "Stack": JSON.stringify(err) };
        winston.error("==============");
        winston.error(JSON.stringify(error));
        var res_return = {
            "success": false,
            "result": message
        };
        res.json(res_return);
    }
    catch (error) {
        winston.error(JSON.stringify(error));
        var res_return = {
            "success": false,
            "result": error
        };
        res.json(res_return);
    }
}
exports.apiErrorHandler = apiErrorHandler;
//# sourceMappingURL=errorHandler.js.map