"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenValidator = /** @class */ (function () {
    function TokenValidator() {
    }
    TokenValidator.prototype.checkToken = function () {
        return function (req, res, next) {
            return res.status(400).json('không có token' + req.token);
        };
    };
    return TokenValidator;
}());
exports.TokenValidator = TokenValidator;
//# sourceMappingURL=userValidator.1.js.map