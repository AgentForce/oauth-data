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
var db_1 = require("./../db/db");
var moment = require("moment");
var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");
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
    UserRoutes.prototype.postExport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var resQ, dataExport, obj_report, where_add, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        resQ = void 0;
                        console.log(req.body);
                        dataExport = void 0;
                        obj_report = void 0;
                        if (!(req.body.type === 'level')) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_1.User.findOne({ where: { username: req.body.key } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 1:
                        // TH là level
                        // Find user theo username
                        obj_report = _a.sent();
                        return [4 /*yield*/, db_1.sequelize.query("SELECT * FROM oauth_users WHERE report_to_list <@ '" + obj_report.report_to_list + "'", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects;
                            })
                            // 
                        ];
                    case 2:
                        dataExport = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        where_add = "";
                        if (req.body.type === 'active')
                            where_add = " and status = 1";
                        else if (req.body.type === 'deactive')
                            where_add = " and status = 0";
                        return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' " + where_add + " and  " + '"createdAt"' + " < '" + req.body.to + "'::date AND " + '"createdAt" ' + ">= '" + req.body.from + "'::date", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects;
                            })];
                    case 4:
                        dataExport = _a.sent();
                        _a.label = 5;
                    case 5:
                        data = {
                            resQ: dataExport,
                            obj_report: obj_report
                        };
                        return [4 /*yield*/, res.json(data)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        res.json([]);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.getRemind = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, offset, _a, _b, _c, error_4;
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
                        _a = result;
                        _b = "data";
                        return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and  " + '"remind_date"' + " < '" + moment().format('YYYY-MM-DD') + "'::date LIMIT " + req.params.size + " OFFSET " + offset, { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects;
                            })];
                    case 2:
                        _a[_b] = _d.sent();
                        _c = result;
                        return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and  " + '"remind_date"' + " < '" + moment().format('YYYY-MM-DD') + "'::date", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects.length;
                            })];
                    case 3:
                        _c.total = _d.sent();
                        return [4 /*yield*/, res.json(result)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _d.sent();
                        errorHandler_1.apiErrorHandler(error_4, req, res, "Get all User failed. ");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.getDashboard = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var resQ, countSum, countSumActive, countMonth, countActiveMonth, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where report_to = '' ", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                            return projects;
                        })
                        // Count status sum
                    ];
                    case 1:
                        // resQ = await sequelize.query("select * from oauth_users where '56' @> report_to_list ",
                        resQ = _a.sent();
                        return [4 /*yield*/, User_1.User.count({ where: { resource_ids: "SOP_API" } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 2:
                        countSum = _a.sent();
                        return [4 /*yield*/, User_1.User.count({ where: { resource_ids: "SOP_API", status: 1 } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 3:
                        countSumActive = _a.sent();
                        return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and " + '"createdAt"' + " < '2018-05-01'::date AND " + '"createdAt" ' + ">= '2018-04-01'::date", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects.length;
                            })];
                    case 4:
                        countMonth = _a.sent();
                        return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and status = 1 and  " + '"createdAt"' + " < '2018-05-01'::date AND " + '"createdAt" ' + ">= '2018-04-01'::date", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects.length;
                            })
                            // console.log(countSum);
                            // console.log(countSumActive);
                            // console.log(countActiveMonth);
                            // const abc = await lodash.groupBy(resQ, "report_to");
                            // let arr = await lodash.values(abc);
                            // arr = await lodash.orderBy(arr, 'report_to_list', 'asc');
                            /*for (let index = arr.length - 1 ; index >= 0; index--) {
                                const element = arr[index];
                                // console.log(element);
                                const index_find = lodash.findIndex(resQ, function(o: any) { return o.report_to == element[0].report_to; });
                                if(index_find >= 0){
                                    resQ[index_find].child = JSON.stringify(arr[index]);
                                }
                    
                            }
                            console.log(resQ)
                            console.log("=======")
                            const abc2 = await lodash.groupBy(resQ, "report_to");
                            let arr2 = await lodash.values(abc2);
                            arr2 = await lodash.orderBy(arr2, 'report_to_list', 'asc');
                            console.log("===eeeee====")*/
                        ];
                    case 5:
                        countActiveMonth = _a.sent();
                        data = {
                            resQ: resQ,
                            countSum: countSum,
                            countSumActive: countSumActive,
                            countMonth: countMonth,
                            countActiveMonth: countActiveMonth
                        };
                        return [4 /*yield*/, res.json(data)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.getReportToID = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var resQ;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.sequelize.query("select * from oauth_users where report_to = '" + req.params.id + "'", { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                            return projects;
                        })];
                    case 1:
                        resQ = _a.sent();
                        return [4 /*yield*/, res.json(resQ)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data_post, user_report_to, obj_report, user_insert, report_to_list, data_put, api, res_api, datapost, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        data_post = req.body;
                        user_report_to = req.body.report_to;
                        obj_report = void 0;
                        user_insert = void 0;
                        data_post.report_to_list = "";
                        data_post.report_to = "";
                        data_post.report_to_username = "";
                        // Add remind_date
                        data_post.remind_date = moment().add(11, 'M');
                        return [4 /*yield*/, User_1.User.create(data_post)
                                .then(function (result) {
                                return (result);
                            })
                                .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); })];
                    case 1:
                        // data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
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
                            report_to_username: obj_report.fullName + " - " + obj_report.username
                        };
                        api = new api_1.BaseApi();
                        res_api = void 0;
                        datapost = {
                            "UserId": user_insert.id,
                            "FullName": user_insert.fullName,
                            "BirthDay": user_insert.birthday,
                            "UserName": user_insert.username,
                            "LevelCode": parseInt(user_insert.level),
                            "ReportTo": data_put.report_to,
                            "ReportToList": data_put.report_to_list
                        };
                        return [4 /*yield*/, api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost))];
                    case 3:
                        res_api = _a.sent();
                        return [4 /*yield*/, User_1.User.update(data_put, { where: { username: user_insert.username } })
                                .then(function (result) { return (result); })
                                .catch(function (err) { throw err; })];
                    case 4:
                        // console.log(res_api);
                        //End call
                        user_insert = _a.sent();
                        return [4 /*yield*/, res.json(user_insert)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        console.log(error_5);
                        errorHandler_1.apiErrorHandler(error_5, req, res, "Get of Role failed.");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.createUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var arrUsers, arrResUsers, index, element, obj, user_support, resObj, error_6;
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
                            username: element.user_name.trim(),
                            phone: element.phone.trim(),
                            level: parseInt(element.level.trim()),
                            code_level: element.code_level.trim(),
                            fullName: element.full_name.trim(),
                            identity_card: element.cmnd.trim(),
                            report_to: element.report_to.trim(),
                            resource_ids: "SOP_API",
                            scope: element.roles.trim(),
                            zone: element.zone.trim(),
                            badge: element.badge.trim(),
                            expirence: element.expirence.trim(),
                            onboard_date: element.onboard_date.trim(),
                            manager_badge: element.manager_badge.trim()
                        };
                        user_support = new UserSupport();
                        return [4 /*yield*/, user_support.createUserObj(obj, req)];
                    case 2:
                        resObj = _a.sent();
                        arrResUsers[index] = resObj;
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, res.json(arrResUsers)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        console.log(error_6);
                        console.log("+_++_++++___");
                        errorHandler_1.apiErrorHandler(error_6, req, res, "Insert of Users failed.");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.updateBadgeLevel = function (req, res, next) {
        try {
            var data_put = req.body;
            // console.log(data_put);
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
    UserRoutes.prototype.changeReportTo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data_put, obj_des, obj_src, resQ;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data_put = req.body;
                        return [4 /*yield*/, User_1.User.findOne({ where: { username: data_put.des } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 1:
                        obj_des = _a.sent();
                        return [4 /*yield*/, User_1.User.findOne({ where: { username: data_put.src } })
                                .then(function (result) { return result; })
                                .catch(function (err) { throw err; })];
                    case 2:
                        obj_src = _a.sent();
                        return [4 /*yield*/, db_1.sequelize.query("update oauth_users set report_to_list = '" + obj_des.report_to_list + "' || subpath(report_to_list, nlevel('" + obj_src.report_to_list + "')-1) where report_to_list <@ '" + obj_src.report_to_list + "'", { replacements: {}, type: db_1.sequelize.QueryTypes.UPDATE }).then(function (projects) {
                                // console.log(projects);
                                db_1.sequelize.query("update oauth_users set report_to = '" + obj_des.id + "', report_to_username = '" + obj_des.fullName + " - " + obj_des.username + "' where id = '" + obj_src.id + "'", { replacements: {}, type: db_1.sequelize.QueryTypes.UPDATE }).then(function (projects) {
                                    // Call API Tú
                                    var api = new api_1.BaseApi();
                                    var res_api;
                                    var datapost = {
                                        "UserIdDes": obj_des.id,
                                        "UserIdSrc": obj_src.id,
                                        "IsMoveAll": true
                                    };
                                    // console.log(datapost);
                                    res_api = api.apiPut(req.token, 'http://13.250.129.169:3001/api/users/moveuser', JSON.stringify(datapost));
                                    // console.log(res_api);
                                    //End call
                                    res.json(res_api);
                                });
                            })];
                    case 3:
                        // resQ = await sequelize.query("select * from oauth_users where '56' @> report_to_list ",
                        // update tree set path = DESTINATION_PATH || subpath(path, nlevel(SOURCE_PATH)-1) where path <@ SOURCE_PATH;
                        // resQ = await sequelize.query("update oauth_users set report_to_list = '56.810' || subpath(report_to_list, nlevel('56.809.813')-1) where report_to_list <@ '56.809.813'",
                        resQ = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.updatePassUser = function (req, res, next) {
        var data_put = { password: "", salt: "" };
        bcrypt.genSalt(10, function (err, salt) {
            // console.log("salt = " + salt);
            if (err) {
                res.json(err);
            }
            bcrypt.hash(req.body.password, salt, undefined, function (err, hash) {
                if (err) {
                    return next(err);
                }
                data_put.password = hash;
                data_put.salt = salt;
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
            });
        });
    };
    UserRoutes.prototype.resetPassUser = function (req, res, next) {
        var data_put = { password: "", salt: "", status: 0 };
        bcrypt.genSalt(10, function (err, salt) {
            // console.log("salt = " + salt);
            if (err) {
                res.json(err);
            }
            bcrypt.hash("123456", salt, undefined, function (err, hash) {
                if (err) {
                    return next(err);
                }
                data_put.password = hash;
                data_put.salt = salt;
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
            });
        });
    };
    UserRoutes.prototype.changePassUser = function (req, res, next) {
        /*bcrypt.genSalt(10, (err, salt) => {
            console.log("salt = " + salt);
            if (err) { return next(err); }
            bcrypt.hash("123456", salt, undefined, (err: any, hash) => {
            if (err) { return next(err); }
            console.log("Password: " + hash);
            next();
            });
        });*/
        var data_put = { password: "", salt: "" };
        bcrypt.genSalt(10, function (err, salt) {
            // console.log("salt = " + salt);
            if (err) {
                res.json(err);
            }
            bcrypt.hash(req.body.password, salt, undefined, function (err, hash) {
                if (err) {
                    return next(err);
                }
                data_put.password = hash;
                data_put.salt = salt;
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
            });
        });
        /*const data_put = req.body; // {password: "uK8748", status: 0}; old_pass and password
        User.update(data_put, { where: { username: req.params.username, password: data_put.old_pass} })
            .then((result) => {
                const res_return = {
                    "success": true,
                    "result": result
                }
                if( result[0] < 1 ){
                    res_return.success = false;
                }
                res.json(res_return);
             })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });*/
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
            var user_report_to, obj_report, user_insert, report_to_list, data_put, api, res_api, datapost, error_7;
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
                        // Add remind_date
                        data_post.remind_date = moment().add(11, 'M');
                        return [4 /*yield*/, User_1.User.create(data_post)
                                .then(function (result) {
                                return (result);
                            })
                                .catch(function (err) { throw err; })];
                    case 1:
                        // data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
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
                            report_to_username: obj_report.fullName + " - " + obj_report.username
                        };
                        api = new api_1.BaseApi();
                        res_api = void 0;
                        datapost = {
                            "UserId": user_insert.id,
                            "FullName": user_insert.fullName,
                            "BirthDay": user_insert.birthday,
                            "UserName": user_insert.username,
                            "LevelCode": parseInt(user_insert.level),
                            "ReportTo": data_put.report_to,
                            "ReportToList": data_put.report_to_list
                        };
                        return [4 /*yield*/, api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost))];
                    case 3:
                        res_api = _a.sent();
                        return [4 /*yield*/, User_1.User.update(data_put, { where: { username: user_insert.username } })
                                .then(function (result) { return (result); })
                                .catch(function (err) { throw err; })];
                    case 4:
                        // console.log(res_api);
                        //End call
                        //Update report_to and report_to_list
                        user_insert = _a.sent();
                        // console.log("user_insert +++++");
                        // console.log(user_insert);
                        data_post.resultInsert = "Thành công";
                        data_post.style = "white";
                        // console.log(data_post);
                        return [2 /*return*/, data_post
                            // console.log("======");
                        ];
                    case 5:
                        error_7 = _a.sent();
                        console.log(error_7);
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