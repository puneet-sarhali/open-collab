"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostComponent = void 0;
var core_1 = require("@angular/core");
var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(fb, ps, auth) {
        this.fb = fb;
        this.ps = ps;
        this.auth = auth;
        this.display = false;
        this.newProject = new core_1.EventEmitter();
        this.createPostForm = this.fb.group({
            projectName: [''],
            projectDescription: ['']
        });
    }
    CreatePostComponent.prototype.ngOnInit = function () {
    };
    CreatePostComponent.prototype.onSubmit = function () {
        var _this = this;
        // TODO: check uid state with if/else and navigate user to signIn
        var projectData = {
            "projectid": -1,
            "projectname": this.createPostForm.value.projectName,
            "description": this.createPostForm.value.projectDescription,
            "score": 0,
            "upvotes": 0,
            "downvotes": 0,
            "createdat": new Date(),
            "userid": this.auth.uid
        };
        this.ps.createProject(projectData).subscribe(function (res) {
            _this.newProject.emit(projectData);
        });
    };
    CreatePostComponent.prototype.showDialog = function () {
        this.display = true;
    };
    __decorate([
        (0, core_1.Output)()
    ], CreatePostComponent.prototype, "newProject");
    CreatePostComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-create-post',
            templateUrl: './create-post.component.html',
            styleUrls: ['./create-post.component.scss']
        })
    ], CreatePostComponent);
    return CreatePostComponent;
}());
exports.CreatePostComponent = CreatePostComponent;
