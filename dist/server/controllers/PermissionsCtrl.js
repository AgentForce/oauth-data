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
var Scope_1 = require("../models/Scope");
var RoleScope_1 = require("../models/RoleScope");
var db_1 = require("./../db/db");
var _ = require("lodash");
var RoleRoutes = /** @class */ (function () {
    function RoleRoutes() {
    }
    RoleRoutes.prototype.getAllPermissions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Scope_1.Scope.findAll({})
                    .then(function (result) { res.json(result); })
                    .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
                return [2 /*return*/];
            });
        });
    };
    RoleRoutes.prototype.getAllPermissionsPage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, offset, resQ, arrScope, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = {
                            data: [],
                            msg: "",
                            pagenumber: req.params.page,
                            pagesize: req.params.size,
                            total: 0
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        offset = (req.params.page - 1) * req.params.size;
                        if (offset < 0)
                            offset = 0;
                        if (req.params.size < 0)
                            offset = 20;
                        resQ = void 0;
                        return [4 /*yield*/, db_1.sequelize.query('SELECT public.oauth_scopes.id, public.oauth_scopes."scope", public.oauth_scopes."name", public.oauth_scopes.resource, public.oauth_role_scopes.role, public.oauth_role_scopes.name_role FROM public.oauth_scopes LEFT OUTER JOIN public.oauth_role_scopes ON (public.oauth_scopes.id = public.oauth_role_scopes.id_scope) ', { replacements: {}, type: db_1.sequelize.QueryTypes.SELECT }).then(function (projects) {
                                return projects;
                            })];
                    case 2:
                        resQ = _b.sent();
                        arrScope = void 0;
                        arrScope = _.groupBy(resQ, "id");
                        result.data = arrScope;
                        _a = result;
                        return [4 /*yield*/, Scope_1.Scope.count({})
                                .then(function (result) { return (result); })
                                .catch(function (err) {
                                throw (err); // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
                            })];
                    case 3:
                        _a.total = _b.sent();
                        return [4 /*yield*/, res.json(result)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        errorHandler_1.apiErrorHandler(error_1, req, res, "Get all Scope failed. ");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RoleRoutes.prototype.postCreatePermissions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    Scope_1.Scope.create(req['value']['body'])
                        .then(function (result) { res.json(result); })
                        .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Creation of Scope failed." + JSON.stringify(err)); });
                }
                catch (error) {
                    console.log(error);
                    errorHandler_1.apiErrorHandler(error, req, res, "Insert of Scope failed.");
                }
                return [2 /*return*/];
            });
        });
    };
    RoleRoutes.prototype.patchUpdatePermissions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data_put;
            return __generator(this, function (_a) {
                try {
                    data_put = req['body'];
                    Scope_1.Scope.update(data_put, { where: { id: req.params.id } })
                        .then(function (result) { res.json(result); })
                        .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "updation of Scope " + req.params.username + "  failed."); });
                }
                catch (error) {
                    errorHandler_1.apiErrorHandler(error, req, res, "Insert of Scope failed.");
                }
                return [2 /*return*/];
            });
        });
    };
    RoleRoutes.prototype.putLinkPermissions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var arr_insert_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        arr_insert_1 = [];
                        return [4 /*yield*/, req.body.arrScope.forEach(function (element) {
                                var obj = { id_role: req.params.id_role, id_scope: element.id, name_scope: element.name_scope, scope: element.scope };
                                arr_insert_1.push(obj);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RoleScope_1.RoleScope.bulkCreate(arr_insert_1).then(function (rolescopes) {
                                var res_return = {
                                    Message: "Success",
                                    data: rolescopes
                                };
                                res.json(rolescopes); // ... in order to get the array of user objects
                            }).catch(function (err) {
                                //Insert từng dòng và ghi nhận lỗi
                                throw (err);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        errorHandler_1.apiErrorHandler(error_2, req, res, "Insert of Scope Scope failed.");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RoleRoutes.prototype.getObjPermissions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    Scope_1.Scope.findOne({ where: { id: req.params.id } })
                        .then(function (result) { res.json(result); })
                        .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
                }
                catch (error) {
                    console.log(error);
                    errorHandler_1.apiErrorHandler(error, req, res, "Get of Scope failed.");
                }
                return [2 /*return*/];
            });
        });
    };
    return RoleRoutes;
}());
exports.default = RoleRoutes;
//# sourceMappingURL=PermissionsCtrl.js.map