"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpComponent = void 0;
var core_1 = require("@angular/core");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(fb, auth, userService) {
        this.fb = fb;
        this.auth = auth;
        this.userService = userService;
        this.display = false;
        this.signupForm = this.fb.group({
            name: [''],
            email: [''],
            password: [''],
            confirmPassword: ['']
        });
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    SignUpComponent.prototype.onSubmit = function () {
        var _this = this;
        this.auth.createUser(this.signupForm.value.email, this.signupForm.value.password).then(function (res) {
            _this.auth.addName(_this.signupForm.value.name).then(function () {
                _this.userService.createUser({
                    "id": res.user.uid,
                    "email": res.user.email,
                    "name": res.user.displayName
                }).subscribe(function (res) { return console.log(res); });
            });
        })["catch"](function (err) {
            console.log("unable to create User: error " + err);
        });
    };
    SignUpComponent.prototype.showDialog = function () {
        this.display = true;
    };
    SignUpComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.scss']
        })
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
