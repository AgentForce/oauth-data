"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_1 = require("../handlers/errorHandler");
var LessonsRepo_1 = require("../repositories/LessonsRepo");
var User_1 = require("../models/User");
var LessonRoutes = /** @class */ (function () {
    function LessonRoutes() {
    }
    LessonRoutes.prototype.getAllLessons = function (req, res, next) {
        User_1.User.findAll({})
            .then(function (result) { console.log('hello'); res.json(result); })
            .catch(function (err) { console.log('error========'); console.log(err); errorHandler_1.apiErrorHandler(err, req, res, "Fetch All Lessons failed."); });
    };
    LessonRoutes.prototype.getLessonByCourse = function (req, res, next) {
        LessonsRepo_1.default.getLessonByCourse(req.params.id)
            .then(function (result) { return res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "Fetch All Lessons failed."); });
    };
    LessonRoutes.prototype.getLessonById = function (req, res, next) {
        LessonsRepo_1.default.getLessonById(req.params.id)
            .then(function (result) { return res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "Lesson " + req.params.id + " not found."); });
    };
    LessonRoutes.prototype.createLesson = function (req, res, next) {
        LessonsRepo_1.default.createLesson(req['value']['body'])
            .then(function (result) { res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "Creation of Lesson failed."); });
    };
    LessonRoutes.prototype.updateLesson = function (req, res, next) {
        LessonsRepo_1.default.updateLesson(req.params.id, req['value']['body'])
            .then(function (result) { res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "updation of Lesson " + req.params.id + "  failed."); });
    };
    LessonRoutes.prototype.deleteLesson = function (req, res, next) {
        LessonsRepo_1.default.deleteLesson(req.params.id)
            .then(function (result) { res.json(result); })
            .catch(function (err) { errorHandler_1.apiErrorHandler(err, req, res, "deletion of Lesson " + req.params.id + "  failed."); });
    };
    return LessonRoutes;
}());
exports.default = LessonRoutes;
//# sourceMappingURL=LessonsCtrl.js.map