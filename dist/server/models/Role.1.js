"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../db/db");
var ORM = require("sequelize");
exports.Role = db_1.sequelize.define("oauth_role", {
    name: ORM.STRING,
    role: ORM.STRING,
    resource: ORM.STRING,
    is_default: ORM.INTEGER,
    createdAt: ORM.DATE,
    updatedAt: ORM.DATE
});
//# sourceMappingURL=Role.1.js.map