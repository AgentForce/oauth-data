
import { Application, Request, Response, NextFunction, Router } from "express";
import UsersCtrl from "./controllers/UsersCtrl";
import RolesCtrl from "./controllers/RolesCtrl";
import { UserValidator, userPhoneSchema, userSchema } from './validators/userValidator';
import { TokenValidator } from './validators/tokenValidator';

export default class Routes {

    usersCtrl = new UsersCtrl();
    userValidator = new UserValidator();
    tokenValidator = new TokenValidator();
    rolesCtrl = new RolesCtrl();

    constructor(app: Application) { 

        //user routes
        app.route("/api/users/:page/:size").get(this.tokenValidator.checkToken(), this.usersCtrl.getAllUsers);
        app.route("/api/users/getInfo/:username").get(this.usersCtrl.getUserById);
        app.route("/api/users/updateStatusOtp/:username").get(this.usersCtrl.updateStatusOTPUser);
        app.route("/api/users/updatePhone/:username").patch(this.tokenValidator.checkToken() ,this.userValidator.validateBody(userPhoneSchema), this.usersCtrl.updatePhoneUser);
        app.route("/api/users/add").post(this.userValidator.validateBody(userSchema), this.usersCtrl.createUser);
        app.route("/api/users/addList").post( this.usersCtrl.createUsers);
        app.route("/api/users/deactive/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateDeactive);
        app.route("/api/users/active/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateActive);
        app.route("/api/users/badgeLevel/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateBadgeLevel);

        app.route("/api/roles").get(this.rolesCtrl.getAllRoles);

    }
}