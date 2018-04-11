"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../db/db");
var ORM = require("sequelize");
exports.RoleScope = db_1.sequelize.define("oauth_role_scope", {
    id_role: ORM.STRING,
    id_scope: ORM.STRING,
    name_scope: ORM.STRING,
    name_role: ORM.STRING,
    role: ORM.STRING,
    scope: ORM.STRING,
    createdAt: ORM.DATE,
    updatedAt: ORM.DATE
});
exports.RoleScope.removeAttribute('id');
//# sourceMappingURL=RoleScope.js.map