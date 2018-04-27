"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require("node-rest-client").Client;
var Promise = require("bluebird");
// import * as Configs from "../configurations/index";
var lodash = require("lodash");
// const uncompress = require('compress-buffer').uncompress;
var StringDecoder = require("string_decoder").StringDecoder;
/**
 * Constructor
 *
 * @class BaseApi
 */
var BaseApi = /** @class */ (function () {
    /**
     * Constructor
     *
     * @class BaseApi
     * @constructor
     */
    function BaseApi() {
        // initialize variables
    }
    /**
     * Add a JS external file to the request.
     *
     * @class BaseApi
     * @method apiDelete
     * @param src {string} The src to the external JS file.
     * @return {BaseApi} Self for chaining
     */
    BaseApi.prototype.apiDelete = function (token, api_name) {
        return new Promise(function (fulfill, reject) {
            // request and response additional configuration
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: {},
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // const req = client.get(serverConfigs.apiOauth + 'api/uaa/oauth/check_token?token=' + token, args, function (data: any, response: any) {
            var req = client.delete(api_name, args, function (data, response) {
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    var decoder = new StringDecoder("utf8");
                    console.log("loi");
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                }
            });
            req.on("requestTimeout", function (req) {
                console.log(" - request has expired :");
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                console.log(" - response has expired :");
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                // Xóa data tenant
                console.log(err);
                reject(err + " - ");
            });
        });
    };
    /**
     * Add a JS external file to the request.
     *
     * @class BaseApi
     * @method apiPost
     * @param src {string} The src to the external JS file.
     * @return {BaseApi} Self for chaining
     */
    BaseApi.prototype.apiGet = function (token, api_name) {
        return new Promise(function (fulfill, reject) {
            // request and response additional configuration
            var serverConfigs = "Configs.getServerConfigs()";
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: {},
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // const req = client.get(serverConfigs.apiOauth + 'api/uaa/oauth/check_token?token=' + token, args, function (data: any, response: any) {
            var req = client.get(api_name, args, function (data, response) {
                console.log(response.statusCode);
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    if (response.statusCode === 401) {
                        fulfill(data.statusCode = 401);
                    }
                    else {
                        var decoder = new StringDecoder("utf8");
                        reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                    }
                }
            });
            req.on("requestTimeout", function (req) {
                console.log(" - request has expired :");
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                console.log(" - response has expired :");
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                // Xóa data tenant
                console.log(err);
                reject(err + " - ");
            });
        });
    };
    BaseApi.prototype.refreshToken = function (refresh_token) {
        console.log("F5 token");
        return new Promise(function (fulfill, reject) {
            // const authConfigs: any = Configs.getAuthConfigs();
            // objClient.clientsecret = '123456';
            // objClient.clientid = 'dev';
            // let basicOauth = new Buffer(objClient.clientid + ":" + objClient.clientsecret).toString("base64");
            // const serverConfigs: any = Configs.getServerConfigs();
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            var data_test = { grant_type: "refresh_token", refresh_token: refresh_token };
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Basic ZGV2X3BvcnRhbDpYaDkzTVltdWlVaVFpd1BDdzVHSzY0Y21waW1qaEs5ZA",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data_test,
            };
            // console.log(data_test);
            // const req = client.post(this.url_api + api_name, args, function (data, response) {
            var req = client.post("https://dcmwdevtest01.easycredit.vn:8095/api/uaa/oauth/token", args, function (data, response) {
                console.log("+++++++");
                console.log(data);
                console.log("==========");
                fulfill(data);
                /*if(data.constructor === Object){

                }
                else {
                    reject( 'api '+api_name+' khong login thành công' );
                }*/
                // return data;
                // raw response
            });
            req.on("requestTimeout", function (req) {
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                // Xóa data tenant
                reject(err);
            });
        });
    };
    BaseApi.prototype.apiPost = function (token, api_name, datapost) {
        //  const res_api = api.apiPost(token, 'https://dcmwdevtest01.easycredit.vn', datapost.Password, datapost);
        return new Promise(function (fulfill, reject) {
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // console.log(args)
            var req = client.post(api_name, args, function (data, response) {
                var decoder = new StringDecoder("utf8");
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                }
            });
            req.on("requestTimeout", function (req) {
                console.log("requestTimeout");
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                console.log("responseTimeout");
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                console.log("error");
                // Xóa data tenant
                reject(err);
            });
        });
    };
    BaseApi.prototype.apiPut = function (token, api_name, datapost) {
        //  const res_api = api.apiPost(token, 'https://dcmwdevtest01.easycredit.vn', datapost.Password, datapost);
        return new Promise(function (fulfill, reject) {
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // console.log(args);
            // console.log(api_name);
            var req = client.put(api_name, args, function (data, response) {
                var decoder = new StringDecoder("utf8");
                // console.log("========");
                // console.log(JSON.stringify(data));
                // console.log(response.statusCode);
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                }
            });
            req.on("requestTimeout", function (req) {
                console.log("requestTimeout");
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                console.log("responseTimeout");
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                console.log("error");
                // Xóa data tenant
                reject(err);
            });
        });
    };
    BaseApi.prototype.apiPatch = function (token, api_name, datapost) {
        //  const res_api = api.apiPost(token, 'https://dcmwdevtest01.easycredit.vn', datapost.Password, datapost);
        return new Promise(function (fulfill, reject) {
            var options = {
                connection: {
                    rejectUnauthorized: false,
                    headers: {
                        "Content-Type": "text/uri-list"
                    }
                },
                requestConfig: {
                    timeout: 60000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000
                },
                responseConfig: {
                    timeout: 300000
                }
            };
            var client = new Client(options);
            // Data test
            // request and response additional configuration
            var args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000,
                    noDelay: true,
                    keepAlive: true,
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // console.log(args);
            // console.log(api_name);
            var req = client.post(api_name, args, function (data, response) {
                var decoder = new StringDecoder("utf8");
                console.log(decoder.write(data));
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                }
            });
            req.on("requestTimeout", function (req) {
                // console.log("requestTimeout");
                reject(" - request has expired :");
                req.abort();
            });
            req.on("responseTimeout", function (res) {
                // console.log("responseTimeout");
                reject(" - response has expired :");
            });
            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err) {
                console.log("error");
                reject(err);
            });
        });
    };
    return BaseApi;
}());
exports.BaseApi = BaseApi;
//# sourceMappingURL=api.js.map