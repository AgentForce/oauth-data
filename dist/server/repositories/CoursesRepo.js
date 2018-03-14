"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Course_1 = require("../models/Course");
var Lesson_1 = require("../models/Lesson");
var CourseRepo = /** @class */ (function () {
    function CourseRepo() {
    }
    CourseRepo.prototype.getAllCourses = function (options) {
        return Course_1.Course.findAll(options);
    };
    CourseRepo.prototype.getById = function (courseId) {
        return Course_1.Course.findById(courseId, {
            include: [
                {
                    model: Lesson_1.Lesson
                }
            ]
        });
    };
    return CourseRepo;
}());
exports.default = new CourseRepo();
//# sourceMappingURL=CoursesRepo.js.map