"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('node-rest-client').Client;
var TokenValidator = /** @class */ (function () {
    function TokenValidator() {
    }
    TokenValidator.prototype.checkToken = function () {
        return function (req, res, next) {
            var client = new Client();
            // Data test
            // request and response additional configuration
            var datapost = {};
            var args = {
                headers: {
                    "Authorization": "Bearer " + req.token,
                    "Content-Type": "application/json"
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 //response timeout
                }
            };
            var reqapi = client.post('http://13.250.129.169:3002/oauth/authorise/check', args, function (data, response) {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    req['token'] = 'result.value';
                    next();
                }
                else {
                    return res.status(400).json('không có token ' + req.token);
                }
            });
            //return res.status(400).json('không có token' + req.token);  
        };
    };
    return TokenValidator;
}());
exports.TokenValidator = TokenValidator;
//# sourceMappingURL=tokenValidator.js.map