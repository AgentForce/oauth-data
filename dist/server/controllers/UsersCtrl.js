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
var User_1 = require("../models/User");
var phoneValidator = require('joi-phone-validator');
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, offset, _a, _b, _c, error_1;
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
                        offset = (req.params.page - 1) * req.params.size;
                        if (offset < 0)
                            offset = 0;
                        if (req.params.size < 0)
                            offset = 20;
                        console.log('hi');
                        _a = result;
                        _b = "data";
                        return [4 /*yield*/, User_1.User.findAll({ offset: offset, limit: req.params.size, order: 'oauth_user."updatedAt"' })
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
                        error_1 = _d.sent();
                        errorHandler_1.apiErrorHandler(error_1, req, res, "Get all User failed. ");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRoutes.prototype.createUser = function (req, res, next) {
        console.log('create user');
        User_1.User.create(req['value']['body'])
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); });
    };
    UserRoutes.prototype.createUsers = function (req, res, next) {
        try {
            User_1.User.bulkCreate(req.body).then(function () {
                res.json('không insert');
            }).then(function (users) {
                res.json(users); // ... in order to get the array of user objects
            }).catch(function (err) {
                //Insert từng dòng và ghi nhận lỗi
            });
        }
        catch (error) {
            errorHandler_1.apiErrorHandler(error, req, res, "Insert of Users failed.");
        }
    };
    UserRoutes.prototype.updateBadgeLevel = function (req, res, next) {
        try {
            var data_put = req['value']['body'];
            User_1.User.update(data_put, { where: { username: req.params.username } })
                .then(function (result) { res.json(result); })
                .catch(function (err) { throw err; });
        }
        catch (error) {
            errorHandler_1.apiErrorHandler(error, req, res, "updation of User " + req.params.id + "  failed.");
        }
    };
    UserRoutes.prototype.updatePhoneUser = function (req, res, next) {
        var data_put = { status: 0, phone: req['value']['body'].phone };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.username + "  failed."); });
    };
    UserRoutes.prototype.updateStatusOTPUser = function (req, res, next) {
        var data_put = { status: 1 };
        User_1.User.update(data_put, { where: { username: req.params.username } })
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of User " + req.params.id + "  failed."); });
    };
    UserRoutes.prototype.updateDeactive = function (req, res, next) {
        var data_put = { status: -1 };
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
            .then(function (result) { return res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "User " + req.params.id + " not found."); });
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
//# sourceMappingURL=UsersCtrl.js.map