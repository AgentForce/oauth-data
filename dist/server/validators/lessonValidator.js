"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var LessonValidator = /** @class */ (function () {
    function LessonValidator() {
    }
    LessonValidator.prototype.validateBody = function (schema) {
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
    return LessonValidator;
}());
exports.LessonValidator = LessonValidator;
exports.lessonSchema = Joi.object().keys({});
//# sourceMappingURL=lessonValidator.js.map