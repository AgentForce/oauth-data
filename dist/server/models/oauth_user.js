"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../db/db");
var ORM = require("sequelize");
exports.User = db_1.sequelize.define("oauth_user", {
    username: ORM.STRING,
    password: ORM.STRING,
    phone: ORM.STRING,
    address: ORM.STRING,
    city: ORM.INTEGER,
    district: ORM.INTEGER,
    gender: ORM.INTEGER,
    birthday: ORM.STRING,
    level: ORM.INTEGER,
    status: ORM.INTEGER,
    lastlogin: ORM.STRING,
    expirence: ORM.STRING,
    fullName: ORM.STRING,
    email: ORM.STRING,
    scope: ORM.STRING,
    resource_ids: ORM.STRING,
    zone: ORM.INTEGER,
    createdAt: ORM.STRING,
    code_level: ORM.STRING,
    badge: ORM.STRING
});
//# sourceMappingURL=oauth_user.js.map