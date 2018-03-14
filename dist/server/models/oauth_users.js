"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../db/db");
var ORM = require("sequelize");
exports.oauth_users = db_1.sequelize.define("oauth_users", {
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
    CreateAt: ORM.STRING,
    code_level: ORM.STRING,
    badge: ORM.STRING
});
//# sourceMappingURL=oauth_users.js.map