"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var ScopeValidator = /** @class */ (function () {
    function ScopeValidator() {
    }
    ScopeValidator.prototype.validateBody = function (schema) {
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
    return ScopeValidator;
}());
exports.ScopeValidator = ScopeValidator;
exports.scopeSchema = Joi.object().keys({
    name: Joi.string().min(3).max(125).required(),
    scope: Joi.string().regex(/^[_/a-zA-Z0-9]{3,30}$/).required(),
    resource: Joi.string().regex(/^[_a-zA-Z0-9]{3,30}$/).required(),
    is_default: Joi.boolean()
});
//# sourceMappingURL=scopeValidator.js.map