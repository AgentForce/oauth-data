
import { sequelize } from "./../db/db";
import * as ORM from "sequelize";

export const RoleScope = sequelize.define("oauth_role_scope", {
    id_role: ORM.STRING,
    id_scope: ORM.STRING,
    name_scope: ORM.STRING,
    name_role: ORM.STRING,
    scope: ORM.STRING,
    createdAt: ORM.DATE,
    updatedAt: ORM.DATE
});
RoleScope.removeAttribute('id');
