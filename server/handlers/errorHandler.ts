
import { Request, Response, RequestHandler, ErrorRequestHandler, NextFunction } from "express";
import * as winston from "winston";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

const d = new Date();
const date = [
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

export function unCoughtErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) {

    winston.error(JSON.stringify(err));
    res.end({ error: err });
}
// winston.error("Lỗi");
// winston.info("Info");
// winston.warn("cảnh ebáo");
// winston.error("lỗi");
export function apiErrorHandler(err: any, req: Request, res: Response, message: string) {
    try {
        const error: object = { "Message": message, "Request": "req", "Stack": JSON.stringify(err) };
        winston.error("==============");
        winston.error(JSON.stringify(error));
        const res_return = {
            "success": false,
            "result": message
        }
        res.json(res_return);
    } catch (error) {
        winston.error(JSON.stringify(error));
        const res_return = {
            "success": false,
            "result": error
        }
        res.json(res_return);
    }
    
}