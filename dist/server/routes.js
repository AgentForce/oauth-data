"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsersCtrl_1 = require("./controllers/UsersCtrl");
var RolesCtrl_1 = require("./controllers/RolesCtrl");
var PermissionsCtrl_1 = require("./controllers/PermissionsCtrl");
var userValidator_1 = require("./validators/userValidator");
var roleValidator_1 = require("./validators/roleValidator");
var scopeValidator_1 = require("./validators/scopeValidator");
var tokenValidator_1 = require("./validators/tokenValidator");
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.usersCtrl = new UsersCtrl_1.default();
        this.userValidator = new userValidator_1.UserValidator();
        this.tokenValidator = new tokenValidator_1.TokenValidator();
        this.rolesCtrl = new RolesCtrl_1.default();
        this.roleValidator = new roleValidator_1.RoleValidator();
        this.scopeValidator = new scopeValidator_1.ScopeValidator();
        this.permissionsCtrl = new PermissionsCtrl_1.default();
        //user routes
        app.route("/api/users/updateStatusOtp/:username").get(this.tokenValidator.checkToken(), this.usersCtrl.updateStatusOTPUser);
        app.route("/api/users/getInfo/:username").get(this.tokenValidator.checkToken(), this.usersCtrl.getUserById);
        app.route("/api/users/:page/:size").get(this.tokenValidator.checkToken(), this.usersCtrl.getAllUsers);
        app.route("/api/users/:page/:size").post(this.tokenValidator.checkToken(), this.usersCtrl.postQueryUsers);
        app.route("/api/users/deactive/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateDeactive);
        app.route("/api/users/active/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateActive);
        app.route("/api/users/badgeLevel/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updateBadgeLevel);
        app.route("/api/users/updatePhone/:username").patch(this.tokenValidator.checkToken(), this.userValidator.validateBody(userValidator_1.userPhoneSchema), this.usersCtrl.updatePhoneUser);
        app.route("/api/users/updatePass/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.updatePassUser);
        app.route("/api/users/resetPass/:username").patch(this.tokenValidator.checkToken(), this.usersCtrl.resetPassUser);
        app.route("/api/users/add").post(this.tokenValidator.checkToken(), this.userValidator.validateBody(userValidator_1.userSchema), this.usersCtrl.createUser);
        app.route("/api/users/addList").post(this.tokenValidator.checkToken(), this.usersCtrl.createUsers);
        app.route("/api/roles/obj/:id").get(this.rolesCtrl.getObjRoles);
        app.route("/api/roles/:page/:size").get(this.rolesCtrl.getAllRolesPage);
        app.route("/api/roles").get(this.rolesCtrl.getAllRoles);
        app.route("/api/roles").post(this.roleValidator.validateBody(roleValidator_1.roleSchema), this.rolesCtrl.postCreateRole);
        app.route("/api/roles/update/:id").patch(this.rolesCtrl.patchUpdateRole);
        app.route("/api/roles/link/:id_role").put(this.rolesCtrl.putLinkRoles);
        app.route("/api/permissions/obj/:id").get(this.permissionsCtrl.getObjPermissions);
        app.route("/api/permissions/:page/:size").get(this.permissionsCtrl.getAllPermissionsPage);
        app.route("/api/permissions").get(this.permissionsCtrl.getAllPermissions);
        app.route("/api/permissions").post(this.scopeValidator.validateBody(scopeValidator_1.scopeSchema), this.permissionsCtrl.postCreatePermissions);
        app.route("/api/permissions/update/:id").patch(this.permissionsCtrl.patchUpdatePermissions);
        app.route("/api/permissions/link/:id_role").put(this.permissionsCtrl.putLinkPermissions);
    }
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map