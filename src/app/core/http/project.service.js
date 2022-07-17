"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectService = void 0;
var core_1 = require("@angular/core");
var ProjectService = /** @class */ (function () {
    function ProjectService(http) {
        this.http = http;
        this.url = "http://localhost:4999/projects";
    }
    //
    ProjectService.prototype.getProjects = function () {
        return this.http.get(this.url);
    };
    ProjectService.prototype.createProject = function (project) {
        return this.http.post(this.url, project);
    };
    ProjectService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
