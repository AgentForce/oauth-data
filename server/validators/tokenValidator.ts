import { Router, Request, Response, NextFunction } from "express";
const Client = require('node-rest-client').Client;

export class TokenValidator {
    
    constructor() { }

    checkToken() {
        return (req: any, res: Response, next: NextFunction) => {
            req['token'] = 'result.value';
            next();
            /* const client = new Client();
            // Data test
            // request and response additional configuration
            var datapost = {};
            const args = {
                headers: {
                    "Authorization": "Bearer " + req.token,
                    "Content-Type": "application/json"
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000, //request timeout in milliseconds
                    noDelay: true, //Enable/disable the Nagle algorithm
                    keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                    keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 //response timeout
                }
            };
            const reqapi = client.post('http://13.250.129.169:3002/oauth/authorise/check', args, function (data: Object, response: any) {                // parsed response body as js object

                if (response.statusCode >= 200 && response.statusCode < 300){
                    req['token'] = 'result.value';
                    next();
                }
                else {
                    return res.status(400).json('không có token ' + req.token);  
                }

            })*/
        
            
            //return res.status(400).json('không có token' + req.token);  
        }
    }

}
