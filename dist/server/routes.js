"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsersCtrl_1 = require("./controllers/UsersCtrl");
var RolesCtrl_1 = require("./controllers/RolesCtrl");
var userValidator_1 = require("./validators/userValidator");
var tokenValidator_1 = require("./validators/tokenValidator");
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.usersCtrl = new UsersCtrl_1.default();
        this.userValidator = new userValidator_1.UserValidator();
        this.tokenValidator = new tokenValidator_1.TokenValidator();
        this.rolesCtrl = new RolesCtrl_1.default();
        //user routes
        app.route("/api/users/:page/:size").get(this.tokenValidator.checkToken(), this.usersCtrl.getAllUsers);
        app.route("/api/users/getInfo/:username").get(this.usersCtrl.getUserById);
        app.route("/api/users/updateStatusOtp/:username").get(this.usersCtrl.updateStatusOTPUser);
        app.route("/api/users/updatePhone/:username").patch(this.tokenValidator.checkToken(), this.userValidator.validateBody(userValidator_1.userPhoneSchema), this.usersCtrl.updatePhoneUser);
        app.route("/api/users/add").post(this.userValidator.validateBody(userValidator_1.userSchema), this.usersCtrl.createUser);
        app.route("/api/users/addList").post(this.usersCtrl.createUsers);
        app.route("/api/users/deactive/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateDeactive);
        app.route("/api/users/active/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateActive);
        app.route("/api/users/badgeLevel/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateBadgeLevel);
        app.route("/api/roles").get(this.rolesCtrl.getAllRoles);
    }
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map