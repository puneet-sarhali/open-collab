"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var auth_1 = require("@angular/fire/auth");
var AuthService = /** @class */ (function () {
    function AuthService(auth) {
        var _this = this;
        this.auth = auth;
        (0, auth_1.onAuthStateChanged)(auth, function (user) {
            console.log("auth state changed");
            if (user) {
                _this._uid = user.uid;
                _this._state = true;
            }
            else {
                _this._state = false;
                _this._uid = null;
            }
        });
    }
    AuthService.prototype.createUser = function (email, password) {
        return (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
    };
    AuthService.prototype.signIn = function (email, password) {
        return (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
    };
    AuthService.prototype.signout = function () {
        return (0, auth_1.signOut)(this.auth);
    };
    Object.defineProperty(AuthService.prototype, "uid", {
        get: function () {
            var _a;
            return (_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.userInfo = function () {
        return (0, auth_1.authState)(this.auth);
    };
    AuthService.prototype.addName = function (name) {
        return (0, auth_1.updateProfile)(this.auth.currentUser, { displayName: name });
    };
    AuthService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
