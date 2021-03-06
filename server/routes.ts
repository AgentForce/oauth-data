
import { Application, Request, Response, NextFunction, Router } from "express";
import UsersCtrl from "./controllers/UsersCtrl";
import RolesCtrl from "./controllers/RolesCtrl";
import PermissionsCtrl from "./controllers/PermissionsCtrl";

import { UserValidator, userPhoneSchema, userSchema } from './validators/userValidator';
import { RoleValidator, roleSchema } from './validators/roleValidator';
import { ScopeValidator, scopeSchema } from './validators/scopeValidator';
import { TokenValidator } from './validators/tokenValidator';

export default class Routes {

    usersCtrl = new UsersCtrl();
    userValidator = new UserValidator();
    tokenValidator = new TokenValidator();
    rolesCtrl = new RolesCtrl();
    roleValidator = new RoleValidator();
    scopeValidator = new ScopeValidator();
    permissionsCtrl = new PermissionsCtrl();
    constructor(app: Application) { 

        //user routes
        app.route("/api/users/updateStatusOtp/:username").get(this.tokenValidator.checkToken(), this.usersCtrl.updateStatusOTPUser);
        app.route("/api/users/getInfo/:username").get(this.tokenValidator.checkToken(), this.usersCtrl.getUserById);
        app.route("/api/users/:page/:size").get(this.tokenValidator.checkToken(), this.usersCtrl.getAllUsers);
        app.route("/api/users/:page/:size").post( this.tokenValidator.checkToken(), this.usersCtrl.postQueryUsers);
        
        app.route("/api/users/deactive/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateDeactive);
        app.route("/api/users/active/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateActive);
        app.route("/api/users/badgeLevel/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateBadgeLevel);

        app.route("/api/users/updatePhone/:username").patch(this.tokenValidator.checkToken() ,this.userValidator.validateBody(userPhoneSchema), this.usersCtrl.updatePhoneUser);
        app.route("/api/users/updatePass/:username").patch(this.tokenValidator.checkToken() ,this.usersCtrl.updatePassUser);
        app.route("/api/users/resetPass/:username").patch(this.tokenValidator.checkToken() ,this.usersCtrl.resetPassUser);
        app.route("/api/users/changePass/:username").patch(this.usersCtrl.changePassUser);
        // app.route("/api/users/add").post(this.tokenValidator.checkToken(), this.userValidator.validateBody(userSchema), this.usersCtrl.createUser);

        app.route("/api/users/add").post(this.tokenValidator.checkToken(), this.usersCtrl.createUser);
        app.route("/api/users/addList").post( this.tokenValidator.checkToken(), this.usersCtrl.createUsers);
        app.route("/api/users/changeReportTo").patch( this.usersCtrl.changeReportTo);


        app.route("/api/roles/obj/:id").get( this.rolesCtrl.getObjRoles);
        app.route("/api/roles/:page/:size").get( this.rolesCtrl.getAllRolesPage);
        app.route("/api/roles").get( this.rolesCtrl.getAllRoles);
        app.route("/api/roles").post( this.roleValidator.validateBody(roleSchema), this.rolesCtrl.postCreateRole);
        app.route("/api/roles/update/:id").patch( this.rolesCtrl.patchUpdateRole);
        app.route("/api/roles/link/:id_role").put( this.rolesCtrl.putLinkRoles);

        app.route("/api/permissions/obj/:id").get( this.permissionsCtrl.getObjPermissions);
        app.route("/api/permissions/:page/:size").get( this.permissionsCtrl.getAllPermissionsPage);
        app.route("/api/permissions").get( this.permissionsCtrl.getAllPermissions);
        app.route("/api/permissions").post( this.scopeValidator.validateBody(scopeSchema), this.permissionsCtrl.postCreatePermissions);
        app.route("/api/permissions/update/:id").patch( this.permissionsCtrl.patchUpdatePermissions);
        app.route("/api/permissions/link/:id_role").put( this.permissionsCtrl.putLinkPermissions);

        app.route("/api/dashboard/:id").get( this.usersCtrl.getDashboard);
        app.route("/api/reportto/:id").get( this.usersCtrl.getReportToID);
        app.route("/api/export").post( this.usersCtrl.postExport);
        app.route("/api/remind/:page/:size").get( this.usersCtrl.getRemind);
        
    }
}