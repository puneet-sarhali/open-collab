"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostListComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PostListComponent = /** @class */ (function () {
    function PostListComponent(ps, userService, auth) {
        this.ps = ps;
        this.userService = userService;
        this.auth = auth;
        //gets all projects and then gets the user data associated with it.
        this.getData();
    }
    PostListComponent.prototype.getData = function () {
        var _this = this;
        this.ps.getProjects().pipe((0, rxjs_1.mergeMap)(function (projects) { return rxjs_1.of.apply(void 0, projects); }), (0, rxjs_1.mergeMap)(function (project) {
            return (0, rxjs_1.combineLatest)((0, rxjs_1.of)(project), _this.userService.getUser(project.userid));
        }), (0, rxjs_1.toArray)()).subscribe(function (value) { return _this.inputData = value; });
    };
    PostListComponent.prototype.addItem = function (project) {
        this.getData();
    };
    //votes made by current user
    PostListComponent.prototype.getVotes = function () {
        var _this = this;
        return this.auth.userInfo().pipe((0, rxjs_1.switchMap)(function (user) { return _this.userService.getVotes(user === null || user === void 0 ? void 0 : user.uid); }));
    };
    PostListComponent.prototype.ngOnInit = function () {
    };
    PostListComponent.prototype.onVote = function (res) {
        var response = {
            "userid": this.auth.uid,
            "projectid": res.projectid,
            "votevalue": res.value
        };
        if (res.method === "post") {
            this.userService.vote(response).subscribe(function (vote) { return console.log(vote); }, function (error) { return console.log(error); });
        }
        else if (res.method === "put") {
            this.userService.updateVote(response).subscribe(function (vote) { return console.log(vote); }, function (error) { return console.log(error); });
        }
        else {
            this.userService.deleteVote(response).subscribe(function (vote) { return console.log(vote); }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        (0, core_1.Input)()
    ], PostListComponent.prototype, "newProject");
    PostListComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-post-list',
            templateUrl: './post-list.component.html',
            styleUrls: ['./post-list.component.scss']
        })
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
