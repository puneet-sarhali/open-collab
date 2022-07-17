"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = "http://localhost:4999/users";
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.url);
    };
    UserService.prototype.createUser = function (user) {
        return this.http.post(this.url, user);
    };
    UserService.prototype.getUser = function (uid) {
        return this.http.get(this.url + "/".concat(uid));
    };
    UserService.prototype.vote = function (data) {
        return this.http.post(this.url + "/votes", data);
    };
    UserService.prototype.updateVote = function (data) {
        return this.http.put(this.url + "/votes/".concat(data.userid, "/").concat(data.projectid), data);
    };
    UserService.prototype.deleteVote = function (data) {
        return this.http["delete"](this.url + "/votes/".concat(data.userid, "/").concat(data.projectid, "/").concat(data.votevalue));
    };
    UserService.prototype.getVotes = function (uid) {
        return this.http.get(this.url + "/votes/".concat(uid));
    };
    UserService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
