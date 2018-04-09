"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_1 = require("../handlers/errorHandler");
var api_1 = require("../handlers/api");
var User_1 = require("../models/User");
var phoneValidator = require('joi-phone-validator');
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.postQueryUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, offset, where, _a, _b, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = {
                            data: [],
                            msg: "",
                            pagenumber: req.params.page,
                            pagesize: req.params.size,
                            total: 0
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        offset = 0;
                        if (req.params.page > 1) {
                            offset = (req.params.page - 1) * req.params.size;
                        }
                        if (req.params.size < 0)
                            offset = 20;
                        where = void 0;
                        where = { phone: {
                                $like: '%' + req.body.key + '%'
                            } };
                        if (req.body.type === "email")
                            where = { email: {
                                    $like: '%' + req.body.key + '%'
                                } };
                        else if (req.body.type === "username")
                            where = { username: {
                                    $like: '%' + req.body.key + '%'
                                } };
                        _a = result;
                        _b = "data";
                        return [4 /*yield*/, User_1.User.findAll({ where: where, offset: offset, limit: req.params.size, order: 'oauth_user."updatedAt"' })
                                .then(function (result) { return (result); })
                                .catch(function (err) {
                                throw (err); // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
                            })];
                    case 2:
                        _a[_b] = _d.sent();
                        _c = result;
                        return [4 /*yield*/, User_1.User.count({ where: where })
                                .then(function (result) { return (result); })
                                .catch(function (err) {
                                throw (err); // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
                            })];
                    case 3:
                        _c.total = _d.sent();
                        return [4 /*yield*/, res.json(result)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        errorHandler_1.apiErrorHandler(error_1, req, res, "Get all User failed. ");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, offset, _a, _b, _c, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('vao');
                        result = {
                            data: [],
                            msg: "",
                            pagenumber: req.params.page,
                            pagesize: req.params.size,
                            total: 0
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        offset = 0;
                        if (req.params.page > 1) {
                            offset = (req.params.page - 1) * req.params.size;
                        }
                        if (req.params.size < 0)
                            offset = 20;
                        _a = result;
                        _b = "data";
                        return [4 /*yield*/, User_1.User.findAll({ offset: offset, limit: req.params.size, order: [
                                    ['updatedAt', 'DESC'],
                                    ['id', 'ASC'],
                                ] })
                                .then(function (result) { return (result); })
                                .catch(function (err) {
                                throw (err); // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
                            })];
                    case 2:
                        _a[_b] = _d.sent();
                        _c = result;
                        return [4 /*yield*/, User_1.User.count({})
                                .then(function (result) { return (result); })
                                .catch(function (err) {
                                throw (err); // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
                            })];
                    case 3:
                        _c.total = _d.sent();
                        return [4 /*yield*/, res.json(result)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _d.sent();
                        errorHandler_1.apiErrorHandler(error_2, req, res, "Get all User failed. ");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data_post, user_report_to, obj_report, user_insert, report_to_list, data_put, api, res_api, datapost, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        data_post = req['value']['body'];
                        user_report_to = req['value']['body'].report_to;
                        obj_report = void 0;
                        user_insert = void 0;
                        data_post.report_to_list = "";
                        data_post.report_to = "";
                        data_post.report_to_username = "";
                        data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
                        return [4 /*yield*/, User_1.User.create(data_post)
                                .then(function (result) {
                                return (result);
                            })
                                .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); })];
                    case 1:
                        user_insert = _a.sent();
                        return [4 /*yield*/, User_1.User.findOne({ where: { username: user_report_to } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 2:
                        //Select user_report_to
                        obj_report = _a.sent();
                        report_to_list = '';
                        if (obj_report.report_to_list != '') {
                            report_to_list = obj_report.report_to_list + ".";
                        }
                        data_put = void 0;
                        data_put = {
                            report_to: obj_report.id,
                            report_to_list: report_to_list + user_insert.id,
                            report_to_username: obj_report.username
                        };
                        api = new api_1.BaseApi();
                        res_api = void 0;
                        datapost = {
                            "UserId": user_insert.id,
                            "ReportTo": data_put.report_to,
                            "ReportToList": data_put.report_to_list
                        };
                        return [4 /*yield*/, api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost))];
                    case 3:
                        res_api = _a.sent();
                        console.log(res_api);
                        return [4 /*yield*/, User_1.User.update(data_put, { where: { username: user_insert.username } })
                                .then(function (result) { return (result); })
                                .catch(function (err) { throw err; })];
                    case 4:
                        //End call
                        user_insert = _a.sent();
                        return [4 /*yield*/, res.json(user_insert)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        errorHandler_1.apiErrorHandler(error_3, req, res, "Get of Role failed.");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.createUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var arrUsers, arrResUsers, index, element, obj, user_support, resObj, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        arrUsers = req.body;
                        arrResUsers = [];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < arrUsers.length)) return [3 /*break*/, 4];
                        element = arrUsers[index];
                        obj = {
                            username: element.username.trim(),
                            phone: element.phone.trim(),
                            level: parseInt(element.level.trim()),
                            code_level: element.label.trim(),
                            fullName: element.fullname.trim(),
                            identity_card: element.cmnd.trim(),
                            report_to: element.reportto.trim(),
                            resource_ids: "SOP_API"
                            // role: "5ab1cfbb3a2e5604a5314fb5"
                        };
                        user_support = new UserSupport();
                        return [4 /*yield*/, user_support.createUserObj(obj, req)];
                    case 2:
                        resObj = _a.sent();
                        arrResUsers[index] = resObj;
                        console.log(resObj);
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, res.json(arrResUsers)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        console.log(error_4);
                        console.log("+_++_++++___");
                        errorHandler_1.apiErrorHandler(error_4, req, res, "Insert of Users failed.");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.updateBadgeLevel = function (req, res, next) {
        try {
            var data_put = req.body;
            console.log(data_put);
            User_1.User.update(data_put, { where: { username: req.params.username } })
                .then(function (result) { res.json(result); })
                .catch(function (err) { throw err; });
        }
        catch (error) {
            console.log(error);
            errorHandler_1.apiErrorHandler(error, req, res, "updation Information User " + req.params.username + "  failed.");
        }
    };
    UserRoutes.prototype.updatePhoneUser = function (req, res, next) {
        var data_put = { status: 0, phone: req['value']['body'].phone };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.updatePassUser = function (req, res, next) {
        var data_put = { password: req.body.password };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) {
            var res_return = {
                "success": true,
                "result": result
            };
            if (result[0] < 1) {
                res_return.success = false;
            }
            res.json(res_return);
        })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.resetPassUser = function (req, res, next) {
        var data_put = { password: "uK8748", status: 0 };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) {
            var res_return = {
                "success": true,
                "result": result
            };
            if (result[0] < 1) {
                res_return.success = false;
            }
            res.json(res_return);
        })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.updateStatusOTPUser = function (req, res, next) {
        var data_put = { status: 1 };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) {
            var res_return = {
                "success": true,
                "result": result
            };
            if (result[0] < 1) {
                res_return.success = false;
            }
            res.json(res_return);
        })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.id + "  failed."); });
    };
    UserRoutes.prototype.updateDeactive = function (req, res, next) {
        var data_put = { status: 2 };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Deactive " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.updateActive = function (req, res, next) {
        var data_put = { status: 0, password: 'defaultkd' };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.getUserById = function (req, res, next) {
        User_1.User.find({ where: { 'username': req.params.username } })
            .then(function (result) {
            var res_return = {
                "success": true,
                "result": result
            };
            if (!result) {
                res_return.success = false;
            }
            res.json(res_return);
        })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "User " + req.params.id + " not found."); });
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
var UserSupport = /** @class */ (function () {
    function UserSupport() {
    }
    UserSupport.prototype.createUserObj = function (data_post, req) {
        return __awaiter(this, void 0, void 0, function () {
            var user_report_to, obj_report, user_insert, report_to_list, data_put, api, res_api, datapost, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        user_report_to = data_post.report_to;
                        obj_report = void 0;
                        user_insert = void 0;
                        data_post.report_to_list = "";
                        data_post.report_to = "";
                        data_post.report_to_username = "";
                        data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
                        return [4 /*yield*/, User_1.User.create(data_post)
                                .then(function (result) {
                                return (result);
                            })
                                .catch(function (err) { throw err; })];
                    case 1:
                        // console.log(data_post);
                        user_insert = _a.sent();
                        return [4 /*yield*/, User_1.User.findOne({ where: { username: user_report_to } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 2:
                        //Select user_report_to
                        obj_report = _a.sent();
                        report_to_list = '';
                        if (obj_report.report_to_list != '') {
                            report_to_list = obj_report.report_to_list + ".";
                        }
                        data_put = void 0;
                        data_put = {
                            report_to: obj_report.id,
                            report_to_list: report_to_list + user_insert.id,
                            report_to_username: obj_report.username
                        };
                        api = new api_1.BaseApi();
                        res_api = void 0;
                        datapost = {
                            "UserId": user_insert.id,
                            "ReportTo": data_put.report_to,
                            "ReportToList": data_put.report_to_list
                        };
                        return [4 /*yield*/, api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost))];
                    case 3:
                        res_api = _a.sent();
                        console.log(res_api);
                        return [4 /*yield*/, User_1.User.update(data_put, { where: { username: user_insert.username } })
                                .then(function (result) { return (result); })
                                .catch(function (err) { throw err; })];
                    case 4:
                        //End call
                        //Update report_to and report_to_list
                        user_insert = _a.sent();
                        // console.log("user_insert +++++");
                        // console.log(user_insert);
                        data_post.resultInsert = "Thành công";
                        data_post.style = "white";
                        console.log(data_post);
                        return [2 /*return*/, data_post
                            // console.log("======");
                        ];
                    case 5:
                        error_5 = _a.sent();
                        console.log(error_5);
                        data_post.resultInsert = "Thất bại";
                        data_post.style = "red";
                        return [2 /*return*/, data_post];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserSupport;
}());
exports.UserSupport = UserSupport;
//# sourceMappingURL=UsersCtrl.js.map