const Client = require("node-rest-client").Client;
const Promise = require("bluebird");

// import * as Configs from "../configurations/index";
const lodash = require("lodash");
// const uncompress = require('compress-buffer').uncompress;
const StringDecoder = require("string_decoder").StringDecoder;


/**
 * Constructor
 *
 * @class BaseApi
 */
export class BaseApi {

    public authConfigs: any;
    public serverConfigs: any;


    /**
     * Constructor
     *
     * @class BaseApi
     * @constructor
     */
    constructor() {
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
    public apiDelete(token: string, api_name: string) {
        return new Promise(function (fulfill, reject) {
            // request and response additional configuration

            const options = {
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
            const client = new Client(options);
            // Data test
            // request and response additional configuration

            const args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: {},
                requestConfig: {
                    timeout: 10000, // request timeout in milliseconds
                    noDelay: true, // Enable/disable the Nagle algorithm
                    keepAlive: true, // Enable/disable keep-alive functionalityidle socket.
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // const req = client.get(serverConfigs.apiOauth + 'api/uaa/oauth/check_token?token=' + token, args, function (data: any, response: any) {

            const req = client.delete(api_name, args, function (data: any, response: any) {
                 if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    const decoder = new StringDecoder("utf8");
                    console.log("loi");
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));

                }
            });

            req.on("requestTimeout", function (req: any) {
                console.log(" - request has expired :");
                reject(" - request has expired :");
                req.abort();
            });

            req.on("responseTimeout", function (res: any) {
                console.log(" - response has expired :");
                reject(" - response has expired :");
            });

            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err: any) {
                // Xóa data tenant
                console.log(err);
                reject(err + " - ");

            });


        });
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseApi
     * @method apiPost
     * @param src {string} The src to the external JS file.
     * @return {BaseApi} Self for chaining
     */
    public apiGet(token: string, api_name: string) {
        return new Promise(function (fulfill, reject) {
            // request and response additional configuration

            const serverConfigs: any = "Configs.getServerConfigs()";
            const options = {
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
            const client = new Client(options);
            // Data test
            // request and response additional configuration

            const args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: {},
                requestConfig: {
                    timeout: 10000, // request timeout in milliseconds
                    noDelay: true, // Enable/disable the Nagle algorithm
                    keepAlive: true, // Enable/disable keep-alive functionalityidle socket.
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // const req = client.get(serverConfigs.apiOauth + 'api/uaa/oauth/check_token?token=' + token, args, function (data: any, response: any) {

            const req = client.get(api_name, args, function (data: any, response: any) {
                console.log(response.statusCode);
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    if (response.statusCode === 401) {
                        fulfill(data.statusCode = 401);
                    } else {
                        const decoder = new StringDecoder("utf8");
                        reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));
                    }

                }
            });

            req.on("requestTimeout", function (req: any) {
                console.log(" - request has expired :");
                reject(" - request has expired :");
                req.abort();
            });

            req.on("responseTimeout", function (res: any) {
                console.log(" - response has expired :");
                reject(" - response has expired :");
            });

            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err: any) {
                // Xóa data tenant
                console.log(err);
                reject(err + " - ");

            });


        });
    }

    public refreshToken(refresh_token: string) {
        console.log("F5 token");
        return new Promise(function (fulfill, reject) {
            // const authConfigs: any = Configs.getAuthConfigs();
            // objClient.clientsecret = '123456';
            // objClient.clientid = 'dev';
            // let basicOauth = new Buffer(objClient.clientid + ":" + objClient.clientsecret).toString("base64");
            // const serverConfigs: any = Configs.getServerConfigs();
            const options = {
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
            const client = new Client(options);
            // Data test
            const data_test = { grant_type: "refresh_token", refresh_token: refresh_token };
            // request and response additional configuration
            const args = {
                headers: {
                    "Authorization": "Basic ZGV2X3BvcnRhbDpYaDkzTVltdWlVaVFpd1BDdzVHSzY0Y21waW1qaEs5ZA",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data_test,

            };
            // console.log(data_test);
            // const req = client.post(this.url_api + api_name, args, function (data, response) {
            const req = client.post("https://dcmwdevtest01.easycredit.vn:8095/api/uaa/oauth/token", args, function (data: any, response: any) {                // parsed response body as js object
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

            req.on("requestTimeout", function (req: any) {
                reject(" - request has expired :");
                req.abort();
            });

            req.on("responseTimeout", function (res: any) {
                reject(" - response has expired :");
            });

            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err: any) {

                // Xóa data tenant
                reject(err);

            });


        });
    }
    public apiPost(token: string, api_name: string, datapost: Object) {
        //  const res_api = api.apiPost(token, 'https://dcmwdevtest01.easycredit.vn', datapost.Password, datapost);
        return new Promise(function (fulfill, reject) {
            const options = {
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
            const client = new Client(options);
            // Data test
            // request and response additional configuration

            const args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000, // request timeout in milliseconds
                    noDelay: true, // Enable/disable the Nagle algorithm
                    keepAlive: true, // Enable/disable keep-alive functionalityidle socket.
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            // console.log(args)
            const req = client.post(api_name, args, function (data: Object, response: any) {                // parsed response body as js object
                const decoder = new StringDecoder("utf8");

                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));

                }

            });

            req.on("requestTimeout", function (req: any) {
                console.log("requestTimeout");
                reject(" - request has expired :");
                req.abort();
            });

            req.on("responseTimeout", function (res: any) {
                console.log("responseTimeout");
                reject(" - response has expired :");
            });

            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err: any) {
                console.log("error");
                // Xóa data tenant
                reject(err);

            });


        });
    }

    public apiPatch(token: string, api_name: string, datapost: Object) {
        //  const res_api = api.apiPost(token, 'https://dcmwdevtest01.easycredit.vn', datapost.Password, datapost);
        return new Promise(function (fulfill, reject) {
            const options = {
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
            const client = new Client(options);
            // Data test
            // request and response additional configuration

            const args = {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
                data: datapost,
                requestConfig: {
                    timeout: 10000, // request timeout in milliseconds
                    noDelay: true, // Enable/disable the Nagle algorithm
                    keepAlive: true, // Enable/disable keep-alive functionalityidle socket.
                    keepAliveDelay: 1000 // and optionally set the initial delay before the first keepalive probe is sent
                },
                responseConfig: {
                    timeout: 1000 // response timeout
                }
            };
            console.log(args);
            console.log(api_name);
            const req = client.post(api_name, args, function (data: Object, response: any) {                // parsed response body as js object
                const decoder = new StringDecoder("utf8");
                console.log(decoder.write(data));
                if (response.statusCode >= 200 && response.statusCode < 300)
                    fulfill(data);
                else {
                    console.log(decoder.write(data));
                    reject("Server response statusCode: " + response.statusCode + " Data : " + decoder.write(data));

                }
            });

            req.on("requestTimeout", function (req: any) {
                console.log("requestTimeout");
                reject(" - request has expired :");
                req.abort();
            });

            req.on("responseTimeout", function (res: any) {
                console.log("responseTimeout");
                reject(" - response has expired :");
            });

            // it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
            req.on("error", function (err: any) {
                console.log("error");
                reject(err);

            });


        });
    }
}
