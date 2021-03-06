"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var RoleValidator = /** @class */ (function () {
    function RoleValidator() {
    }
    RoleValidator.prototype.validateBody = function (schema) {
        return function (req, res, next) {
            var result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            else {
                if (!req['value']) {
                    req['value'] = {};
                }
                if (!req['value']['body']) {
                    req['value']['body'] = {};
                }
                req['value']['body'] = result.value;
                next();
            }
        };
    };
    return RoleValidator;
}());
exports.RoleValidator = RoleValidator;
exports.roleSchema = Joi.object().keys({
    name: Joi.string().min(3).max(125).required(),
    role: Joi.string().regex(/^[_a-zA-Z0-9]{3,30}$/).required(),
    resource: Joi.string().regex(/^[_a-zA-Z0-9]{3,30}$/).required(),
    is_default: Joi.boolean()
});
//# sourceMappingURL=roleValidator.js.map