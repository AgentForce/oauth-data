"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_1 = require("../handlers/errorHandler");
var Role_1 = require("../models/Role");
var RoleRoutes = /** @class */ (function () {
    function RoleRoutes() {
    }
    RoleRoutes.prototype.getAllRoles = function (req, res, next) {
        Role_1.Role.findAll({})
            .then(function (result) { res.json(result); })
            .catch(function (err) { console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
    };
    return RoleRoutes;
}());
exports.default = RoleRoutes;
//# sourceMappingURL=RolesCtrl.js.map