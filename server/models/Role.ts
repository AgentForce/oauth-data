
import { sequelize } from "./../db/db";
import * as ORM from "sequelize";

export const Role = sequelize.define("oauth_role", {
    name: ORM.STRING,
    role: ORM.STRING,
    resource: ORM.STRING,
    is_default: ORM.INTEGER,
    createdAt: ORM.DATE,
    updatedAt: ORM.DATE
});